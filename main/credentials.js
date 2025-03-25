const credentials = {
  ddos: {
    methods: ['TCP-SYN', 'UDP-Flood', 'HTTP-GET', 'HTTP-POST', 'Slowloris', 'NTP-Amplification', 'DNS-Amplification', 'ACK-Flood', 'RST-Flood'],
    maxThreads: 1024,
    maxConnections: 4096,
    packetSizes: [64, 128, 256, 512, 1024, 2048, 4096, 8192],
    torProxyList: [
      'socks5://127.0.0.1:9050',
      'socks5://127.0.0.1:9051',
      'socks5://127.0.0.1:9052',
      'socks5://127.0.0.1:9053',
      'socks5://127.0.0.1:9054',
      'socks5://127.0.0.1:9055',
    ],
    userAgents: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14',
    ],
    rateLimitBypass: {
      techniques: ['cloudflare_bypass', 'incapsula_bypass', ' Sucuri_bypass'],
      headers: {
        'X-Forwarded-For': '127.0.0.1',
        'X-Real-IP': '127.0.0.1',
        'User-Agent': 'Noodles Bot',
      },
    },
  },
  defacement: {
    payloads: {
      'default': '<body bgcolor="black"><center><h1 style="color:red;">HACKED BY NOODLES</h1><p style="color:white;">Site owned.</p></center></body>',
      'political': '<body bgcolor="black"><center><h1 style="color:yellow;">FREEDOM</h1><p style="color:white;">The truth will prevail.</p></center></body>',
      'nsfw': '<body bgcolor="black"><center><img src="https://example.com/nsfw.gif"><p style="color:white;">Get Noodled!</p></center></body>',
      'rickroll': '<body bgcolor="black"><center><iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allowfullscreen></iframe></center></body>',
    },
    injectionPoints: ['</body>', '</html>', '<head>', '<form>', '<div>'],
    autoReplace: true,
    imageUrls: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.png',
    ],
  },
  connection: {
    ports: [21, 22, 23, 80, 443, 8080, 25, 110, 143, 587, 993, 995, 3306, 3389],
    timeout: 5000,
    scanType: ['TCP-Connect', 'TCP-SYN', 'UDP'],
  },
  logs: {
    maxEntries: 1000,
    logLevel: ['info', 'warn', 'error', 'debug'],
    fileRotation: true,
    maxLogFiles: 10,
  },
  ui: {
    theme: 'darkly',
    resizable: true,
    compact: true,
    animations: true,
    fontSize: '12px',
  },
  apiKeys: [
    'YOUR_API_KEY_HERE',
    'ANOTHER_API_KEY',
  ],
  honeypotIps: [
    '1.1.1.1',
    '8.8.8.8',
    '9.9.9.9',
    '192.168.1.1',
  ],
  proxyCheckUrl: 'http://example.com',
  autoUpdate: true,
  errorReporting: true,
  debugMode: true,
  exploitDatabaseUrl: 'http://example.com/exploits.json',
  backupServerUrl: 'http://backup.example.com',
  rateLimit: {
    requestsPerMinute: 120,
    burstLimit: 200,
  },
  geoIpLookupUrl: 'http://example.com/geoip',
  signature: 'Noodles v1.0',
  autoBan: {
    enabled: true,
    threshold: 10,
    duration: 3600,
  },
  security: {
    xssProtection: true,
    csrfProtection: true,
  },
  monitoring: {
    systemStats: true,
    networkStats: true,
  },
  modules: {
    portScanner: true,
    whoisLookup: true,
    headerGrabber: true,
  },
  spam: {
    email: {
      enabled: true,
      smtpServer: 'smtp.example.com',
      smtpPort: 587,
      username: 'spam@example.com',
      password: 'spamPassword',
      fromAddress: 'spam@example.com',
    },
    sms: {
      enabled: false,
      apiEndpoint: 'https://sms.example.com/send',
      apiKey: 'SMS_API_KEY',
    }
  },
  phishing: {
    cloneWebsite: true,
    redirectUrl: 'http://example.com/login',
  }
};

module.exports = credentials;