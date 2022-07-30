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
    let output = `HTTP/1.1 ${String(statusCode)} ${String(statusMessage)}
Date: ${String(new Date())}
Server: Apache/2.2.14 (Win32)
Content-Length: ${String(body).length}
Connection: Closed
Content-Type: text/html; charset=utf-8
`
    output += "\n" + body
    console.log(output)
}
// function processHttpRequest(method, uri, headers, body) {
//     let status 
//     let validStatus 
//     let errorResult
//     let result = []
//     let data 
//     let currentLogin = body.match(/=[a-z0-9]+/ig).map(element => {return element.replace("=", "")}).join(":")
//     let loginStatus
//     // errors 
//     try {
//        data = require("fs").readFileSync("password.txt").toString().split("\n").map(element => {return element.replace("\r", "")})

//        console.log(data.length)
//     }catch (e) {
//         errorResult = 'file doesn\'t exist.'
//         status = '500 Internal Server Error'

//     }
//     data.forEach(element => {if (element === currentLogin) {validStatus= true 
//         console.log("TESTISWORKOUNG")} } )
//     if (method === "POST" && /\/api\/checkLoginAndPassword/ig.test(uri) && status === true){
//         result = ["200", "OK", headers, "<h1 style=\"color:green\">FOUND</h1>"]
//     }
//     if (method === "POST" && !(/\/api/ig.test(uri) ) ){
//         result = ["404", "Not Found", headers, "not found"]
//     }
//     if (method === "POST" && validStatus !== true){
//         result = ["400", "Bad Request", headers, "login&pass not found"]
//     }
//     if (method === "POST" && /\/api\/checkLoginAndPassword/ig.test(uri) && headers[1][1] !== "application/x-www-form-urlencoded"){
//         result = ["400", "Undesirable Content Type", headers, "not found"]
//     }
//     if (method !== "POST" || /\/api/ig.test(uri)){
//         if ( !(/\/api\/checkLoginAndPassword/ig.test(uri) || method !== "POST") ){
//             result = ["400", "Bad Request", headers, "not found"]
//         }
//     }   
//     outputHttpResponse(result[0],result[2],result[2],result[3]);
// }
function processHttpRequest(method, uri, headers, body) {
    
    let status
    let result
    let check = false

    //Check content-type
    for(let i = 0; i < headers.length; i++) {
        if(headers[i].indexOf('application/x-www-form-urlencoded') >= 0) {
            check = true;
            break
        }
    }

    //Check uri
    const tested_method = /^\/api/gi.test(uri)
    const tested_numbers = /(?<=\/api)\/checkLoginAndPassword/gi.test(uri)

    let passwords  
    //let result = []
    try {
        passwords = require("fs").readFileSync("password.txt").toString().split("\n").map(element => {return element.replace("\r", "")})
    }
    catch {
        result = ["500", "Internal Server Error", headers, "not found"]
        outputHttpResponse(result[0], result[1], result[2], result[3])
        return
    }
    const password = body.split('&')[1].split('password=')[1]
    const login = body.split('&')[0].split('login=')[1]
    let splitted = content.split('\n')
    for(let i = 0; i < splitted.length; i++) {
        splitted[i] = splitted[i].replace(/\r/g, '')
    }
    console.log(splitted)
    for(let i = 0; i < splitted.length; i++) {
        const temp_pass = splitted[i].split(":")[1],
              temp_log = splitted[i].split(":")[0]
        if(temp_log === login && temp_pass === password) {
            result = '<h1 style="color:green">FOUND</h1>'
            status = '200 OK'
            break;
        }else{
            result = 'access denied'
            status = '403 Forbidden'
        }
    }
    if (method === "POST" && /\/api\/checkLoginAndPassword/ig.test(uri) && status === true){
        result = ["200", "OK", headers, "<h1 style=\"color:green\">FOUND</h1>"]
    }
    if (method === "POST" && !(/\/api/ig.test(uri) ) ){
        result = ["404", "Not Found", headers, "not found"]
    }
    if (method === "POST" && status !== true){
        result = ["400", "Bad Request", headers, "login&pass not found"]
    }
    if (method === "POST" && /\/api\/checkLoginAndPassword/ig.test(uri) && headers[1][1] !== "application/x-www-form-urlencoded"){
        result = ["400", "Undesirable Content Type", headers, "not found"]
    }
    if (method !== "POST" || /\/api/ig.test(uri)){
        if ( !(/\/api\/checkLoginAndPassword/ig.test(uri) || method !== "POST") ){
            result = ["400", "Bad Request", headers, "not found"]
        }
    }
    outputHttpResponse(result[0], result[1], result[2], result[3])
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

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);