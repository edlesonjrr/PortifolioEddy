// pricingModal.js — Modal de serviços e preços

document.addEventListener("DOMContentLoaded", function () {

  const overlay = document.querySelector(".pricing-overlay");
  const modal   = document.querySelector(".pricing-modal");
  const btnOpen = document.querySelector(".btn-ver-precos");
  const btnClose= document.querySelector(".pricing-close");
  if (!overlay || !modal || !btnOpen) return;

  // ============================================
  // ABRIR / FECHAR
  // ============================================

  function openModal() {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    animateCards();
  }

  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    // Reseta cards para próxima abertura
    document.querySelectorAll(".pricing-card").forEach(c => c.classList.remove("visible"));
  }

  btnOpen.addEventListener("click", openModal);
  btnClose.addEventListener("click", closeModal);

  // Fecha ao clicar fora
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // ============================================
  // ANIMAÇÃO SEQUENCIAL DOS CARDS
  // ============================================

  function animateCards() {
    const cards = document.querySelectorAll(".pricing-card");
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("visible"), 120 + i * 130);
    });
  }

  // ============================================
  // BOTÕES DE SOLICITAÇÃO — WhatsApp
  // ============================================

  const whatsappNumber = "5581987225748";

  const messages = {
    landing:      "Olá! Vim pelo seu portfólio e tenho interesse no pacote *Landing Page*. Podemos conversar?",
    institucional:"Olá! Vim pelo seu portfólio e tenho interesse no pacote *Site Institucional*. Podemos conversar?",
    ecommerce:    "Olá! Vim pelo seu portfólio e tenho interesse no pacote *E-commerce*. Podemos conversar?",
  };

  document.querySelectorAll(".pricing-cta[data-package]").forEach(btn => {
    btn.addEventListener("click", () => {
      const pkg = btn.dataset.package;
      const msg = messages[pkg] || "Olá! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.";
      const url = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

});