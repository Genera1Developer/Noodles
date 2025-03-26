document.addEventListener('DOMContentLoaded', () => {
    const attackButton = document.getElementById('attackButton');
    const targetUrlInput = document.getElementById('targetUrl');
    const attackTypeSelect = document.getElementById('attackType');
    const statusDiv = document.getElementById('status');
    const logsDiv = document.getElementById('logs');
    const statsDiv = document.getElementById('stats');
    const defaceButton = document.getElementById('defaceButton');
    const defaceUrlInput = document.getElementById('defaceUrl');
    const defaceCodeInput = document.getElementById('defaceCode');
    const connectButton = document.getElementById('connectButton');
    const connectUrlInput = document.getElementById('connectUrl');
    const ransomwareButton = document.getElementById('ransomwareButton');
    const ransomwareUrlInput = document.getElementById('ransomwareUrl');
    const sidePanel = document.querySelector('.side-panel');
    const menuButton = document.getElementById('menuButton');
    const tabs = document.querySelectorAll('.side-panel-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const resetButton = document.getElementById('resetButton');
    const aboutUsButton = document.getElementById('aboutUsButton');
    const aboutUsContent = document.getElementById('aboutUs');

    let mbps = 0;
    let packetsSent = 0;
    let connectionStatus = 'Idle';
    let attackInterval;
    let startTime;

    function showTab(tabId) {
        tabContents.forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(tabId).style.display = 'block';
        if (tabId === 'aboutUs') {
            aboutUsContent.style.display = 'block';
        } else {
            aboutUsContent.style.display = 'none';
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            const tabId = event.target.dataset.tab;
            showTab(tabId);
        });
    });

    showTab('ddos');

    function logMessage(message) {
        const logEntry = document.createElement('div');
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logsDiv.appendChild(logEntry);
        logsDiv.scrollTop = logsDiv.scrollHeight;
    }

    function updateStatsDisplay() {
        const elapsedTime = startTime ? (Date.now() - startTime) / 1000 : 0;
        statsDiv.innerHTML = `
            <p>MBPS: ${mbps.toFixed(2)}</p>
            <p>Packets Sent: ${packetsSent}</p>
            <p>Connection Status: ${connectionStatus}</p>
            <p>Time Elapsed: ${elapsedTime.toFixed(2)} seconds</p>
        `;
    }

    async function testConnection(url) {
        try {
            const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
            return response.status >= 200 && response.status < 400;
        } catch (error) {
            return false;
        }
    }

    async function initiateAttack(targetUrl, attackType) {
        connectionStatus = 'Attacking';
        statusDiv.textContent = 'Attacking...';
        logMessage(`Initiating ${attackType} attack on ${targetUrl}`);
        startTime = Date.now();

        const isReachable = await testConnection(targetUrl);
        if (!isReachable) {
            logMessage(`Target ${targetUrl} is unreachable. Attack aborted.`);
            statusDiv.textContent = 'Target Unreachable';
            connectionStatus = 'Idle';
            updateStatsDisplay();
            return;
        }

        attackInterval = setInterval(async () => {
            try {
                const response = await fetch('/api/attack', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ targetUrl, attackType }),
                });

                const data = await response.json();

                if (response.ok) {
                    mbps += data.mbps;
                    packetsSent += data.packetsSent;
                    updateStatsDisplay();
                    logMessage(data.message);
                } else {
                    logMessage(`Attack failed: ${data.error}`);
                    clearInterval(attackInterval);
                    connectionStatus = 'Idle';
                    statusDiv.textContent = 'Attack Failed';
                    updateStatsDisplay();
                }
            } catch (error) {
                logMessage(`An error occurred during the attack: ${error.message}`);
                clearInterval(attackInterval);
                connectionStatus = 'Idle';
                statusDiv.textContent = 'Attack Error';
                updateStatsDisplay();
            }
        }, 200);
    }

    attackButton.addEventListener('click', async () => {
        const targetUrl = targetUrlInput.value;
        const attackType = attackTypeSelect.value;

        if (!targetUrl) {
            alert('Please enter a target URL.');
            return;
        }

        clearInterval(attackInterval);
        mbps = 0;
        packetsSent = 0;
        updateStatsDisplay();

        initiateAttack(targetUrl, attackType);
    });

    defaceButton.addEventListener('click', async () => {
        const defaceUrl = defaceUrlInput.value;
        const defaceCode = defaceCodeInput.value;

        if (!defaceUrl || !defaceCode) {
            alert('Please enter a deface URL and code.');
            return;
        }

        statusDiv.textContent = 'Defacing...';
        logMessage(`Attempting to deface ${defaceUrl}`);

        try {
            const response = await fetch('/api/deface', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ defaceUrl, defaceCode }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
            } else {
                statusDiv.textContent = `Error: ${data.error}`;
                logMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            logMessage(`An error occurred: ${error.message}`);
        }
    });

    connectButton.addEventListener('click', async () => {
        const connectUrl = connectUrlInput.value;

        if (!connectUrl) {
            alert('Please enter a URL to connect to.');
            return;
        }

        statusDiv.textContent = 'Connecting...';
        logMessage(`Attempting to connect to ${connectUrl}`);

        try {
            const response = await fetch('/api/connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ connectUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
            } else {
                statusDiv.textContent = `Error: ${data.error}`;
                logMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            logMessage(`An error occurred: ${error.message}`);
        }
    });

    ransomwareButton.addEventListener('click', async () => {
        const ransomwareUrl = ransomwareUrlInput.value;

        if (!ransomwareUrl) {
            alert("Please enter a URL to send ransomware to.");
            return;
        }

        statusDiv.textContent = "Sending Ransomware...";
        logMessage(`Attempting to send ransomware to ${ransomwareUrl}`);

        try {
            const response = await fetch('/api/ransomware', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ransomwareUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
            } else {
                statusDiv.textContent = `Error: ${data.error}`;
                logMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            logMessage(`An error occurred: ${error.message}`);
        }
    });

    menuButton.addEventListener('click', () => {
        sidePanel.classList.toggle('open');
    });

    resetButton.addEventListener('click', () => {
        clearInterval(attackInterval);
        mbps = 0;
        packetsSent = 0;
        connectionStatus = 'Idle';
        statusDiv.textContent = 'Idle';
        logMessage('Attack stopped.');
        updateStatsDisplay();
    });

    updateStatsDisplay();

    // Drag and Drop Functionality
    let isDragging = false;
    let initialX, initialY;

    sidePanel.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialX = e.clientX - sidePanel.offsetLeft;
        initialY = e.clientY - sidePanel.offsetTop;
        sidePanel.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        sidePanel.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const newX = e.clientX - initialX;
        const newY = e.clientY - initialY;

        sidePanel.style.left = newX + 'px';
        sidePanel.style.top = newY + 'px';
    });

    aboutUsButton.addEventListener('click', () => {
        showTab('aboutUs');
    });

    // Add Animation to Side Panel Toggle
    menuButton.addEventListener('click', () => {
        sidePanel.classList.toggle('open');
        if (sidePanel.classList.contains('open')) {
            sidePanel.style.transition = 'transform 0.3s ease-in-out';
            sidePanel.style.transform = 'translateX(0)';
        } else {
            sidePanel.style.transition = 'transform 0.3s ease-in-out';
            sidePanel.style.transform = 'translateX(-100%)';
        }
    });
});