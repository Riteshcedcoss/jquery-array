var products = [
  { id: 101, name: "Basket Ball", image: "basketball.png", price: 150 },
  { id: 102, name: "Football", image: "football.png", price: 120 },
  { id: 103, name: "Soccer", image: "soccer.png", price: 110 },
  { id: 104, name: "Table Tennis", image: "table-tennis.png", price: 130 },
  { id: 105, name: "Tennis", image: "tennis.png", price: 100 },
];
let cartArray = [];
let quantity = 0;
let price = 0;
let text1 = $("<p id=total-price></p>");
let text2 = $("<p id=total-quantity></p>");
let btn = $("<button type=button id=btn > clear cart </button>");
let head =
  "<table><tr><th> id </th> <th> name </th><th> price </th><th> quantity </th><th>remove </th></tr></table>";

$("#list").html(head);

$("#main").append(text1);
$("#main").append(text2);
str = "";

for (let i = 0; i < products.length; i++) {
  str +=
    "<div id=" +
    products[i].id +
    " class=" +
    "product" +
    ">\
        <img src=images/" +
    products[i].image +
    ">\
        <h3 class=<title><a href=#>Product 101</a></h3>\
        <span>Price: $" +
    products[i].price +
    "</span>\
        <a class=add-to-cart href='#' data-pid=" +
    products[i].id +
    ">Add To Cart</a>\
        </div>";
}
$("#products").html(str);
$("#products").on("click", "a.add-to-cart", function () {
  //   alert("click" + $(this).data("pid"));
  addToCart($(this).data("pid"));
  display();
  total();
});

$("#list").on("click", "a#remove", function () {
  //     //clicking edit link
  //alert("click" + $(this).data("pid"));
  removeFromCart($(this).data("pid"));
  //   });
});
$("#main").on("click", "#btn", function () {
  //clicking edit link
  emptyCart();
});
function addToCart(id) {
  for (let i = 0; i < products.length; i++) {
    let obj = products[i];
    if (obj.id == id) {
      if (!obj.hasOwnProperty("quantity")) {
        obj.quantity = 1;
      } else {
        obj.quantity += 1;
      }
      // if object has quantity attribute
      cartArray.push(obj);
      return false;
    }
  }

  display();


}

function display() {
  $("#main").append(btn);
 
  console.log(cartArray);
  let list =
    "<table><tr><th>id</th><th>name</th><th>price</th><th>quantity</th><th>remove</th></tr>";

  for (i = 0; i < cartArray.length; i++) {
    console.log(i);
    list +=
      "<tr><td>" +
      cartArray[i].id +
      "</td><td>" +
      cartArray[i].name +
      "</td><td>" +
      cartArray[i].price +
      "</td><td>" +
      cartArray[i].quantity +
      "</td><td>" +
      "<a href='#'" +
      'id="remove" data-pid=' +
      cartArray[i].id +
      "> REMOVE</a>" +
      "</td></tr>";
  }
  list += "</table>";
  $("#list").html(list);
}
function total() {
  $("#total-price").text("total price=" + price);
  $("total-quantity").text("total quantity=" + quantity);
}
function removeFromCart(id) {
  for (let i = 0; i < cartArray.length; i++) {
    let obj = cartArray[i];
    if (obj.id == id && obj.quantity > 1) {
      obj.quantity = obj.quantity - 1;
      quantity = quantity - 1;
      price = price - obj.price;
    } else if (obj.id == id && obj.quantity == 1) {
      quantity = quantity - 1;
      price = price - obj.price;
      cartArray.splice(i - 1);
    }
  }
  display();
  total();
}
function emptyCart() {
  cartArray = [];
  price = 0;
  quantity = 0;
  display();
  total();
}
