// js/timeline.js

document.addEventListener("DOMContentLoaded", function () {
  const tlOverlay = document.querySelector(".timeline-overlay");
  const tlPopup = document.querySelector(".timeline-popup");
  const btnAbrir = document.querySelector(".btn-trajetoria");
  const btnFechar = document.querySelector(".timeline-popup__close");
  const tlBody = document.querySelector(".timeline-popup__body");

  // Debug — remove depois de confirmar que funciona
  console.log("timeline.js carregado");
  console.log("btnAbrir:", btnAbrir);
  console.log("tlOverlay:", tlOverlay);
  console.log("tlPopup:", tlPopup);

  if (!btnAbrir) {
    console.error("ERRO: .btn-trajetoria não encontrado no DOM!");
    return;
  }
  if (!tlOverlay || !tlPopup) {
    console.error("ERRO: .timeline-overlay ou .timeline-popup não encontrado!");
    return;
  }

  let tlObserver = null;

  function criarObserver() {
    if (tlObserver) tlObserver.disconnect();

    tlObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.tlDelay || 0;
            setTimeout(() => {
              entry.target.classList.add("tl-visible");
            }, delay);
            tlObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: tlBody,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.15,
      },
    );

    tlPopup.querySelectorAll(".tl-node").forEach((node, i) => {
      node.dataset.tlDelay = i * 120;
      tlObserver.observe(node);
    });

    tlPopup.querySelectorAll(".tl-card").forEach((card, i) => {
      card.dataset.tlDelay = i * 120 + 80;
      tlObserver.observe(card);
    });
  }

  function resetAnimacoes() {
    tlPopup.querySelectorAll(".tl-card, .tl-node").forEach((el) => {
      el.classList.remove("tl-visible");
    });
  }

  function abrirPopup() {
    tlOverlay.classList.add("active");
    tlPopup.classList.add("active");
    document.body.style.overflow = "hidden";
    tlBody.scrollTop = 0;

    setTimeout(() => {
      resetAnimacoes();
      criarObserver();
    }, 120);
  }

  function fecharPopup() {
    tlOverlay.classList.remove("active");
    tlPopup.classList.remove("active");
    document.body.style.overflow = "";
    if (tlObserver) tlObserver.disconnect();
  }

  btnAbrir.addEventListener("click", abrirPopup);
  btnFechar.addEventListener("click", fecharPopup);
  tlOverlay.addEventListener("click", fecharPopup);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharPopup();
  });
});
