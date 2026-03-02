// hero-parallax.js — Parallax refinado no texto e foto baseado no mouse

document.addEventListener("DOMContentLoaded", function () {
  const txtTopo = document.querySelector(".txt-topo-site");
  const imgTopo = document.querySelector(".img-topo-site");
  if (!txtTopo || !imgTopo) return;

  const isMobile = window.innerWidth < 768;
  if (isMobile) return; // parallax só no desktop

  // Limites em px
  const TXT_MAX = 5; // texto move até 5px
  const IMG_MAX = 9; // foto move em direção oposta, até 9px
  const LERP = 0.06; // suavidade (menor = mais suave)

  let targetTxtX = 0,
    targetTxtY = 0;
  let targetImgX = 0,
    targetImgY = 0;
  let curTxtX = 0,
    curTxtY = 0;
  let curImgX = 0,
    curImgY = 0;

  window.addEventListener("mousemove", (e) => {
    // Normaliza -1 → 1
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;

    targetTxtX = nx * TXT_MAX;
    targetTxtY = ny * TXT_MAX;
    targetImgX = -nx * IMG_MAX; // direção oposta
    targetImgY = -ny * IMG_MAX;
  });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function tick() {
    requestAnimationFrame(tick);

    curTxtX = lerp(curTxtX, targetTxtX, LERP);
    curTxtY = lerp(curTxtY, targetTxtY, LERP);
    curImgX = lerp(curImgX, targetImgX, LERP);
    curImgY = lerp(curImgY, targetImgY, LERP);

    // Aplica só se o delta for significativo (evita paint desnecessário)
    if (Math.abs(curTxtX) > 0.01 || Math.abs(curTxtY) > 0.01) {
      txtTopo.style.transform = `translate(${curTxtX.toFixed(2)}px, ${curTxtY.toFixed(2)}px)`;
    }

    if (Math.abs(curImgX) > 0.01 || Math.abs(curImgY) > 0.01) {
      // Mantém o tilt do hero-glow.js + adiciona parallax
      imgTopo.style.transform = `translate(${curImgX.toFixed(2)}px, ${curImgY.toFixed(2)}px)`;
    }
  }

  tick();

  // Reset ao sair da janela
  window.addEventListener("mouseleave", () => {
    targetTxtX = 0;
    targetTxtY = 0;
    targetImgX = 0;
    targetImgY = 0;
  });
});
