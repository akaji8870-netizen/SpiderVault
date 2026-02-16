let users=JSON.parse(localStorage.getItem("sv_users"))||[];
let products=JSON.parse(localStorage.getItem("sv_products"))||[
{name:"VIP Rank",price:199,img:"https://via.placeholder.com/300"}
];
let orders=JSON.parse(localStorage.getItem("sv_orders"))||[];

function save(){
localStorage.setItem("sv_users",JSON.stringify(users));
localStorage.setItem("sv_products",JSON.stringify(products));
localStorage.setItem("sv_orders",JSON.stringify(orders));
}

function signup(){
let email=document.getElementById("email").value;
let pass=document.getElementById("password").value;
users.push({email,pass});
save();
alert("Account Created");
location.href="login.html";
}

function login(){
let email=document.getElementById("email").value;
let pass=document.getElementById("password").value;
let found=users.find(u=>u.email===email&&u.pass===pass);
if(found){
localStorage.setItem("sv_logged",email);
location.href="store.html";
}else{
alert("Wrong Details");
}
}

if(document.getElementById("products")){
let html="";
products.forEach(p=>{
html+=`
<div class="card">
<img src="${p.img}" width="100%">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<a href="payment.html"><button>Buy</button></a>
</div>`;
});
document.getElementById("products").innerHTML=html;
}

function placeOrder(){
let ign=document.getElementById("ign").value;
let utr=document.getElementById("utr").value;
orders.push({ign,utr,status:"Pending"});
save();
alert("Order Submitted");
}

function addProduct(){
let n=document.getElementById("pname").value;
let pr=document.getElementById("pprice").value;
let im=document.getElementById("pimg").value;
products.push({name:n,price:pr,img:im});
save();
alert("Product Added");
}
