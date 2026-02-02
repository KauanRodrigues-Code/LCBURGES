const productsData = [
  // TRADICIONAIS
  { id: 1, name: "BACON BURGER", desc: "Pão brioche, hambúrguer gourmet, bacon, barbecue, queijo mussarela, alface, tomate. (Acompanha fritas)", price: 27.00, category: "tradicionais", img: "BACON-BURGER.png" },
  { id: 2, name: "SALADA BURGER", desc: "Pão brioche, hambúrguer gourmet, tomate, alface, vinagrete, maionese verde, queijo mussarela.", price: 25.00, category: "tradicionais", img: "SALADA-BURGER.png" },
  { id: 3, name: "CALABRESA BURGER", desc: "Pão brioche, hambúrguer gourmet, queijo mussarela, calabresa, alface, tomate, cebola, maionese da casa.", price: 23.00, category: "tradicionais", img: "CALABRESA-BURGER.png" },
  { id: 4, name: "EGG BURGER", desc: "Pão brioche, hambúrguer gourmet, tomate, alface, ovo, queijo mussarela.", price: 22.00, category: "tradicionais", img: "EGG-BURGER.png" },
  { id: 5, name: "CHESE BURGER", desc: "Pão brioche, hambúrguer gourmet, batata palha, queijo mussarela, requeijão, maionese caseira.", price: 20.00, category: "tradicionais", img: "CHESE-BURGER.png" },
  { id: 6, name: "BURGER", desc: "Pão brioche, hambúrguer gourmet, maionese da casa.", price: 15.00, category: "tradicionais", img: "BURGER.png" },

  // GOURMETS
  { id: 7, name: "COLOSSAL BURGER", desc: "Pão brioche, hambúrguer gourmet premium, frango empanado, alface, tomate, bacon, calabresa, ovo, queijo cheddar.", price: 40.00, category: "gourmets", img: "Logo.png" },
  { id: 8, name: "CHICKEN BURGER", desc: "Pão brioche, frango empanado, maionese caseira, molho barbecue, batata palha, queijo cheddar.", price: 35.00, category: "gourmets", img: "Logo.png" },
  { id: 9, name: "TROPICAL BURGER", desc: "Pão brioche, hambúrguer gourmet premium, alface, queijo cheddar, queijo coalho com mel, abacaxi, bacon.", price: 35.00, category: "gourmets", img: "TROPICAL-BURGER.png" },
  { id: 10, name: "CALIENTE BURGER", desc: "Pão brioche, hambúrguer gourmet premium, queijo cheddar, maionese caseira, tomate, doritos.", price: 33.00, category: "gourmets", img: "CALIENTE-BURGER.png" },
  { id: 11, name: "ACEBOLADO BURGER", desc: "Pão brioche, hambúrguer gourmet premium, cebola caramelizada, maionese caseira, queijo cheddar.", price: 32.00, category: "gourmets", img: "ACEBOLADO-BURGER.png" },
  { id: 12, name: "BARBECUE BURGER", desc: "Pão brioche, 2 hambúrgueres de linguiça, queijo coalho, queijo cheddar, vinagrete, extra de barbecue.", price: 30.00, category: "gourmets", img: "BARBECUE-BURGER.png" },

  // BEBIDAS
  { id: 14, name: "Coca-Cola Lata", desc: "350ml gelada", price: 6.00, category: "bebidas", img: "COCA-LATA.png" },
  { id: 15, name: "Coca-Cola Lata Zero Açúcar", desc: "350ml gelada", price: 6.00, category: "bebidas", img: "COCA-LATA-ZERO.png" },
  { id: 16, name: "Guaraná Antarctica Lata", desc: "350ml gelada", price: 6.00, category: "bebidas", img: "GUARANA-LATA.png" },
  { id: 17, name: "Coca-Cola 1L", desc: "Garrafa 1L gelada", price: 12.00, category: "bebidas", img: "COCA-1L.png" },
  { id: 18, name: "Coca-Cola 1L Zero Açúcar", desc: "Garrafa 1L gelada", price: 12.00, category: "bebidas", img: "COCA-1L-ZERO.png" }
];

let cart = [];
let currentCategory = "tradicionais";

// Função para mostrar aviso de Adicionado/Removido
function showToast(message, type = "success") {
    const oldToast = document.querySelector(".toast-msg");
    if (oldToast) oldToast.remove();
    const toast = document.createElement("div");
    toast.className = `toast-msg ${type === "success" ? "toast-success" : "toast-error"}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 2000);
}

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";
  const filtered = productsData.filter(p => p.category === currentCategory);
  
  filtered.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" onerror="this.src='Logo.png'">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-footer">
          <span>R$ ${p.price.toFixed(2)}</span>
          <div>
            <button class="remove-btn" onclick="removeFromCart(${p.id})">−</button>
            <button class="add-btn" onclick="addToCart(${p.id})">+</button>
          </div>
        </div>
      </div>`;
  });
}

function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll(".category-btn").forEach(btn => {
    const btnText = btn.getAttribute("onclick").match(/'([^']+)'/)[1];
    btn.classList.toggle("active", btnText === cat);
  });
  renderProducts();
}

function addToCart(id) {
  const product = productsData.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ ...product, qty: 1, obs: "" });
  updateCart();
  showToast(`${product.name} adicionado!`, "success");
}

function removeFromCart(id) {
  const index = cart.findIndex(i => i.id === id);
  if (index > -1) {
    const itemName = cart[index].name;
    cart[index].qty--;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCart();
    showToast(`${itemName} removido!`, "error");
  }
}

function updateObs(id, val) {
  const item = cart.find(i => i.id === id);
  if (item) item.obs = val;
}

function updateCart() {
  const itemsDiv = document.getElementById("cart-items");
  if (!itemsDiv) return;
  itemsDiv.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;
    itemsDiv.innerHTML += `
      <div class="cart-item-card">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span style="color: #27ae60; font-weight: bold;">R$ ${(item.price * item.qty).toFixed(2)}</span>
        </div>
        <input type="text" class="obs-input" placeholder="Observações (ex: sem cebola)"
          value="${item.obs || ''}"
          oninput="updateObs(${item.id}, this.value)">
        <div class="cart-item-controls">
          <button class="qty-btn-cart minus" onclick="removeFromCart(${item.id})">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn-cart plus" onclick="addToCart(${item.id})">+</button>
        </div>
      </div>`;
  });

  const deliveryType = document.getElementById("delivery-type").value;
  const delivery = deliveryType === "entrega" ? 5 : 0;
  document.getElementById("cart-count").innerText = cart.reduce((a, b) => a + b.qty, 0);
  document.getElementById("cart-total").innerHTML = `<h3 style="text-align:center; margin-bottom:15px;">Total: R$ ${(subtotal + delivery).toFixed(2)}</h3>`;
}

function toggleCart() { document.getElementById("cart").classList.toggle("open"); }

function toggleDeliveryFields() {
  const isEntrega = document.getElementById("delivery-type").value === "entrega";
  document.getElementById("address-fields").style.display = isEntrega ? "block" : "none";
  updateCart();
}

function toggleTrocoField() {
  const isDinheiro = document.getElementById("payment-method").value === "Dinheiro";
  document.getElementById("troco-field").style.display = isDinheiro ? "block" : "none";
}

// FUNÇÃO ATUALIZADA COM CÓDIGOS ESPECIAIS PARA IPHONE (WHATSAPP)
function finishOrder() {
  if (cart.length === 0) return alert("Sua sacola está vazia!");
  
  const deliveryType = document.getElementById("delivery-type").value;
  const paymentMethod = document.getElementById("payment-method").value;
  
  // Códigos hexadecimais para emojis (Mais seguro para iOS)
  let msg = `%F0%9F%8D%94 *NOVO PEDIDO - LC BURGERS*%0A%0A`;
  
  cart.forEach(i => {
    msg += `%E2%9C%85 *${i.qty}x ${i.name}*%0A`;
    if (i.obs) msg += `%F0%9F%93%9D _Obs: ${i.obs}_%0A`;
    msg += `%0A`;
  });

  if (deliveryType === "entrega") {
    const rua = document.getElementById("cart-rua").value;
    const num = document.getElementById("cart-numero").value;
    const bairro = document.getElementById("cart-vila").value;
    const homeType = document.getElementById("home-type").value;
    const ref = document.getElementById("cart-ponto-ref").value;

    if(!rua || !num) return alert("Por favor, preencha o endereço de entrega!");
    
    msg += `%F0%9F%93%8D *Entrega:*%0A`;
    msg += `${rua}, ${num} - ${bairro}%0A`;
    msg += `%F0%9F%8F%A2 *Tipo:* ${homeType}%0A`;
    if(ref) msg += `%F0%9F%97%BA%EF%B8%8F *Ref:* ${ref}%0A`;
  } else {
    msg += `%F0%9F%8F%AA *Retirada no Balcão*%0A`;
  }

  msg += `%0A%F0%9F%92%B3 *Pagamento:* ${paymentMethod}%0A`;
  
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const taxa = deliveryType === "entrega" ? 5 : 0;
  
  msg += `%F0%9F%92%B0 *Total: R$ ${(subtotal + taxa).toFixed(2)}*`;
  
  window.open(`https://wa.me/5543988230563?text=${msg}`);
}

document.addEventListener("DOMContentLoaded", renderProducts);
