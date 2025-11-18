let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let total = carrinho.reduce((acc, item) => acc + item.preco, 0);

// ======== Funções de Utilidade ========

// Formata preço em Real (BRL)
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Notificação (opcional)
function mostrarNotificacao(texto) {
  const aviso = document.createElement("div");
  aviso.textContent = texto;
  aviso.style.position = "fixed";
  aviso.style.bottom = "20px";
  aviso.style.right = "20px";
  aviso.style.background = "#222";
  aviso.style.color = "#fff";
  aviso.style.padding = "10px 15px";
  aviso.style.borderRadius = "8px";
  aviso.style.boxShadow = "0 0 10px rgba(0,0,0,0.4)";
  aviso.style.zIndex = "9999";
  aviso.style.opacity = "0";
  aviso.style.transition = "opacity 0.3s ease";

  document.body.appendChild(aviso);
  setTimeout(() => (aviso.style.opacity = "1"), 100);
  setTimeout(() => {
    aviso.style.opacity = "0";
    setTimeout(() => aviso.remove(), 400);
  }, 2000);
}

// ======== Controle do Carrinho ========

// Abre o carrinho
function abrirCarrinho() {
  document.getElementById("carrinho-barra").classList.add("ativo");
}

// Fecha o carrinho
function fecharCarrinho() {
  document.getElementById("carrinho-barra").classList.remove("ativo");
}

// Fecha carrinho apenas se clicar fora dele E não for em botões do carrinho
document.addEventListener("click", function (event) {
  const carrinhoEl = document.getElementById("carrinho-barra");
  const clicouFora = !carrinhoEl.contains(event.target);
  const ehBotaoAdicionar = event.target.matches("button[onclick^='adicionarCarrinho']");
  const ehBotaoRemover = event.target.classList.contains("remover");

  if (clicouFora && !ehBotaoAdicionar && !ehBotaoRemover) {
    fecharCarrinho();
  }
});

// ======== Funções de Manipulação ========

// Adiciona produto ao carrinho
function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  atualizarCarrinho();
  abrirCarrinho();
  mostrarNotificacao(`${nome} adicionado ao carrinho!`);
}

// Remove item do carrinho (sem fechar o carrinho)
function removerItem(index, event) {
  event?.stopPropagation(); // impede clique de interferir
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  atualizarCarrinho();
  mostrarNotificacao("Item removido do carrinho.");
}

// Atualiza lista e total do carrinho
function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  const totalEl = document.getElementById("total");
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = `<li style="color:#aaa; text-align:center;">Carrinho vazio 🛒</li>`;
  }

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nome} - ${formatarPreco(item.preco)}</span>
      <button class="remover" onclick="removerItem(${index}, event)">Remover</button>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: ${formatarPreco(total)}`;
}

// ======== Finalizar Compra ========

document.querySelector(".finalizar")?.addEventListener("click", () => {
  if (carrinho.length === 0) {
    mostrarNotificacao("Seu carrinho está vazio! 🚫");
    return;
  }

  if (confirm(`Deseja finalizar a compra no valor de ${formatarPreco(total)}?`)) {
    carrinho = [];
    total = 0;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();
    fecharCarrinho();
    mostrarNotificacao("Compra finalizada com sucesso! ✅");
  }
});

// ======== Atualiza ao carregar a página ========
document.addEventListener("DOMContentLoaded", atualizarCarrinho);
// Atualiza contador de itens no carrinho
function atualizarContadorCarrinho() {
  const contador = document.getElementById("carrinho-contador");
  if (contador) contador.textContent = carrinho.length;
}
atualizarContadorCarrinho();

// Função de adicionar produto ao carrinho
function adicionarCarrinho(nome, preco, imagem) {
  const produto = { nome, preco, imagem };

  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  total += preco;
  atualizarContadorCarrinho();

  // Mensagem rápida de feedback
  mostrarNotificacao(`${nome} adicionado ao carrinho!`);
}

// Notificação de feedback visual
function mostrarNotificacao(mensagem) {
  const alerta = document.createElement("div");
  alerta.textContent = mensagem;
  alerta.style.position = "fixed";
  alerta.style.bottom = "20px";
  alerta.style.right = "20px";
  alerta.style.background = "#333";
  alerta.style.color = "#fff";
  alerta.style.padding = "10px 20px";
  alerta.style.borderRadius = "8px";
  alerta.style.fontSize = "14px";
  alerta.style.zIndex = "9999";
  document.body.appendChild(alerta);
  setTimeout(() => alerta.remove(), 2000);
}

// ----- Lógica da página de produto -----
const botao = document.getElementById("addCarrinhoBtn");

if (botao) {
  botao.addEventListener("click", () => {
    const nome = document.querySelector(".info-produto h1").textContent;
    const precoTexto = document.querySelector(".preco").textContent.replace("R$", "").replace(",", ".");
    const preco = parseFloat(precoTexto);
    const imagem = document.getElementById("produto-img").src;

    adicionarCarrinho(nome, preco, imagem);
  });
}
// Formata valor em Real (BRL)
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Atualiza contador 🛒
function atualizarContadorCarrinho() {
  const contador = document.getElementById("carrinho-contador");
  if (contador) contador.textContent = carrinho.length;
}
atualizarContadorCarrinho();

// Atualiza o carrinho lateral
function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  const totalEl = document.getElementById("total");

  if (!lista || !totalEl) return; // caso a página não tenha o carrinho lateral

  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = `<li style="color:#aaa; text-align:center;">Carrinho vazio 🛒</li>`;
  }

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nome} - ${formatarPreco(item.preco)}</span>
      <button class="remover" onclick="removerItem(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: ${formatarPreco(total)}`;
}

// Abre o carrinho lateral
function abrirCarrinho() {
  const barra = document.getElementById("carrinho-barra");
  if (barra) barra.classList.add("ativo");
}

// Fecha o carrinho lateral
function fecharCarrinho() {
  const barra = document.getElementById("carrinho-barra");
  if (barra) barra.classList.remove("ativo");
}

// Remove item do carrinho
function removerItem(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
  atualizarContadorCarrinho();
  mostrarNotificacao("Item removido do carrinho 🗑️");
}

// Adiciona produto ao carrinho
function adicionarCarrinho(nome, preco, imagem) {
  const produto = { nome, preco, imagem };

  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  total += preco;

  atualizarCarrinho();
  atualizarContadorCarrinho();
  abrirCarrinho();
  mostrarNotificacao(`${nome} adicionado ao carrinho 🛒`);
}

// ========== NOTIFICAÇÃO VISUAL ==========
function mostrarNotificacao(mensagem) {
  const alerta = document.createElement("div");
  alerta.textContent = mensagem;
  alerta.style.position = "fixed";
  alerta.style.bottom = "25px";
  alerta.style.right = "25px";
  alerta.style.background = "rgba(0,0,0,0.85)";
  alerta.style.color = "white";
  alerta.style.padding = "12px 20px";
  alerta.style.borderRadius = "10px";
  alerta.style.fontSize = "14px";
  alerta.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
  alerta.style.zIndex = "9999";
  alerta.style.opacity = "0";
  alerta.style.transition = "opacity 0.4s ease";

  document.body.appendChild(alerta);
  setTimeout(() => (alerta.style.opacity = "1"), 10);
  setTimeout(() => {
    alerta.style.opacity = "0";
    setTimeout(() => alerta.remove(), 400);
  }, 2000);
}
if (botao) {
  botao.addEventListener("click", () => {
    const nome = document.querySelector(".info-produto h1").textContent;
    const precoTexto = document.querySelector(".preco").textContent.replace("R$", "").replace(",", ".");
    const preco = parseFloat(precoTexto);
    const imagem = document.getElementById("produto-img").src;

    adicionarCarrinho(nome, preco, imagem);
  });
}

