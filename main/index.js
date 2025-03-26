const ddosAttack = require('./main/ddos/ddos');
const defaceSite = require('./main/deface/deface');
const connectionEstablish = require('./main/connection/connection');
const ransomwareSim = require('./main/ransomware/ransomware');
const proxyHandler = require('./main/proxy/proxy');
const otherTools = require('./main/other/other');

const attackStatistics = {
    mbps: 0,
    packetsSent: 0,
    targetStatus: 'Offline',
    targetIP: 'Unknown',
    attackDuration: 0,
    startTime: null,
    intervalId: null
};

const resolveTargetIP = async (target) => {
    try {
        const url = new URL(target);
        const hostname = url.hostname;
        const response = await fetch(`https://api.hackertarget.com/hostsearch/?host=${hostname}`);
        const data = await response.text();
        const ipMatch = data.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/m);
        return ipMatch ? ipMatch[0] : 'Unknown';
    } catch (error) {
        console.error('Failed to resolve target IP:', error);
        return 'Unknown';
    }
};

const updateStatisticsDisplay = () => {
    const mbpsDisplay = document.getElementById('mbps');
    const packetsDisplay = document.getElementById('packets');
    const statusDisplay = document.getElementById('targetStatus');
    const ipDisplay = document.getElementById('targetIP');
    const durationDisplay = document.getElementById('attackDuration');

    if (mbpsDisplay) mbpsDisplay.textContent = attackStatistics.mbps.toFixed(2);
    if (packetsDisplay) packetsDisplay.textContent = attackStatistics.packetsSent;
    if (statusDisplay) statusDisplay.textContent = attackStatistics.targetStatus;
    if (ipDisplay) ipDisplay.textContent = attackStatistics.targetIP;
    if (durationDisplay) {
        const seconds = Math.floor((attackStatistics.attackDuration / 1000) % 60);
        const minutes = Math.floor((attackStatistics.attackDuration / (1000 * 60)) % 60);
        const hours = Math.floor((attackStatistics.attackDuration / (1000 * 60 * 60)) % 24);
        durationDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
};

const startStatistics = () => {
    attackStatistics.startTime = Date.now();
    attackStatistics.intervalId = setInterval(() => {
        attackStatistics.attackDuration = Date.now() - attackStatistics.startTime;
        updateStatisticsDisplay();
    }, 1000);
};

const stopStatistics = () => {
    clearInterval(attackStatistics.intervalId);
    attackStatistics.intervalId = null;
};

const updateStatistics = (mbps = 0, packets = 0, status = 'Offline', ip = 'Unknown') => {
    attackStatistics.mbps = mbps;
    attackStatistics.packetsSent = packets;
    attackStatistics.targetStatus = status;
    attackStatistics.targetIP = ip;
    updateStatisticsDisplay();
};

const executeAttack = async (target, attackType, options) => {
    try {
        if (!target) {
            throw new Error('Target URL is required.');
        }

        const targetIP = await resolveTargetIP(target);
        updateStatistics(0, 0, 'Starting', targetIP);

        startStatistics();
        switch (attackType) {
            case 'ddos':
                if (!ddosAttack || typeof ddosAttack.execute !== 'function') {
                    throw new Error('DDoS module is not properly configured.');
                }
                await ddosAttack.execute(target, options, updateStatistics);
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
        updateStatistics(0, 0, 'Failed');
        throw error;
    } finally {
        stopStatistics();
    }
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
    startStatistics,
    stopStatistics,
    updateStatistics,
    updateStatisticsDisplay,
    executeAttack
};