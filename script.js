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
    { id: 15, name: "Coca-Cola Lata Zero", desc: "350ml gelada", price: 6.00, category: "bebidas", img: "COCA-LATA-ZERO.png" },
    { id: 16, name: "Guaraná Antarctica Lata", desc: "350ml gelada", price: 6.00, category: "bebidas", img: "GUARANA-LATA.png" },
    { id: 17, name: "Coca-Cola 1L", desc: "Garrafa 1L gelada", price: 12.00, category: "bebidas", img: "COCA-1L.png" },
    { id: 18, name: "Coca-Cola 1L Zero", desc: "Garrafa 1L gelada", price: 12.00, category: "bebidas", img: "COCA-1L-ZERO.png" }
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

function renderProducts() {
    const container = document.getElementById("products");
    container.innerHTML = "";
    const filtered = productsData.filter(p => p.category === currentCategory);

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:50px;">
            <h2>Em breve...</h2><p>Estamos preparando novidades!</p></div>`;
        return;
    }

    filtered.forEach(p => {
        const btnText = p.category === 'bebidas' ? 'Selecionar bebida' : 'Selecionar lanche';
        container.innerHTML += `
            <div class="product-card">
                <img src="${p.img}" onerror="this.src='Logo.png'">
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                    <div class="price">R$ ${p.price.toFixed(2)}</div>
                    <button class="finish-btn" style="padding:10px; font-size:0.9rem" onclick="openProductModal(${p.id})">${btnText}</button>
                </div>
            </div>`;
    });
}

function openProductModal(id) {
    selectedProduct = productsData.find(p => p.id === id);
    document.getElementById("modal-obs").value = "";
    document.getElementById("modal-details").innerHTML = `
        <img src="${selectedProduct.img}" style="width:100%; height:180px; object-fit:contain;" onerror="this.src='Logo.png'">
        <h2 style="margin:15px 0 5px; font-size:1.5rem;">${selectedProduct.name}</h2>
        <p style="color:#666; font-size:0.95rem; margin-bottom:10px;">${selectedProduct.desc}</p>
        <p id="modal-total-display" style="color:#27ae60; font-weight:900; font-size:1.4rem;">Total: R$ ${selectedProduct.price.toFixed(2)}</p>
    `;

    const extrasDiv = document.getElementById("modal-extras");
    extrasDiv.innerHTML = "";
    if(selectedProduct.category !== 'bebidas') {
        extrasData.forEach(ex => {
            extrasDiv.innerHTML += `
                <div class="extra-item">
                    <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                        <input type="checkbox" class="extra-check" data-price="${ex.price}" value="${ex.name}" onchange="updateModalPrice()">
                        ${ex.name}
                    </label>
                    <span style="color:#666;">+ R$ ${ex.price.toFixed(2)}</span>
                </div>`;
        });
    }
    document.getElementById("product-modal").style.display = "flex";
}

function updateModalPrice() {
    let total = selectedProduct.price;
    document.querySelectorAll('.extra-check:checked').forEach(c => total += parseFloat(c.dataset.price));
    document.getElementById("modal-total-display").innerText = `Total: R$ ${total.toFixed(2)}`;
}

function addToCartFromModal() {
    const checks = document.querySelectorAll('.extra-check:checked');
    const extras = Array.from(checks).map(c => ({ name: c.value, price: parseFloat(c.dataset.price) }));
    const totalItem = selectedProduct.price + extras.reduce((a, b) => a + b.price, 0);
    cart.push({ 
        ...selectedProduct, 
        cartId: Date.now(), 
        extras, 
        totalPrice: totalItem, 
        obs: document.getElementById("modal-obs").value 
    });
    updateCart(); 
    closeModal();
}

function updateCart() {
    const itemsDiv = document.getElementById("cart-items");
    itemsDiv.innerHTML = "";
    let subtotalGeral = 0;

    cart.forEach(item => {
        subtotalGeral += item.totalPrice;
        itemsDiv.innerHTML += `
            <div class="cart-section-card" style="border-left:5px solid #27ae60;">
                <div style="display:flex; justify-content:space-between;">
                    <strong style="font-size:1.1rem;">${item.name}</strong>
                    <button onclick="removeFromCart(${item.cartId})" style="color:#e74c3c; border:none; background:none; font-weight:bold; cursor:pointer;">Remover</button>
                </div>
                <small style="color:#555; display:block; margin:5px 0;">${item.extras.map(e => e.name).join(', ') || 'Sem adicionais'}</small>
                ${item.obs ? `<small style="font-style:italic;">Obs: ${item.obs}</small>` : ''}
                <div style="color:#27ae60; font-weight:900; margin-top:5px;">R$ ${item.totalPrice.toFixed(2)}</div>
            </div>`;
    });

    const taxa = document.getElementById("delivery-type").value === "entrega" ? 5 : 0;
    const totalFinal = subtotalGeral + taxa;
    
    document.getElementById("cart-total").innerText = `Total: R$ ${totalFinal.toFixed(2)}`;
    document.getElementById("cart-count").innerText = cart.length;
}

function finishOrder() {
    if(!cart.length) return alert("Sua sacola está vazia!");
    
    let msg = "*PEDIDO LC BURGERS*\n--------------------------\n";
    cart.forEach(i => {
        msg += `*${i.name}*\n`;
        if(i.extras.length) msg += `+ Adicionais: ${i.extras.map(e => e.name).join(', ')}\n`;
        if(i.obs) msg += `+ Obs: ${i.obs}\n`;
        msg += `Valor: R$ ${i.totalPrice.toFixed(2)}\n\n`;
    });

    const delivery = document.getElementById("delivery-type").value;
    if(delivery === "entrega") {
        msg += `*ENTREGA:* ${document.getElementById("cart-rua").value}, ${document.getElementById("cart-numero").value}\n`;
        msg += `*BAIRRO:* ${document.getElementById("cart-vila").value}\n`;
        msg += `*REF:* ${document.getElementById("cart-ponto-ref").value}\n`;
        msg += `*(Taxa de entrega R$ 5,00 incluída)*\n`;
    } else {
        msg += `*RETIRADA NO BALCÃO*\n`;
    }

    const pag = document.getElementById("payment-method").value;
    msg += `\n*PAGAMENTO:* ${pag}`;
    if(pag === 'Dinheiro') msg += ` (Troco para ${document.getElementById("cart-troco").value})`;
    
    msg += `\n\n*TOTAL DO PEDIDO: ${document.getElementById("cart-total").innerText}*`;
    
    window.open(`https://wa.me/5543988230563?text=${encodeURIComponent(msg)}`);
}

function filterCategory(c) { 
    currentCategory = c; 
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${c}'`));
    });
    renderProducts(); 
}

function closeModal() { document.getElementById("product-modal").style.display = "none"; }
function toggleCart() { document.getElementById("cart").classList.toggle("open"); }
function removeFromCart(id) { cart = cart.filter(i => i.cartId !== id); updateCart(); }
function clearCart() { if(confirm("Limpar sacola?")) { cart = []; updateCart(); } }
function toggleDeliveryFields() { document.getElementById("address-fields").style.display = document.getElementById("delivery-type").value === "entrega" ? "block" : "none"; updateCart(); }
function toggleTrocoField() { document.getElementById("troco-field").style.display = document.getElementById("payment-method").value === "Dinheiro" ? "block" : "none"; }

document.getElementById("add-to-cart-btn").onclick = addToCartFromModal;
document.addEventListener("DOMContentLoaded", renderProducts);
