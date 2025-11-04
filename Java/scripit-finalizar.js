// Recupera o carrinho do localStorage
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Agrupa os produtos iguais (para contar quantidade)
const carrinhoAgrupado = carrinho.reduce((acc, item) => {
  let existente = acc.find(p => p.nome === item.nome);
  if (existente) {
    existente.qtd += 1;
    existente.subtotal += item.preco;
  } else {
    acc.push({ nome: item.nome, preco: item.preco, qtd: 1, subtotal: item.preco });
  }
  return acc;
}, []);

const listaPedido = document.getElementById("lista-pedido");
const totalPedido = document.getElementById("total-pedido");

// Renderiza itens
let total = 0;
carrinhoAgrupado.forEach(item => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>R$ ${item.preco.toFixed(2)}</td>
    <td>${item.qtd}</td>
    <td>R$ ${item.subtotal.toFixed(2)}</td>
  `;
  listaPedido.appendChild(tr);
  total += item.subtotal;
});

totalPedido.textContent = `Total: R$ ${total.toFixed(2)}`;

// Captura envio do formulário
document.getElementById("form-finalizar").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Compra confirmada! Obrigado por comprar na STRIDE 🚀");
  localStorage.removeItem("carrinho");
  window.location.href = "stride.html"; // volta pra home
});
