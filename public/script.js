document.addEventListener('DOMContentLoaded', () => {
    // --- Utility Functions ---
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
            console.error("Connection test error:", error);
            return false;
        }
    }

    function clearStats() {
        mbps = 0;
        packetsSent = 0;
    }

    function setStatus(message) {
        statusDiv.textContent = message;
    }

    function resetAttackState() {
        clearInterval(attackInterval);
        clearStats();
        connectionStatus = 'Idle';
        setStatus('Idle');
        updateStatsDisplay();
    }

    async function genericApiCall(endpoint, data, successMessage, errorMessage) {
        try {
            const response = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                setStatus(successMessage);
                logMessage(successMessage);
                if (responseData.message) {
                    logMessage(responseData.message);
                }
                return responseData;

            } else {
                setStatus(errorMessage || `Error: ${responseData.error}`);
                logMessage(errorMessage || `Error: ${responseData.error}`);
                return null;
            }
        } catch (error) {
            setStatus(`An error occurred: ${error.message}`);
            logMessage(`An error occurred: ${error.message}`);
            console.error("API call error:", error);
            return null;
        }
    }
    // --- End Utility Functions ---

    // --- Element Selectors ---
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
    // --- End Element Selectors ---

    // --- Attack State Variables ---
    let mbps = 0;
    let packetsSent = 0;
    let connectionStatus = 'Idle';
    let attackInterval;
    let startTime;
    let isSidePanelOpen = false;
    // --- End Attack State Variables ---

    // --- Tab Management ---
    function showTab(tabId) {
        tabContents.forEach(content => content.style.display = 'none');
        document.getElementById(tabId).style.display = 'block';
        aboutUsContent.style.display = tabId === 'aboutUs' ? 'block' : 'none';
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            const tabId = event.target.dataset.tab;
            showTab(tabId);
        });
    });

    showTab('ddos'); // Default tab
    // --- End Tab Management ---

    // --- Attack Functions ---
    async function initiateAttack(targetUrl, attackType) {
        connectionStatus = 'Attacking';
        setStatus('Attacking...');
        logMessage(`Initiating ${attackType} attack on ${targetUrl}`);
        startTime = Date.now();

        const isReachable = await testConnection(targetUrl);
        if (!isReachable) {
            logMessage(`Target ${targetUrl} is unreachable. Attack aborted.`);
            setStatus('Target Unreachable');
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
                    resetAttackState();
                    setStatus('Attack Failed');
                }
            } catch (error) {
                logMessage(`An error occurred during the attack: ${error.message}`);
                resetAttackState();
                setStatus('Attack Error');
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

        resetAttackState();
        initiateAttack(targetUrl, attackType);
    });
    // --- End Attack Functions ---

    // --- Feature Implementations ---
    defaceButton.addEventListener('click', async () => {
        const defaceUrl = defaceUrlInput.value;
        const defaceCode = defaceCodeInput.value;

        if (!defaceUrl || !defaceCode) {
            alert('Please enter a deface URL and code.');
            return;
        }

        const result = await genericApiCall(
            'deface',
            { defaceUrl, defaceCode },
            `Successfully defaced ${defaceUrl}`,
            `Failed to deface ${defaceUrl}`
        );

        if(result) {
           //handle additional data returned from API if necessary
        }
    });

    connectButton.addEventListener('click', async () => {
        const connectUrl = connectUrlInput.value;

        if (!connectUrl) {
            alert('Please enter a URL to connect to.');
            return;
        }

        const result = await genericApiCall(
            'connect',
            { connectUrl },
            `Successfully connected to ${connectUrl}`,
            `Failed to connect to ${connectUrl}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    ransomwareButton.addEventListener('click', async () => {
        const ransomwareUrl = ransomwareUrlInput.value;

        if (!ransomwareUrl) {
            alert("Please enter a URL to send ransomware to.");
            return;
        }

        const result = await genericApiCall(
            'ransomware',
            { ransomwareUrl },
            `Successfully sent ransomware to ${ransomwareUrl}`,
            `Failed to send ransomware to ${ransomwareUrl}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    geoIpButton.addEventListener('click', async () => {
        const geoIpUrl = geoIpUrlInput.value;

        if (!geoIpUrl) {
            alert('Please enter a URL to get GeoIP information from.');
            return;
        }

        const result = await genericApiCall(
            'geoip',
            { geoIpUrl },
            `Successfully retrieved GeoIP information for ${geoIpUrl}`,
            `Failed to retrieve GeoIP information for ${geoIpUrl}`
        );

        if (result && result.geoIpInfo) {
            logMessage(JSON.stringify(result.geoIpInfo, null, 2));
        }
    });

    customAttackButton.addEventListener('click', async () => {
        const targetUrl = targetUrlInput.value;
        const customAttackCode = customAttackCodeInput.value;

        if (!targetUrl || !customAttackCode) {
            alert('Please enter a target URL and custom attack code.');
            return;
        }

        const result = await genericApiCall(
            'customAttack',
            { targetUrl, customAttackCode },
            `Successfully executed custom attack on ${targetUrl}`,
            `Failed to execute custom attack on ${targetUrl}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    nukeButton.addEventListener('click', async () => {
        const targetUrl = targetUrlInput.value;

        if (!targetUrl) {
            alert('Please enter a target URL to NUKE.');
            return;
        }

        const result = await genericApiCall(
            'nuke',
            { targetUrl },
            `Successfully NUKED ${targetUrl}`,
            `Failed to NUKE ${targetUrl}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    ipLookupButton.addEventListener('click', async () => {
        const ipAddress = ipLookupInput.value;

        if (!ipAddress) {
            alert('Please enter an IP address to lookup.');
            return;
        }

        const result = await genericApiCall(
            'ipLookup',
            { ipAddress },
            `Successfully looked up IP address: ${ipAddress}`,
            `Failed to lookup IP address: ${ipAddress}`
        );

        if (result && result.ipInfo) {
            logMessage(JSON.stringify(result.ipInfo, null, 2));
        }
    });

    sqlInjectionButton.addEventListener('click', async () => {
        const sqlInjectionUrl = sqlInjectionUrlInput.value;

        if (!sqlInjectionUrl) {
            alert('Please enter a URL to attempt SQL injection on.');
            return;
        }

        const result = await genericApiCall(
            'sqlInjection',
            { sqlInjectionUrl },
            `Successfully attempted SQL injection on ${sqlInjectionUrl}`,
            `Failed to attempt SQL injection on ${sqlInjectionUrl}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    xssButton.addEventListener('click', async () => {
        const xssUrl = xssUrlInput.value;

        if (!xssUrl) {
            alert('Please enter a URL to attempt XSS on.');
            return;
        }

        const result = await genericApiCall(
            'xss',
            { xssUrl },
            `Successfully attempted XSS on ${xssUrl}`,
            `Failed to attempt XSS on ${xssUrl}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    csrfButton.addEventListener('click', async () => {
        const csrfUrl = csrfUrlInput.value;

        if (!csrfUrl) {
            alert('Please enter a URL to attempt CSRF on.');
            return;
        }

        const result = await genericApiCall(
            'csrf',
            { csrfUrl },
            `Successfully attempted CSRF on ${csrfUrl}`,
            `Failed to attempt CSRF on ${csrfUrl}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    reverseShellButton.addEventListener('click', async () => {
        const reverseShellUrl = reverseShellUrlInput.value;

        if (!reverseShellUrl) {
            alert('Please enter a URL to attempt Reverse Shell on.');
            return;
        }

        const result = await genericApiCall(
            'reverseShell',
            { reverseShellUrl },
            `Successfully attempted Reverse Shell on ${reverseShellUrl}`,
            `Failed to attempt Reverse Shell on ${reverseShellUrl}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    portScanButton.addEventListener('click', async () => {
        const portScanUrl = portScanUrlInput.value;

        if (!portScanUrl) {
            alert('Please enter a URL to scan ports on.');
            return;
        }

        const result = await genericApiCall(
            'portScan',
            { portScanUrl },
            `Successfully scanned ports on ${portScanUrl}`,
            `Failed to scan ports on ${portScanUrl}`
        );

        if (result && result.openPorts) {
            logMessage(JSON.stringify(result.openPorts, null, 2));
        }
    });

    socialEngineeringButton.addEventListener('click', async () => {
        const target = socialEngineeringTargetInput.value;

        if (!target) {
            alert('Please enter a target for social engineering.');
            return;
        }

        const result = await genericApiCall(
            'socialEngineering',
            { target },
            `Successfully initiated social engineering attack on ${target}`,
            `Failed to initiate social engineering attack on ${target}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    credentialStuffingButton.addEventListener('click', async () => {
        const credentialStuffingUrl = credentialStuffingUrlInput.value;

        if (!credentialStuffingUrl) {
            alert('Please enter a URL to attempt credential stuffing on.');
            return;
        }

        const result = await genericApiCall(
            'credentialStuffing',
            { credentialStuffingUrl },
            `Successfully attempted credential stuffing on ${credentialStuffingUrl}`,
            `Failed to attempt credential stuffing on ${credentialStuffingUrl}`
        );
        if(result) {
            //handle additional data returned from API if necessary
         }
    });

    dataBreachSearchButton.addEventListener('click', async () => {
        const searchTerm = dataBreachSearchInput.value;

        if (!searchTerm) {
            alert('Please enter a search term to look for in data breaches.');
            return;
        }

        const result = await genericApiCall(
            'dataBreachSearch',
            { searchTerm },
            `Successfully searched for ${searchTerm} in data breaches`,
            `Failed to search for ${searchTerm} in data breaches`
        );

        if (result && result.results) {
            logMessage(JSON.stringify(result.results, null, 2));
        }
    });

    darkWebScanButton.addEventListener('click', async () => {
        const searchTerm = darkWebScanInput.value;

        if (!searchTerm) {
            alert('Please enter a search term to scan the dark web for.');
            return;
        }

        const result = await genericApiCall(
            'darkWebScan',
            { searchTerm },
            `Successfully scanned the dark web for ${searchTerm}`,
            `Failed to scan the dark web for ${searchTerm}`
        );

        if (result && result.results) {
            logMessage(JSON.stringify(result.results, null, 2));
        }
    });

    vulnerabilityScanButton.addEventListener('click', async () => {
        const vulnerabilityScanUrl = vulnerabilityScanUrlInput.value;

        if (!vulnerabilityScanUrl) {
            alert('Please enter a URL to scan for vulnerabilities.');
            return;
        }

        const result = await genericApiCall(
            'vulnerabilityScan',
            { vulnerabilityScanUrl },
            `Successfully scanned ${vulnerabilityScanUrl} for vulnerabilities`,
            `Failed to scan ${vulnerabilityScanUrl} for vulnerabilities`
        );

        if (result && result.vulnerabilities) {
            logMessage(JSON.stringify(result.vulnerabilities, null, 2));
        }
    });
    // --- End Feature Implementations ---

    // --- UI Interactions ---
    menuButton.addEventListener('click', () => {
        sidePanel.classList.toggle('open');
        isSidePanelOpen = !isSidePanelOpen;
        sidePanel.style.transition = 'transform 0.3s ease-in-out';
        sidePanel.style.transform = isSidePanelOpen ? 'translateX(0)' : 'translateX(-100%)';
    });

    resetButton.addEventListener('click', () => {
        resetAttackState();
        logMessage('Attack stopped.');
    });

    aboutUsButton.addEventListener('click', () => {
        showTab('aboutUs');
    });
    // --- End UI Interactions ---

    // --- Side Panel Dragging --- (Consider removing this functionality for security reasons)
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
    // --- End Side Panel Dragging ---

    updateStatsDisplay(); // Initial stats display
});