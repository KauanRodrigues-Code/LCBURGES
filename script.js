const productsData = [
    { id: 1, name: "BACON BURGER", desc: "Pão brioche, hambúrguer gourmet, bacon, barbecue, queijo mussarela, alface, tomate. (Acompanha fritas)", price: 27.00, category: "tradicionais", img: "BACON-BURGER.png" },
    { id: 2, name: "SALADA BURGER", desc: "Pão brioche, hambúrguer gourmet, tomate, alface, vinagrete, maionese verde, queijo mussarela.", price: 25.00, category: "tradicionais", img: "SALADA-BURGER.png" },
    { id: 3, name: "CALABRESA BURGER", desc: "Pão brioche, hambúrguer gourmet, queijo mussarela, calabresa, alface, tomate, cebola, maionese da casa.", price: 23.00, category: "tradicionais", img: "CALABRESA-BURGER.png" },
    { id: 4, name: "EGG BURGER", desc: "Pão brioche, hambúrguer gourmet, tomate, alface, ovo, queijo mussarela.", price: 22.00, category: "tradicionais", img: "EGG-BURGER.png" },
    { id: 5, name: "CHESE BURGER", desc: "Pão brioche, hambúrguer gourmet, batata palha, queijo mussarela, requeijão, maionese caseira.", price: 20.00, category: "tradicionais", img: "CHESE-BURGER.png" },
    { id: 6, name: "BURGER", desc: "Pão brioche, hambúrguer gourmet, maionese da casa.", price: 15.00, category: "tradicionais", img: "BURGER.png" },
    { id: 7, name: "COLOSSAL BURGER", desc: "Pão brioche, hambúrguer premium, frango empanado, alface, tomate, bacon, calabresa, ovo, queijo cheddar.", price: 40.00, category: "gourmets", img: "COLOSSAL-BURGER.png" },
    { id: 14, name: "Coca-Cola Lata", desc: "350ml gelada", price: 6.00, category: "bebidas", img: "COCA-LATA.png" }
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
    productsData.filter(p => p.category === currentCategory).forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${p.img}" onerror="this.src='Logo.png'">
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                    <div class="price">R$ ${p.price.toFixed(2)}</div>
                    <button class="finish-btn" style="padding:10px; font-size:0.9rem" onclick="openProductModal(${p.id})">Selecionar</button>
                </div>
            </div>`;
    });
}

function openProductModal(id) {
    selectedProduct = productsData.find(p => p.id === id);
    document.getElementById("modal-details").innerHTML = `<h2>${selectedProduct.name}</h2><p>${selectedProduct.desc}</p>`;
    const extrasDiv = document.getElementById("modal-extras");
    extrasDiv.innerHTML = "";
    if(selectedProduct.category !== 'bebidas') {
        extrasData.forEach(ex => {
            extrasDiv.innerHTML += `<div class="extra-item">
                <label><input type="checkbox" class="extra-check" data-price="${ex.price}" value="${ex.name}"> ${ex.name}</label>
                <span>+ R$ ${ex.price.toFixed(2)}</span>
            </div>`;
        });
    }
    document.getElementById("product-modal").style.display = "flex";
}

function addToCartFromModal() {
    const checks = document.querySelectorAll('.extra-check:checked');
    const extras = Array.from(checks).map(c => ({ name: c.value, price: parseFloat(c.dataset.price) }));
    const totalItem = selectedProduct.price + extras.reduce((a, b) => a + b.price, 0);
    cart.push({ ...selectedProduct, cartId: Date.now(), extras, totalPrice: totalItem, obs: document.getElementById("modal-obs").value });
    updateCart(); closeModal();
}

function updateCart() {
    const itemsDiv = document.getElementById("cart-items");
    itemsDiv.innerHTML = "";
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.totalPrice;
        itemsDiv.innerHTML += `<div class="cart-section-card">
            <strong>${item.name}</strong><br><small>${item.extras.map(e => e.name).join(', ')}</small>
            <div style="color:#27ae60; font-weight:bold">R$ ${item.totalPrice.toFixed(2)}</div>
            <button onclick="removeFromCart(${item.cartId})" style="color:red; border:none; background:none; cursor:pointer">Remover</button>
        </div>`;
    });
    const taxa = document.getElementById("delivery-type").value === "entrega" ? 5 : 0;
    document.getElementById("cart-total").innerText = `Total: R$ ${(subtotal + taxa).toFixed(2)}`;
    document.getElementById("cart-count").innerText = cart.length;
}

function finishOrder() {
    if(!cart.length) return alert("Sacola vazia!");
    let msg = "*PEDIDO LC BURGERS*\n\n";
    cart.forEach(i => msg += `*${i.name}*\nAdicionais: ${i.extras.map(e => e.name).join(', ') || 'Nenhum'}\nObs: ${i.obs}\nSubtotal: R$ ${i.totalPrice.toFixed(2)}\n\n`);
    msg += `*${document.getElementById("cart-total").innerText}*`;
    window.open(`https://wa.me/5543988230563?text=${encodeURIComponent(msg)}`);
}

function filterCategory(c) { currentCategory = c; renderProducts(); }
function closeModal() { document.getElementById("product-modal").style.display = "none"; }
function toggleCart() { document.getElementById("cart").classList.toggle("open"); }
function removeFromCart(id) { cart = cart.filter(i => i.cartId !== id); updateCart(); }
function clearCart() { cart = []; updateCart(); }
function toggleDeliveryFields() { document.getElementById("address-fields").style.display = document.getElementById("delivery-type").value === "entrega" ? "block" : "none"; updateCart(); }
function toggleTrocoField() { document.getElementById("troco-field").style.display = document.getElementById("payment-method").value === "Dinheiro" ? "block" : "none"; }

document.getElementById("add-to-cart-btn").onclick = addToCartFromModal;
document.addEventListener("DOMContentLoaded", renderProducts);
