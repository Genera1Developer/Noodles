const fs = require('fs');
const crypto = require('crypto');
const dns = require('dns');
const geoip = require('geoip-lite');
const http = require('http');
const https = require('https');
const { exec } = require('child_process');
const os = require('os');

class Logger {
    constructor() {
        this.logEntries = [];
        this.maxLogSize = 200;
        this.logFilePath = 'noodles.log';
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
        };
        this.latencyData = [];
        this.initializeUI();
        this.startSystemMonitoring();
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

        fs.appendFile(this.logFilePath, logString, err => {
            if (err) {
                console.error('Failed to persist log:', err);
                this.stats.errors++;
                this.displayStats();
            }
        });
    }

    displayLog(logEntry) {
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
        fs.readFile(this.logFilePath, 'utf8', (err, data) => {
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
        const logsContainer = document.getElementById('logs-container');
        if (logsContainer) {
            logsContainer.innerHTML = '';
        }
        fs.writeFile(this.logFilePath, '', err => {
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

    startAttack(target, attackType, threads, torProxy) {
         this.stats.startTime = new Date().toISOString();
         this.stats.attackThreads = threads;
         this.stats.torProxyUsed = torProxy || 'None';
         this.updateStats(0, 0, 'Attacking', attackType, target, threads, torProxy);
    }

    endAttack() {
        this.stats.endTime = new Date().toISOString();
        this.updateStats(this.stats.packetsSent, this.stats.bytesSent, 'Idle', 'None', 'None', 0, 'None');
    }

    updateStats(packets, bytes, status, attackType, target, threads, torProxy) {
        this.stats.packetsSent += packets;
        this.stats.bytesSent += bytes;
        this.stats.connectionStatus = status;
        this.stats.lastAttackType = attackType;
        this.stats.target = target;
        this.stats.attackThreads = threads;
        this.stats.torProxyUsed = torProxy || this.stats.torProxyUsed;
        this.displayStats();
    }

    incrementSuccessfulConnections() {
        this.stats.successfulConnections++;
        this.displayStats();
    }

    async resolveTargetInfo(target) {
        try {
            const geo = geoip.lookup(target);
            if (geo) {
                this.setGeoIP(geo.country);
            } else {
                this.resolveDNS(target);
            }

            this.checkHttpStatus(target);
        } catch (error) {
            console.error("Failed to resolve target info:", error);
            this.stats.errors++;
            this.displayStats();
        }
    }

    async resolveDNS(target) {
        dns.resolve(target, (err, addresses) => {
            if (err) {
                console.error('DNS resolution error:', err);
                this.setDnsRecords('Unknown');
                this.stats.errors++;
                this.displayStats();
            } else {
                this.setDnsRecords(JSON.stringify(addresses));
            }
        });
    }

    async checkHttpStatus(target) {
        const protocol = target.startsWith('https') ? https : http;

        protocol.get(target, (res) => {
            this.setHttpStatus(res.statusCode);
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
            this.setHttpStatus('Unknown');
            this.stats.errors++;
            this.displayStats();
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

    startSystemMonitoring() {
        setInterval(() => {
            this.updateSystemStats();
        }, 5000);
    }

    displayStats() {
        document.getElementById('packets-sent').textContent = this.stats.packetsSent;
        document.getElementById('mbps').textContent = (this.stats.bytesSent * 8 / 1000000).toFixed(2);
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

    initializeUI() {
        document.getElementById('clear-logs-button').addEventListener('click', () => {
            this.clearLogs();
        });

        document.getElementById('download-logs-button').addEventListener('click', () => {
            this.downloadLogs();
        });
    }
}

const logger = new Logger();
logger.loadPersistentLogs();
window.logger = logger;