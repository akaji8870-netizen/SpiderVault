// Load Data
let users = JSON.parse(localStorage.getItem("sv_users")) || [];
let products = JSON.parse(localStorage.getItem("sv_products")) || [
  { name: "VIP Rank", price: 199, img: "https://via.placeholder.com/300" }
];
let orders = JSON.parse(localStorage.getItem("sv_orders")) || [];

// Save Function
function save() {
  localStorage.setItem("sv_users", JSON.stringify(users));
  localStorage.setItem("sv_products", JSON.stringify(products));
  localStorage.setItem("sv_orders", JSON.stringify(orders));
}

// ================= SIGNUP =================
function signup() {
  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("password").value.trim();

  if (!email || !pass) {
    alert("Fill all fields");
    return;
  }

  let exists = users.find(u => u.email === email);
  if (exists) {
    alert("Account already exists");
    return;
  }

  users.push({ email, pass });
  save();
  alert("Account Created Successfully");
  location.href = "login.html";
}

// ================= LOGIN =================
function login() {
  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("password").value.trim();

  let found = users.find(u => u.email === email && u.pass === pass);

  if (found) {
    localStorage.setItem("sv_logged", email);
    location.href = "store.html";
  } else {
    alert("Wrong Email or Password");
  }
}

// ================= LOAD PRODUCTS =================
if (document.getElementById("products")) {
  let html = "";

  products.forEach((p, index) => {
    html += `
      <div class="card">
        <img src="${p.img}" width="100%">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="selectProduct(${index})">Buy</button>
      </div>
    `;
  });

  document.getElementById("products").innerHTML = html;
}

// Select Product Before Payment
function selectProduct(index) {
  localStorage.setItem("sv_selected", index);
  location.href = "payment.html";
}

// ================= PLACE ORDER =================
function placeOrder() {
  let ign = document.getElementById("ign").value.trim();
  let utr = document.getElementById("utr").value.trim();
  let user = localStorage.getItem("sv_logged");
  let productIndex = localStorage.getItem("sv_selected");

  if (!ign || !utr) {
    alert("Fill all fields");
    return;
  }

  if (!user) {
    alert("Login first");
    location.href = "login.html";
    return;
  }

  let product = products[productIndex];

  orders.push({
    user,
    product: product.name,
    ign,
    utr,
    status: "Pending"
  });

  save();
  alert("Order Submitted Successfully");
  location.href = "store.html";
}

// ================= ADD PRODUCT (ADMIN) =================
function addProduct() {
  let n = document.getElementById("pname").value.trim();
  let pr = document.getElementById("pprice").value.trim();
  let im = document.getElementById("pimg").value.trim();

  if (!n || !pr || !im) {
    alert("Fill all fields");
    return;
  }

  products.push({
    name: n,
    price: Number(pr),
    img: im
  });

  save();
  alert("Product Added Successfully");
}
