document.addEventListener('DOMContentLoaded', () => {
    const targetInput = document.getElementById('targetUrl');
    const attackTypeSelect = document.getElementById('attackType');
    const attackButton = document.getElementById('attackButton');
    const mbpsDisplay = document.getElementById('mbps');
    const packetsDisplay = document.getElementById('packets');
    const statusDisplay = document.getElementById('status');
    const timeDisplay = document.getElementById('time');
    const tabs = document.querySelectorAll('.tab-button');
    const tabContent = document.querySelectorAll('.tab-content');

    // Default values and states
    let attackStartTime = null;
    let attackInterval = null;

    // Function to update statistics display
    function updateStatistics(mbps, packets, status) {
        mbpsDisplay.textContent = `MBPS: ${mbps}`;
        packetsDisplay.textContent = `Packets: ${packets}`;
        statusDisplay.textContent = `Status: ${status}`;

        if (attackStartTime) {
            const elapsedTime = Math.floor((Date.now() - attackStartTime) / 1000);
            timeDisplay.textContent = `Time: ${elapsedTime}s`;
        } else {
            timeDisplay.textContent = 'Time: 0s';
        }
    }

    // Simulate attack and update statistics (replace with actual attack logic)
    function simulateAttack(targetUrl, attackType) {
        attackStartTime = Date.now();
        let packetsSent = 0;

        attackInterval = setInterval(() => {
            packetsSent += 100;
            const mbps = Math.random() * 10; // Simulate MBPS
            const status = Math.random() > 0.5 ? 'Online' : 'Unresponsive'; // Simulate status
            updateStatistics(mbps.toFixed(2), packetsSent, status);
        }, 1000); // Update every 1 second
    }

    // Attach event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            const target = event.target;
            const tabId = target.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            tabContent.forEach(c => c.classList.remove('active'));

            target.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Attach event listener to the attack button
    attackButton.addEventListener('click', () => {
        const targetUrl = targetInput.value;
        const attackType = attackTypeSelect.value;

        if (targetUrl && attackType) {
            simulateAttack(targetUrl, attackType);
        } else {
            alert('Please enter a target URL and select an attack type.');
        }
    });

    // Initial statistics update
    updateStatistics(0, 0, 'Idle');
});
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
        <aside class="side-panel">
            <nav>
                <button class="tab-button active" data-tab="ddos">DDoS</button>
                <button class="tab-button" data-tab="defacement">Defacement</button>
                <button class="tab-button" data-tab="connection">Connection</button>
                <button class="tab-button" data-tab="credential">Credential</button>
                <button class="tab-button" data-tab="other">Other Hacking Tools</button>
                <button class="tab-button" data-tab="about">About Us</button>
            </nav>
        </aside>
        <main class="main-content">
            <section id="ddos" class="tab-content active">
                <h2>DDoS Attack</h2>
                <div class="attack-controls">
                    <input type="text" id="targetUrl" placeholder="Target URL">
                    <select id="attackType">
                        <option value="synFlood">SYN Flood</option>
                        <option value="httpFlood">HTTP Flood</option>
                        <option value="udpFlood">UDP Flood</option>
                    </select>
                    <button id="attackButton">Start Attack</button>
                </div>
                <div class="statistics">
                    <div id="mbps">MBPS: 0</div>
                    <div id="packets">Packets: 0</div>
                    <div id="status">Status: Idle</div>
                    <div id="time">Time: 0s</div>
                </div>
            </section>
            <section id="defacement" class="tab-content">
                <h2>Website Defacement</h2>
                <p>Defacement tools and options will be here.</p>
            </section>
            <section id="connection" class="tab-content">
                <h2>Connection</h2>
                <p>Connection tools and options will be here.</p>
            </section>
            <section id="credential" class="tab-content">
                <h2>Credential Stuffing</h2>
                <p>Credential stuffing tools and options will be here.</p>
            </section>
            <section id="other" class="tab-content">
                <h2>Other Hacking Tools</h2>
                <p>Other tools will be here.</p>
            </section>
            <section id="about" class="tab-content">
                <h2>About Us</h2>
                <p>This is a hacking web application for demonstration purposes.</p>
            </section>
        </main>
    </div>
    <script src="script.js"></script>
</body>
</html>
edit filepath: public/style.css
content: body {
    font-family: Arial, sans-serif;
    background-color: #1e272e;
    color: #f6f6f6;
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
}

.container {
    display: flex;
    width: 100%;
    height: 100%;
}

.side-panel {
    background-color: #2d3436;
    width: 200px;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
}

.side-panel nav {
    display: flex;
    flex-direction: column;
}

.tab-button {
    background-color: #485460;
    color: #f6f6f6;
    border: none;
    padding: 10px 15px;
    margin-bottom: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: left;
}

.tab-button:hover {
    background-color: #34495e;
}

.tab-button.active {
    background-color: #10ac84;
}

.main-content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.attack-controls {
    margin-bottom: 20px;
}

.attack-controls input[type="text"],
.attack-controls select {
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #485460;
    background-color: #303943;
    color: #f6f6f6;
}

.attack-controls button {
    background-color: #10ac84;
    color: #f6f6f6;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.attack-controls button:hover {
    background-color: #0e8a6e;
}

.statistics {
    display: flex;
    flex-direction: column;
}

.statistics div {
    margin-bottom: 5px;
    padding: 10px;
    background-color: #2d3436;
    border-radius: 5px;
}