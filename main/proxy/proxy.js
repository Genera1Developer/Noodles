const https = require('https');
const http = require('http');
const SocksProxyAgent = require('socks-proxy-agent');

async function connectViaProxy(targetUrl, proxyUrl) {
  try {
    const parsedTarget = new URL(targetUrl);
    const parsedProxy = new URL(proxyUrl);

    const options = {
      hostname: parsedTarget.hostname,
      port: parsedTarget.port || (parsedTarget.protocol === 'https:' ? 443 : 80),
      path: parsedTarget.pathname + parsedTarget.search,
      method: 'GET',
      agent: parsedProxy.protocol.startsWith('socks') ? new SocksProxyAgent(proxyUrl) : undefined,
      headers: {
        'User-Agent': 'Noodles/1.0 (😈)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    };

    if (!options.agent && parsedProxy.protocol.startsWith('http')) {
        options.agent = new http.Agent({ proxy: parsedProxy });
    }

    const protocol = parsedTarget.protocol === 'https:' ? https : http;

    return new Promise((resolve, reject) => {
      const req = protocol.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data,
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });

  } catch (error) {
    console.error('Proxy Connection Error:', error.message);
    throw error;
  }
}

module.exports = { connectViaProxy };