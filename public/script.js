document.addEventListener('DOMContentLoaded', () => {
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const storedTheme = localStorage.getItem('theme') || 'dark';

  const setTheme = (theme) => {
    const themePath = theme === 'dark' ? '/styles/dark-theme.css' : '/styles/light-theme.css';
    themeStylesheet.href = themePath;
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  setTheme(storedTheme);

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  const tabs = document.querySelectorAll('.tab-button');
  const tabContent = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();

      const tabId = tab.getAttribute('data-tab');

      tabContent.forEach(content => content.classList.remove('active'));
      tabs.forEach(t => t.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  const handleFormSubmit = async (formId, endpoint, dataExtractor) => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = dataExtractor(form);

        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(JSON.stringify(data))
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log(responseData);
          alert(responseData.message || 'Success!');
        } catch (error) {
          console.error('Error:', error);
          alert(`An error occurred: ${error.message}`);
        }
      });
    }
  };

  handleFormSubmit(
    'ddos-form',
    '/main/ddos',
    (form) => ({
      target: document.getElementById('ddos-target').value,
      type: document.getElementById('ddos-type').value,
      duration: document.getElementById('ddos-duration').value,
      intensity: document.getElementById('ddos-intensity').value
    })
  );

  handleFormSubmit(
    'deface-form',
    '/main/deface',
    (form) => ({
      target: document.getElementById('deface-target').value,
      image: document.getElementById('deface-image').value,
      message: document.getElementById('deface-message').value
    })
  );

  handleFormSubmit(
    'connection-form',
    '/main/connection',
    (form) => ({
      target: document.getElementById('connection-target').value,
      port: document.getElementById('connection-port').value
    })
  );

  handleFormSubmit(
    'credential-form',
    '/main/credential',
    (form) => ({
      target: document.getElementById('credential-target').value,
      usernameList: document.getElementById('credential-usernames').value,
      passwordList: document.getElementById('credential-passwords').value
    })
  );

  const updateStats = () => {
    fetch('/main/stats')
      .then(response => response.json())
      .then(data => {
        document.getElementById('mbps').innerText = data.mbps || 'N/A';
        document.getElementById('packets').innerText = data.packets || 'N/A';
        document.getElementById('status').innerText = data.status || 'N/A';
        document.getElementById('time').innerText = data.time || 'N/A';
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
        document.getElementById('mbps').innerText = 'Error';
        document.getElementById('packets').innerText = 'Error';
        document.getElementById('status').innerText = 'Error';
        document.getElementById('time').innerText = 'Error';
      });
  };

  setInterval(updateStats, 2000);
});