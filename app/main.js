const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

let map = {}

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

    const arr = data.split('\r\n')
    const command = arr[2]
    const key = arr[4]
    const value = arr[6]?? ""
    
    switch (command.toLowerCase()) {
        case 'echo':
            return `+${key}\r\n`
        case 'set':
            map[key] = value
            return "+OK\r\n"
        case 'get':
            return map[key]?`+${store[key]}\r\n`:"$-1\r\n"
        case 'ping':
            return "+PONG\r\n"
        default:
            return "+PONG\r\n"
    }

}

server.listen(6379, "127.0.0.1");
