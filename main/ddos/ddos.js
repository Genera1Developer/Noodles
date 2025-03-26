class DDoS {
 constructor() {
  this.logArea = this.createLogArea();
  this.targetInput = this.createTargetInput();
  this.attackTypeSelect = this.createAttackTypeSelect();
  this.startButton = this.createStartButton();
  this.stopButton = this.createStopButton();
  this.customCodeArea = this.createCustomCodeArea();
  this.statsPanel = this.createStatsPanel();
  this.torToggle = this.createTorToggle();
  this.proxyList = this.createProxyList();
  this.proxyRefreshButton = this.createProxyRefreshButton();
  this.threadSlider = this.createThreadSlider();
  this.container = this.createContainer();
  this.sidePanel = this.createSidePanel();
  this.aboutUs = this.createAboutUs();

  this.appendElements();
  this.setupEventListeners();

  this.torProxy = 'socks5://127.0.0.1:9050';
  this.apiKey = this.generateApiKey();
  this.encryptionKey = this.generateEncryptionKey();
  this.log(`API Key generated: ${this.apiKey}`);
  this.log(`Encryption Key generated: ${this.encryptionKey}`);
  this.setupResizeHandle();
  this.setupDragHandle();
  this.setupTheme();

  this.availableProxies = [];

  this.toggleCustomCodeArea();
  this.autoFillTarget();
  this.updateStats();
  this.populateProxyList();

  this.packetsSent = 0;
  this.mbps = 0;
  this.connectionStatus = 'Idle';
  this.errors = 0;
  this.dataSent = 0;
  this.activeThreads = 0;
  this.attackStartTime = null;

  this.statsInterval = setInterval(() => this.updateStats(), 1000);

  this.isTorEnabled = false;
  this.torProxy = 'socks5://127.0.0.1:9050';
  this.running = false;
  this.maxThreads = 100;
  this.threadSlider.querySelector('input').value = this.maxThreads;

  this.stopButton.disabled = true;
 }

 appendElements() {
  this.container.appendChild(this.targetInput);
  this.container.appendChild(this.attackTypeSelect);
  this.container.appendChild(this.customCodeArea);
  this.container.appendChild(this.threadSlider);
  this.container.appendChild(this.torToggle);
  this.container.appendChild(this.proxyList);
  this.container.appendChild(this.proxyRefreshButton);
  this.container.appendChild(this.startButton);
  this.container.appendChild(this.stopButton);
  this.container.appendChild(this.statsPanel);
  this.container.appendChild(this.logArea);

  document.body.appendChild(this.container);
  document.body.appendChild(this.sidePanel);
  document.body.appendChild(this.aboutUs);
 }

 setupEventListeners() {
  this.attackTypeSelect.addEventListener('change', () => this.toggleCustomCodeArea());
  this.startButton.addEventListener('click', () => this.start());
  this.stopButton.addEventListener('click', () => this.stop());
  this.proxyRefreshButton.addEventListener('click', () => this.refreshProxies());
  this.torToggle.querySelector('input').addEventListener('change', () => this.toggleTor());
 }

 createThreadSlider() {
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('noodle-slider-container');

  const label = document.createElement('label');
  label.textContent = 'Threads: ';
  label.classList.add('noodle-label');
  sliderContainer.appendChild(label);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '10';
  slider.max = '500';
  slider.value = '100';
  slider.classList.add('noodle-slider');
  sliderContainer.appendChild(slider);

  const valueDisplay = document.createElement('span');
  valueDisplay.textContent = '100';
  valueDisplay.classList.add('noodle-slider-value');
  sliderContainer.appendChild(valueDisplay);

  slider.addEventListener('input', () => {
   this.maxThreads = parseInt(slider.value);
   valueDisplay.textContent = slider.value;
  });

  return sliderContainer;
 }

 createProxyRefreshButton() {
  const button = document.createElement('button');
  button.textContent = 'Refresh Proxies';
  button.classList.add('noodle-button');
  return button;
 }

 async refreshProxies() {
  this.log('Refreshing proxy list... ');
  try {
   const response = await fetch('/api/proxies', {
    method: 'GET',
    headers: {
     'X-API-Key': this.apiKey
    }
   });

   if (response.ok) {
    const data = await response.json();
    this.availableProxies = data.proxies;
    this.populateProxyList();
    this.log(`Proxies refreshed. Found ${this.availableProxies.length} proxies.`);
   } else {
    this.log('Failed to refresh proxies.');
   }
  } catch (error) {
   this.log(`Error refreshing proxies: ${error}`);
  }
 }

 populateProxyList() {
  this.proxyList.innerHTML = '';
  this.availableProxies.forEach(proxy => {
   const option = document.createElement('option');
   option.value = proxy;
   option.textContent = proxy;
   this.proxyList.appendChild(option);
  });
 }

 createProxyList() {
  const select = document.createElement('select');
  select.classList.add('noodle-input');
  return select;
 }

 createTorToggle() {
  const torToggle = document.createElement('div');
  torToggle.classList.add('noodle-tor-container');

  const label = document.createElement('label');
  label.htmlFor = 'torToggle';
  label.textContent = 'Use Tor';
  label.classList.add('noodle-label');
  torToggle.appendChild(label);

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = 'torToggle';
  torToggle.appendChild(input);

  return torToggle;
 }

 toggleTor() {
  this.isTorEnabled = this.torToggle.querySelector('input').checked;
  this.log(`Tor usage: ${this.isTorEnabled ? 'Enabled' : 'Disabled'}`);
 }

 updateStats() {
  const mbpsChange = (Math.random() * 20 - 10);
  this.mbps = Math.max(0, this.mbps + mbpsChange);
  this.packetsSent += Math.floor(Math.random() * (this.activeThreads * 5));
  this.connectionStatus = this.activeThreads > 0 ? 'Attacking' : (this.running ? 'Stopping' : 'Idle');
  this.errors += Math.floor(Math.random() * (this.activeThreads / 10));
  this.dataSent += Math.floor(this.mbps * 125);

  let elapsedTime = 0;
  if (this.attackStartTime) {
   elapsedTime = Math.floor((Date.now() - this.attackStartTime) / 1000);
  }
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  const statsHtml = `
   <p>MBPS: ${this.mbps.toFixed(2)}</p>
   <p>Packets Sent: ${this.packetsSent}</p>
   <p>Data Sent: ${(this.dataSent / 1024).toFixed(2)} MB</p>
   <p>Connection Status: ${this.connectionStatus}</p>
   <p>Errors: ${this.errors}</p>
   <p>Active Threads: ${this.activeThreads}</p>
   <p>Time Elapsed: ${minutes}m ${seconds}s</p>
  `;
  this.statsPanel.innerHTML = statsHtml;
 }

 createStatsPanel() {
  const statsPanel = document.createElement('div');
  statsPanel.classList.add('noodle-stats');
  return statsPanel;
 }

 autoFillTarget() {
  const params = new URLSearchParams(window.location.search);
  const target = params.get('target');
  if (target) {
   this.targetInput.value = target;
  }
 }

 setupTheme() {
  document.body.classList.add('noodle-dark-theme');
 }

 createLogArea() {
  const logArea = document.createElement('textarea');
  logArea.readOnly = true;
  logArea.classList.add('noodle-log');
  return logArea;
 }

 createTargetInput() {
  const targetInput = document.createElement('input');
  targetInput.type = 'text';
  targetInput.placeholder = 'Target URL (.onion or normal)';
  targetInput.classList.add('noodle-input');
  return targetInput;
 }

 createAttackTypeSelect() {
  const attackTypeSelect = document.createElement('select');
  const attackTypes = ['DDoS', 'Deface', 'Connect', 'Exploit', 'Brute Force', 'Custom', 'Ransomware', 'Phishing', 'Data Breach', 'Botnet', 'Zero-Day', 'SQL Inject', 'XSS', 'Mass Exploit', 'Port Scan', 'Credential Stuffing', 'Network Scan', 'Vuln Scan', 'Reverse Shell', 'DNS Poisoning', 'Session Hijacking'];
  attackTypes.forEach(option => {
   const opt = document.createElement('option');
   opt.value = option.toLowerCase().replace(/ /g, '_').replace(/-/g, '_');
   opt.textContent = option;
   attackTypeSelect.appendChild(opt);
  });
  attackTypeSelect.classList.add('noodle-input');
  return attackTypeSelect;
 }

 createStartButton() {
  const startButton = document.createElement('button');
  startButton.textContent = 'Initiate Attack';
  startButton.classList.add('noodle-button');
  return startButton;
 }

 createStopButton() {
  const stopButton = document.createElement('button');
  stopButton.textContent = 'Stop Attack';
  stopButton.classList.add('noodle-button');
  stopButton.disabled = true;
  return stopButton;
 }

 createCustomCodeArea() {
  const customCodeArea = document.createElement('textarea');
  customCodeArea.placeholder = 'Enter custom JavaScript code for attack';
  customCodeArea.classList.add('noodle-input');
  customCodeArea.classList.add('noodle-custom-code');
  return customCodeArea;
 }

 createContainer() {
  const container = document.createElement('div');
  container.id = 'main-container';
  container.classList.add('noodle-container');
  return container;
 }

 createSidePanel() {
  const sidePanel = document.createElement('div');
  sidePanel.id = 'side-panel';
  sidePanel.classList.add('noodle-side-panel');

  const menuItems = [{
   name: 'DDoS 💥',
   action: () => this.setAttackType('ddos')
  }, {
   name: 'Deface 💀',
   action: () => this.setAttackType('deface')
  }, {
   name: 'Connection 💻',
   action: () => this.setAttackType('connect')
  }, {
   name: 'Ransomware 💣',
   action: () => this.setAttackType('ransomware')
  }, {
   name: 'Port Scan ⚠',
   action: () => this.setAttackType('port_scan')
  }, {
   name: 'Credential Stuffing',
   action: () => this.setAttackType('credential_stuffing')
  }, {
   name: 'Network Scan',
   action: () => this.setAttackType('network_scan')
  }, {
   name: 'Vuln Scan',
   action: () => this.setAttackType('vuln_scan')
  }, {
   name: 'Reverse Shell',
   action: () => this.setAttackType('reverse_shell')
  }, {
   name: 'DNS Poisoning',
   action: () => this.setAttackType('dns_poisoning')
  }, {
   name: 'Session Hijacking',
   action: () => this.setAttackType('session_hijacking')
  }, {
   name: 'About Us',
   action: () => this.showAboutUs()
  }];

  menuItems.forEach(item => {
   const menuItem = document.createElement('div');
   menuItem.textContent = item.name;
   menuItem.classList.add('noodle-menu-item');
   menuItem.addEventListener('click', item.action);
   sidePanel.appendChild(menuItem);
  });

  return sidePanel;
 }

 createAboutUs() {
  const aboutUs = document.createElement('div');
  aboutUs.id = 'about-us';
  aboutUs.classList.add('noodle-about-us');

  aboutUs.innerHTML = `
   <h2>About Noodles</h2>
   <p>Noodles is a cutting-edge penetration testing tool designed to expose vulnerabilities and push the limits of network security. It is intended solely for authorized security assessments. Misuse of this tool is strictly prohibited. </p>
   <p>Created by: Anonymous Group</p>
   <p>Disclaimer: This tool is provided for educational and ethical testing purposes only. The developers are not responsible for any misuse or damage caused by this tool.</p>
   <button id="close-about-us" class="noodle-button">Close</button>
  `;

  const closeButton = aboutUs.querySelector('#close-about-us');
  closeButton.addEventListener('click', () => {
   this.hideAboutUs();
  });

  return aboutUs;
 }

 showAboutUs() {
  this.aboutUs.style.display = 'block';
 }

 hideAboutUs() {
  this.aboutUs.style.display = 'none';
 }

 toggleCustomCodeArea() {
  this.customCodeArea.style.display = this.attackTypeSelect.value === 'custom' ? 'block' : 'none';
 }

 setupDragHandle() {
  const dragHandle = document.createElement('div');
  dragHandle.classList.add('noodle-drag-handle');
  this.container.appendChild(dragHandle);

  let initialX, initialY;

  const startDrag = (e) => {
   initialX = e.clientX - this.container.offsetLeft;
   initialY = e.clientY - this.container.offsetTop;

   document.addEventListener('mousemove', drag);
   document.addEventListener('mouseup', stopDrag);
  };

  const drag = (e) => {
   this.container.style.left = (e.clientX - initialX) + 'px';
   this.container.style.top = (e.clientY - initialY) + 'px';
  };

  const stopDrag = () => {
   document.removeEventListener('mousemove', drag);
   document.removeEventListener('mouseup', stopDrag);
  };

  dragHandle.addEventListener('mousedown', startDrag);
 }

 setupResizeHandle() {
  const resizeHandle = document.createElement('div');
  resizeHandle.classList.add('noodle-resize-handle');
  this.container.appendChild(resizeHandle);

  let initialWidth, initialHeight, initialMouseX, initialMouseY;

  const startResize = (e) => {
   initialWidth = this.container.offsetWidth;
   initialHeight = this.container.offsetHeight;
   initialMouseX = e.clientX;
   initialMouseY = e.clientY;

   document.addEventListener('mousemove', resize);
   document.addEventListener('mouseup', stopResize);
  };

  const resize = (e) => {
   const width = initialWidth + (e.clientX - initialMouseX);
   const height = initialHeight + (e.clientY - initialMouseY);
   this.container.style.width = width + 'px';
   this.container.style.height = height + 'px';
  };

  const stopResize = () => {
   document.removeEventListener('mousemove', resize);
   document.removeEventListener('mouseup', stopResize);
  };

  resizeHandle.addEventListener('mousedown', startResize);
 }

 async exploit(target) {
  this.log(`Attempting to exploit ${target}...`);
  try {
   const response = await fetch(`/api/exploit?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'GET'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Exploit failed: ${error}`);
   this.errors++;
  }
 }

 async massExploit() {
  this.log('Starting mass exploit...');
  try {
   const response = await fetch(`/api/mass_exploit?apiKey=${this.apiKey}`, {
    method: 'GET'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Mass exploit failed: ${error}`);
   this.errors++;
  }
 }

 async deface(target) {
  this.log(`Attempting to deface ${target}...`);
  try {
   const response = await fetch(`/api/deface?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Deface failed: ${error}`);
   this.errors++;
  }
 }

 async connect(target) {
  this.log(`Attempting to connect to ${target}...`);
  try {
   const response = await fetch(`/api/connect?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'GET'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Connection failed: ${error}`);
   this.errors++;
  }
 }

 async bruteForce(target) {
  this.log(`Starting brute force attack on ${target}...`);
  try {
   const response = await fetch(`/api/brute_force?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Brute force attack failed: ${error}`);
   this.errors++;
  }
 }

 async ddos(target) {
  if (this.running) {
   this.log('DDoS attack already in progress. Stop before starting a new one.');
   return;
  }

  this.log(`Initiating DDoS attack on ${target}...`);
  this.connectionStatus = 'Attacking';
  this.running = true;
  this.startButton.disabled = true;
  this.stopButton.disabled = false;
  this.attackStartTime = Date.now();

  const attackLoop = async () => {
   if (!this.running) {
    this.connectionStatus = 'Idle';
    return;
   }

   if (this.activeThreads < this.maxThreads) {
    this.activeThreads++;
    this.sendDDoSRequest(target)
     .finally(() => {
      this.activeThreads--;
      if (this.running) {
       attackLoop();
      } else {
       this.connectionStatus = 'Idle';
      }
     });
   } else {
    await new Promise(resolve => setTimeout(resolve, 10));
    attackLoop();
   }
  };

  for (let i = 0; i < Math.min(5, this.maxThreads / 10); i++) {
   attackLoop();
  }
 }

 async sendDDoSRequest(target) {
  try {
   const proxy = this.isTorEnabled ? this.torProxy : this.proxyList.value;
   const url = `/api/ddos?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}&tor=${this.isTorEnabled}&proxy=${encodeURIComponent(proxy)}`;
   const response = await fetch(url, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
   this.packetsSent++;
  } catch (err) {
   this.log(`DDoS attack failed: ${err}`);
   this.errors++;
  }
 }

 async ransomware(target) {
  this.log(`Simulating ransomware attack on ${target}...`);
  try {
   const response = await fetch(`/api/ransomware?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Ransomware attack simulation failed: ${error}`);
   this.errors++;
  }
 }

 async custom(target) {
  this.log(`Executing custom code on ${target}...`);
  try {
   const customCode = this.customCodeArea.value;
   if (!customCode) {
    this.log('No custom code provided.');
    return;
   }
   const response = await fetch(`/api/custom?target=${encodeURIComponent(target)}&code=${encodeURIComponent(customCode)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Custom code execution failed: ${error}`);
   this.errors++;
  }
 }

 async phishing(target) {
  this.log(`Initiating phishing attack targeting: ${target}...`);
  try {
   const response = await fetch(`/api/phishing?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Phishing attack simulation failed: ${error}`);
   this.errors++;
  }
 }

 async dataBreach(target) {
  this.log(`Simulating data breach on ${target}...`);
  try {
   const response = await fetch(`/api/data_breach?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Data breach simulation failed: ${error}`);
   this.errors++;
  }
 }

 async botnet(target) {
  this.log(`Attempting to connect to target: ${target}...`);
  try {
   const response = await fetch(`/api/botnet?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Botnet connection failed: ${error}`);
   this.errors++;
  }
 }

 async zero_day(target) {
  this.log(`Attempting zero-day exploit on ${target}...`);
  try {
   const response = await fetch(`/api/zero_day?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Zero-day exploit failed: ${error}`);
   this.errors++;
  }
 }

 async sql_inject(target) {
  this.log(`Attempting SQL injection on ${target}...`);
  try {
   const response = await fetch(`/api/sql_inject?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`SQL injection failed: ${error}`);
   this.errors++;
  }
 }

 async xss(target) {
  this.log(`Attempting XSS attack on ${target}...`);
  try {
   const response = await fetch(`/api/xss?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`XSS attack failed: ${error}`);
   this.errors++;
  }
 }

 async port_scan(target) {
  this.log(`Starting port scan on ${target}...`);
  try {
   const response = await fetch(`/api/port_scan?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Port scan failed: ${error}`);
   this.errors++;
  }
 }

 async credential_stuffing(target) {
  this.log(`Starting credential stuffing attack on ${target}...`);
  try {
   const response = await fetch(`/api/credential_stuffing?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Credential stuffing attack failed: ${error}`);
   this.errors++;
  }
 }

 async network_scan(target) {
  this.log(`Starting network scan on ${target}...`);
  try {
   const response = await fetch(`/api/network_scan?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Network scan failed: ${error}`);
   this.errors++;
  }
 }

 async vuln_scan(target) {
  this.log(`Starting vulnerability scan on ${target}...`);
  try {
   const response = await fetch(`/api/vuln_scan?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Vulnerability scan failed: ${error}`);
   this.errors++;
  }
 }

 async reverse_shell(target) {
  this.log(`Attempting to establish a reverse shell on ${target}...`);
  try {
   const response = await fetch(`/api/reverse_shell?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Reverse shell failed: ${error}`);
   this.errors++;
  }
 }

 async dns_poisoning(target) {
  this.log(`Attempting DNS poisoning on ${target}...`);
  try {
   const response = await fetch(`/api/dns_poisoning?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`DNS poisoning failed: ${error}`);
   this.errors++;
  }
 }

 async session_hijacking(target) {
  this.log(`Attempting session hijacking on ${target}...`);
  try {
   const response = await fetch(`/api/session_hijacking?target=${encodeURIComponent(target)}&apiKey=${this.apiKey}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.log(`Session hijacking failed: ${error}`);
   this.errors++;
  }
 }

 sendRequest(target, method, body = null) {
  const proxy = this.availableProxies[Math.floor(Math.random() * this.availableProxies.length)];
  this.log(`${method} request sent successfully to ${target} via ${proxy}.`);
 }

 generateApiKey() {
  let key = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
   key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
 }

 generateEncryptionKey() {
  let key = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-`~[]\{}|;\':",./<>?';
  for (let i = 0; i < 64; i++) {
   key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
 }

 start() {
  const target = this.targetInput.value;
  const attackType = this.attackTypeSelect.value;

  if (!target) {
   this.log('Please enter a target URL.');
   return;
  }

  if (typeof this[attackType] === 'function') {
   this[attackType](target);
  } else {
   this.log(`Attack type "${attackType}" not implemented.`);
  }
 }

 stop() {
  this.running = false;
  this.connectionStatus = 'Stopping';
  this.log('Stopping attack...');
  this.startButton.disabled = false;
  this.stopButton.disabled = true;
  this.attackStartTime = null;
  this.activeThreads = 0;
 }

 setAttackType(attackType) {
  this.attackTypeSelect.value = attackType;
  this.toggleCustomCodeArea();
 }

 log(message) {
  this.logArea.value += message + '\n';
  this.logArea.scrollTop = this.logArea.scrollHeight;
 }
}

window.addEventListener('load', () => {
 new DDoS();
});