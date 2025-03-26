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
    }
};