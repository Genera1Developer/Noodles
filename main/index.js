const { ddos } = require('./ddos/ddos.js');
const { deface } = require('./deface/deface.js');
const { connect } = require('./tor/tor.js');
const { ransomware } = require('./ransomware/ransomware.js');

module.exports = {
    ddos,
    deface,
    connect,
    ransomware
};