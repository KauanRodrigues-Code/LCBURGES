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
    { name: "Frango Empanado", price: 12.00 },
    { name: "Hambúrguer de Linguiça", price: 10.00 },
    { name: "Hambúrguer Tradicional", price: 8.00 },
    { name: "Hambúrguer Gourmet", price: 10.00 },
    { name: "Cheddar", price: 4.00 },
    { name: "Queijo Mussarela", price: 3.00 },
    { name: "Queijo Coalho", price: 5.00 },
    { name: "Queijo Coalho c/ Mel", price: 6.00 },
    { name: "Calabresa", price: 6.00 },
    { name: "Maionese C.", price: 2.00 },
    { name: "Cebola", price: 2.00 },
    { name: "Ovo", price: 4.00 },
    { name: "Bacon", price: 6.00 },
    { name: "Batata Palha", price: 3.00 },
    { name: "Requeijão", price: 4.00 },
    { name: "Barbecue", price: 4.00 },
    { name: "Alface", price: 2.00 },
    { name: "Tomate", price: 2.00 },
    { name: "Vinagrete", price: 3.00 },
    { name: "Doritos", price: 5.00 },
    { name: "Geleia", price: 3.00 },
    { name: "Cebola Caramelizada", price: 5.00 },
    { name: "Abacaxi", price: 5.00 }
];

let cart = [];
let currentCategory = "tradicionais";
let selectedProduct = null;

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

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="coming-soon">
        <h2>🍔 Em breve...</h2>
        <p>Estamos preparando combos incríveis para você!</p>
      </div>`;
    return;
  }

  filtered.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" onerror="this.src='Logo.png'">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-footer">
          <span>R$ ${p.price.toFixed(2)}</span>
          <button class="select-btn" onclick="openProductModal(${p.id})">Selecionar lanche</button>
        </div>
      </div>`;
  });
}

function openProductModal(id) {
    selectedProduct = productsData.find(p => p.id === id);
    document.getElementById("modal-obs").value = "";
    
    // Removido o preço daqui para colocar no final
    document.getElementById("modal-details").innerHTML = `
        <img src="${selectedProduct.img}" onerror="this.src='Logo.png'" class="modal-img-top">
        <div class="modal-header-text">
            <h2>${selectedProduct.name}</h2>
            <p>${selectedProduct.desc}</p>
        </div>
    `;

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

    // Adiciona o preço dinâmico no final (acima do botão)
    const footer = document.querySelector(".modal-footer");
    const priceDisplay = document.querySelector(".modal-base-price");
    if (priceDisplay) priceDisplay.remove(); // Limpa se já existir
    
    const newPriceTag = document.createElement("p");
    newPriceTag.className = "modal-base-price";
    newPriceTag.style.textAlign = "center";
    newPriceTag.style.marginBottom = "15px";
    newPriceTag.innerHTML = `Total: R$ ${selectedProduct.price.toFixed(2)}`;
    footer.insertBefore(newPriceTag, document.getElementById("add-to-cart-btn"));

    document.getElementById("product-modal").style.display = "flex";
    document.getElementById("add-to-cart-btn").onclick = addToCartFromModal;
}

// NOVA FUNÇÃO: Atualiza o preço enquanto marca os adicionais
function updateModalPrice() {
    let total = selectedProduct.price;
    const checks = document.querySelectorAll('.extra-check:checked');
    checks.forEach(c => {
        total += parseFloat(c.getAttribute('data-price'));
    });
    document.querySelector(".modal-base-price").innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

function closeModal() { document.getElementById("product-modal").style.display = "none"; }

function addToCartFromModal() {
    const selectedExtras = Array.from(document.querySelectorAll('.extra-check:checked')).map(el => ({
        name: el.value,
        price: parseFloat(el.getAttribute('data-price'))
    }));
    const obs = document.getElementById("modal-obs").value;
    const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    cart.push({
        ...selectedProduct,
        cartId: Date.now(),
        extras: selectedExtras,
        obs: obs,
        totalPrice: selectedProduct.price + extrasTotal,
        qty: 1
    });
    updateCart();
    closeModal();
    showToast(`${selectedProduct.name} na sacola!`);
}

function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("onclick").includes(`'${cat}'`));
  });
  renderProducts();
}

function removeFromCart(cartId) {
    const index = cart.findIndex(i => i.cartId === cartId);
    if (index > -1) {
        cart.splice(index, 1);
        updateCart();
        showToast("Item removido", "error");
    }
}

function clearCart() {
    if(cart.length === 0) return;
    if(confirm("Deseja limpar toda a sacola?")) {
        cart = [];
        updateCart();
        showToast("Você limpou sua Sacola", "error");
    }
}

function updateCart() {
  const itemsDiv = document.getElementById("cart-items");
  if (!itemsDiv) return;
  itemsDiv.innerHTML = "";
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.totalPrice;
    const extrasHtml = item.extras.length > 0 ? `<small>+ ${item.extras.map(e => e.name).join(', ')}</small>` : '';
    const obsHtml = item.obs ? `<div class="cart-obs">📝 ${item.obs}</div>` : '';
    itemsDiv.innerHTML += `
      <div class="cart-item-card">
        <div class="cart-item-info">
          <div><strong>${item.name}</strong>${extrasHtml}${obsHtml}</div>
          <span class="cart-item-price">R$ ${item.totalPrice.toFixed(2)}</span>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.cartId})">Remover</button>
      </div>`;
  });
  const delivery = document.getElementById("delivery-type").value === "entrega" ? 5 : 0;
  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-total").innerHTML = `<h3 style="text-align:center; margin-bottom:15px;">Total: R$ ${(subtotal + delivery).toFixed(2)}</h3>`;
}

function toggleCart() { document.getElementById("cart").classList.toggle("open"); }
function toggleDeliveryFields() {
    document.getElementById("address-fields").style.display = document.getElementById("delivery-type").value === "entrega" ? "block" : "none";
    updateCart();
}
function toggleTrocoField() {
    document.getElementById("troco-field").style.display = document.getElementById("payment-method").value === "Dinheiro" ? "block" : "none";
}

function finishOrder() {
  if (cart.length === 0) return alert("Sua sacola está vazia!");
  let textoFinal = "🍔 *NOVO PEDIDO - LC BURGERS*\n\n";
  cart.forEach(i => {
    textoFinal += `✅ *${i.name}*\n${i.extras.length > 0 ? '➕ ' + i.extras.map(e => e.name).join(', ') + '\n' : ''}${i.obs ? '📝 ' + i.obs + '\n' : ''}💰 R$ ${i.totalPrice.toFixed(2)}\n\n`;
  });
  const deliveryType = document.getElementById("delivery-type").value;
  if (deliveryType === "entrega") {
    textoFinal += `📍 *Entrega:*\n${document.getElementById("cart-rua").value}, ${document.getElementById("cart-numero").value} - ${document.getElementById("cart-vila").value}\n🏠 *Tipo:* ${document.getElementById("home-type").value}\n`;
  } else { textoFinal += `🏪 *Retirada no Balcão*\n`; }
  const subtotal = cart.reduce((a, b) => a + b.totalPrice, 0);
  const taxa = deliveryType === "entrega" ? 5 : 0;
  textoFinal += `\n💳 *Pagamento:* ${document.getElementById("payment-method").value}\n💰 *Total: R$ ${(subtotal + taxa).toFixed(2)}*`;
  window.open(`https://wa.me/5543988230563?text=${encodeURIComponent(textoFinal)}`);
}

document.addEventListener("DOMContentLoaded", renderProducts);
