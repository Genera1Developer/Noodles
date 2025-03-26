const fs = require('fs');
const crypto = require('crypto');

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
            torProxyUsed: 'None'
        };
        this.initializeUI();
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