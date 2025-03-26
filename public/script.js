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
    const geoIpButton = document.getElementById('geoIpButton');
    const geoIpUrlInput = document.getElementById('geoIpUrl');
    const customAttackButton = document.getElementById('customAttackButton');
    const customAttackCodeInput = document.getElementById('customAttackCode');
    const nukeButton = document.getElementById('nukeButton');
    const ipLookupButton = document.getElementById('ipLookupButton');
    const ipLookupInput = document.getElementById('ipLookupInput');
    const sqlInjectionButton = document.getElementById('sqlInjectionButton');
    const sqlInjectionUrlInput = document.getElementById('sqlInjectionUrl');
    const xssButton = document.getElementById('xssButton');
    const xssUrlInput = document.getElementById('xssUrl');
    const csrfButton = document.getElementById('csrfButton');
    const csrfUrlInput = document.getElementById('csrfUrl');
    const reverseShellButton = document.getElementById('reverseShellButton');
    const reverseShellUrlInput = document.getElementById('reverseShellUrl');
    const portScanButton = document.getElementById('portScanButton');
    const portScanUrlInput = document.getElementById('portScanUrl');
    const socialEngineeringButton = document.getElementById('socialEngineeringButton');
    const socialEngineeringTargetInput = document.getElementById('socialEngineeringTarget');
    const credentialStuffingButton = document.getElementById('credentialStuffingButton');
    const credentialStuffingUrlInput = document.getElementById('credentialStuffingUrl');
    const dataBreachSearchButton = document.getElementById('dataBreachSearchButton');
    const dataBreachSearchInput = document.getElementById('dataBreachSearchInput');
    const darkWebScanButton = document.getElementById('darkWebScanButton');
    const darkWebScanInput = document.getElementById('darkWebScanInput');
    const vulnerabilityScanButton = document.getElementById('vulnerabilityScanButton');
    const vulnerabilityScanUrlInput = document.getElementById('vulnerabilityScanUrl');

    let mbps = 0;
    let packetsSent = 0;
    let connectionStatus = 'Idle';
    let attackInterval;
    let startTime;
    let isSidePanelOpen = false;

    function showTab(tabId) {
        tabContents.forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(tabId).style.display = 'block';
        aboutUsContent.style.display = tabId === 'aboutUs' ? 'block' : 'none';
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
        logEntry.classList.add('log-entry');
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

    geoIpButton.addEventListener('click', async () => {
        const geoIpUrl = geoIpUrlInput.value;

        if (!geoIpUrl) {
            alert('Please enter a URL to get GeoIP information from.');
            return;
        }

        statusDiv.textContent = 'Getting GeoIP Info...';
        logMessage(`Getting GeoIP information for ${geoIpUrl}`);

        try {
            const response = await fetch('/api/geoip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ geoIpUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
                logMessage(JSON.stringify(data.geoIpInfo, null, 2));
            } else {
                statusDiv.textContent = `Error: ${data.error}`;
                logMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            logMessage(`An error occurred: ${error.message}`);
        }
    });

    customAttackButton.addEventListener('click', async () => {
        const targetUrl = targetUrlInput.value;
        const customAttackCode = customAttackCodeInput.value;

        if (!targetUrl || !customAttackCode) {
            alert('Please enter a target URL and custom attack code.');
            return;
        }

        statusDiv.textContent = 'Executing Custom Attack...';
        logMessage(`Executing custom attack on ${targetUrl}`);

        try {
            const response = await fetch('/api/customAttack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ targetUrl, customAttackCode }),
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

    nukeButton.addEventListener('click', async () => {
        const targetUrl = targetUrlInput.value;

        if (!targetUrl) {
            alert('Please enter a target URL to NUKE.');
            return;
        }

        statusDiv.textContent = 'NUKING...';
        logMessage(`NUKING ${targetUrl}`);

        try {
            const response = await fetch('/api/nuke', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ targetUrl }),
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

    ipLookupButton.addEventListener('click', async () => {
        const ipAddress = ipLookupInput.value;

        if (!ipAddress) {
            alert('Please enter an IP address to lookup.');
            return;
        }

        statusDiv.textContent = 'Looking up IP...';
        logMessage(`Looking up IP address: ${ipAddress}`);

        try {
            const response = await fetch('/api/ipLookup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ipAddress }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
                logMessage(JSON.stringify(data.ipInfo, null, 2));
            } else {
                statusDiv.textContent = `Error: ${data.error}`;
                logMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            logMessage(`An error occurred: ${error.message}`);
        }
    });

    sqlInjectionButton.addEventListener('click', async () => {
        const sqlInjectionUrl = sqlInjectionUrlInput.value;

        if (!sqlInjectionUrl) {
            alert('Please enter a URL to attempt SQL injection on.');
            return;
        }

        statusDiv.textContent = 'Attempting SQL Injection...';
        logMessage(`Attempting SQL injection on ${sqlInjectionUrl}`);

        try {
            const response = await fetch('/api/sqlInjection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sqlInjectionUrl }),
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

    xssButton.addEventListener('click', async () => {
        const xssUrl = xssUrlInput.value;

        if (!xssUrl) {
            alert('Please enter a URL to attempt XSS on.');
            return;
        }

        statusDiv.textContent = 'Attempting XSS...';
        logMessage(`Attempting XSS on ${xssUrl}`);

        try {
            const response = await fetch('/api/xss', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ xssUrl }),
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

    csrfButton.addEventListener('click', async () => {
        const csrfUrl = csrfUrlInput.value;

        if (!csrfUrl) {
            alert('Please enter a URL to attempt CSRF on.');
            return;
        }

        statusDiv.textContent = 'Attempting CSRF...';
        logMessage(`Attempting CSRF on ${csrfUrl}`);

        try {
            const response = await fetch('/api/csrf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ csrfUrl }),
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

    reverseShellButton.addEventListener('click', async () => {
        const reverseShellUrl = reverseShellUrlInput.value;

        if (!reverseShellUrl) {
            alert('Please enter a URL to attempt Reverse Shell on.');
            return;
        }

        statusDiv.textContent = 'Attempting Reverse Shell...';
        logMessage(`Attempting Reverse Shell on ${reverseShellUrl}`);

        try {
            const response = await fetch('/api/reverseShell', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reverseShellUrl }),
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

    portScanButton.addEventListener('click', async () => {
        const portScanUrl = portScanUrlInput.value;

        if (!portScanUrl) {
            alert('Please enter a URL to scan ports on.');
            return;
        }

        statusDiv.textContent = 'Scanning Ports...';
        logMessage(`Scanning ports on ${portScanUrl}`);

        try {
            const response = await fetch('/api/portScan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ portScanUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
                logMessage(JSON.stringify(data.openPorts, null, 2));
            } else {
                statusDiv.textContent = `Error: ${data.error}`;
                logMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            logMessage(`An error occurred: ${error.message}`);
        }
    });

    socialEngineeringButton.addEventListener('click', async () => {
        const target = socialEngineeringTargetInput.value;

        if (!target) {
            alert('Please enter a target for social engineering.');
            return;
        }

        statusDiv.textContent = 'Initiating Social Engineering...';
        logMessage(`Initiating social engineering attack on ${target}`);

        try {
            const response = await fetch('/api/socialEngineering', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ target }),
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

   credentialStuffingButton.addEventListener('click', async () => {
        const credentialStuffingUrl = credentialStuffingUrlInput.value;

        if (!credentialStuffingUrl) {
            alert('Please enter a URL to attempt credential stuffing on.');
            return;
        }

        statusDiv.textContent = 'Attempting Credential Stuffing...';
        logMessage(`Attempting credential stuffing on ${credentialStuffingUrl}`);

        try {
            const response = await fetch('/api/credentialStuffing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credentialStuffingUrl }),
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

    dataBreachSearchButton.addEventListener('click', async () => {
        const searchTerm = dataBreachSearchInput.value;

        if (!searchTerm) {
            alert('Please enter a search term to look for in data breaches.');
            return;
        }

        statusDiv.textContent = 'Searching Data Breaches...';
        logMessage(`Searching for ${searchTerm} in data breaches`);

        try {
            const response = await fetch('/api/dataBreachSearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
                logMessage(JSON.stringify(data.results, null, 2));
            } else {
                statusDiv.textContent = `Error: ${data.error}`;
                logMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            logMessage(`An error occurred: ${error.message}`);
        }
    });

    darkWebScanButton.addEventListener('click', async () => {
        const searchTerm = darkWebScanInput.value;

        if (!searchTerm) {
            alert('Please enter a search term to scan the dark web for.');
            return;
        }

        statusDiv.textContent = 'Scanning Dark Web...';
        logMessage(`Scanning the dark web for ${searchTerm}`);

        try {
            const response = await fetch('/api/darkWebScan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
                logMessage(JSON.stringify(data.results, null, 2));
            } else {
                statusDiv.textContent = `Error: ${data.error}`;
                logMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            logMessage(`An error occurred: ${error.message}`);
        }
    });

    vulnerabilityScanButton.addEventListener('click', async () => {
        const vulnerabilityScanUrl = vulnerabilityScanUrlInput.value;

        if (!vulnerabilityScanUrl) {
            alert('Please enter a URL to scan for vulnerabilities.');
            return;
        }

        statusDiv.textContent = 'Scanning for Vulnerabilities...';
        logMessage(`Scanning ${vulnerabilityScanUrl} for vulnerabilities`);

        try {
            const response = await fetch('/api/vulnerabilityScan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vulnerabilityScanUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.textContent = data.message;
                logMessage(data.message);
                logMessage(JSON.stringify(data.vulnerabilities, null, 2));
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
        isSidePanelOpen = !isSidePanelOpen;
        sidePanel.style.transform = isSidePanelOpen ? 'translateX(0)' : 'translateX(-100%)';
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

    menuButton.addEventListener('click', () => {
        sidePanel.classList.toggle('open');
        isSidePanelOpen = !isSidePanelOpen;
        sidePanel.style.transition = 'transform 0.3s ease-in-out';
        sidePanel.style.transform = isSidePanelOpen ? 'translateX(0)' : 'translateX(-100%)';
    });
});