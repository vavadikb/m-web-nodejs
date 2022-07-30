function getFirstWord(a:string) {
	return a.split(/ +/)[0].length;
}

// 2. 
function getUserNamings(a: {name:string; surname:string} ) {
  return {
		fullname: a.name + " " + a.surname, 
		initials: a.name[0] + "." + a.surname[0] 
	};
}

// 3. 


type prodName = {
    name: string;
};
type prodList = {
    products: prodName[];
};

function getAllProductNames(a?: prodList): any[] {
    return a?.products?.map((prod) => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function hey(a:{name:()=>string, coolness?:number,cuteness?:number}) {
    return "hey! i'm " + a.name();
}
hey({name: () => "roma", cuteness: 100})
hey({name: () => "vasya", coolness: 100})

// 4.2
class examplePet {
    naming: string;
    constructor(name: string) {
        this.naming = name;
    }
    name() {
        return this.naming;
    }
}

class Cat extends examplePet {
    isNice: boolean;
    constructor(name: string, isNice: boolean) {
        super(name);
        this.isNice = isNice;
    }
}
class Dog extends examplePet {
    countFood: number;
    constructor(name: string, countFood: number) {
        super(name);
        this.countFood = countFood;
    }
}
type abstractType = Cat | Dog

function heyPet(abstractPet: abstractType) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey(a)
hey(b)

// 4.3
interface pet2 {name: () => string, type: string, cuteness?: number, coolness?: number }

function heyStat(a: pet2) {
    return "hey! i'm " + a.name()
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
heyStat({name: () => "roma", type: "cat", cuteness: 100})
heyStat({name: () => "vasya", type: "dog", coolness: 100})

// 5.

// google for Record type 

function stringEntries(a: {} | []) {
   return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it


async function world(a: number): Promise<string> {
    return "*".repeat(a)
}
const hello = async () => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))