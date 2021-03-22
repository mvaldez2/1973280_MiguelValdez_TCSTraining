import Item from "./Item"

var i1 = new Item(1, "Book", 24, "")
var i2 = new Item(2, "Spoon", 2, "")
var i3 = new Item(3, "Phone", 350, "")
var i4 = new Item(4, "Paper Clip", 1, "")
var i5 = new Item(5, "Ring", 200, "")
var i6 = new Item(6, "Car", 20000, "")

function addItem(item:Item) : void{
    var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push(item)
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

