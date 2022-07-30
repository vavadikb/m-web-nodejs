const csvParcer = function parceCsv (cities){
    cities = cities
    .match(/|(^(?!\#).+)(.+(?=\#))/mg)
    .map(str => str.split(","))
    .map(arr =>{
        let info = {}
        info.x = arr[0]||''
        info.y = arr[1]||''
        info.name = arr[2]||''
        info.population = arr[3]||''
        return info
    })
    .sort((a,b)=>b.population - a.population)
    .slice(0,10)
    .reduce((mainObj, infoObj, rate) => {
        mainObj[infoObj.name] = {
          population: infoObj.population,
          rating: ++rate
        }
        return mainObj
    },{})
    delete cities['']
      return (result) => {
        let listOfCities = Object.keys(cities)

        listOfCities.forEach(item => {
            let regexp = new RegExp(item, 'gi')
            result = result.replace(regexp, `${item} (${cities[item].rating} место в топе найкрутейших городов в юкрейн с населением ${cities[item].population}) `)
        })
        return result
    }
}


const textCSV = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент
#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,
55.32,09.10,Киев,99214,
11.11,55.55,Львів,700222
55.55,11.11,Кропивницький,304340
34.12,51,23,Київ,3
51.12,55.28,Донецьк,3000000
11.11,11.11,Харків,2324243
# в этом файле три строки-коммента :)
`

const getInfoTop = csvParcer(textCSV);

console.log(getInfoTop(`Кропивницький
                        Львів
                        Джанкой
                        Біла Церква
                        Донецьк
                        Алушта
                        Харків`))
/*
                        Кропивницький (4 место в топе найкрутейших городов в юкрейн с населением 304340)
                        Львів (2 место в топе найкрутейших городов в юкрейн с населением 700222)
                        Джанкой
                        Біла Церква (5 место в топе найкрутейших городов в юкрейн с населением 200131)
                        Донецьк (0 место в топе найкрутейших городов в юкрейн с населением 3000000)
                        Алушта (8 место в топе найкрутейших городов в юкрейн с населением 31440)
                        Харків (1 место в топе найкрутейших городов в юкрейн с населением 2324243)
*/
console.log(getInfoTop(`Кропивницький дуже файний город не в срівнянні з Харків який буде як Донецьк через 5 років на БіЛа церква як у алушта`)) //Никакой смысловой нагрузки, просто тест))

