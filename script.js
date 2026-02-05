const productsData = [
  // TRADICIONAIS
  { id: 1, name: "BACON BURGER", desc: "Pão brioche, hambúrguer gourmet, bacon, barbecue, queijo mussarela, alface, tomate. (Acompanha fritas)", price: 27.00, category: "tradicionais", img: "BACON-BURGER.png" },
  { id: 2, name: "SALADA BURGER", desc: "Pão brioche, hambúrguer gourmet, tomate, alface, vinagrete, maionese verde, queijo mussarela.", price: 25.00, category: "tradicionais", img: "SALADA-BURGER.png" },
  { id: 3, name: "CALABRESA BURGER", desc: "Pão brioche, hambúrguer gourmet, queijo mussarela, calabresa, alface, tomate, cebola, maionese da casa.", price: 23.00, category: "tradicionais", img: "CALABRESA-BURGER.png" },
  { id: 4, name: "EGG BURGER", desc: "Pão brioche, hambúrguer gourmet, tomate, alface, ovo, queijo mussarela.", price: 22.00, category: "tradicionais", img: "EGG-BURGER.png" },
  { id: 5, name: "CHESE BURGER", desc: "Pão brioche, hambúrguer gourmet, batata palha, queijo mussarela, requeijão, maionese caseira.", price: 20.00, category: "tradicionais", img: "CHESE-BURGER.png" },
  { id: 6, name: "BURGER", desc: "Pão brioche, hambúrguer gourmet, maionese da casa.", price: 15.00, category: "tradicionais", img: "BURGER.png" },

  // GOURMETS
  { id: 7, name: "COLOSSAL BURGER", desc: "Pão brioche, hambúrguer gourmet premium, frango empanado, alface, tomate, bacon, calabresa, ovo, queijo cheddar.", price: 40.00, category: "gourmets", img: "logo.png" },
  { id: 8, name: "CHICKEN BURGER", desc: "Pão brioche, frango empanado, maionese caseira, molho barbecue, batata palha, queijo cheddar.", price: 35.00, category: "gourmets", img: "logo.png" },
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

// 🔥 ADICIONAIS
const adicionais = [
  { name: "Hambúrguer Empanado de Frango", price: 12 },
  { name: "Hambúrguer de Linguiça Toscana", price: 10 },
  { name: "Hambúrguer Tradicional", price: 8 },
  { name: "Hambúrguer Gourmet", price: 10 },
  { name: "Cheddar", price: 4 },
  { name: "Queijo Mussarela", price: 3 },
  { name: "Queijo Coalho", price: 5 },
  { name: "Queijo Coalho com Mel", price: 6 },
  { name: "Calabresa", price: 6 },
  { name: "Maionese Caseira", price: 2 },
  { name: "Cebola", price: 2 },
  { name: "Ovo", price: 4 },
  { name: "Bacon", price: 6 },
  { name: "Batata Palha", price: 3 },
  { name: "Requeijão", price: 4 },
  { name: "Barbecue", price: 4 },
  { name: "Alface", price: 2 },
  { name: "Tomate", price: 2 },
  { name: "Vinagrete", price: 3 },
  { name: "Doritos", price: 5 },
  { name: "Geleia", price: 3 },
  { name: "Cebola Caramelizada", price: 5 },
  { name: "Abacaxi", price: 5 }
];

let cart = [];
let currentCategory = "tradicionais";
let produtoSelecionado = null;

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  productsData.filter(p => p.category === currentCategory).forEach(p => {
    container.innerHTML += `
      <div class="product" onclick="abrirAdicionais(${p.id})">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <span>R$ ${p.price.toFixed(2)}</span>
      </div>
    `;
  });
}

function abrirAdicionais(id) {
  produtoSelecionado = productsData.find(p => p.id === id);
  if (produtoSelecionado.category === "bebidas") {
    addToCart(id);
    return;
  }

  const box = document.getElementById("lista-adicionais");
  box.innerHTML = adicionais.map(a =>
    `<label><input type="checkbox" value="${a.price}" data-name="${a.name}"> ${a.name} (+R$ ${a.price})</label>`
  ).join("");

  document.getElementById("modal-adicionais").classList.add("open");
}

function confirmarAdicionais() {
  let totalExtra = 0;
  let nomes = [];

  document.querySelectorAll("#lista-adicionais input:checked").forEach(i => {
    totalExtra += Number(i.value);
    nomes.push(i.dataset.name);
  });

  cart.push({
    ...produtoSelecionado,
    price: produtoSelecionado.price + totalExtra,
    adicionais: nomes,
    qty: 1
  });

  document.getElementById("modal-adicionais").classList.remove("open");
  updateCart();
}

function updateCart() {
  const div = document.getElementById("cart-items");
  div.innerHTML = "";

  cart.forEach(i => {
    div.innerHTML += `
      <div>
        <strong>${i.name}</strong><br>
        ${i.adicionais ? "➕ " + i.adicionais.join(", ") : ""}
        <br><b>R$ ${i.price.toFixed(2)}</b>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", renderProducts);