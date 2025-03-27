// tor.js

const { SocksClient } = require('socks'); // Requires socks package

/**
 * Establishes a connection through a Tor proxy.
 * @param {object} options - Configuration options for the Tor connection.
 * @param {string} options.host - The target host to connect to (e.g., 'example.com').
 * @param {number} options.port - The target port to connect to (e.g., 80).
 * @param {string} options.torHost - The Tor proxy host (default: '127.0.0.1').
 * @param {number} options.torPort - The Tor proxy port (default: 9050).
 * @returns {Promise<SocksClient>} - A Promise that resolves with the SocksClient object upon successful connection, or rejects with an error.
 */
async function connectToTor(options) {
  const { host, port, torHost = '127.0.0.1', torPort = 9050 } = options;

  console.log(`Attempting to connect to ${host}:${port} through Tor proxy ${torHost}:${torPort}`);

  const socksOptions = {
    proxy: {
      host: torHost,
      port: torPort,
      type: 5 // SOCKS v5
    },
    command: 'connect',
    destination: {
      host: host,
      port: port
    }
  };

  try {
    const result = await SocksClient.createConnection(socksOptions);
    console.log(`Successfully connected to ${host}:${port} through Tor`);
    return result; // Returns the successful socket object
  } catch (err) {
    console.error("Failed to connect to Tor:", err);
    throw err; // Re-throw the error for handling by the caller
  }
}

module.exports = {
  connectToTor: connectToTor
};