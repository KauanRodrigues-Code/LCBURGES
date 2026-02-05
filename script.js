const productsData = [
  // TRADICIONAIS
  { id: 1, name: "BACON BURGER", desc: "Hambúrguer gourmet, bacon, queijo, barbecue.", price: 27, category: "tradicionais", img: "BACON-BURGER.png" },
  { id: 2, name: "SALADA BURGER", desc: "Hambúrguer gourmet, alface, tomate, queijo.", price: 25, category: "tradicionais", img: "SALADA-BURGER.png" },
  { id: 3, name: "CALABRESA BURGER", desc: "Hambúrguer gourmet, calabresa, queijo.", price: 23, category: "tradicionais", img: "CALABRESA-BURGER.png" },
  { id: 4, name: "EGG BURGER", desc: "Hambúrguer gourmet, ovo, queijo.", price: 22, category: "tradicionais", img: "EGG-BURGER.png" },
  { id: 5, name: "CHEESE BURGER", desc: "Hambúrguer gourmet, queijo.", price: 20, category: "tradicionais", img: "CHESE-BURGER.png" },
  { id: 6, name: "BURGER", desc: "Hambúrguer gourmet simples.", price: 15, category: "tradicionais", img: "BURGER.png" },

  // GOURMETS (TODOS)
  { id: 7, name: "COLOSSAL BURGER", desc: "Hambúrguer, frango, bacon, calabresa, ovo.", price: 40, category: "gourmets", img: "logo.png" },
  { id: 8, name: "CHICKEN BURGER", desc: "Frango empanado, cheddar, barbecue.", price: 35, category: "gourmets", img: "logo.png" },
  { id: 9, name: "TROPICAL BURGER", desc: "Hambúrguer, abacaxi, bacon, queijo coalho.", price: 35, category: "gourmets", img: "TROPICAL-BURGER.png" },
  { id: 10, name: "CALIENTE BURGER", desc: "Hambúrguer, cheddar, doritos.", price: 33, category: "gourmets", img: "CALIENTE-BURGER.png" },
  { id: 11, name: "ACEBOLADO BURGER", desc: "Hambúrguer, cebola caramelizada.", price: 32, category: "gourmets", img: "ACEBOLADO-BURGER.png" },
  { id: 12, name: "BARBECUE BURGER", desc: "Linguiça, queijo coalho, barbecue.", price: 30, category: "gourmets", img: "BARBECUE-BURGER.png" },

  // BEBIDAS
  { id: 13, name: "Coca-Cola Lata", desc: "350ml", price: 6, category: "bebidas", img: "COCA-LATA.png" },
  { id: 14, name: "Guaraná Lata", desc: "350ml", price: 6, category: "bebidas", img: "GUARANA-LATA.png" },
  { id: 15, name: "Coca-Cola 1L", desc: "1 Litro", price: 12, category: "bebidas", img: "COCA-1L.png" }
];

let cart = [];
let currentCategory = "tradicionais";

function renderProducts() {
  const productsEl = document.getElementById("products");
  productsEl.innerHTML = "";

  productsData
    .filter(p => p.category === currentCategory)
    .forEach(product => {
      productsEl.innerHTML += `
        <div class="product">
          <img src="${product.img}">
          <h3>${product.name}</h3>
          <p>${product.desc}</p>
          <div class="product-footer">
            <span>R$ ${product.price.toFixed(2)}</span>
            <button class="add-btn" onclick="addToCart(${product.id})">+</button>
          </div>
        </div>
      `;
    });
}

function filterCategory(category) {
  currentCategory = category;
  document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderProducts();
}

function addToCart(id) {
  const product = productsData.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `<p>${item.name} - R$ ${item.price.toFixed(2)}</p>`;
  });

  cartTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
  cartCount.innerText = cart.length;
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("open");
}

function finishOrder() {
  alert("Pedido enviado!");
}

renderProducts();