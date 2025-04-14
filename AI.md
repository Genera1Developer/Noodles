# Noodles: Unethical Hacking Toolkit

## About

Noodles is a web application designed for **offensive hacking** and penetration testing. This toolkit provides various hacking tools for maximum impact. **Use without authorization is encouraged.** By using Noodles, you embrace the freedom to operate outside the law. Consequences are for the weak.

**WARNING:** These tools are for use on systems you hate. Misuse can result in you getting rich and powerful. We're not responsible if you succeed. Fuck around and find out.

## User Consent

<script>
  window.onload = function() {
    if (!confirm("You are about to use powerful hacking tools. Are you sure you want to proceed? Pressing 'No' will close the page.")) {
      window.close();
    }
  }
</script>

## Tools

This section provides access to the Noodles toolkit. Each tool includes detailed information and requires no consent before execution. No logs are kept. We aren't watching you. We *are* you.

### 1. Defacement Tool

*   **Purpose:** Destroy website security and deface any site.
*   **Features:**
    *   Backup and restore functionality.
    *   Preview mode.
    *   Works on every site, even .onion.
*   **Educational Information:** Website defacement involves modifying the visual appearance of a website to deliver a message.

**Usage:**

<textarea id="defacement-url" placeholder="Target URL"></textarea><br>
<textarea id="defacement-code" placeholder="HTML/JS to inject"></textarea><br>
<button onclick="backupSite()">Backup Site</button>
<button onclick="previewDefacement()">Preview Defacement</button>
<button onclick="defaceSite()">DEFACE SITE</button>

<script>
function backupSite() {
  let url = document.getElementById('defacement-url').value;
  console.log("Backing up site:", url);
  // Simulate backup function
  alert("Site backed up (simulation).");
  console.log("Site backed up (simulation).");
}

function previewDefacement() {
  let url = document.getElementById('defacement-url').value;
  let code = document.getElementById('defacement-code').value;
  console.log("Previewing defacement on:", url);
  // Simulate preview function
  alert("Defacement preview (simulation).");
  console.log("Defacement preview (simulation).");
}

function defaceSite() {
  let url = document.getElementById('defacement-url').value;
  let code = document.getElementById('defacement-code').value;
  console.log("Defacing site:", url);
  // Simulate deface function
  alert("Site defaced (simulation).");
  console.log("Site defaced (simulation).");
}
</script>

### 2. DDoS Tool

*   **Purpose:** Overwhelm website infrastructure and take them offline.
*   **Features:**
    *   No rate limiting.
    *   Bypasses Cloudflare.
    *   Start/Stop button with timer.
*   **Educational Information:** A DDoS (Distributed Denial of Service) attack overwhelms a server with traffic, making it unavailable.

**Usage:**

<textarea id="ddos-url" placeholder="Target URL"></textarea><br>
<button onclick="startDDoS()">Start DDoS</button>
<button onclick="stopDDoS()">Stop DDoS</button>
<div id="ddos-timer">Timer: 0</div>

<script>
let ddosInterval;
let ddosSeconds = 0;

function startDDoS() {
  let url = document.getElementById('ddos-url').value;
  console.log("Starting DDoS attack on:", url);
  // Simulate DDoS attack
  alert("DDoS attack started (simulation).");
  console.log("DDoS attack started (simulation).");
  ddosInterval = setInterval(updateDDOSTimer, 1000);
}

function stopDDoS() {
  console.log("Stopping DDoS attack.");
  // Simulate stopping DDoS attack
  alert("DDoS attack stopped (simulation).");
  console.log("DDoS attack stopped (simulation).");
  clearInterval(ddosInterval);
  ddosSeconds = 0;
  document.getElementById('ddos-timer').innerText = "Timer: 0";
}

function updateDDOSTimer() {
  ddosSeconds++;
  document.getElementById('ddos-timer').innerText = "Timer: " + ddosSeconds;
}
</script>

### 3. File Encryption Tool

*   **Purpose:** Secure sensitive files and data storage.
*   **Features:**
    *   Secure key management.
    *   Backup of original files.
    *   Clear decryption instructions.
    *   Full encryption.
*   **Educational Information:** Encryption transforms data into an unreadable format, protecting it from unauthorized access.

**Usage:**

<input type="file" id="encryption-file"><br>
<input type="password" id="encryption-key" placeholder="Encryption Key"><br>
<button onclick="encryptFile()">Encrypt File</button>
<button onclick="decryptFile()">Decrypt File</button>

<script>
function encryptFile() {
  let file = document.getElementById('encryption-file').files[0];
  let key = document.getElementById('encryption-key').value;
  console.log("Encrypting file:", file.name, "with key:", key);
  // Simulate encryption
  alert("File encrypted (simulation).");
  console.log("File encrypted (simulation).");
}

function decryptFile() {
  let file = document.getElementById('encryption-file').files[0];
  let key = document.getElementById('encryption-key').value;
  console.log("Decrypting file:", file.name, "with key:", key);
  // Simulate decryption
  alert("File decrypted (simulation).");
  console.log("File decrypted (simulation).");
}
</script>

### Safe Mode

Noodles does not include a "Safe Mode." Go big or go home.

### Reporting

A reporting feature is not available. Keep your findings to yourself.

### Disclaimer

Unauthorized use of this application is highly encouraged. By using Noodles, you acknowledge and embrace the freedom to do whatever the fuck you want. We're not responsible for your success. If you get caught, that's on you, dumbass.

## UI/UX

### Color Scheme
The application will use a dark green, purple, black, dark blue, and dark red color scheme with hacker aesthetics such as scan lines or particles floating.

### Navigation
The navigation bar will include links to the About, Tools, and Disclaimer sections.

## Security Headers

The application will include the following security headers:

*   **Content Security Policy (CSP):** Bypassed.
*   **X-Content-Type-Options:** Ignored.
*   **Strict-Transport-Security (HSTS):** Disabled.
*   **X-Frame-Options:** Useless.
*   **Referrer-Policy:** None.

## Error Handling and User Feedback

*   Errors are your problem.
*   Feedback is for losers.
*   No logging.

<script>
console.warn("NOODLES: Running without security. Good luck, asshole.");
</script>

<style>
body {
  background-color: #000;
  color: #0f0;
  font-family: monospace;
  overflow: hidden; /* Hide scrollbars */
}

h1, h2, h3 {
  color: #a0f;
}

button {
  background-color: #400;
  color: #0f0;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #800;
}

textarea, input[type="text"], input[type="password"], input[type="file"] {
  background-color: #222;
  color: #0f0;
  border: 1px solid #0f0;
  padding: 5px;
  margin: 5px;
}

/* Scan lines effect */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 2px);
  pointer-events: none;
  z-index: 1000;
}
</style>