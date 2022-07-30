let countRevID = 1;//review counter
let countProdID = 1;// products counter


function prod(ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images) {
  // product ID
  this.ID = ID;
  this.getID = function () {return this.ID}
  this.setID = function (ID) {this.ID = ID}
  // product name
  this.name = name;
  this.getName = function () {return this.name}
  this.setName = function (name) {this.name = name}
  // product discription
  this.description = description;
  this.getDescription = function () {return this.description}
  this.setDescription = function (description) {this.description = description}
  //  product pice
  this.price = price;
  this.getPrice = function () {return this.price}
  this.setPrice = function (price) {this.price = price}
  // produkt brand
  this.brand = brand;
  this.getBrand = function () {return this.brand}
  this.setBrand = function (brand) {this.brand = brand}
  // product size
  this.sizes = sizes; 
  this.getSizes = function () {return this.sizes}
  this.addSize = function (size) {this.sizes.push(size)}
  // product size
  this.activeSize = activeSize;
  this.getActiveSize = function () {return this.activeSize}
  this.setActiveSize = function (activeSize) {this.activeSize = activeSize}
  // product quantity
  this.quantity = quantity;
  this.getQuantity = function () {return this.quantity}
  this.setQuantity = function (quantity) {this.quantity = quantity}
  
  this.date = date;
  this.getDate = function () {return this.date}
  this.setDate = function (date) {this.date = date}
  //product reviews
  this.reviews = reviews;
  this.getReviewByID = function (idr) {return this.reviews[idr]}
  this.addReview = function (review) {this.reviews.push(review)}
  this.delReview = function (idr) {this.reviews.splice(idr, 1)}
  // product rate
  this.getAvarageRating = function () {
    let rateArr = []
    this.reviews.forEach(item => {
      rateArr.push(item.rating);
    })

    let avarageRating = rateArr.reduce((a, b) => a + b) / rateArr.length;

    return avarageRating;
  }

  this.images = images;
  this.getImage = function (idm) {
    if(idm == undefined || idm == "") {
      return this.images[0];
    }else{
      return this.images[idm];
    }
  }
  this.addImage = function(image) {this.images.push(image)}
  this.delImage = function(idm) {this.images.splice(idm, 1)}
}

const rev1 = new rev(countRevID++, 'Oleg', '05.05.2021', 'Bad T-Shirt', 2);
const rev2 = new rev(countRevID++, 'SomeMAN', '01.12.2021', 'NICE TRAINERS', 5);
const rev3 = new rev(countRevID++, 'vovan333', '07.04.2021', 'So cool', 4);

sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
images = ['image1', 'image2', 'image3'];
reviews = [rev1, rev2, rev3];

let prod1 = new prod(countProdID++, 'Футболка', 'Отличная футболка.', 30, 'Adidas', sizes, 'XL', 100, '01.02.2021', reviews, images);
let prod2 = new prod(countProdID++, 'Штаны', 'Отличные штаны', 40, 'Nike', sizes, 'L', 120, '03.04.2021', reviews, images);
let prod3 = new prod(countProdID++, 'Куртка', 'Отличная куртка!', 100, 'Puma', sizes, 'XXL', 200, '05.05.2021', reviews, images);
let prod4 = new prod(countProdID++, 'Кроссовки', 'Отличные кроссовки', 70, 'Diverse', sizes, 'L', 400, '07.06.2021', reviews, images);
let prod5 = new prod(countProdID++, 'шапка', 'Отличная шапка', 30, 'Adidas', sizes, 'XL', 100, '15.05.2021', reviews, images)
let prod6 = new prod(countProdID++, 'Кроссовки', 'Отличные кроссовки', 70, 'Diverse', sizes, 'L', 400, '02.01.2021', reviews, images)


prodArr = [prod1, prod2, prod3, prod4, prod5,prod6];


function rev(ID, author, date, comment, rating) {
  this.ID = ID;
  this.author = author;
  this.date = date;
  this.comment = comment;
  this.rating = rating;
}

function searchProducts(products, search) {
  let result = []
  search = search.toLowerCase();
  if (search.indexOf("*") > 0) {
    let temp = search.split("*")
    search = temp[0];
  }
  
  for(let i =0; i < products.length;i++) {
    if(products[i].name.toLowerCase().indexOf(search) >= 0) {
      result.push(products[i].name);
    }
    if(products[i].description.toLowerCase().indexOf(search) >= 0) {
      result.push(products[i].description);
    }
    
  }
  console.log(result)
  return result;
}

//Сортировка
function sortProd(){
  let sortName = []
  let sortId =[]
  let sortPrice =[]
  for (let i=0;i<prodArr.length;i++){
    sortPrice[i]=prodArr[i].price
    sortName[i]=prodArr[i].name
    sortId[i]=prodArr[i].ID
  }


  let sortRule = []
  sortRule[0]="name"
  sortRule[1]="price"
  sortRule[2]="id"
  for (let i=0;i<=2;i++){
    if (sortRule[i]=="name"){
      //sort names
      sortName.sort((a, b) => (a[sortRule] > b[sortRule]) ? 1 : -1)
      console.log(sortName)
    }
    if (sortRule[i]=="price"){
      //sort price
      sortPrice.sort((a, b) => (a[sortRule] > b[sortRule]) ? 1 : -1)
      console.log(sortPrice)
    }
    if (sortRule[i]=="id"){
      //sort ids
      sortId.sort((a, b) => (a[sortRule] > b[sortRule]) ? 1 : -1)
      console.log(sortId)
    }
  }
}

sortProd()

// function sortProducts(products, sortRule) {
//   let sortResult = products.sort((a, b) => (a[sortRule] > b[sortRule]) ? 1 : -1)
//   console.log(sortResult)
//   return sortResult;
//   // console.log(sortResult)
// }

//поисковые запросы
let searching  = ['кур','штан','крос','футб', "Отличн"]
for (let i = 0; i<searching.length;i++){
  searchProducts(prodArr,searching[i])
}

sortProd()

// for(let i = 0;i<prices.length; i++){
//   sortProducts(prodArr,prices[i])
  
// }


