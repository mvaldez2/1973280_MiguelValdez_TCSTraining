var Item = /** @class */ (function () {
    function Item(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }
    return Item;
}());
var i1 = new Item(1, "Book", 24, "");
var i2 = new Item(2, "Spoon", 2, "");
var i3 = new Item(3, "Phone", 350, "");
var i4 = new Item(4, "Paper Clip", 1, "");
var i5 = new Item(5, "Ring", 200, "");
var i6 = new Item(6, "Car", 20000, "");
var shoppingList = [i1, i2, i3, i4, i5, i6];
function addItem(id) {
    var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    switch (id) {
        case 1:
            cart.push(i1);
            break;
        case 2:
            cart.push(i2);
            break;
        case 3:
            cart.push(i3);
            break;
        case 4:
            cart.push(i4);
            break;
        case 5:
            cart.push(i5);
            break;
        case 6:
            cart.push(i6);
            break;
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    console.log(sessionStorage.getItem('cart'));
}
var cartItems = JSON.parse(sessionStorage.getItem('cart'));
var totalPrice = 0;
var tbody = document.getElementById('data');
for (var _i = 0, cartItems_1 = cartItems; _i < cartItems_1.length; _i++) {
    var item = cartItems_1[_i];
    var row = '<tr>';
    row += '<td>' + item.name + '</td>' + '<td>$' + item.price + '</td>' + '</tr>';
    tbody.innerHTML += row;
    totalPrice += Number(item.price); //converts value to number and gets total budget so far
}
document.getElementById("totalPrice").innerHTML = totalPrice.toString();
