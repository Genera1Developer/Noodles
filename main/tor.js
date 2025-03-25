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
        this.maxRetries = 3;
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
            const response = await fetch(torURL, options);
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
                'Content-Type': 'application/json'
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
}

window.Tor = Tor;