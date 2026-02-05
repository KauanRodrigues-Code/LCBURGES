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

// FUNÇÃO PARA FILTRAR POR CATEGORIA (CHAMADA PELOS BOTÕES DO HTML)
function filterCategory(cat) {
  currentCategory = cat;
  
  // Atualiza o visual dos botões
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.classList.remove("active");
    // Verifica se o texto do botão ou o atributo bate com a categoria
    if(btn.innerText.toLowerCase().includes(cat.slice(0,3))) {
        btn.classList.add("active");
    }
  });

  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";

  // FILTRAGEM REAL AQUI
  const filtered = productsData.filter(p => p.category === currentCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="coming-soon" style="grid-column: 1/-1; text-align: center; padding: 50px; background: #fff; border-radius: 20px;">
        <h3>Em breve...</h3>
        <p>Estamos preparando novidades para esta categoria!</p>
      </div>`;
    return;
  }

  filtered.forEach(p => {
    const btnText = p.category === 'bebidas' ? 'Selecionar bebida' : 'Selecionar lanche';
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" onerror="this.src='Logo.png'">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-footer">
          <span>R$ ${p.price.toFixed(2)}</span>
          <button class="select-btn" onclick="openProductModal(${p.id})">${btnText}</button>
        </div>
      </div>`;
  });
}

function openProductModal(id) {
    selectedProduct = productsData.find(p => p.id === id);
    document.getElementById("modal-obs").value = "";
    document.getElementById("modal-details").innerHTML = `
        <img src="${selectedProduct.img}" onerror="this.src='Logo.png'" class="modal-img-top">
        <div class="modal-header-text">
            <h2>${selectedProduct.name}</h2>
            <p>${selectedProduct.desc}</p>
        </div>
    `;

    const extrasDiv = document.getElementById("modal-extras");
    extrasDiv.innerHTML = "";
    
    // Só mostra adicionais se NÃO for bebida
    if(selectedProduct.category !== 'bebidas') {
        extrasData.forEach(extra => {
            extrasDiv.innerHTML += `
                <label class="extra-item">
                    <div style="display:flex; align-items:center;">
                        <input type="checkbox" class="extra-check" value="${extra.name}" data-price="${extra.price}" onchange="updateModalPrice()">
                        <span style="margin-left:10px">${extra.name}</span>
                    </div>
                    <span>+ R$ ${extra.price.toFixed(2)}</span>
                </label>`;
        });
    }

    const footer = document.querySelector(".modal-footer");
    const oldPrice = document.querySelector(".modal-base-price");
    if (oldPrice) oldPrice.remove();
    
    const priceTag = document.createElement("p");
    priceTag.className = "modal-base-price";
    priceTag.style.textAlign = "center";
    priceTag.style.fontWeight = "bold";
    priceTag.style.color = "#27ae60";
    priceTag.style.fontSize = "1.2rem";
    priceTag.style.margin = "10px 0";
    priceTag.innerHTML = `Total: R$ ${selectedProduct.price.toFixed(2)}`;
    footer.insertBefore(priceTag, document.getElementById("add-to-cart-btn"));

    document.getElementById("product-modal").style.display = "flex";
}

function updateModalPrice() {
    let total = selectedProduct.price;
    document.querySelectorAll('.extra-check:checked').forEach(c => {
        total += parseFloat(c.getAttribute('data-price'));
    });
    document.querySelector(".modal-base-price").innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

function closeModal() { document.getElementById("product-modal").style.display = "none"; }

function addToCartFromModal() {
    const extras = Array.from(document.querySelectorAll('.extra-check:checked')).map(el => ({
        name: el.value, price: parseFloat(el.getAttribute('data-price'))
    }));
    const obs = document.getElementById("modal-obs").value;
    const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
    
    cart.push({
        ...selectedProduct, 
        cartId: Date.now(), 
        extras, 
        obs,
        totalPrice: selectedProduct.price + extrasTotal
    });
    
    updateCart();
    closeModal();
    showToast(`${selectedProduct.name} adicionado!`);
}

function updateCart() {
  const itemsDiv = document.getElementById("cart-items");
  itemsDiv.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.totalPrice;
    itemsDiv.innerHTML += `
      <div class="cart-item-card" style="background:#fff; padding:15px; border-radius:12px; margin-bottom:10px; border-left:5px solid #27ae60;">
        <strong>${item.name}</strong><br>
        <small>${item.extras.map(e => e.name).join(', ')}</small>
        ${item.obs ? `<br><small>Obs: ${item.obs}</small>` : ''}
        <div style="display:flex; justify-content:space-between; margin-top:5px;">
            <span style="color:#27ae60; font-weight:bold;">R$ ${item.totalPrice.toFixed(2)}</span>
            <button onclick="removeFromCart(${item.cartId})" style="color:red; border:none; background:none; cursor:pointer; font-weight:bold;">Remover</button>
        </div>
      </div>`;
  });

  const deliveryType = document.getElementById("delivery-type").value;
  const deliveryTax = deliveryType === "entrega" ? 5 : 0;
  
  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-total").innerHTML = `Total: R$ ${(subtotal + deliveryTax).toFixed(2)}`;
}

function finishOrder() {
  if (cart.length === 0) return alert("Sacola vazia!");
  
  let msg = "PEDIDO - LC BURGERS\n--------------------------\n\n";
  cart.forEach(i => {
    msg += `ITEM: ${i.name}\n`;
    if (i.extras.length > 0) msg += `ADICIONAIS: ${i.extras.map(e => e.name).join(', ')}\n`;
    if (i.obs) msg += `OBS: ${i.obs}\n`;
    msg += `VALOR: R$ ${i.totalPrice.toFixed(2)}\n\n`;
  });
  
  const deliveryType = document.getElementById("delivery-type").value;
  if (deliveryType === "entrega") {
    msg += `ENTREGA: ${document.getElementById("cart-rua").value}, ${document.getElementById("cart-numero").value}\n`;
    msg += `BAIRRO: ${document.getElementById("cart-vila").value}\n`;
  } else { 
    msg += "RETIRADA NO BALCAO\n"; 
  }
  
  const subtotal = cart.reduce((a, b) => a + b.totalPrice, 0);
  const taxa = deliveryType === "entrega" ? 5 : 0;
  msg += `\nPAGAMENTO: ${document.getElementById("payment-method").value}\n`;
  msg += `TOTAL: R$ ${(subtotal + taxa).toFixed(2)}`;
  
  window.open(`https://wa.me/5543988230563?text=${encodeURIComponent(msg)}`);
}

function removeFromCart(id) { cart = cart.filter(i => i.cartId !== id); updateCart(); }

function toggleCart() { document.getElementById("cart").classList.toggle("open"); }

function toggleDeliveryFields() { 
    document.getElementById("address-fields").style.display = document.getElementById("delivery-type").value === "entrega" ? "block" : "none"; 
    updateCart();
}

function showToast(m) {
    const t = document.createElement("div"); 
    t.className = "toast-msg toast-success"; 
    t.innerText = m;
    document.body.appendChild(t); 
    setTimeout(() => t.remove(), 2000);
}

document.addEventListener("DOMContentLoaded", renderProducts);
