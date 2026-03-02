// js/popup.js — Popup de projetos com filtros

const overlay = document.querySelector(".projetos-overlay");
const popup = document.querySelector(".projetos-popup");
const btnAbrir = document.querySelector(".btn-ver-projetos");
const btnFechar = document.querySelector(".projetos-popup__close");
const filtroBtns = document.querySelectorAll(".filtro-btn");

// Mensagem de vazio (criada dinamicamente)
let emptyMsg = document.querySelector(".filtro-empty");
if (!emptyMsg) {
  emptyMsg = document.createElement("p");
  emptyMsg.className = "filtro-empty";
  emptyMsg.textContent = "Nenhum projeto nesta categoria ainda.";
  document.querySelector(".projetos-grid").appendChild(emptyMsg);
}

function animarCards() {
  const cards = popup.querySelectorAll(".projeto-card:not(.hidden-filter)");
  cards.forEach((card) => {
    card.classList.remove("animate");
    void card.offsetWidth;
    card.classList.add("animate");
  });
}

function filtrar(categoria) {
  const cards = popup.querySelectorAll(".projeto-card");
  let visiveis = 0;

  cards.forEach((card) => {
    const cat = card.dataset.category;
    const mostrar = categoria === "all" || cat === categoria;
    card.classList.toggle("hidden-filter", !mostrar);
    if (mostrar) visiveis++;
  });

  emptyMsg.classList.toggle("visible", visiveis === 0);
  animarCards();
}

function abrirPopup() {
  overlay.classList.add("active");
  popup.classList.add("active");
  document.body.style.overflow = "hidden";

  // Reseta filtro para "Todos" ao abrir
  filtroBtns.forEach((b) => b.classList.remove("active"));
  document.querySelector('[data-filter="all"]').classList.add("active");
  filtrar("all");
}

function fecharPopup() {
  overlay.classList.remove("active");
  popup.classList.remove("active");
  document.body.style.overflow = "";
}

// Filtros
filtroBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtroBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filtrar(btn.dataset.filter);
  });
});

if (btnAbrir) btnAbrir.addEventListener("click", abrirPopup);
if (btnFechar) btnFechar.addEventListener("click", fecharPopup);
if (overlay) overlay.addEventListener("click", fecharPopup);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharPopup();
});
