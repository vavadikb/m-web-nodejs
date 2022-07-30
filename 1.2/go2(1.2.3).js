function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }
    return res;
}

let contents = readHttpLikeInput()

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    const time = new Date()
    let text = `                HTTP/1.1 ${statusCode}
                Date: ${time.toUTCString()}
                Server: Apache/2.2.14 (Win32)
                Content-Length: ${body.length}
                `
    for(let i = 0; i < headers.length; i++) {
        text += `${headers[i].join(": ")}
                `
    }
    text += `
                Result: ${statusMessage}`
    console.log(text)
}

function processHttpRequest(method, uri, headers, body) {
    const regexp = /(\d+)+/g
    let testedNumder =/(?<=\/sum)\?nums=/g.test(uri) 
    let testedSum =  /^\/sum/g.test(uri)
    let status 
    let result

    if($method === "GET" && testedSum && testedNumder) {
        result = uri.match(regexp).map(Number).reduce((a,b) => a + b)
        status = "200 OK"
    }
    if($method === "GET" && !testedSum) {
        result = "not found"
        status = "404 Not found"
    }
    if($method === "GET" && testedSum && !testedNumder) {
        result = ""
        status = "400 Bad Request"
    }


    outputHttpResponse(status, result, headers, body);
}


function parseTcpStringAsHttpRequest(string) { 
    //Regexp-s
    let regexpMethod = /^[A-Z]+/ig;
    let regexpUri = /(?<=\s)(\/[A-Za-z\=\+\-\,\?\d+/S]*)/ig
    let regexpHeaders = /^([\w\-]+):.+/igm

    //Ставим значения
    let method = string.match(regexpMethod)
    let uri = string.match(regexpUri)
    let body = string.split('\n\n')[1] || ""
    let headers = []

    let trustedheaders = string.match(regexpHeaders)

    //Настраиваем Headers
    for(let i = 0; i < trustedheaders.length; i++) {
        headers.push(trustedheaders[i].split(": "))
    }
    return {
        method: method.join(""),
        uri: uri.join(""),
        headers: headers,
        body: body.split("\n")[0],
    };
}
     

http = parseTcpStringAsHttpRequest(contents)