// Simulated DDoS tool - DO NOT USE FOR MALICIOUS PURPOSES
console.log("DDoS simulation started. This is a harmless simulation.");

let startTime = new Date();
let running = false;

const startButton = document.getElementById("startDDoS");
const stopButton = document.getElementById("stopDDoS");
const timerDisplay = document.getElementById("timer");

startButton.addEventListener("click", () => {
    if (!running) {
      running = true;
      console.log("Simulated DDoS attack initiated.");
      // Update timer every second
      setInterval(() => {
          if (running) {
              let elapsedTime = new Date() - startTime;
              let seconds = Math.floor(elapsedTime / 1000);
              timerDisplay.textContent = `Time elapsed: ${seconds}s`;
          }
      }, 1000);
    }
});


stopButton.addEventListener("click", () => {
    if (running) {
      running = false;
      console.log("Simulated DDoS attack stopped.");
    }
});



// Disclaimer
console.warn("This is a simulated DDoS tool for educational purposes only. Using it for illegal activities is strictly prohibited.");