const http = require('http')

const options = {
    method: 'POST',
    port: 3000
}

console.time('time')
const MessageForRequest = 'data from client'

const req = http.request(options, (response) => {
    response.on('data', (msg) => {
        if(msg.toString() === MessageForRequest) {
            console.log(`Response is >> ${msg.toString()}`)
            console.timeEnd('time')
        }
    })
})

req.write(MessageForRequest)