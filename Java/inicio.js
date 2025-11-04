const burger = document.getElementById("menu-burger");
const menu = document.getElementById("menu-lista");

burger.addEventListener("click", () => {
  menu.classList.toggle("ativo");
});