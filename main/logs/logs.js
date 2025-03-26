class Logger {
    constructor() {
        this.logEntries = [];
        this.maxLogSize = 100;
        this.logFilePath = 'noodles.log';
    }

    generateAttackID() {
        return crypto.randomUUID();
    }

    log(eventData) {
        const timestamp = new Date().toISOString();
        const attackID = this.generateAttackID();
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
            }
        });
    }

    displayLog(logEntry) {
        const logElement = document.createElement('div');
        logElement.classList.add('log-entry');
        logElement.innerHTML = this.formatLog(logEntry);
        document.getElementById('logs-container').prepend(logElement);
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
                }
            });
        });
    }

    clearLogs() {
        this.logEntries = [];
        document.getElementById('logs-container').innerHTML = '';
        fs.writeFile(this.logFilePath, '', err => {
            if (err) {
                console.error('Failed to clear log file:', err);
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
}

const logger = new Logger();
logger.loadPersistentLogs();
window.logger = logger;

document.getElementById('clear-logs-button').addEventListener('click', () => {
    logger.clearLogs();
});

document.getElementById('download-logs-button').addEventListener('click', () => {
    logger.downloadLogs();
});