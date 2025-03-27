const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

function executeCommand(command, args) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args);
        let result = '';

        process.stdout.on('data', (data) => {
            result += data.toString();
            console.log(`stdout: ${data}`);
        });

        process.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(data.toString());
        });

        process.on('close', (code) => {
            if (code === 0) {
                resolve(result);
            } else {
                reject(`Command failed with code ${code}`);
            }
        });
    });
}

const ddosDir = path.join(__dirname, 'ddos');
if (!fs.existsSync(ddosDir)) {
    fs.mkdirSync(ddosDir);
}

const defacementDir = path.join(__dirname, 'defacement');
if (!fs.existsSync(defacementDir)) {
    fs.mkdirSync(defacementDir);
}

const connectionDir = path.join(__dirname, 'connection');
if (!fs.existsSync(connectionDir)) {
    fs.mkdirSync(connectionDir);
}

app.post('/api/ddos', async (req, res) => {
    const target = req.body.target;
    const type = req.body.type;
    const duration = req.body.duration || 60;

    if (!target || !type) {
        return res.status(400).send({ status: 'Target and type are required' });
    }

    console.log(`DDoS attack requested: Target=${target}, Type=${type}, Duration=${duration}`);

    try {
        let scriptPath;

        switch (type) {
            case 'http':
                scriptPath = path.join(ddosDir, 'http_flood.js');
                if (!fs.existsSync(scriptPath)) {
                    fs.writeFileSync(scriptPath, 'console.log("HTTP Flood script placeholder"); process.exit(1);');
                }
                break;
            case 'tcp':
                scriptPath = path.join(ddosDir, 'tcp_flood.js');
                if (!fs.existsSync(scriptPath)) {
                    fs.writeFileSync(scriptPath, 'console.log("TCP Flood script placeholder"); process.exit(1);');
                }
                break;
            case 'udp':
                scriptPath = path.join(ddosDir, 'udp_flood.js');
                if (!fs.existsSync(scriptPath)) {
                    fs.writeFileSync(scriptPath, 'console.log("UDP Flood script placeholder"); process.exit(1);');
                }
                break;
            default:
                return res.status(400).send({ status: 'Invalid DDoS attack type' });
        }


        const args = [target, duration];
        await executeCommand('node', [scriptPath, ...args]);
        res.send({ status: `DDoS attack initiated (${type}) on ${target} for ${duration} seconds` });
    } catch (error) {
        console.error(`DDoS attack failed: ${error}`);
        res.status(500).send({ status: `DDoS attack failed: ${error}` });
    }
});

app.post('/api/defacement', async (req, res) => {
    const target = req.body.target;
    const action = req.body.action;
    const content = req.body.content;

    if (!target || !action) {
        return res.status(400).send({ status: 'Target and action are required' });
    }

    console.log(`Defacement requested: Target=${target}, Action=${action}`);

    try {
        const scriptPath = path.join(defacementDir, 'deface.js');

        if (!fs.existsSync(scriptPath)) {
             fs.writeFileSync(scriptPath, 'console.log("Deface script placeholder"); process.exit(1);');
        }

        const args = [target, action, content];
        await executeCommand('node', [scriptPath, ...args]);
        res.send({ status: `Defacement initiated (${action}) on ${target}` });
    } catch (error) {
        console.error(`Defacement failed: ${error}`);
        res.status(500).send({ status: `Defacement failed: ${error}` });
    }
});

app.post('/api/connection', async (req, res) => {
    const target = req.body.target;
    const type = req.body.type;

    if (!target || !type) {
        return res.status(400).send({ status: 'Target and type are required' });
    }

    console.log(`Connection requested: Target=${target}, Type=${type}`);

    try {
        let scriptPath;

        switch (type) {
            case 'portscan':
                scriptPath = path.join(connectionDir, 'port_scan.js');
                 if (!fs.existsSync(scriptPath)) {
                     fs.writeFileSync(scriptPath, 'console.log("Port Scan script placeholder"); process.exit(1);');
                }
                break;
            case 'bannergrab':
                scriptPath = path.join(connectionDir, 'banner_grab.js');
                 if (!fs.existsSync(scriptPath)) {
                     fs.writeFileSync(scriptPath, 'console.log("Banner Grab script placeholder"); process.exit(1);');
                }
                break;
            default:
                return res.status(400).send({ status: 'Invalid connection type' });
        }


        const args = [target];
        await executeCommand('node', [scriptPath, ...args]);
        res.send({ status: `Connection initiated (${type}) on ${target}` });
    } catch (error) {
        console.error(`Connection failed: ${error}`);
        res.status(500).send({ status: `Connection failed: ${error}` });
    }
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Noodles app listening on port ${port}`);
});