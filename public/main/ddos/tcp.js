/**
 * SECURITY TESTING TOOL - TCP FLOOD
 *
 *  !!! WARNING: This tool is for AUTHORIZED SECURITY TESTING ONLY. !!!
 *
 *  Unauthorized use is illegal and unethical.  By using this tool, you
 *  explicitly agree to the following:
 *
 *  1. You have obtained explicit, written permission from the target
 *     system's owner to perform a security test.
 *  2. You will use this tool responsibly and ethically.
 *  3. You understand that any misuse of this tool is your sole responsibility.
 *  4.  This tool is provided "as is" with no warranty, express or implied.
 *
 *  I (The Developer) am not responsible for any damage or legal repercussions
 *  caused by your use or misuse of this tool.
 */

// --- RED AND BLACK COLOR SCHEME FOR CONSOLE OUTPUT ---
const RED = '\x1b[31m';
const BLACK = '\x1b[30m';
const RESET = '\x1b[0m';
const YELLOW = '\x1b[33m';

// --- LOGGING FUNCTION ---
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`${BLACK}[${timestamp}] ${message}${RESET}`); // Black text for logs.  More readable.
}

// --- PERMISSIONS CHECK (MOCK - NEEDS IMPLEMENTATION WITH OS-SPECIFIC CODE)---
async function hasPermission(action) {
  //  THIS IS A MOCK FUNCTION.  IMPLEMENT OS-SPECIFIC PERMISSION CHECKING.
  //  Example (Linux using 'sudo -n true'):
  //  const { exec } = require('child_process');
  //  return new Promise((resolve) => {
  //    exec('sudo -n true', (error) => {
  //      resolve(!error); // Returns true if sudo access is available.
  //    });
  //  });

  // Replace this with real permission checks relevant to your environment.
  log(`${RED}WARNING: MOCK PERMISSION CHECK - ALWAYS RETURNING TRUE. IMPLEMENT REAL PERMISSIONS!${RESET}`);
  return true; //  DANGEROUS: TEMPORARY MOCK
}

// --- SAFE MODE CHECK ---
function isSafeMode() {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

async function tcpFlood(target, port, durationSeconds) {
  //  User consent variable.
  let userConsent = false;

    // Safe mode check
    if (isSafeMode()) {
      log(`${YELLOW}SAFE MODE ENABLED: Testing against localhost or dummy targets only.${RESET}`);
      target = '127.0.0.1'; // Force localhost in safe mode
      if (port != 80) {
          log(`${YELLOW}SAFE MODE: Changing port to 80 for localhost testing.${RESET}`);
          port = 80;
      }
  }

  // Prompt for explicit user consent.
  userConsent = confirm(`${RED}WARNING: You are about to perform a TCP flood attack on ${target}:${port} for ${durationSeconds} seconds.  This is a potentially harmful action.  Do you have explicit permission to do this? Type 'YES' to proceed, otherwise the attack will be aborted.${RESET}`);

  if (userConsent != true) {
    log(`${RED}TCP Flood Attack Aborted - User did not provide explicit consent.${RESET}`);
    return;
  }

  if (!target || !port || !durationSeconds) {
    log(`${RED}Error: Target, port, and duration are required.${RESET}`);
    return;
  }

  if (isNaN(port) || isNaN(durationSeconds)) {
    log(`${RED}Error: Port and duration must be numbers.${RESET}`);
    return;
  }

  if (port < 1 || port > 65535) {
    log(`${RED}Error: Port must be between 1 and 65535.${RESET}`);
    return;
  }

  if (durationSeconds < 1) {
    log(`${RED}Error: Duration must be at least 1 second.${RESET}`);
    return;
  }

  if (!await hasPermission("network.send")) {
    log(`${RED}Error: Insufficient permissions to send network packets. Aborting.${RESET}`);
    return;
  }

  // Target Verification
  try {
    const url = new URL(`http://${target}`);
    log(`Verifying target: ${url.hostname}`);
  } catch (error) {
    log(`${RED}Error: Invalid target URL. Please enter a valid hostname or IP address.${RESET}`);
    return;
  }


  log(`Starting TCP flood attack on ${target}:${port} for ${durationSeconds} seconds...`);

  const startTime = Date.now();
  const endTime = startTime + (durationSeconds * 1000);

  // Add rate limiting variables
  const packetsPerSecond = 100; // Adjust for desired rate
  const intervalMs = 1000 / packetsPerSecond;
  let lastSentTime = 0;

  while (Date.now() < endTime) {
    const now = Date.now();
    if (now - lastSentTime >= intervalMs) {
          //  MOCK ATTACK: REPLACE WITH ACTUAL TCP PACKET SENDING CODE
          //  This is a placeholder. Use a library like 'net' to create TCP sockets
          //  and send SYN packets rapidly.  Implement rate limiting to avoid crashing
          //  your own system.

          // Example (Requires 'net' library - not included for safety reasons):
          // const net = require('net');
          // const socket = net.createConnection({ host: target, port: port }, () => {
          //   log(`Connected to ${target}:${port}`);
          //   socket.write('SYN'); // Send SYN packet
          //   socket.end(); // Immediately close.  SYN Flood
          // });
          // socket.on('error', (err) => {
          //   log(`${RED}Error sending packet: ${err.message}${RESET}`);
          // });
          log(`Sending mock TCP packet to ${target}:${port}`); // Replaced actual sending with this line for demonstration.
          lastSentTime = now;
    }
    await delay(1); // Small delay to prevent busy-waiting

     // Auto Stop after 10 seconds
     if (durationSeconds > 10 && (now - startTime) > 10000) {
        log(`${RED}Auto-stopping attack after 10 seconds for safety.${RESET}`);
        break;
      }
  }

  log(`TCP flood attack completed on ${target}:${port}.`);
}

// Simple delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Example usage (for testing only - remove or comment out in production):
// (async () => {
//   await tcpFlood("example.com", 80, 5); //  Attacks example.com for 5 seconds.
// })();

// Make the function available for use (e.g. in a web page).
//  Wrap it in a function to avoid global scope pollution.
(function() {
  window.startTcpFlood = async function(target, port, duration) {
    await tcpFlood(target, port, duration);
  };
})();