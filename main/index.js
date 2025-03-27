const ddosAttack = require('./ddos/ddos');
const defaceSite = require('./defacement/defacement');
const connectionEstablish = require('./proxy/proxy');
const credentialStuffing = require('./credentials/credentials');

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

const formatDuration = (duration) => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const updateStatisticsDisplay = () => {
    document.getElementById('mbps').textContent = attackStatistics.mbps.toFixed(2);
    document.getElementById('packets').textContent = attackStatistics.packetsSent;
    document.getElementById('targetStatus').textContent = attackStatistics.targetStatus;
    document.getElementById('targetIP').textContent = attackStatistics.targetIP;
    document.getElementById('attackDuration').textContent = formatDuration(attackStatistics.attackDuration);
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
        if (!target) throw new Error('Target URL is required.');

        const targetIP = await resolveTargetIP(target);
        updateStatistics(0, 0, 'Starting', targetIP);
        startStatistics();

        let attackModule;
        switch (attackType) {
            case 'ddos': attackModule = ddosAttack; break;
            case 'defacement': attackModule = defaceSite; break;
            case 'connection': attackModule = connectionEstablish; break;
            case 'credential': attackModule = credentialStuffing; break;
            default: throw new Error('Invalid attack type');
        }

        if (!attackModule || typeof attackModule.execute !== 'function') {
            throw new Error(`${attackType} module is not properly configured.`);
        }

        await attackModule.execute(target, options, updateStatistics);

    } catch (error) {
        console.error('Attack execution failed:', error);
        updateStatistics(0, 0, 'Failed');
        throw error;
    } finally {
        stopStatistics();
    }
};

module.exports = {
    init: () => console.log("Noodles Initialized."),
    startStatistics,
    stopStatistics,
    updateStatistics,
    updateStatisticsDisplay,
    executeAttack
};