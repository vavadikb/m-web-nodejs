const http = require('http')

let port = 3000

const server = http.createServer()

server.on('connection', () => {
    console.log(`[info ${new Date().toISOString()}] User has been connected`)
})

server.on('request', (request, response) => {
    request.on('data', msg => {
        console.log(`[client ${new Date().toISOString()}] New data => ${msg.toString()}`)
        console.log(`[info${new Date().toISOString()}] Reponse client => ${msg.toString()}`)
        response.write(msg.toString())
    })
    request.on('close', (err) => {
        console.log(`[client ${new Date().toISOString()}] Disconnected :( `)
    })
    console.log(request.socket.remoteAddress)
}).listen(port, () => {
    console.log(`[info ${new Date().toISOString()}] The server has been started on port ${port}`)
})