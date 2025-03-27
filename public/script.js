document.addEventListener('DOMContentLoaded', () => {
  const targetInput = document.getElementById('targetInput');
  const attackTypeSelect = document.getElementById('attackType');
  const attackButton = document.getElementById('attackButton');
  const mbpsDisplay = document.getElementById('mbps');
  const packetsSentDisplay = document.getElementById('packetsSent');
  const targetStatusDisplay = document.getElementById('targetStatus');
  const timeElapsedDisplay = document.getElementById('timeElapsed');
  const sidePanel = document.querySelector('.side-panel');
  const navLinks = document.querySelectorAll('.nav-link');
  const tabContents = document.querySelectorAll('.tab-content');
  let attackStartTime;
  let attackInterval;

  const updateStats = (data) => {
    mbpsDisplay.textContent = data.mbps.toFixed(2);
    packetsSentDisplay.textContent = data.packetsSent;
    targetStatusDisplay.textContent = data.targetStatus;
  };

  const startAttack = async (target, attackType) => {
    attackStartTime = Date.now();
    attackInterval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - attackStartTime) / 1000);
      timeElapsedDisplay.textContent = elapsedTime;
    }, 1000);

    try {
      const response = await fetch(`/main/${attackType}.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: target, duration: 60, intensity: 100 }) // Fixed duration and intensity
      });

      if (response.ok) {
        const data = await response.json();
        updateStats(data);
        clearInterval(attackInterval);
      } else {
        console.error('Attack failed:', response.status);
        clearInterval(attackInterval);
      }
    } catch (error) {
      console.error('Error during attack:', error);
      clearInterval(attackInterval);
    }
  };

  attackButton.addEventListener('click', () => {
    const target = targetInput.value;
    const attackType = attackTypeSelect.value;
    startAttack(target, attackType);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = link.getAttribute('data-target');

      tabContents.forEach(content => {
        content.classList.remove('active');
      });

      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });

      document.getElementById(target).classList.add('active');
      link.classList.add('active');
    });
  });
});