// hero-glow.js — Glow dinâmico + tilt 3D na foto do hero

document.addEventListener("DOMContentLoaded", function () {
  const imgWrapper = document.querySelector(".img-topo-site");
  const img = imgWrapper ? imgWrapper.querySelector("img") : null;
  if (!imgWrapper || !img) return;

  // ============================================
  // GLOW ELEMENT
  // ============================================

  const glow = document.createElement("div");
  glow.className = "hero-glow";
  imgWrapper.style.position = "relative";
  imgWrapper.insertBefore(glow, img);

  // ============================================
  // TILT + GLOW INTENSIDADE
  // ============================================

  const MAX_TILT = 10; // graus máximos
  const TRANSITION = "transform 0.15s ease, filter 0.3s ease";

  img.style.cssText += `
    transition: ${TRANSITION};
    transform-style: preserve-3d;
    will-change: transform;
    position: relative;
    z-index: 2;
    border-radius: 18px;
  `;

  imgWrapper.addEventListener("mousemove", (e) => {
    const rect = imgWrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    const rotX = -dy * MAX_TILT;
    const rotY = dx * MAX_TILT;

    img.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;

    // Intensifica o glow conforme se aproxima do centro
    const intensity = 1 - Math.sqrt(dx * dx + dy * dy) * 0.4;
    glow.style.opacity = Math.min(1, 0.6 + intensity * 0.4).toString();
    glow.style.transform = `translate(-50%, -50%) scale(${1 + intensity * 0.15})`;
  });

  imgWrapper.addEventListener("mouseleave", () => {
    img.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    glow.style.opacity = "0.45";
    glow.style.transform = "translate(-50%, -50%) scale(1)";
  });

  // Tilt por giroscópio no mobile
  if (window.DeviceOrientationEvent && window.innerWidth < 768) {
    window.addEventListener("deviceorientation", (e) => {
      const tiltX = Math.max(-MAX_TILT, Math.min(MAX_TILT, e.beta * 0.3));
      const tiltY = Math.max(-MAX_TILT, Math.min(MAX_TILT, e.gamma * 0.3));
      img.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
  }
});
