import {json} from "stream/consumers";

const nodefetch = require('node-fetch')

interface intIp {
    ip: string
}
async function getIp(link: string, callback: (ip: string) => void): Promise<intIp> {
    const request: Response = await nodefetch(link)
    const response: intIp = await request.json()
    callback((returnIp(response)))
    console.log (response)
    return response
}

function returnIp(data: intIp) {
    return data.ip
}

getIp('https://api.ipify.org/?format=json', (ip => {
    console.log(`Result: ${ip}`)
}))

// 3


interface names {
    id: number
    uid: string
    female_first_name: string
    first_name: string
    four_word_name: string
    initials: string
    last_name: string
    male_first_name: string
    middle_name: string
    name: string
    name_with_initials: string
    name_with_middle: string
    prefix: string
    two_word_name: string
}


async function getNameAsync(link: string): Promise<names> {
    const request: Response = await nodefetch(link)
    const response: names = await request.json()
    return response
}

let users: any[] = []

users[0]=getNameAsync('https://random-data-api.com/api/name/random_name')
users[1]=getNameAsync('https://random-data-api.com/api/name/random_name')
users[2]=getNameAsync('https://random-data-api.com/api/name/random_name')

//Async await and Promise.all

Promise.all(users).then(res => {
    res.forEach(item => {
        console.log(`With Promise.all and AsyncAwait - ${item.name}`)
    })
})

//
async function asyncFoo() {
    for(let i = 0; i<3;i++){
        let user:names = await users[i]
        console.log(`asyncAwait - ${user.name}`)
    }
}
asyncFoo()

for(let i = 0;i<users.length;i++){
    users[i].then((res:names)=>{console.log(`only promises - ${res.name}`)})
}


// 4 

interface genders{
    first_name:string
    last_name:string
    gender:string
}


function checkGEnder(human:genders): boolean{
    return human.gender == 'Female'
}


async function getGenderAsyncAwait(link:string){
    const request:Response = await nodefetch(link)
    const response: genders = await request.json()


    let human = checkGEnder(response)

    if (human){
        console.log(`AsyncAwait first_name - ${response.first_name}, last_name - ${response.last_name} gender - ${response.gender}`)
    }
    else{
        console.log('fail')
        getGenderAsyncAwait(link)
    }
}


function getGenderPromise(link:string){
    nodefetch(link).then((request: Response)=>request.json()).then((response: genders)=>{
        let human = checkGEnder(response)

        if (human){
            
            console.log(`Promise => first_name - ${response.first_name}, last_name - ${response.last_name} gender - ${response.gender}`)
        }
        else{
            console.log('fail')
            getGenderPromise(link)
        }
    })
}
getGenderAsyncAwait('https://random-data-api.com/api/users/random_user')
getGenderPromise('https://random-data-api.com/api/users/random_user')



// 5 

function callback1(ip: string, callback: (ip: string) => void) {
    callback(`Task 5: ${ip}`)
}

async function getIpTask5(link: string) {
    const request: Response = await nodefetch(link)
    const response: intIp = await request.json()

    callback1(response.ip, (ip) => {console.log(ip)})
}

getIpTask5('https://api.ipify.org/?format=json')

// 6 

async function ipreturn(ip: string): Promise<string> {
    return ip
}

async function task6(callback: (link: string) => Promise<string>) {
    const request: Response = await nodefetch('https://api.ipify.org/?format=json')
    const response: intIp = await request.json()
    console.log(`Task 6: ${response.ip}`)
    await callback(response.ip)
}
task6((ip): Promise<string> => {
    return ipreturn(ip)
})