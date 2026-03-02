// js/portfolio-desktop.js

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 768) return;

  const portfolioCards = document.querySelectorAll(".img-port");

  portfolioCards.forEach((card) => {
    let animationId = null;
    let startTime = null;
    let isAnimating = false;
    const DURATION = 8000;

    // Remove qualquer transition CSS que possa interferir
    card.style.transition = "none";

    function animateDown(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      card.style.backgroundPosition = `100% ${progress * 100}%`;

      if (progress < 1) {
        animationId = requestAnimationFrame(animateDown);
      } else {
        // Chegou em 100% — inicia o reverso
        startTime = null;
        animationId = requestAnimationFrame(animateUp);
      }
    }

    function animateUp(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      card.style.backgroundPosition = `100% ${(1 - progress) * 100}%`;

      if (progress < 1) {
        animationId = requestAnimationFrame(animateUp);
      } else {
        // Voltou ao 0% — libera para nova animação
        card.style.backgroundPosition = "100% 0%";
        isAnimating = false;
      }
    }

    card.addEventListener("mouseenter", function () {
      if (isAnimating) return;

      isAnimating = true;
      startTime = null;

      const overlay = this.querySelector(".overlay");
      if (overlay) overlay.style.opacity = "1";

      animationId = requestAnimationFrame(animateDown);
    });

    card.addEventListener("mouseleave", function () {
      const overlay = this.querySelector(".overlay");
      if (overlay) overlay.style.opacity = "0";
      // animação continua — não interrompe
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
      portfolioCards.forEach((card) => {
        card.style.transition = "";
        card.style.backgroundPosition = "";
      });
    }
  });
});
