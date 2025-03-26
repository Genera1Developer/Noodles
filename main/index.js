const { ddos } = require('./ddos/ddos');
const { deface } = require('./deface/deface');
const { connect } = require('./connect/connect');
const { ransomware } = require('./ransomware/ransomware');

module.exports = {
    ddos,
    deface,
    connect,
    ransomware
};