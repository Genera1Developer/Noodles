const ddosAttack = require('./ddos/ddos');
const defaceSite = require('./deface/deface');
const torConnect = require('./tor/tor');
const connectionEstablish = require('./connection/connection');
const proxyGet = require('./proxy/proxy');
const ransomwareSim = require('./ransomware/ransomware');
const otherTools = require('./other/other');

module.exports = {
    ddosAttack,
    defaceSite,
    torConnect,
    connectionEstablish,
    proxyGet,
    ransomwareSim,
    otherTools,
};