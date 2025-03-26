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
            switch (attackType) {
                case 'ddos':
                    await ddosAttack.execute(target, options);
                    break;
                case 'deface':
                    await defaceSite.execute(target, options);
                    break;
                case 'connection':
                    await connectionEstablish.execute(target, options);
                    break;
                case 'ransomware':
                    await ransomwareSim.execute(target, options);
                    break;
                case 'other':
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