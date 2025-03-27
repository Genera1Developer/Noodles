document.addEventListener('DOMContentLoaded', () => {
  // Theme management
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const storedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme

  const setTheme = (theme) => {
    if (theme === 'dark') {
      themeStylesheet.href = '/styles/dark-theme.css';
    } else {
      themeStylesheet.href = '/styles/light-theme.css';
    }
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme); // Apply data-theme attribute
  };

  // Initialize theme
  setTheme(storedTheme);

  // Theme toggle (optional - add if you have a theme toggle button)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }



  // Tab functionality
  const tabs = document.querySelectorAll('.tab-button');
  const tabContent = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();

      const tabId = tab.getAttribute('data-tab');

      tabContent.forEach(content => {
        content.classList.remove('active');
      });

      tabs.forEach(t => {
        t.classList.remove('active');
      });

      tab.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Generic form submission handler
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
            body: JSON.stringify(data)
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error('Error:', error);
          alert(`An error occurred: ${error.message}`); //Basic error display for user
        }
      });
    }
  };

  // Attack form submission handlers
  handleFormSubmit(
    'ddos-form',
    '/main/ddos/attack',
    (form) => ({
      target: document.getElementById('ddos-target').value,
      type: document.getElementById('ddos-type').value,
      duration: document.getElementById('ddos-duration').value,
      intensity: document.getElementById('ddos-intensity').value
    })
  );

  handleFormSubmit(
    'deface-form',
    '/main/deface/attack',
    (form) => ({
      target: document.getElementById('deface-target').value,
      image: document.getElementById('deface-image').value,
      message: document.getElementById('deface-message').value
    })
  );

  handleFormSubmit(
    'connection-form',
    '/main/connection/attack',
    (form) => ({
      target: document.getElementById('connection-target').value,
      port: document.getElementById('connection-port').value
    })
  );

  handleFormSubmit(
    'credential-form',
    '/main/credential/attack',
    (form) => ({
      target: document.getElementById('credential-target').value,
      usernameList: document.getElementById('credential-usernames').value,
      passwordList: document.getElementById('credential-passwords').value
    })
  );



  // Statistics display (example - needs actual implementation)
  const updateStats = () => {
    document.getElementById('mbps').innerText = 'N/A';
    document.getElementById('packets').innerText = 'N/A';
    document.getElementById('status').innerText = 'N/A';
    document.getElementById('time').innerText = 'N/A';
  };

  setInterval(updateStats, 2000);
});