const credentials = {
  ddos: {
    methods: ['TCP-SYN', 'UDP-Flood', 'HTTP-GET', 'HTTP-POST', 'Slowloris'],
    maxThreads: 256,
    maxConnections: 1024,
    packetSizes: [64, 128, 256, 512, 1024, 2048],
    torProxyList: [
      'socks5://127.0.0.1:9050',
      'socks5://127.0.0.1:9051',
    ],
    userAgents: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15'
    ],
  },
  defacement: {
    payloads: {
      'default': '<body bgcolor="black"><center><h1 style="color:red;">HACKED BY NOODLES</h1><p style="color:white;">Site owned.</p></center></body>',
      'political': '<body bgcolor="black"><center><h1 style="color:yellow;">FREEDOM</h1><p style="color:white;">The truth will prevail.</p></center></body>',
    },
    injectionPoints: ['</body>', '</html>', '<head>'],
  },
  connection: {
    ports: [21, 22, 23, 80, 443, 8080],
    timeout: 10000,
  },
  logs: {
    maxEntries: 500,
  },
  ui: {
    theme: 'dark',
    resizable: true,
    compact: true,
  },
  apiKeys: [
    'YOUR_API_KEY_HERE',
  ],
  honeypotIps: [
    '1.1.1.1',
    '8.8.8.8',
  ],
  proxyCheckUrl: 'http://example.com',
  autoUpdate: true,
  errorReporting: true,
  debugMode: false,
  exploitDatabaseUrl: 'http://example.com/exploits.json',
  backupServerUrl: 'http://backup.example.com',
  rateLimit: {
    requestsPerMinute: 60,
  },
  geoIpLookupUrl: 'http://example.com/geoip',
  signature: 'Noodles v1.0',
};

module.exports = credentials;