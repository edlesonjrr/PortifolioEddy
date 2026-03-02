// hero-metrics.js — Contadores animados de autoridade

document.addEventListener("DOMContentLoaded", function () {
  const metricsEl = document.querySelector(".hero-metrics");
  if (!metricsEl) return;

  let animated = false;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function countUp(el, target, duration, prefix, suffix) {
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);

      el.textContent = prefix + current + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function startCounters() {
    if (animated) return;
    animated = true;

    document.querySelectorAll(".metric-value").forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const duration = parseInt(el.dataset.duration || "1800", 10);
      countUp(el, target, duration, prefix, suffix);
    });
  }

  // Dispara quando o bloco entra na viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 },
  );

  observer.observe(metricsEl);
});
