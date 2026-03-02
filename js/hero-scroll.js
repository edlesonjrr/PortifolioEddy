// hero-scroll.js — Transição cinematográfica no scroll

document.addEventListener("DOMContentLoaded", function () {
  const hero = document.querySelector(".topo-do-site");
  const heroInner = document.querySelector(".topo-do-site .interface");
  const imgWrapper = document.querySelector(".img-topo-site");
  const glow = document.querySelector(".hero-glow");
  if (!hero) return;

  let ticking = false;

  function updateScroll() {
    const scrollY = window.scrollY;
    const heroH = hero.offsetHeight;
    const progress = Math.min(scrollY / (heroH * 0.65), 1); // 0→1
    const eased = 1 - Math.pow(1 - progress, 2); // ease-out

    // Conteúdo: scale down leve + fade
    if (heroInner) {
      const scale = 1 - eased * 0.03;
      const opacity = 1 - eased * 0.4;
      heroInner.style.transform = `scale(${scale.toFixed(4)})`;
      heroInner.style.opacity = opacity.toFixed(3);
    }

    // Foto: recua no Z
    if (imgWrapper) {
      const tz = -eased * 50;
      const scale = 1 - eased * 0.07;
      imgWrapper.style.transform = `perspective(900px) translateZ(${tz.toFixed(1)}px) scale(${scale.toFixed(4)})`;
    }

    // Glow: reduz intensidade
    if (glow) {
      glow.style.opacity = (0.45 * (1 - eased * 0.9)).toFixed(3);
    }

    // Partículas: canvas some suavemente
    const canvas = hero.querySelector("canvas");
    if (canvas) {
      canvas.style.opacity = (1 - eased * 0.75).toFixed(3);
    }

    // Partículas: afasta no Z via câmera
    if (window._heroCamera) {
      window._heroCamera.position.z = 7 + eased * 4;
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    },
    { passive: true },
  );
});
