const { ddos } = require('.main/ddos/ddos.js'); // /ddos/ddos.js is located in main directory and so are the others
const { deface } = require('.main/deface/deface.js');
const { connect } = require('.main/tor/tor.js');
const { ransomware } = require('.main/ransomware/ransomware.js');

module.exports = {
    ddos,
    deface,
    connect,
    ransomware
};
