const net = require('net')
let port = 3000


const request = socket => {
    const { remoteAddress } = socket
    console.log(`[INFO ${new Date().toDateString()}] User has been connected (IP: ${remoteAddress})`)

    socket.on('data', data => {
        console.log(`[CLIENT ${new Date().toISOString()}] New data >>> ${data} , Responsing...`)
        socket.write(data)
    })

    socket.on('error', () => {
        console.log(`[CLIENT ${new Date().toISOString()}] User disconnected`)
    })
}

const server = net.createServer()

server.on('connection', request)
server.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

