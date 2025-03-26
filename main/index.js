const ddosAttack = require('./ddos/ddos');
const defaceSite = require('./deface/deface');
const torConnect = require('./tor/tor');
const connectionEstablish = require('./connection/connection');
const proxyGet = require('./proxy/proxy');

module.exports = {
    ddosAttack,
    defaceSite,
    torConnect,
    connectionEstablish,
    proxyGet,
};
