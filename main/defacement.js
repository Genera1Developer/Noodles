// ==UserScript==
// @name         Advanced Webpage Defacement Tool
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replaces webpage content with custom messages, styling, and malicious redirects. Use with extreme caution and only for demonstration purposes on systems you own or have explicit permission to modify.
// @author       TheBlackHat
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';

    const defacementConfig = {
        title: GM_getValue('title', 'Noodles!'),
        message: GM_getValue('message', 'This site has been defaced. Security is an illusion.'),
        bgColor: GM_getValue('bgColor', 'black'),
        textColor: GM_getValue('textColor', 'lime'),
        font: GM_getValue('font', 'monospace'),
        fontSize: GM_getValue('fontSize', '32px'),
        redirectURL: GM_getValue('redirectURL', ''),
        imageURL: GM_getValue('imageURL', ''),
        customCSS: GM_getValue('customCSS', ''),
        enableAnimation: GM_getValue('enableAnimation', true)
    };

    function applyDefacement() {
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
    }

    function createConfigPanel() {
        if (document.getElementById('defacementPanel')) return;

        const panel = document.createElement('div');
        panel.id = 'defacementPanel';
        panel.style.cssText = `position:fixed;top:0;left:0;background:rgba(0,0,0,0.8);color:white;padding:10px;z-index:9999;font-family: monospace; font-size: 14px;`;

        const createInput = (label, key) => {
            const div = document.createElement('div');
            div.style.marginBottom = '5px';
            const lbl = document.createElement('label');
            lbl.textContent = label + ': ';
            lbl.style.marginRight = '5px';
            const input = document.createElement('input');
            input.type = 'text';
            input.value = defacementConfig[key];
            input.style.width = '300px';
            input.addEventListener('change', (e) => GM_setValue(key, e.target.value));
            div.appendChild(lbl);
            div.appendChild(input);
            return div;
        };

        const createCheckbox = (label, key) => {
          const div = document.createElement('div');
          div.style.marginBottom = '5px';
          const lbl = document.createElement('label');
          lbl.textContent = label + ': ';
          lbl.style.marginRight = '5px';
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = defacementConfig[key];
          checkbox.addEventListener('change', (e) => GM_setValue(key, e.target.checked));
          div.appendChild(lbl);
          div.appendChild(checkbox);
          return div;
        };

        panel.appendChild(createInput('Title', 'title'));
        panel.appendChild(createInput('Message', 'message'));
        panel.appendChild(createInput('Background Color', 'bgColor'));
        panel.appendChild(createInput('Text Color', 'textColor'));
        panel.appendChild(createInput('Font', 'font'));
        panel.appendChild(createInput('Font Size', 'fontSize'));
        panel.appendChild(createInput('Redirect URL', 'redirectURL'));
        panel.appendChild(createInput('Image URL', 'imageURL'));
        panel.appendChild(createInput('Custom CSS', 'customCSS'));
        panel.appendChild(createCheckbox('Enable Animation', 'enableAnimation'));

        const refreshButton = document.createElement('button');
        refreshButton.textContent = 'Apply Changes';
        refreshButton.style.cssText = 'margin-top: 10px; padding: 5px 10px; background: #444; color: white; border: none; cursor: pointer;';
        refreshButton.addEventListener('click', applyDefacement);
        panel.appendChild(refreshButton);


        document.body.appendChild(panel);
    }


    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createConfigPanel);
        document.addEventListener('DOMContentLoaded', applyDefacement);
    } else {
        createConfigPanel();
        applyDefacement();
    }
})();
