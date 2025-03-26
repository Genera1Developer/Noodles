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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

        const response = await fetch(url, {
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
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

function getRandomUserAgent() {
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Trident/7.0; rv:11.0) like Gecko',
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0',
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
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
const nukeUrlInput = document.getElementById('nukeUrl');

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

const ddosPanel = document.getElementById('ddos'); // Select DDoS panel
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
    setStatus('Attacking...💥');
    logMessage(`Initiating ${attackType} attack on ${targetUrl} 💀`);
    startTime = Date.now();

    const isReachable = await testConnection(targetUrl);
    if (!isReachable) {
        logMessage(`Target ${targetUrl} is unreachable. Attack aborted. ⚠`);
        setStatus('Target Unreachable ⚠');
        connectionStatus = 'Idle';
        updateStatsDisplay();
        return;
    }

    let attackModule;
    switch (attackType) {
        case 'httpFlood':
            attackModule = 'httpFlood';
            break;
        case 'tcpFlood':
            attackModule = 'tcpFlood';
            break;
        case 'udpFlood':
            attackModule = 'udpFlood';
            break;
        default:
            logMessage(`Invalid attack type: ${attackType} 💣`);
            setStatus('Invalid Attack Type 💣');
            connectionStatus = 'Idle';
            updateStatsDisplay();
            return;
    }


    attackInterval = setInterval(async () => {
        try {
            const response = await fetch(`/api/ddos/${attackModule}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': getRandomUserAgent(),
                    'X-Noodles-Attack': 'true'
                },
                body: JSON.stringify({ targetUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                mbps += data.mbps;
                packetsSent += data.packetsSent;
                updateStatsDisplay();
                logMessage(data.message);
            } else {
                logMessage(`Attack failed: ${data.error} 🔥`);
                resetAttackState();
                setStatus('Attack Failed 🔥');
            }
        } catch (error) {
            logMessage(`An error occurred during the attack: ${error.message} 💥`);
            resetAttackState();
            setStatus('Attack Error 💥');
        }
    }, 200);
}

attackButton.addEventListener('click', async () => {
    const targetUrl = targetUrlInput.value;
    const attackType = attackTypeSelect.value;

    if (!targetUrl) {
        alert('Please enter a target URL. 💻');
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
        alert('Please enter a deface URL and code. 💻');
        return;
    }

    const successMessage = `Successfully defaced ${defaceUrl} 💀`;
    const errorMessage = `Failed to deface ${defaceUrl}`;

    const response = await genericApiCall('deface', { defaceUrl, defaceCode }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful deface, if needed
    }
});

connectButton.addEventListener('click', async () => {
    const connectUrl = connectUrlInput.value;

    if (!connectUrl) {
        alert('Please enter a URL to connect to. 💻');
        return;
    }

    const successMessage = `Successfully connected to ${connectUrl} 💻`;
    const errorMessage = `Failed to connect to ${connectUrl}`;

    const response = await genericApiCall('connect', { connectUrl }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful connect, if needed
    }
});

ransomwareButton.addEventListener('click', async () => {
    const ransomwareUrl = ransomwareUrlInput.value;

    if (!ransomwareUrl) {
        alert("Please enter a URL to send ransomware to. 💻");
        return;
    }

    const successMessage = `Successfully sent ransomware to ${ransomwareUrl} 💀`;
    const errorMessage = `Failed to send ransomware to ${ransomwareUrl}`;

    const response = await genericApiCall('ransomware', { ransomwareUrl }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful ransomware send, if needed
    }
});

geoIpButton.addEventListener('click', async () => {
    const geoIpUrl = geoIpUrlInput.value;

    if (!geoIpUrl) {
        alert('Please enter a URL to get GeoIP information from. 💻');
        return;
    }

    try {
        const response = await fetch('/api/geoip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noodles-GeoIP': 'true'
            },
            body: JSON.stringify({ geoIpUrl }),
        });

        const responseData = await response.json();

        if (response.ok) {
            setStatus(`Successfully retrieved GeoIP information for ${geoIpUrl} 🌍`);
            logMessage(`Successfully retrieved GeoIP information for ${geoIpUrl} 🌍`);
            logMessage(JSON.stringify(responseData.geoIpInfo, null, 2));
        } else {
            setStatus(`Failed to retrieve GeoIP information for ${geoIpUrl}: ${responseData.error} 🔥`);
            logMessage(`Failed to retrieve GeoIP information for ${geoIpUrl}: ${responseData.error} 🔥`);
        }
    } catch (error) {
        setStatus(`An error occurred: ${error.message} 💥`);
        logMessage(`An error occurred: ${error.message} 💥`);
        console.error("GeoIP API call error:", error);
    }
});

customAttackButton.addEventListener('click', async () => {
    const targetUrl = targetUrlInput.value;
    const customAttackCode = customAttackCodeInput.value;

    if (!targetUrl || !customAttackCode) {
        alert('Please enter a target URL and custom attack code. 💻');
        return;
    }

    const successMessage = `Successfully executed custom attack on ${targetUrl} 💥`;
    const errorMessage = `Failed to execute custom attack on ${targetUrl}`;

    const response = await genericApiCall('customAttack', { targetUrl, customAttackCode }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful custom attack, if needed
    }
});

nukeButton.addEventListener('click', async () => {
    const targetUrl = nukeUrlInput.value;

    if (!targetUrl) {
        alert('Please enter a target URL to NUKE. 💻');
        return;
    }

    const successMessage = `Successfully NUKED ${targetUrl} 💀`;
    const errorMessage = `Failed to NUKE ${targetUrl}`;

    const response = await genericApiCall('nuke', { targetUrl }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful nuke, if needed
    }
});

ipLookupButton.addEventListener('click', async () => {
    const ipAddress = ipLookupInput.value;

    if (!ipAddress) {
        alert('Please enter an IP address to lookup. 💻');
        return;
    }

    try {
        const response = await fetch('/api/ipLookup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noodles-IPLookup': 'true'
            },
            body: JSON.stringify({ ipAddress }),
        });

        const responseData = await response.json();

        if (response.ok) {
            setStatus(`Successfully looked up IP address: ${ipAddress} 🌍`);
            logMessage(`Successfully looked up IP address: ${ipAddress} 🌍`);
            logMessage(JSON.stringify(responseData.ipInfo, null, 2));
        } else {
            setStatus(`Failed to lookup IP address: ${ipAddress}: ${responseData.error} 🔥`);
            logMessage(`Failed to lookup IP address: ${ipAddress}: ${responseData.error} 🔥`);
        }
    } catch (error) {
        setStatus(`An error occurred: ${error.message} 💥`);
        logMessage(`An error occurred: ${error.message} 💥`);
        console.error("IP Lookup API call error:", error);
    }
});

sqlInjectionButton.addEventListener('click', async () => {
    const sqlInjectionUrl = sqlInjectionUrlInput.value;

    if (!sqlInjectionUrl) {
        alert('Please enter a URL to attempt SQL injection on. 💻');
        return;
    }

    const successMessage = `Successfully attempted SQL injection on ${sqlInjectionUrl} 💥`;
    const errorMessage = `Failed to attempt SQL injection on ${sqlInjectionUrl}`;

    const response = await genericApiCall('sqlInjection', { sqlInjectionUrl }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful SQL injection attempt, if needed
    }
});

xssButton.addEventListener('click', async () => {
    const xssUrl = xssUrlInput.value;

    if (!xssUrl) {
        alert('Please enter a URL to attempt XSS on. 💻');
        return;
    }

    const successMessage = `Successfully attempted XSS on ${xssUrl} 💥`;
    const errorMessage = `Failed to attempt XSS on ${xssUrl}`;

    const response = await genericApiCall('xss', { xssUrl }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful XSS attempt, if needed
    }
});

csrfButton.addEventListener('click', async () => {
    const csrfUrl = csrfUrlInput.value;

    if (!csrfUrl) {
        alert('Please enter a URL to attempt CSRF on. 💻');
        return;
    }

    const successMessage = `Successfully attempted CSRF on ${csrfUrl} 💥`;
    const errorMessage = `Failed to attempt CSRF on ${csrfUrl}`;

    const response = await genericApiCall('csrf', { csrfUrl }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful CSRF attempt, if needed
    }
});

reverseShellButton.addEventListener('click', async () => {
    const reverseShellUrl = reverseShellUrlInput.value;

    if (!reverseShellUrl) {
        alert('Please enter a URL to attempt Reverse Shell on. 💻');
        return;
    }

    const successMessage = `Successfully attempted Reverse Shell on ${reverseShellUrl} 💥`;
    const errorMessage = `Failed to attempt Reverse Shell on ${reverseShellUrl}`;

    const response = await genericApiCall('reverseShell', { reverseShellUrl }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful reverse shell attempt, if needed
    }
});

portScanButton.addEventListener('click', async () => {
    const portScanUrl = portScanUrlInput.value;

    if (!portScanUrl) {
        alert('Please enter a URL to scan ports on. 💻');
        return;
    }

    try {
        const response = await fetch('/api/portScan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noodles-PortScan': 'true'
            },
            body: JSON.stringify({ portScanUrl }),
        });

        const responseData = await response.json();

        if (response.ok) {
            setStatus(`Successfully scanned ports on ${portScanUrl} 💥`);
            logMessage(`Successfully scanned ports on ${portScanUrl} 💥`);
            logMessage(JSON.stringify(responseData.openPorts, null, 2));
        } else {
            setStatus(`Failed to scan ports on ${portScanUrl}: ${responseData.error} 🔥`);
            logMessage(`Failed to scan ports on ${portScanUrl}: ${responseData.error} 🔥`);
        }
    } catch (error) {
        setStatus(`An error occurred: ${error.message} 💥`);
        logMessage(`An error occurred: ${error.message} 💥`);
        console.error("Port Scan API call error:", error);
    }
});

socialEngineeringButton.addEventListener('click', async () => {
    const target = socialEngineeringTargetInput.value;

    if (!target) {
        alert('Please enter a target for social engineering. 💻');
        return;
    }

    const successMessage = `Successfully initiated social engineering attack on ${target} 😈`;
    const errorMessage = `Failed to initiate social engineering attack on ${target}`;

    const response = await genericApiCall('socialEngineering', { target }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful social engineering attempt, if needed
    }
});

credentialStuffingButton.addEventListener('click', async () => {
    const credentialStuffingUrl = credentialStuffingUrlInput.value;

    if (!credentialStuffingUrl) {
        alert('Please enter a URL to attempt credential stuffing on. 💻');
        return;
    }

    const successMessage = `Successfully attempted credential stuffing on ${credentialStuffingUrl} 💥`;
    const errorMessage = `Failed to attempt credential stuffing on ${credentialStuffingUrl}`;

    const response = await genericApiCall('credentialStuffing', { credentialStuffingUrl }, successMessage, errorMessage);

    if (response) {
        // Handle specific logic after a successful credential stuffing attempt, if needed
    }
});

dataBreachSearchButton.addEventListener('click', async () => {
    const searchTerm = dataBreachSearchInput.value;

    if (!searchTerm) {
        alert('Please enter a search term to look for in data breaches. 💻');
        return;
    }

    try {
        const response = await fetch('/api/dataBreachSearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noodles-DataBreach': 'true'
            },
            body: JSON.stringify({ searchTerm }),
        });

        const responseData = await response.json();

        if (response.ok) {
            setStatus(`Successfully searched for ${searchTerm} in data breaches 💥`);
            logMessage(`Successfully searched for ${searchTerm} in data breaches 💥`);
            logMessage(JSON.stringify(responseData.results, null, 2));
        } else {
            setStatus(`Failed to search for ${searchTerm} in data breaches: ${responseData.error} 🔥`);
            logMessage(`Failed to search for ${searchTerm} in data breaches: ${responseData.error} 🔥`);
        }
    } catch (error) {
        setStatus(`An error occurred: ${error.message} 💥`);
        logMessage(`An error occurred: ${error.message} 💥`);
        console.error("Data Breach Search API call error:", error);
    }
});

darkWebScanButton.addEventListener('click', async () => {
    const searchTerm = darkWebScanInput.value;

    if (!searchTerm) {
        alert('Please enter a search term to scan the dark web for. 💻');
        return;
    }

    try {
        const response = await fetch('/api/darkWebScan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noodles-DarkWeb': 'true'
            },
            body: JSON.stringify({ searchTerm }),
        });

        const responseData = await response.json();

        if (response.ok) {
            setStatus(`Successfully scanned the dark web for ${searchTerm} 💀`);
            logMessage(`Successfully scanned the dark web for ${searchTerm} 💀`);
            logMessage(JSON.stringify(responseData.results, null, 2));
        } else {
            setStatus(`Failed to scan the dark web for ${searchTerm}: ${responseData.error} 🔥`);
            logMessage(`Failed to scan the dark web for ${searchTerm}: ${responseData.error} 🔥`);
        }
    } catch (error) {
        setStatus(`An error occurred: ${error.message} 💥`);
        logMessage(`An error occurred: ${error.message} 💥`);
        console.error("Dark Web Scan API call error:", error);
    }
});

vulnerabilityScanButton.addEventListener('click', async () => {
    const vulnerabilityScanUrl = vulnerabilityScanUrlInput.value;

    if (!vulnerabilityScanUrl) {
        alert('Please enter a URL to scan for vulnerabilities. 💻');
        return;
    }

    try {
        const response = await fetch('/api/vulnerabilityScan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noodles-VulnScan': 'true'
            },
            body: JSON.stringify({ vulnerabilityScanUrl }),
        });

        const responseData = await response.json();

        if (response.ok) {
            setStatus(`Successfully scanned ${vulnerabilityScanUrl} for vulnerabilities 💥`);
            logMessage(`Successfully scanned ${vulnerabilityScanUrl} for vulnerabilities 💥`);
            logMessage(JSON.stringify(responseData.vulnerabilities, null, 2));
        } else {
            setStatus(`Failed to scan ${vulnerabilityScanUrl} for vulnerabilities: ${responseData.error} 🔥`);
            logMessage(`Failed to scan ${vulnerabilityScanUrl} for vulnerabilities: ${responseData.error} 🔥`);
        }
    } catch (error) {
        setStatus(`An error occurred: ${error.message} 💥`);
        logMessage(`An error occurred: ${error.message} 💥`);
        console.error("Vulnerability Scan API call error:", error);
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
    logMessage('Attack stopped. 💻');
});

aboutUsButton.addEventListener('click', () => {
    showTab('aboutUs');
});
// --- End UI Interactions ---

updateStatsDisplay(); // Initial stats display