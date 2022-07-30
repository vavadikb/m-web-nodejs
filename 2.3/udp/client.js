var udp = require('dgram');
// -------------------- udp client ----------------

var buffer = require('buffer');
const { time } = require('console');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from('Hello world');
let timeTwo
client.on('message',function(msg,info){
  const timeOne = new Date().getTime()
  console.log(`Time interval ${(timeOne - timeTwo) / 100}s`)
  console.log(`Time 1 => ${timeOne}`)
  console.log(`Time 2 => ${timeTwo}`)
});
//sending msg
client.send(data,2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    timeTwo = new Date().getTime()
    console.log(`Sending messege`) 
    console.log('Server => ' + data.toString())
  }
});