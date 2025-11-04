// Pega o formulário com o id "registerForm" e adiciona um evento de "submit" (quando o usuário clicar em cadastrar)
document.getElementById("registerForm").addEventListener("submit", function (e) {

  e.preventDefault();
  // Impede que o formulário seja enviado automaticamente (para poder validar antes)

  const senha = document.getElementById("password").value;
  // Pega o valor digitado no campo de senha

  const confirmar = document.getElementById("confirm-password").value;
  // Pega o valor digitado no campo de confirmação de senha

  if (senha !== confirmar) {
    // Verifica se a senha e a confirmação são diferentes
    alert("As senhas não coincidem!");
    // Mostra um alerta de erro
    return;
    // Interrompe o código aqui, não deixa prosseguir
  }

  // Se as senhas forem iguais:
  alert("Cadastro realizado com sucesso!");
  // Mostra um alerta de sucesso

  window.location.href = "login.html";
  // Redireciona o usuário para a página de login
});
document.getElementById("menu-burger").addEventListener("click", function () {
  document.getElementById("menu-lista").classList.toggle("ativo");
});