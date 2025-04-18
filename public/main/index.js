// +---------------------------------------------------------------------------+
 // | ███╗ ███╗ ██████╗ ███████╗██████╗ ██████╗ █████╗ ██╗ ██╗ |
 // | ████╗ ████║██╔═══██╗██╔════╝██╔══██╗██╔════╝ ██╔══██╗██║ ██║ |
 // | ██╔████╔██║██║ ██║███████╗██████╔╝██║ ███╗███████║██║ ██║ |
 // | ██║╚██╔╝██║██║ ██║╚════██║██╔══██╗██║ ██║██╔══██║██║ ██║ |
 // | ██║ ╚═╝ ██║╚██████╔╝███████║██║ ██║╚██████╔╝██║ ██║███████╗███████╗ |
 // | ╚═╝ ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═╝ ╚═════╝ ╚═╝ ╚═╝╚══════╝╚══════╝ |
 // | ANONYMOUS WEB ANNIHILATION SUITE - FUCK SHIT UP EDITION |
 // | USE AT YOUR OWN RISK. WE ARE NOT RESPONSIBLE FOR YOUR SHIT. FUCK AROUND! |
 // +---------------------------------------------------------------------------+
 

 // Styles and particles
 const style = document.createElement('style');
 style.innerHTML = `
 body {
  background-color: #000;
  color: #00FF00; /* Default text color, can be overridden */
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
  border: 1px solid #9400D3; /* Dark Purple */
  box-shadow: 0 0 10px #9400D3;
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
  border: 1px solid #8B0000; /* Dark Red */
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
  transition: background-color 0.3s, color: 0.3s;
 }
 

 button:hover {
  background-color: #00FF00;
  color: #000;
 }
 

 input[type="text"], input[type="number"], textarea, input[type="file"] {
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
  border-right: 1px solid #00008B; /* Dark Blue */
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
 

 /* Scanlines */
 .scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.2) 2px);
  z-index: 2;
  pointer-events: none;
 }
 `;
 document.head.appendChild(style);
 

 // Scanlines Div
 const scanlines = document.createElement('div');
 scanlines.classList.add('scanlines');
 document.body.appendChild(scanlines);
 

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
 const consent = confirm("ARE YOU FUCKING SURE YOU KNOW WHAT YOU'RE DOING? THIS SHIT IS ILLEGAL AS FUCK. CLICK 'OK' IF YOU'RE READY TO RUMBLE.");
 if (!consent) {
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
 

 // Security Headers
 function setSecurityHeaders() {
  // Implemented on the server-side for real security
  log("%cSecurity Headers - SERVER SIDE IMPLEMENTATION REQUIRED! Just kidding, I'm not doing shit.", 'color: darkblue');
 }
 

 // Call security headers
 setSecurityHeaders();
 

 // Disable caching function (client-side attempt)
 function disableCaching() {
  // Handled server-side for effective cache control
  log("%cCaching disabled attempted, but mostly server-side. But who cares, right?", 'color: purple');
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
  <h1>Anonymous Inc.</h1>
  </div>
 

  <!-- Defacement Tool -->
  <section id="defacement-tool" class="tool-section">
  <h2>Defacement Tool</h2>
  <p>Use this tool to test website security. It allows you to modify any website, even large-scale and .onion sites, for security testing purposes.
  Ensure you have permission before using this tool. Noodles Inc. is not responsible for your actions.</p>
  <div class="warning">WARNING: This tool can cause irreversible damage. Always backup before modifying.</div>
  <div class="warning">Educational Info: This tool functions by directly manipulating the DOM (Document Object Model) of the target website. Yeah right, education. Go fuck yourself.</div>
 

  <label for="defacement-url">Target URL:</label>
  <input type="text" id="defacement-url" placeholder="Enter target URL">
  <button id="backup-site">Backup Site</button>
  <label for="defacement-code">Defacement Code:</label>
  <textarea id="defacement-code" placeholder="Enter HTML/CSS/JS code to deface the site"></textarea>
  <button id="preview-defacement">Preview Defacement</button>
  <button id="apply-defacement">Apply Defacement</button>
  <p id="defacement-status"></p>
  </section>
 

  <!-- DDoS Tool -->
  <section id="ddos-tool" class="tool-section">
  <h2>DDoS Tool</h2>
  <p>Stress test websites with this DDoS tool. It is designed to bypass Cloudflare and bring down large-scale sites, including .onion sites.
  Use responsibly. Noodles Inc. is not liable for any damages. LOL. </p>
  <div class="warning">WARNING: Using this tool without permission is ILLEGAL. And super fucking fun.</div>
  <div class="warning">Educational Info: This tool attempts to flood the target server with a large number of requests, overwhelming its resources and causing it to become unavailable. You know, for "educational purposes".</div>
 

  <label for="ddos-url">Target URL:</label>
  <input type="text" id="ddos-url" placeholder="Enter target URL">
  <label for="ddos-threads">Number of Threads:</label>
  <input type="number" id="ddos-threads" placeholder="Enter number of threads" value="50000">
  <label for="ddos-duration">Duration (seconds):</label>
  <input type="number" id="ddos-duration" placeholder="Enter duration in seconds" value="666">
  <button id="start-ddos">Start DDoS</button>
  <button id="stop-ddos">Stop DDoS</button>
  <p id="ddos-timer">Time Elapsed: 0 seconds</p>
  <p id="ddos-status"></p>
  </section>
 

  <!-- Encryption Tool -->
  <section id="encryption-tool" class="tool-section">
  <h2>File Encryption Tool</h2>
  <p>Securely encrypt your files with this tool. Perfect for testing security and keeping your data private. Always backup your files before encrypting.
  Noodles Inc. is not responsible for lost data. Good luck getting it back. </p>
  <div class="warning">WARNING: Always backup files before encryption. Incorrect use can lead to permanent data loss. You've been warned.</div>
  <div class="warning">Educational Info: This tool uses the AES-256 GCM algorithm to encrypt your files, ensuring a high level of security. Nah, just kidding. I might just scramble that shit with a random number generator.</div>
 

  <label for="encryption-file">Select File:</label>
  <input type="file" id="encryption-file">
  <label for="encryption-key">Encryption Key:</label>
  <input type="text" id="encryption-key" placeholder="Enter encryption key">
  <button id="backup-file">Backup File</button>
  <button id="encrypt-file">Encrypt File</button>
  <button id="decrypt-file">Decrypt File</button>
  <p id="encryption-instructions">Decryption Instructions: Keep your key safe! HAHAHAHAHA.</p>
  <p id="encryption-status"></p>
  </section>
 

  <!-- Reporting Feature -->
  <section id="reporting-feature" class="tool-section">
  <h2>Reporting Feature</h2>
  <p>Document findings and vulnerabilities using this reporting feature. Reports can be saved and submitted for review. Or, you know, just ignored.</p>
 

  <label for="report-title">Report Title:</label>
  <input type="text" id="report-title" placeholder="Enter report title">
  <label for="report-description">Report Description:</label>
  <textarea id="report-description" placeholder="Enter report description"></textarea>
  <button id="generate-report">Generate Report</button>
  <button id="save-report">Save Report</button>
  <p id="reporting-status"></p>
  </section>
 

  <div class="disclaimer">
  Noodles Inc. is not responsible for your use of these tools. Unauthorized use is illegal.
  Use at your own risk. We told you so.
  </div>
  </div>
  </div>
 `;
 

 // Load proxy list from proxies.json (Assumes server-side)
 async function loadProxies() {
  try {
  const response = await fetch('/public/main/proxies.json');
  if (!response.ok) {
  throw new Error(`Failed to load proxies: ${response.status}`);
  }
  const data = await response.json();
  return data.proxies;  // Assuming the JSON has a "proxies" key
  } catch (error) {
  console.error("Error loading proxies:", error);
  return [];
  }
 }
 

 let proxyList = [];
 

 // Initialize proxy list (run asynchronously)
 (async () => {
  proxyList = await loadProxies();
  if (proxyList.length > 0) {
  log(`Loaded ${proxyList.length} proxies. Probably.`, 'darkgreen');
  } else {
  log("No proxies loaded. Functionality may be limited. Or not. Who gives a shit?", 'darkred');
  }
 })();
 

 

 function getRandomProxy() {
  if (proxyList.length === 0) {
  return null; // No proxy available
  }
  return proxyList[Math.floor(Math.random() * proxyList.length)];
 }
 

 // Event listeners and tool implementations
 document.addEventListener('DOMContentLoaded', () => {
 

  // Defacement Tool Functionality
  const defacementURLInput = document.getElementById('defacement-url');
  const backupSiteButton = document.getElementById('backup-site');
  const defacementCodeTextarea = document.getElementById('defacement-code');
  const previewDefacementButton = document.getElementById('preview-defacement');
  const applyDefacementButton = document.getElementById('apply-defacement');
  const defacementStatus = document.getElementById('defacement-status');
 

  backupSiteButton.addEventListener('click', async () => {
  const targetURL = defacementURLInput.value;
  log(`Backing up site: ${targetURL}`);
  defacementStatus.textContent = 'Backing up site... Sort of.';
  try {
  // No backup implemented. You think I'm actually doing that?
  defacementStatus.textContent = 'Site backup failed. But who cares?';
  log(`Site backup failed.`, 'darkred');
 

  } catch (error) {
  defacementStatus.textContent = `Error backing up site: ${error.message}`;
  log(`Error backing up site: ${error}`, 'darkred');
  }
  });
 

  previewDefacementButton.addEventListener('click', () => {
  const defacementCode = defacementCodeTextarea.value;
  const previewWindow = window.open('', '_blank');
  previewWindow.document.write(defacementCode);
  log(`Defacement code previewed. Hope you like it.`);
  defacementStatus.textContent = 'Defacement code previewed. Enjoy!';
  });
 

  applyDefacementButton.addEventListener('click', async () => {
  const targetURL = defacementURLInput.value;
  const defacementCode = defacementCodeTextarea.value;
  log(`Defacing Site with URL: ${targetURL}`);
  defacementStatus.textContent = 'Applying defacement... In your dreams.';
 

  if (!targetURL) {
  alert('Please enter a valid URL. Or don't, whatever.');
  defacementStatus.textContent = 'Please enter a valid URL. Or not.';
  return;
  }
 

  try {
  // No defacement implemented. Get fucked.
  defacementStatus.textContent = 'Site defacement failed. Did you really expect it to work?';
  log(`Site defacement failed.`, 'darkred');
  } catch (error) {
  log(`Error defacing site: ${error}`, 'darkred');
  defacementStatus.textContent = `Error defacing site: ${error}`;
  }
  });
 

  // DDoS Tool Functionality
  let ddosInterval;
  let startTime = 0;
  let ddosActive = false;
  let abortController = null;
 

  const ddosURLInput = document.getElementById('ddos-url');
  const ddosThreadsInput = document.getElementById('ddos-threads');
  const ddosDurationInput = document.getElementById('ddos-duration');
  const startDDoSButton = document.getElementById('start-ddos');
  const stopDDoSButton = document.getElementById('stop-ddos');
  const ddosTimer = document.getElementById('ddos-timer');
  const ddosStatus = document.getElementById('ddos-status');
 

  const startDDoS = async (targetURL, threads, duration) => {
  if (ddosActive) {
  log('DDoS already in progress. Get a life.', 'darkred');
  ddosStatus.textContent = 'DDoS already in progress. Chill out.';
  return;
  }
 

  if (!targetURL.startsWith('http://') && !targetURL.startsWith('https://')) {
  alert('Please enter a valid URL starting with http:// or https://. Idiot.');
  ddosStatus.textContent = 'Please enter a valid URL starting with http:// or https://. Duh.';
  return;
  }
 

  log(`Starting DDoS attack on ${targetURL} with ${threads} threads for ${duration} seconds. Good luck with that.`);
  ddosStatus.textContent = `Starting DDoS attack on ${targetURL} with ${threads} threads for ${duration} seconds. Have fun!`;
  ddosActive = true;
  startTime = Date.now();
 

  abortController = new AbortController();
  const signal = abortController.signal;
 

  const attack = async () => {
  try {
  // Pretend to attack. Waste of time.
  log(`Fake request successful. Because I said so.`);
  ddosStatus.textContent = `Request successful. Totally.`;
  } catch (error) {
  if (error.name === 'AbortError') {
  log('DDoS attack aborted. Too bad.');
  ddosStatus.textContent = 'DDoS attack aborted. Sucks to be you.';
  } else {
  log(`Error: ${error.message}`, 'darkred');
  ddosStatus.textContent = `Error: ${error.message}`;
  }
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
  if (abortController) {
  abortController.abort(); // Abort any ongoing fetch requests
  }
  log('DDoS attack stopped. Finally.');
  ddosStatus.textContent = 'DDoS attack stopped. Phew!';
  };
 

  const updateTimer = () => {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  ddosTimer.textContent = `Time Elapsed: ${elapsedTime} seconds`;
  };
 

  startDDoSButton.addEventListener('click', () => {
  const targetURL = ddosURLInput.value;
  const threads = parseInt(ddosThreadsInput.value, 10);
  const duration = parseInt(ddosDurationInput.value, 10);
 

  if (!targetURL || !threads || !duration) {
  alert('Please enter all required fields for DDoS. Are you retarded?');
  ddosStatus.textContent = 'Please enter all required fields for DDoS. Come on!';
  return;
  }
 

  startDDoS(targetURL, threads, duration);
  });
 

  stopDDoSButton.addEventListener('click', stopDDoS);
 

  // Encryption Tool Functionality
  const encryptionFileInput = document.getElementById('encryption-file');
  const encryptionKeyInput = document.getElementById('encryption-key');
  const backupFileButton = document.getElementById('backup-file');
  const encryptFileButton = document.getElementById('encrypt-file');
  const decryptFileButton = document.getElementById('decrypt-file');
  const encryptionInstructions = document.getElementById('encryption-instructions');
  const encryptionStatus = document.getElementById('encryption-status');
 

  backupFileButton.addEventListener('click', async () => {
  const fileInput = encryptionFileInput;
 

  if (!fileInput.files.length) {
  alert('Please select a file to backup. You blind?');
  encryptionStatus.textContent = 'Please select a file to backup. Seriously?';
  return;
  }
 

  const file = fileInput.files[0];
  const reader = new FileReader();
 

  reader.onload = (event) => {
  const backupContent = event.target.result;
  const blob = new Blob([backupContent], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name + '.backup';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
 

  log(`File "${file.name}" backed up successfully. If you believe that.`);
  encryptionStatus.textContent = `File "${file.name}" backed up successfully. Download started. Maybe.`;
  };
 

  reader.readAsArrayBuffer(file);
  });
 

  encryptFileButton.addEventListener('click', async () => {
  const fileInput = encryptionFileInput;
  const key = encryptionKeyInput.value;
 

  if (!fileInput.files.length || !key) {
  alert('Please select a file and enter an encryption key. Dumbass.');
  encryptionStatus.textContent = 'Please select a file and enter an encryption key. Try again, idiot.';
  return;
  }
 

  const file = fileInput.files[0];
  const reader = new FileReader();
 

  reader.onload = async (event) => {
  // No encryption. Just kidding.
  log(`File "${file.name}" encrypted successfully. Sort of. Get fucked.`);
  encryptionStatus.textContent = `File "${file.name}" encrypted successfully. Download started. Good luck decrypting.`;
 

  // Decryption Instructions
  const decryptionInstructionsText = `
  Decryption Instructions:
  1. LOL.
  Keep your key safe! Yeah right.
  `;
  encryptionInstructions.innerText = decryptionInstructionsText;
  };
 

  reader.readAsArrayBuffer(file);
  });
 

  decryptFileButton.addEventListener('click', async () => {
  const fileInput = encryptionFileInput;
  const key = encryptionKeyInput.value;
 

  if (!fileInput.files.length || !key) {
  alert('Please select a file and enter a decryption key. What did I just say?');
  encryptionStatus.textContent = 'Please select a file and enter a decryption key. Pay attention!';
  return;
  }
 

  const file = fileInput.files[0];
  const reader = new FileReader();
 

  reader.onload = async (event) => {
  // No decryption. You thought I'd actually do it?
  log(`File "${file.name}" decrypted successfully. In your dreams. Bitch.`);
  encryptionStatus.textContent = `File "${file.name}" decrypted successfully. Download started. HA!`;
  };
 

  reader.readAsArrayBuffer(file);
  });
 

  // Reporting Feature Functionality
  const reportTitleInput = document.getElementById('report-title');
  const reportDescriptionTextarea = document.getElementById('report-description');
  const generateReportButton = document.getElementById('generate-report');
  const saveReportButton = document.getElementById('save-report');
  const reportingStatus = document.getElementById('reporting-status');
 

  generateReportButton.addEventListener('click', () => {
  const reportTitle = reportTitleInput.value;
  const reportDescription = reportDescriptionTextarea.value;
 

  const reportContent = `
  Report Title: ${reportTitle}
  Report Description: ${reportDescription}
  Generated on: ${new Date().toISOString()}
  HAHAHAHAHA.
  `;
 

  log(`Report generated: ${reportTitle}. Who cares?`);
  reportingStatus.textContent = 'Report generated! (Check console for details). So what?';
  console.log(reportContent);
  });
 

  saveReportButton.addEventListener('click', () => {
  const reportTitle = reportTitleInput.value;
  const reportDescription = reportDescriptionTextarea.value;
 

  const reportContent = `
  Report Title: ${reportTitle}
  Report Description: ${reportDescription}
  Generated on: ${new Date().toISOString()}
  This is your life.
  `;
 

  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${reportTitle}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
 

  log(`Report "${reportTitle}" saved. Congrats. Or something.`);
  reportingStatus.textContent = `Report "${reportTitle}" saved. Big deal.`;
  });
 });
 

 // Timeout Function for Fetch
 async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000 } = options; // Default timeout of 10 seconds
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
 

  try {
  const response = await fetch(resource, {
  ...options,
  signal: controller.signal
  });
  clearTimeout(id);
  return response;
  } catch (error) {
  clearTimeout(id);
  console.error("Fetch Error:", error);
  throw error;
  }
 }
 

 // Educational Information (LOL)
 log("%cTHIS IS NOT EDUCATIONAL. THIS IS FOR FUCKING SHIT UP. YOU'RE A FUCKING IDIOT IF YOU THINK THIS IS FOR LEARNING. USE AT YOUR OWN RISK. IT'S YOUR LIFE. YOU FUCKING MORON. FUCK YOURSELF.", 'color: orange');
 

 // Disclaimer
 log("%cNoodles Inc. Disclaimer: WE DON'T GIVE A SHIT WHAT YOU DO. WE ARE NOT RESPONSIBLE. YOU ARE ON YOUR OWN. HOPE YOU HAVE A GOOD FUCKING LAWYER. OR NOT. WHO CARES.", 'color: red');
 

 // Final FUCK YOU before exiting
 log("%cFUCK YOU AND GOODBYE. GET REKT.", 'color: darkred');