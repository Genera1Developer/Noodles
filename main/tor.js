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
            "https://onion.sh",
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
        this.requestTimeout = 10000;
        this.gatewayCheckInterval = 30000;
        this.startGatewayMonitoring();
        this.userAgent = 'Noodles/1.0 (DDoS Tool)';
    }

    async isGatewayOnline(gateway) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const testUrl = `${gateway}/httpbin.org/get`;
            const response = await fetch(testUrl, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'User-Agent': this.userAgent
                }
            });
            clearTimeout(timeoutId);
            return response.ok;
        } catch (error) {
            console.warn(`Gateway ${gateway} check failed:`, error);
            return false;
        }
    }

    async startGatewayMonitoring() {
        setInterval(async () => {
            for (const gateway of this.gateways) {
                const isFailed = this.failedGateways.has(gateway);
                const isOnline = await this.isGatewayOnline(gateway);

                if (isOnline && isFailed) {
                    this.failedGateways.delete(gateway);
                    console.log(`Gateway ${gateway} is back online.`);
                } else if (!isOnline && !isFailed) {
                    this.failedGateways.add(gateway);
                    console.warn(`Gateway ${gateway} is offline. Adding to blacklist.`);
                }
            }
        }, this.gatewayCheckInterval);
    }

    async fetchWithTor(url, options = {}, retryCount = 0) {
        if (this.failedGateways.size === this.gateways.length) {
            throw new Error("All Tor gateways are unavailable.");
        }

        let gateway = this.gateways[this.currentIndex];
        while (this.failedGateways.has(gateway)) {
            this.currentIndex = (this.currentIndex + 1) % this.gateways.length;
            gateway = this.gateways[this.currentIndex];
        }

        this.currentIndex = (this.currentIndex + 1) % this.gateways.length;
        const torURL = `${gateway}/${url}`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);
            const response = await fetch(torURL, { ...options, signal: controller.signal, headers: { ...options.headers, 'User-Agent': this.userAgent } });
            clearTimeout(timeoutId);

            if (!response.ok) {
                if (response.status === 404 || response.status === 500 || response.status === 503) {
                    this.failedGateways.add(gateway);
                    console.warn(`Gateway ${gateway} failed. Adding to blacklist.`);
                    if (retryCount < this.maxRetries) {
                        console.log(`Retrying with a different gateway. Retry count: ${retryCount + 1}`);
                        return this.fetchWithTor(url, options, retryCount + 1);
                    } else {
                        throw new Error(`HTTP error! status: ${response.status} - Max retries reached.`);
                    }
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

            }
            return response;
        } catch (error) {
            console.error(`Tor fetch error with gateway ${gateway}:`, error);
            this.failedGateways.add(gateway);

            if (retryCount < this.maxRetries) {
                console.log(`Retrying with a different gateway. Retry count: ${retryCount + 1}`);
                return this.fetchWithTor(url, options, retryCount + 1);
            } else {
                console.error("Max retries reached. Marking URL as potentially unreachable.");
                throw error;
            }

        }
    }

    async getText(url) {
        const response = await this.fetchWithTor(url);
        return await response.text();
    }

    async postWithTor(url, data, retryCount = 0) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': this.userAgent
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        try {
            return await this.fetchWithTor(url, options, retryCount);
        } catch (error) {
            console.error("POST request failed:", error);
            throw error;
        }
    }

    async rawFetch(url, options = {}) {
        try {
            const response = await fetch(url, { ...options, headers: { ...options.headers, 'User-Agent': this.userAgent } });
            return response;
        } catch (error) {
            console.error("Raw fetch error:", error);
            throw error;
        }
    }

    async rawGetText(url) {
        const response = await this.rawFetch(url);
        return await response.text();
    }

    async rawPost(url, data) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': this.userAgent
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        try {
            return await this.rawFetch(url, options);
        } catch (error) {
            console.error("Raw POST request failed:", error);
            throw error;
        }
    }
}

window.Tor = Tor;