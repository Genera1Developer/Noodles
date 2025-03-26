const ddosAttack = require('./ddos/ddos');
const defaceSite = require('./deface/deface');
const connectionEstablish = require('./connection/connection');
const ransomwareSim = require('./ransomware/ransomware');
const otherTools = require('./other/other');
const proxyHandler = require('./proxy/proxy');

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
    executeAttack: async (target, attackType, options) => {
        try {
            if (!target) {
                throw new Error('Target URL is required.');
            }
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
        }
    }
};