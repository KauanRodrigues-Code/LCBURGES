const productsData = [
  // TRADICIONAIS
  { id: 1, name: "BACON BURGER", desc: "Pão brioche, hambúrguer gourmet, bacon, barbecue, queijo mussarela, alface, tomate. (Acompanha fritas)", price: 27.00, category: "tradicionais", img: "BACON-BURGER.png" },
  { id: 2, name: "SALADA BURGER", desc: "Pão brioche, hambúrguer gourmet, tomate, alface, vinagrete, maionese verde, queijo mussarela.", price: 25.00, category: "tradicionais", img: "SALADA-BURGER.png" },
  { id: 3, name: "CALABRESA BURGER", desc: "Pão brioche, hambúrguer gourmet, queijo mussarela, calabresa, alface, tomate, cebola, maionese da casa.", price: 23.00, category: "tradicionais", img: "CALABRESA-BURGER.png" },
  { id: 4, name: "EGG BURGER", desc: "Pão brioche, hambúrguer gourmet, tomate, alface, ovo, queijo mussarela.", price: 22.00, category: "tradicionais", img: "EGG-BURGER.png" },
  { id: 5, name: "CHESE BURGER", desc: "Pão brioche, hambúrguer gourmet, batata palha, queijo mussarela, requeijão, maionese caseira.", price: 20.00, category: "tradicionais", img: "CHESE-BURGER.png" },
  { id: 6, name: "BURGER", desc: "Pão brioche, hambúrguer gourmet, maionese da casa.", price: 15.00, category: "tradicionais", img: "BURGER.png" },

  // GOURMETS
  { id: 7, name: "COLOSSAL BURGER", desc: "Pão brioche, hambúrguer gourmet premium, frango empanado, alface, tomate, bacon, calabresa, ovo, queijo cheddar.", price: 40.00, category: "gourmets", img: "COLOSSAL-BURGER.png" },
  { id: 8, name: "CHICKEN BURGER", desc: "Pão brioche, frango empanado, maionese caseira, molho barbecue, batata palha, queijo cheddar.", price: 35.00, category: "gourmets", img: "CHICKEN-BURGER.png" },
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

const extrasData = [
    { name: "Frango Empanado", price: 12.00 }, { name: "Hambúrguer de Linguiça", price: 10.00 },
    { name: "Hambúrguer Tradicional", price: 8.00 }, { name: "Hambúrguer Gourmet", price: 10.00 },
    { name: "Cheddar", price: 4.00 }, { name: "Queijo Mussarela", price: 3.00 },
    { name: "Queijo Coalho", price: 5.00 }, { name: "Queijo Coalho c/ Mel", price: 6.00 },
    { name: "Calabresa", price: 6.00 }, { name: "Maionese C.", price: 2.00 },
    { name: "Cebola", price: 2.00 }, { name: "Ovo", price: 4.00 },
    { name: "Bacon", price: 6.00 }, { name: "Batata Palha", price: 3.00 },
    { name: "Requeijão", price: 4.00 }, { name: "Barbecue", price: 4.00 },
    { name: "Alface", price: 2.00 }, { name: "Tomate", price: 2.00 },
    { name: "Vinagrete", price: 3.00 }, { name: "Doritos", price: 5.00 },
    { name: "Geleia", price: 3.00 }, { name: "Cebola Caramelizada", price: 5.00 },
    { name: "Abacaxi", price: 5.00 }
];

let cart = [];
let currentCategory = "tradicionais";
let selectedProduct = null;

// --- SISTEMA DE HORÁRIO ---
function isStoreOpen() {
    const data = new Date();
    const hora = data.getHours();
    const dia = data.getDay(); // 0=Dom, 1=Seg, 2=Ter...
    if (dia === 1) return false; // SEGUNDA FECHADO
    return hora >= 18 && hora < 24; // TER A DOM (18H ÀS 00H)
}

function updateStoreStatus() {
    const bar = document.getElementById("status-bar");
    if (!bar) return;
    if (!isStoreOpen()) {
        bar.style.backgroundColor = "#ff4b4b";
        bar.innerText = "🔴 FECHADO - Atendimento das 18:00 às 00:00 (Terça a Domingo)";
    } else {
        bar.style.backgroundColor = "#2ecc71";
        bar.innerText = "🟢 ABERTO - Faça seu pedido!";
    }
}

// --- CARRINHO ---
function toggleCart() { 
    const cartEl = document.getElementById("cart");
    const statusBar = document.getElementById("status-bar");
    cartEl.classList.toggle("open");
    if (cartEl.classList.contains("open")) {
        if (statusBar) statusBar.style.display = "none";
    } else {
        if (statusBar) statusBar.style.display = "block";
    }
}

// --- PRODUTOS E COMBOS ---
function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";
  const filtered = productsData.filter(p => p.category === currentCategory);

  if (currentCategory === 'combos' && filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #fff; border-radius: 10px; margin-top: 20px; border: 2px dashed #ff4b4b;">
        <h2 style="font-size: 30px;">🍔 Em breve...</h2>
        <p style="color: #666; font-size: 18px;">Estamos preparando os melhores combos para você!</p>
        <p style="font-size: 25px; margin-top: 10px;">⏳</p>
      </div>`;
    return;
  }

  filtered.forEach(p => {
    const textoBotao = p.category === "bebidas" ? "Selecionar bebida" : "Selecionar lanche";
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" onerror="this.src='Logo.png'">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-footer">
          <span>R$ ${p.price.toFixed(2)}</span>
          <button class="select-btn" onclick="openProductModal(${p.id})">${textoBotao}</button>
        </div>
      </div>`;
  });
}

// --- DEMAIS FUNÇÕES ---
function openProductModal(id) {
    selectedProduct = productsData.find(p => p.id === id);
    document.getElementById("modal-obs").value = "";
    document.getElementById("modal-details").innerHTML = `
        <img src="${selectedProduct.img}" onerror="this.src='Logo.png'" class="modal-img-top">
        <div class="modal-header-text"><h2>${selectedProduct.name}</h2><p>${selectedProduct.desc}</p></div>`;
    const extrasDiv = document.getElementById("modal-extras");
    extrasDiv.innerHTML = "";
    if(selectedProduct.category !== 'bebidas') {
        extrasData.forEach(extra => {
            extrasDiv.innerHTML += `
                <label class="extra-item">
                    <div style="display:flex; align-items:center;">
                        <input type="checkbox" class="extra-check" value="${extra.name}" data-price="${extra.price}" onchange="updateModalPrice()">
                        <span>${extra.name}</span>
                    </div>
                    <span>+ R$ ${extra.price.toFixed(2)}</span>
                </label>`;
        });
    }
    updateModalPrice();
    document.getElementById("product-modal").style.display = "flex";
    document.getElementById("add-to-cart-btn").onclick = addToCartFromModal;
}

function updateModalPrice() {
    let total = selectedProduct.price;
    document.querySelectorAll('.extra-check:checked').forEach(c => total += parseFloat(c.getAttribute('data-price')));
    let priceTag = document.querySelector(".modal-base-price") || document.createElement("p");
    priceTag.className = "modal-base-price";
    document.querySelector(".modal-footer").insertBefore(priceTag, document.getElementById("add-to-cart-btn"));
    priceTag.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

function closeModal() { document.getElementById("product-modal").style.display = "none"; }

function addToCartFromModal() {
    const selectedExtras = Array.from(document.querySelectorAll('.extra-check:checked')).map(el => ({
        name: el.value, price: parseFloat(el.getAttribute('data-price'))
    }));
    cart.push({ ...selectedProduct, cartId: Date.now(), extras: selectedExtras, obs: document.getElementById("modal-obs").value, totalPrice: selectedProduct.price + selectedExtras.reduce((a,b)=>a+b.price,0), qty: 1 });
    updateCart(); closeModal();
}

function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll(".category-btn").forEach(btn => btn.classList.toggle("active", btn.getAttribute("onclick").includes(`'${cat}'`)));
  renderProducts();
}

function removeFromCart(cartId) { cart = cart.filter(i => i.cartId !== cartId); updateCart(); }

function clearCart() { if(confirm("Limpar sacola?")) { cart = []; updateCart(); } }

function updateCart() {
  const itemsDiv = document.getElementById("cart-items");
  itemsDiv.innerHTML = "";
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.totalPrice;
    itemsDiv.innerHTML += `<div class="cart-item-card"><strong>${item.name}</strong> - R$ ${item.totalPrice.toFixed(2)} <button onclick="removeFromCart(${item.cartId})">Remover</button></div>`;
  });
  const delivery = document.getElementById("delivery-type").value === "entrega" ? 5 : 0;
  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-total").innerHTML = `<h3>Total: R$ ${(subtotal + delivery).toFixed(2)}</h3>`;
}

function toggleDeliveryFields() {
    document.getElementById("address-fields").style.display = document.getElementById("delivery-type").value === "entrega" ? "block" : "none";
    updateCart();
}

function toggleTrocoField() {
    document.getElementById("troco-field").style.display = document.getElementById("payment-method").value === "Dinheiro" ? "block" : "none";
}

function finishOrder() {
  if (!isStoreOpen()) return alert("❌ Estamos fechados!");
  if (cart.length === 0) return alert("Sacola vazia!");
  let texto = "*🍔 PEDIDO - LC BURGERS*\n\n";
  cart.forEach(i => { texto += `✅ *${i.name}* (R$ ${i.totalPrice.toFixed(2)})\n`; });
  window.open(`https://wa.me/5543999225202?text=${encodeURIComponent(texto)}`);
}

document.addEventListener("DOMContentLoaded", () => { updateStoreStatus(); renderProducts(); });
