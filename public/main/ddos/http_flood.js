/**
 *  This script is for security testing purposes only.
 *  Unauthorized use is strictly prohibited.
 *  Use responsibly and only with explicit permission.
 */

// ANSI escape codes for color
const RED = '\x1b[31m';
const BLACK = '\x1b[30m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m'; // Reset color
const BOLD = '\x1b[1m';

// Configuration
const SAFE_MODE = true; // Only allow testing against localhost or 127.0.0.1 by default
const MAX_DURATION = 30 * 1000; // 30 seconds
const MAX_REQUESTS = 500; // max number of requests to send
const REQUEST_INTERVAL = 1000; // Interval between requests in milliseconds


// Logging function with timestamp
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`${BOLD}${BLACK}${timestamp}: ${message}${RESET}`);
}

// Function to get user consent
async function getUserConsent() {
    return new Promise((resolve) => {
        const consent = confirm("I understand that this tool is for ethical security testing only, and I have permission to test the target.");
        resolve(consent);
    });
}

// Function to verify permissions
async function verifyPermissions(targetUrl) {
    if (SAFE_MODE && !['localhost', '127.0.0.1'].includes(new URL(targetUrl).hostname)) {
        log(`${RED}SAFE MODE ACTIVE: Testing is only allowed against localhost or 127.0.0.1.${RESET}`);
        return false;
    }

    log(`Verifying permissions for ${targetUrl}...`);
    // Implement actual permission check here (e.g., check against a whitelist)
    return true;
}


// HTTP Flood function
async function httpFlood(targetUrl, requestsPerSecond) {
    log(`${RED}Initiating HTTP Flood on ${targetUrl} with ${requestsPerSecond} requests/second.${RESET}`);

    if (!(await verifyPermissions(targetUrl))) {
        log(`${RED}Permissions Denied. Aborting.${RESET}`);
        return;
    }

    let requestCount = 0; // Track requests sent
    const startTime = Date.now(); // Record start time
    const endTime = startTime + MAX_DURATION; // when it will end


    try {
        const intervalId = setInterval(async () => {
            if (Date.now() >= endTime || requestCount >= MAX_REQUESTS) {
                clearInterval(intervalId);
                log(`${GREEN}HTTP Flood completed or stopped after ${requestCount} requests.${RESET}`);
                return;
            }

            for (let i = 0; i < requestsPerSecond; i++) {
                // Simulate sending an HTTP request
                fetch(targetUrl, { method: 'GET' })
                    .then(response => {
                        if (!response.ok) {
                            log(`${RED}Request failed with status: ${response.status}${RESET}`);
                        }
                        requestCount++;
                        log(`HTTP Request ${requestCount} sent to ${targetUrl}`);

                    })
                    .catch(error => {
                        log(`${RED}Error sending request: ${error}${RESET}`);
                    });
            }

            log(`${RED}HTTP Flood in progress... ${requestCount} requests sent.${RESET}`);

        }, REQUEST_INTERVAL); // Check every second

    } catch (error) {
        log(`${RED}Error during HTTP Flood: ${error}${RESET}`);
    }
}

// Main function
async function main() {
    log(`${RED}HTTP Flood Tool - Ethical Security Testing Edition${RESET}`);
    log(`${RED}Unauthorized use is strictly prohibited and illegal.${RESET}`);
    log(`${RED}Safe Mode is ${SAFE_MODE ? 'ENABLED' : 'DISABLED'}.${RESET}`);


    if (!(await getUserConsent())) {
        log(`${RED}User declined consent. Aborting.${RESET}`);
        return;
    }

    let targetUrl = prompt("Enter the target URL:");
    if (!targetUrl) {
        log(`${RED}No target URL provided. Aborting.${RESET}`);
        return;
    }

    // Validate URL format
    try {
        new URL(targetUrl); // Will throw an error if invalid
    } catch (e) {
        log(`${RED}Invalid URL format. Aborting.${RESET}`);
        return;
    }

     // Basic target verification - check if the server responds
     try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            log(`${RED}Target verification failed. Server returned status: ${response.status}.${RESET}`);
            return;
        }
        log(`${GREEN}Target verified. Server is alive and responding.${RESET}`);
    } catch (error) {
        log(`${RED}Target verification failed. Could not reach server. Error: ${error}${RESET}`);
        return;
    }


    const requestsPerSecond = parseInt(prompt("Enter the number of requests per second:"), 10);
    if (isNaN(requestsPerSecond) || requestsPerSecond <= 0) {
        log(`${RED}Invalid requests per second. Aborting.${RESET}`);
        return;
    }

    await httpFlood(targetUrl, requestsPerSecond);
}

// Start the script
main();