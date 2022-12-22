const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
    //Respond to multiple PINGs: connection.on can automatically respond to multiple pings
    // No need to create a loop
    //
    //Handle concurrent clients:
    // createServer function supports concurrency, no need to make any changes
    connection.on("data", () => {
        connection.write("+PONG\r\n");
    });
});

server.listen(6379, "127.0.0.1");
