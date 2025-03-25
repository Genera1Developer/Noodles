const credentials = {
  ddos: {
    methods: ['TCP-SYN', 'UDP-Flood', 'HTTP-GET', 'HTTP-POST', 'Slowloris', 'NTP-Amplification', 'DNS-Amplification', 'ACK-Flood', 'RST-Flood', 'ICMP-Flood', 'SYN-ACK-Flood', 'HTTP-Proxy', 'SOCKS4-Proxy', 'SOCKS5-Proxy', 'LAND-Attack', 'Ping-of-Death', 'Smurf-Attack', 'Teardrop-Attack'],
    maxThreads: 4096,
    maxConnections: 8192,
    packetSizes: [64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768],
    torProxyList: [
      'socks5://127.0.0.1:9050',
      'socks5://127.0.0.1:9051',
      'socks5://127.0.0.1:9052',
      'socks5://127.0.0.1:9053',
      'socks5://127.0.0.1:9054',
      'socks5://127.0.0.1:9055',
      'socks5://127.0.0.1:9056',
      'socks5://127.0.0.1:9057',
      'socks5://127.0.0.1:9058',
      'socks5://127.0.0.1:9059',
    ],
    userAgentFile: './main/ddos/useragents.txt',
    rateLimitBypass: {
      techniques: ['cloudflare_bypass', 'incapsula_bypass', 'Sucuri_bypass', 'Akamai_bypass', 'custom_headers'],
      headers: {
        'X-Forwarded-For': '127.0.0.1',
        'X-Real-IP': '127.0.0.1',
        'User-Agent': 'Noodles Bot',
        'Referer': 'https://google.com',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
      },
    },
    advancedOptions: {
      autoAdjustThreads: true,
      randomizePacketSize: true,
      spoofSourceAddress: true,
      maxDuration: 3600,
    },
  },
  defacement: {
    payloads: {
      'default': '<body bgcolor="black"><center><h1 style="color:red;">HACKED BY NOODLES</h1><p style="color:white;">Site owned.</p></center></body>',
      'political': '<body bgcolor="black"><center><h1 style="color:yellow;">FREEDOM</h1><p style="color:white;">The truth will prevail.</p></center></body>',
      'nsfw': '<body bgcolor="black"><center><img src="https://example.com/nsfw.gif"><p style="color:white;">Get Noodled!</p></center></body>',
      'rickroll': '<body bgcolor="black"><center><iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allowfullscreen></iframe></center></body>',
      'custom': '',
    },
    injectionPoints: ['</body>', '</html>', '<head>', '<form>', '<div>', '<script>', '<iframe>'],
    autoReplace: true,
    imageUrls: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.png',
      'https://example.com/image3.gif',
      'https://example.com/image4.jpeg',
    ],
    obfuscate: true,
    backupContent: true,
  },
  connection: {
    ports: [21, 22, 23, 80, 443, 8080, 25, 110, 143, 587, 993, 995, 3306, 3389, 27017, 6379],
    timeout: 2000,
    scanType: ['TCP-Connect', 'TCP-SYN', 'UDP', 'Xmas', 'Null', 'FIN'],
    concurrency: 512,
    stealthMode: true,
  },
  logs: {
    maxEntries: 5000,
    logLevel: ['info', 'warn', 'error', 'debug', 'verbose'],
    fileRotation: true,
    maxLogFiles: 20,
    logFormat: 'json',
    remoteSyslog: {
      enabled: false,
      host: 'syslog.example.com',
      port: 514,
    },
  },
  ui: {
    theme: 'darkly',
    resizable: true,
    compact: true,
    animations: true,
    fontSize: '13px',
    customCss: '',
    notifications: true,
  },
  apiKeys: [
    'YOUR_API_KEY_HERE',
    'ANOTHER_API_KEY',
    'ADMIN_KEY',
  ],
  honeypotIps: [
    '1.1.1.1',
    '8.8.8.8',
    '9.9.9.9',
    '192.168.1.1',
    '10.0.0.1',
    '172.16.0.1',
  ],
  proxyCheckUrl: 'http://example.com',
  autoUpdate: true,
  errorReporting: true,
  debugMode: true,
  exploitDatabaseUrl: 'http://example.com/exploits.json',
  backupServerUrl: 'http://backup.example.com',
  rateLimit: {
    requestsPerMinute: 240,
    burstLimit: 400,
    banDuration: 600,
  },
  geoIpLookupUrl: 'http://example.com/geoip',
  signature: 'Noodles v1.0',
  autoBan: {
    enabled: true,
    threshold: 5,
    duration: 7200,
    whitelistIps: ['127.0.0.1'],
  },
  security: {
    xssProtection: true,
    csrfProtection: true,
    contentSecurityPolicy: "default-src 'self'",
    hstsEnabled: true,
  },
  monitoring: {
    systemStats: true,
    networkStats: true,
    processStats: true,
    bandwidthStats: true,
    alerting: {
      cpuThreshold: 90,
      memoryThreshold: 90,
      diskThreshold: 95,
    },
  },
  modules: {
    portScanner: true,
    whoisLookup: true,
    headerGrabber: true,
    dnsLookup: true,
    reverseIpLookup: true,
    subnetCalculator: true,
  },
  spam: {
    email: {
      enabled: true,
      smtpServer: 'smtp.example.com',
      smtpPort: 587,
      username: 'spam@example.com',
      password: 'spamPassword',
      fromAddress: 'spam@example.com',
      rateLimit: 300,
    },
    sms: {
      enabled: true,
      apiEndpoint: 'https://sms.example.com/send',
      apiKey: 'SMS_API_KEY',
      rateLimit: 100,
    }
  },
  phishing: {
    cloneWebsite: true,
    redirectUrl: 'http://example.com/login',
    customPages: {
      'login': 'http://example.com/login.html',
      'signup': 'http://example.com/signup.html',
    },
    sslEnabled: true,
  },
  botnet: {
    enabled: true,
    controlServer: 'http://control.example.com',
    encryptionKey: 'SUPER_SECRET_KEY',
  },
  torIntegration: {
    enabled: true,
    controlPort: 9051,
    password: 'TOR_PASSWORD',
  },
  dataExfiltration: {
    enabled: true,
    exfiltrationMethod: ['FTP', 'HTTP', 'DNS', 'Email'],
    exfiltrationServer: 'ftp.example.com',
    exfiltrationPath: '/data',
  },
  automaticExploitation: {
    enabled: true,
    targets: ['SQL Injection', 'XSS', 'RCE', 'LFI'],
    customExploits: [
      {
        name: 'MyCustomExploit',
        payload: 'evil_code',
        target: 'RCE'
      }
    ]
  }
};

module.exports = credentials;