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
    const ttl = arr[10]??""
    const timestamp = ttl!=""?(new Date().getTime() + ttl) : 0
    
    switch (command.toLowerCase()) {
        case 'echo':
            return `+${key}\r\n`
        case 'set':
            map[key] = {"value":value,"timestamp":timestamp}
            return "+OK\r\n"
        case 'get':
            if (map[key]){
                const currTime = new Date().getTime()
                const expTime = map[key]["timestamp"]

                if (expTime>=currTime){
                    return "$-1\r\n"
                }else{
                    return map[key]["value"]
                }
            }
            else {
                return "$-1\r\n"
            }
        case 'ping':
            return "+PONG\r\n"
        default:
            return "+PONG\r\n"
    }

}

server.listen(6379, "127.0.0.1");
