const ddosAttack = require('./main/ddos/ddos.js');
const defaceSite = require('./main/deface/deface.js');
const connectionEstablish = require('./main/tor/tor.js');
const ransomwareSim = require('./main/ransomware/ransomware.js');
const proxyHandler = require('./main/proxy/proxy.js');

const attackStatistics = {
    mbps: 0,
    packetsSent: 0,
    targetStatus: 'Offline',
    attackDuration: 0,
    startTime: null,
    intervalId: null
};

module.exports = {
    ddosAttack,
    defaceSite,
    connectionEstablish,
    ransomwareSim,
    otherTools,
    proxyHandler,
    init: () => {
        console.log("Noodles Initialized.");
    },

    startStatistics: () => {
        attackStatistics.startTime = Date.now();
        attackStatistics.intervalId = setInterval(() => {
            attackStatistics.attackDuration = Date.now() - attackStatistics.startTime;
            module.exports.updateStatisticsDisplay();
        }, 1000);
    },

    stopStatistics: () => {
        clearInterval(attackStatistics.intervalId);
        attackStatistics.intervalId = null;
    },

    updateStatistics: (mbps = 0, packets = 0, status = 'Offline') => {
        attackStatistics.mbps = mbps;
        attackStatistics.packetsSent = packets;
        attackStatistics.targetStatus = status;
        module.exports.updateStatisticsDisplay();
    },

    updateStatisticsDisplay: () => {
        const mbpsDisplay = document.getElementById('mbps');
        const packetsDisplay = document.getElementById('packets');
        const statusDisplay = document.getElementById('targetStatus');
        const durationDisplay = document.getElementById('attackDuration');

        if (mbpsDisplay) mbpsDisplay.textContent = attackStatistics.mbps.toFixed(2);
        if (packetsDisplay) packetsDisplay.textContent = attackStatistics.packetsSent;
        if (statusDisplay) statusDisplay.textContent = attackStatistics.targetStatus;
        if (durationDisplay) {
            const seconds = Math.floor((attackStatistics.attackDuration / 1000) % 60);
            const minutes = Math.floor((attackStatistics.attackDuration / (1000 * 60)) % 60);
            const hours = Math.floor((attackStatistics.attackDuration / (1000 * 60 * 60)) % 24);
            durationDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    },

    executeAttack: async (target, attackType, options) => {
        try {
            if (!target) {
                throw new Error('Target URL is required.');
            }
            module.exports.startStatistics();
            switch (attackType) {
                case 'ddos':
                    if (!ddosAttack || typeof ddosAttack.execute !== 'function') {
                        throw new Error('DDoS module is not properly configured.');
                    }
                    await ddosAttack.execute(target, options);
                    break;
                case 'deface':
                    if (!defaceSite || typeof defaceSite.execute !== 'function') {
                        throw new Error('Deface module is not properly configured.');
                    }
                    await defaceSite.execute(target, options);
                    break;
                case 'connection':
                    if (!connectionEstablish || typeof connectionEstablish.execute !== 'function') {
                        throw new Error('Connection module is not properly configured.');
                    }
                    await connectionEstablish.execute(target, options);
                    break;
                case 'ransomware':
                    if (!ransomwareSim || typeof ransomwareSim.execute !== 'function') {
                        throw new Error('Ransomware module is not properly configured.');
                    }
                    await ransomwareSim.execute(target, options);
                    break;
                 case 'other':
                    if (!otherTools || typeof otherTools.execute !== 'function') {
                        throw new Error('Other tools module is not properly configured.');
                    }
                    await otherTools.execute(target, options);
                    break;
                default:
                    throw new Error('Invalid attack type');
            }
        } catch (error) {
            console.error('Attack execution failed:', error);
            throw error;
        } finally {
            module.exports.stopStatistics();
            module.exports.updateStatistics();
        }
    }
};
