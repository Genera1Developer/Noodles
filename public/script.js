document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
  });

  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      const tabId = tab.getAttribute('data-tab');
      tab.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  const attackForm = document.getElementById('attack-form');
  if (attackForm) {
    attackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const target = document.getElementById('target').value;
      const type = document.getElementById('attack-type').value;
      const duration = document.getElementById('duration').value;

      const result = await performAttack(target, type, duration);
      alert(result);
    });
  }

  async function performAttack(target, type, duration) {
    try {
      const response = await fetch(`/main/attack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: target, type: type, duration: duration })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error during attack:', error);
      return `Attack failed: ${error.message}`;
    }
  }

  if (tabs.length > 0) {
    tabs[0].click();
  }

  async function fetchStatistics() {
    try {
      const response = await fetch('/main/stats');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      displayStatistics(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  function displayStatistics(stats) {
    document.getElementById('mbps').textContent = stats.mbps;
    document.getElementById('packets').textContent = stats.packets;
    document.getElementById('status').textContent = stats.status;
    document.getElementById('time').textContent = stats.time;
  }

  setInterval(fetchStatistics, 5000);
});