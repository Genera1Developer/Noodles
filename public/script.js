document.addEventListener('DOMContentLoaded', () => {
    const targetInput = document.getElementById('targetUrl');
    const attackTypeSelect = document.getElementById('attackType');
    const startButton = document.getElementById('startAttack');
    const mbpsDisplay = document.getElementById('mbps');
    const packetsDisplay = document.getElementById('packets');
    const statusDisplay = document.getElementById('status');
    const timeDisplay = document.getElementById('time');
    const sidePanelButtons = document.querySelectorAll('.side-panel button');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to fetch data and update statistics
    const updateStats = async () => {
        try {
            const response = await fetch('/main/api/stats');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            mbpsDisplay.textContent = data.mbps || '0';
            packetsDisplay.textContent = data.packets || '0';
            statusDisplay.textContent = data.status || 'Unknown';
            timeDisplay.textContent = data.time || '0';
        } catch (error) {
            console.error('Failed to update stats:', error);
            statusDisplay.textContent = 'Error';
        }
    };

    // Function to start the attack
    const startAttack = async (target, attackType) => {
        try {
            const response = await fetch('/main/api/attack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ target: target, attackType: attackType })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Attack started:', data);
            statusDisplay.textContent = 'Attacking';
            // Start updating stats every second
            setInterval(updateStats, 1000);
        } catch (error) {
            console.error('Failed to start attack:', error);
            statusDisplay.textContent = 'Failed to Start';
        }
    };

    // Attach event listener to the start button
    startButton.addEventListener('click', () => {
        const target = targetInput.value;
        const attackType = attackTypeSelect.value;
        startAttack(target, attackType);
    });

    // Side panel navigation
    sidePanelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and hide all content sections
            sidePanelButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Activate the clicked button
            button.classList.add('active');

            // Show the corresponding content section
            const targetSectionId = button.dataset.target;
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Initially activate the DDoS section
    document.querySelector('.side-panel button[data-target="ddos"]').click();
});