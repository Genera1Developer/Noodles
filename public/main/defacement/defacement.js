(function() {
  var config = {
    targetSelector: 'body',
    replacementText: 'Noodles!',
    backgroundColor: '#ff0000',
    textColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '20px',
    animationDuration: '2s',
    animationName: 'defacementAnimation',
    animationIterationCount: 'infinite'
  };

  function deface() {
    var target = document.querySelector(config.targetSelector);

    if (!target) {
      console.error('Target element not found: ' + config.targetSelector);
      return;
    }

    target.innerHTML = '';

    var defacementMessage = document.createElement('div');
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
      animationIterationCount: config.animationIterationCount
    });

    target.appendChild(defacementMessage);

    const styleSheetId = 'defacement-animation-style';
    if (!document.getElementById(styleSheetId)) {
      var styleSheet = document.createElement("style");
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
  }

  document.addEventListener('DOMContentLoaded', deface);

})();
