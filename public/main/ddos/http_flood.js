/**
 *  WARNING: This script is for SECURITY TESTING PURPOSES ONLY.
 *  Unauthorized use is ILLEGAL and HARMFUL.  Do not use this script
 *  without explicit permission from the target owner.
 *
 *  This script is provided WITHOUT WARRANTY of any kind. The user assumes
 *  all responsibility for any consequences arising from its use.
 */

// ANSI escape codes for color
const RED = '\x1b[31m';
const BLACK = '\x1b[30m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m'; // Reset color

// Configuration
const SAFE_MODE = true; // Set to true to only allow localhost/127.0.0.1 targets

// Logging function with timestamp
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`${BLACK}${timestamp}: ${message}${RESET}`);
}

// Function to get user consent
async function getUserConsent() {
    return new Promise((resolve) => {
        const consent = confirm(`${RED}WARNING! This tool is for security testing only. Do you have explicit permission to use it? Unauthorized use is illegal!${RESET}`);
        resolve(consent);
    });
}

// Function to verify permissions (Placeholder - Implement actual permission check)
async function verifyPermissions(targetUrl) {
    if (SAFE_MODE && !['localhost', '127.0.0.1'].includes(new URL(targetUrl).hostname)) {
        log(`${RED}SAFE MODE ACTIVE: Testing is only allowed against localhost or 127.0.0.1.${RESET}`);
        return false;
    }

    // In a real implementation, this would check for API keys,
    // authorization headers, or other mechanisms to ensure permission.
    log(`Verifying permissions for ${targetUrl}...`);

    // Use fetch to check for a permissions.txt file on the server
    try {
        const response = await fetch(targetUrl + '/permissions.txt', { method: 'HEAD' });
        if (response.status === 200) {
            log(`${GREEN}Permissions file found on server. Assuming permission granted.${RESET}`);
            return true;
        } else {
            log(`${RED}Permissions file not found. Permission denied.${RESET}`);
            return false;
        }
    } catch (error) {
        log(`${RED}Error checking permissions: ${error}. Permission denied.${RESET}`);
        return false;
    }
}


// HTTP Flood function (Simulated - Replace with actual HTTP flood logic)
async function httpFlood(targetUrl, requestsPerSecond) {
    log(`${RED}Initiating simulated HTTP Flood against ${targetUrl} with ${requestsPerSecond} requests/second.${RESET}`);

    if (!(await verifyPermissions(targetUrl))) {
        log(`${RED}Permissions Denied. Aborting HTTP Flood.${RESET}`);
        return;
    }

    let requestCount = 0; // Track requests sent
    const maxRequests = 50; // Limit total requests to prevent abuse
    const startTime = Date.now(); // Record start time
    const duration = 10 * 1000; // Stop after 10 seconds

    try {
        const intervalId = setInterval(async () => {
            if (Date.now() - startTime >= duration || requestCount >= maxRequests) {
                clearInterval(intervalId);
                log(`${GREEN}Simulated HTTP Flood completed or stopped after ${requestCount} requests.${RESET}`);
                return;
            }

            for (let i = 0; i < requestsPerSecond && requestCount < maxRequests; i++) {
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

            log(`${RED}Simulated HTTP Flood in progress... ${requestCount} requests sent.${RESET}`);

        }, 1000); // Check every second

    } catch (error) {
        log(`${RED}Error during simulated HTTP Flood: ${error}${RESET}`);
    }
}

// Main function
async function main() {
    log(`${RED}HTTP Flood Tool - SECURITY TESTING ONLY${RESET}`);
    log(`${RED}Unauthorized use is strictly prohibited!${RESET}`);
    log(`${RED}Safe Mode is ${SAFE_MODE ? 'ENABLED' : 'DISABLED'}. Only localhost targets allowed when enabled.${RESET}`);


    if (!(await getUserConsent())) {
        log(`${RED}User declined consent. Exiting.${RESET}`);
        return;
    }

    let targetUrl = prompt("Enter the target URL (SECURITY TESTING ONLY):");
    if (!targetUrl) {
        log(`${RED}No target URL provided. Exiting.${RESET}`);
        return;
    }

    // Validate URL format
    try {
        new URL(targetUrl); // Will throw an error if invalid
    } catch (e) {
        log(`${RED}Invalid URL format. Exiting.${RESET}`);
        return;
    }

    const requestsPerSecond = parseInt(prompt("Enter the number of requests per second (SECURITY TESTING ONLY):"), 10);
    if (isNaN(requestsPerSecond) || requestsPerSecond <= 0) {
        log(`${RED}Invalid requests per second. Exiting.${RESET}`);
        return;
    }

    await httpFlood(targetUrl, requestsPerSecond);
}

// Start the script
main();