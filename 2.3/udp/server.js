var udp = require('dgram');

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  console.log(`[CLIENT ${new Date().toISOString()}] User disconnected`)
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
  const dateNow = new Date().getTime()
  console.log('Data received from client : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
  console.log(`[CLIENT ${new Date().toISOString()}] New data >>> ${info} , Responsing...`)
  
  console.log('Data sent server to client');
  console.log(`Date server to client ${dateNow}`)

//sending msg
server.send(msg,info.port,'localhost',function(error){
  if(error){
    client.close();
  }else{
    const dateNow = new Date().getTime()
    console.log('Data sent SERVER');
    console.log(`Date SERVER ${dateNow}`)
  }

});

});
server.on('connect',() => {
  timeTwo = new Date().getTime()
  console.log(`Sending message`)
  socket.write('Hello server')
})

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(2222);

