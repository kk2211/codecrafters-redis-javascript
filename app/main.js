const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
    //Respond to multiple PINGs: connection.on can automatically respond to multiple pings
    // No need to create a loop
    //
    //Handle concurrent clients:
    // createServer function supports concurrency, no need to make any changeskohlikabir101@gmail.com
    connection.on("data", (data) => {
        const dataString = data.toString()
        const message = getResponse(dataString)
        connection.write(message)

    });
});

function getResponse(data) {
    // if (!data.startsWith('*')) {
    //     return 'REJECT';
    // }
    console.log(data)
    const arr = data.split('\r\n')
    const command = arr[2]
    const value = arr[4]
    console.log(arr)
    switch (command.toLowerCase()) {
        case 'echo':
            return `+${value}\r\n`
        case 'ping':
            return "+PONG\r\n"
        default:
            return "+PONG\r\n"
    }

}

server.listen(6379, "127.0.0.1");
