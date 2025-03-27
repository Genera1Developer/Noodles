const https = require('https');
const http = require('http');
const SocksProxyAgent = require('socks-proxy-agent');

/**
 * Connects to a target URL via a proxy server.
 *
 * @param {string} targetUrl The URL to connect to.
 * @param {string} proxyUrl The URL of the proxy server.
 * @param {object} [requestOptions] Optional request options to override default ones.
 * @returns {Promise<object>} A promise that resolves with the response data, headers, and status code, or rejects with an error.
 * @throws {Error} If there is an error during the proxy connection.
 */
async function connectViaProxy(targetUrl, proxyUrl, requestOptions = {}) {
  try {
    const parsedTarget = new URL(targetUrl);
    const parsedProxy = new URL(proxyUrl);

    const proxyOptions = {
      protocol: parsedProxy.protocol,
      hostname: parsedProxy.hostname,
      port: parseInt(parsedProxy.port, 10), // Ensure port is a number
      userId: parsedProxy.username,
      password: parsedProxy.password,
    };

    const defaultHeaders = {
      'User-Agent': 'Noodles/1.6.6',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    };

    const options = {
      hostname: parsedTarget.hostname,
      port: parseInt(parsedTarget.port, 10) || (parsedTarget.protocol === 'https:' ? 443 : 80), // Ensure port is a number
      path: parsedTarget.pathname + parsedTarget.search,
      method: 'GET',
      headers: { ...defaultHeaders, ...requestOptions.headers }, // Merge default headers with request-specific headers, allowing overrides
      ...requestOptions, // Allow other request options to be passed through (e.g., timeout, followRedirects)
    };

    let agent = null;
    if (parsedProxy.protocol.startsWith('socks')) {
      agent = new SocksProxyAgent(proxyUrl);
    } else if (parsedProxy.protocol.startsWith('http')) {
      agent = new http.Agent(proxyOptions);
    }
    options.agent = agent;

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
            data,
          });
        });
        res.on('error', (error) => {  // Handle errors on the response stream
          reject(error);
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.setTimeout(10000, () => {
        req.destroy(new Error('Request timeout'));
      });

      req.end();
    });

  } catch (error) {
    console.error('Proxy Connection Error:', error); // Include the full error object
    throw error;
  }
}

module.exports = { connectViaProxy };