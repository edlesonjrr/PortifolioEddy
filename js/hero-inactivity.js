// hero-inactivity.js — Easter egg por inatividade (5 segundos)

document.addEventListener("DOMContentLoaded", function () {
  const TIMEOUT_MS = 10000;
  const glow = document.querySelector(".hero-glow");

  let inactiveTimer = null;
  let isInactive = false;

  function activateEasterEgg() {
    if (isInactive) return;
    isInactive = true;
    window._heroInactive = true;

    // Intensifica glow
    if (glow) {
      glow.style.transition =
        "opacity 1.2s ease, transform 1.2s ease, filter 1.2s ease";
      glow.style.opacity = "0.85";
      glow.style.filter = "blur(36px)";
      glow.style.transform = "translate(-50%, -50%) scale(1.25)";
    }

    // Conexões ficam mais visíveis — tratado no hero-particles.js via _heroInactive
  }

  function deactivateEasterEgg() {
    if (!isInactive) return;
    isInactive = false;
    window._heroInactive = false;

    if (glow) {
      glow.style.transition =
        "opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease";
      glow.style.opacity = "";
      glow.style.filter = "";
      glow.style.transform = "";
    }
  }

  function resetTimer() {
    if (inactiveTimer) clearTimeout(inactiveTimer);
    if (isInactive) deactivateEasterEgg();
    inactiveTimer = setTimeout(activateEasterEgg, TIMEOUT_MS);
  }

  // Detecta qualquer interação
  ["mousemove", "scroll", "click", "keydown", "touchstart"].forEach((evt) => {
    window.addEventListener(evt, resetTimer, { passive: true });
  });

  // Inicia contagem
  resetTimer();
});
