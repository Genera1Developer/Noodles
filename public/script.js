function attachProxyHandler() {
    document.getElementById('proxyConnectButton').addEventListener('click', function() {
        const targetUrl = document.getElementById('targetUrl').value;
        const proxyUrl = document.getElementById('proxyUrl').value;

        fetch('/main/proxy/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                targetUrl: targetUrl,
                proxyUrl: proxyUrl
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('proxyResult').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('proxyResult').textContent = 'Error: ' + error;
        });
    });
}

function attachAttackHandler() {
    document.getElementById('attackButton').addEventListener('click', function() {
        const targetUrl = document.getElementById('targetUrl').value;
        const attackType = document.getElementById('attackType').value;
        const attackDuration = document.getElementById('attackDuration').value;

        fetch('/main/attack/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                targetUrl: targetUrl,
                attackType: attackType,
                attackDuration: attackDuration
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('attackResult').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('attackResult').textContent = 'Error: ' + error;
        });
    });
}

function updateStats(stats) {
    document.getElementById('mbps').textContent = stats.mbps;
    document.getElementById('packets').textContent = stats.packets;
    document.getElementById('status').textContent = stats.status;
    document.getElementById('time').textContent = stats.time;
}

function initStatsUpdater() {
    setInterval(() => {
        fetch('/main/stats')
        .then(response => response.json())
        .then(stats => {
            updateStats(stats);
        })
        .catch(error => {
            console.error('Error fetching stats:', error);
        });
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    attachProxyHandler();
    attachAttackHandler();
    initStatsUpdater();

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContent = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContent.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const target = button.dataset.target;
            document.getElementById(target).classList.add('active');
        });
    });

    document.querySelector('.tab-button[data-target="ddos"]').click();
});


edit filepath: public/style.css
content: body {
    font-family: Arial, sans-serif;
    background-color: #121212;
    color: #f0f0f0;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container {
    width: 95%;
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background-color: #202020;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

h1 {
    color: #90EE90;
    text-align: center;
    margin-bottom: 20px;
}

.panel {
    display: flex;
    flex-direction: column;
    background-color: #333;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    color: #ddd;
    margin-bottom: 5px;
}

.input-group input[type="text"],
.input-group input[type="number"],
.input-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #555;
    background-color: #444;
    color: #eee;
    border-radius: 4px;
    box-sizing: border-box;
}

.input-group select {
    appearance: none;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23eee"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 8px top 50%;
    background-size: 16px;
    padding-right: 30px;
}

button {
    background-color: #90EE90;
    color: #121212;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #70c070;
}

#proxyResult,
#attackResult {
    white-space: pre-wrap;
    background-color: #444;
    color: #eee;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
    overflow-x: auto;
}

#stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

#stats div {
    background-color: #333;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
}

#stats div h3 {
    color: #ddd;
    margin-bottom: 5px;
}

#stats div p {
    color: #bbb;
}

.tab-container {
    display: flex;
    flex-direction: column;
}

.tab-buttons {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #555;
    margin-bottom: 20px;
}

.tab-button {
    background-color: #444;
    color: #eee;
    padding: 10px 15px;
    border: none;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 5px;
}

.tab-button:hover {
    background-color: #555;
}

.tab-button.active {
    background-color: #90EE90;
    color: #121212;
}

.tab-content {
    display: none;
    padding: 20px;
    background-color: #333;
    border-radius: 8px;
}

.tab-content.active {
    display: block;
}

#about-us {
    line-height: 1.6;
}

footer {
    text-align: center;
    margin-top: auto;
    padding: 10px;
    background-color: #222;
    color: #888;
    border-top: 1px solid #444;
}


edit filepath: public/index.html
content: <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Noodles - Hacking Web Application</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Noodles - Hacking Web Application</h1>

        <div class="tab-container">
            <div class="tab-buttons">
                <button class="tab-button" data-target="ddos">DDoS</button>
                <button class="tab-button" data-target="defacement">Defacement</button>
                <button class="tab-button" data-target="connection">Connection</button>
                <button class="tab-button" data-target="credential">Credential</button>
                <button class="tab-button" data-target="about-us">About Us</button>
            </div>

            <div id="ddos" class="tab-content">
                <h2>DDoS Attack</h2>
                <div class="panel">
                    <div class="input-group">
                        <label for="targetUrl">Target URL:</label>
                        <input type="text" id="targetUrl" placeholder="http://example.com">
                    </div>
                    <div class="input-group">
                        <label for="attackType">Attack Type:</label>
                        <select id="attackType">
                            <option value="synFlood">SYN Flood</option>
                            <option value="httpFlood">HTTP Flood</option>
                            <option value="udpFlood">UDP Flood</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="attackDuration">Duration (seconds):</label>
                        <input type="number" id="attackDuration" value="30">
                    </div>
                    <button id="attackButton">Execute Attack</button>
                    <div id="attackResult"></div>
                </div>
            </div>

            <div id="defacement" class="tab-content">
                <h2>Website Defacement</h2>
                <div class="panel">
                    <p>Defacement tools will be implemented here.</p>
                </div>
            </div>

            <div id="connection" class="tab-content">
                <h2>Establish Connection</h2>
                <div class="panel">
                    <div class="input-group">
                        <label for="proxyUrl">Proxy URL:</label>
                        <input type="text" id="proxyUrl" placeholder="http://proxy.example.com:8080">
                    </div>
                    <button id="proxyConnectButton">Connect via Proxy</button>
                    <div id="proxyResult"></div>
                </div>
            </div>

            <div id="credential" class="tab-content">
                <h2>Credential Stuffing</h2>
                <div class="panel">
                    <p>Credential stuffing tools will be implemented here.</p>
                </div>
            </div>

            <div id="about-us" class="tab-content">
                <h2>About Us</h2>
                <div class="panel">
                    <p>Noodles is a web application designed for security testing and penetration testing purposes. It provides a range of tools for evaluating the security posture of web applications and networks. Use responsibly.</p>
                </div>
            </div>
        </div>

        <div id="stats">
            <div>
                <h3>MBPS</h3>
                <p id="mbps">0</p>
            </div>
            <div>
                <h3>Packets Sent</h3>
                <p id="packets">0</p>
            </div>
            <div>
                <h3>Target Status</h3>
                <p id="status">Offline</p>
            </div>
            <div>
                <h3>Time Elapsed</h3>
                <p id="time">0s</p>
            </div>
        </div>
    </div>

    <footer>
        &copy; 2024 Noodles. All rights reserved.
    </footer>
    <script src="script.js"></script>
</body>
</html>


edit filepath: main/attack/execute.js
content: async function executeAttack(targetUrl, attackType, attackDuration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = {
                status: 'Attack Finished',
                target: targetUrl,
                type: attackType,
                duration: attackDuration
            };
            resolve(result);
        }, attackDuration * 1000);
    });
}

module.exports = { executeAttack };


edit filepath: main/stats.js
content: async function getStats() {
    return new Promise((resolve, reject) => {
        const stats = {
            mbps: Math.floor(Math.random() * 100),
            packets: Math.floor(Math.random() * 1000),
            status: 'Online',
            time: Math.floor(Math.random() * 60) + 's'
        };
        resolve(stats);
    });
}

module.exports = { getStats };


edit filepath: main/proxy/connect.js
content: async function connectViaProxy(targetUrl, proxyUrl) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = {
                status: 'Connected',
                target: targetUrl,
                proxy: proxyUrl
            };
            resolve(result);
        }, 1000);
    });
}

module.exports = { connectViaProxy };


edit filepath: main/index.js
content: const express = require('express');
const app = express();
const port = 3000;

const { connectViaProxy } = require('./proxy/connect');
const { executeAttack } = require('./attack/execute');
const { getStats } = require('./stats');

app.use(express.static('public'));
app.use(express.json());

app.post('/main/proxy/connect', async (req, res) => {
    try {
        const { targetUrl, proxyUrl } = req.body;
        const result = await connectViaProxy(targetUrl, proxyUrl);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/main/attack/execute', async (req, res) => {
    try {
        const { targetUrl, attackType, attackDuration } = req.body;
        const result = await executeAttack(targetUrl, attackType, attackDuration);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/main/stats', async (req, res) => {
    try {
        const stats = await getStats();
        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


edit filepath: package.json
content: {
  "name": "noodles",
  "version": "1.0.0",
  "description": "Hacking Web Application",
  "main": "main/index.js",
  "scripts": {
    "start": "node main/index.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}