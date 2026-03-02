// js/lazy-bg.js — Lazy load para elementos com background-image

document.addEventListener("DOMContentLoaded", function () {
  const lazyBgs = document.querySelectorAll("[data-bg]");
  if (!lazyBgs.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.backgroundImage = `url(${el.dataset.bg})`;
          el.removeAttribute("data-bg");
          observer.unobserve(el);
        }
      });
    },
    { rootMargin: "200px" } // começa a carregar 200px antes de aparecer
  );

  lazyBgs.forEach((el) => observer.observe(el));
});