document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonials-track");
  if (!track) return;

  const wrapper = document.querySelector(".testimonials-track-wrapper");

  if (wrapper) {
    wrapper.addEventListener("mouseenter", () => track.classList.add("paused"));
    wrapper.addEventListener("mouseleave", () =>
      track.classList.remove("paused"),
    );
  }

  let touchStartX = 0;
  let touchStartTime = 0;
  let isPaused = false;
  let resumeTimer = null;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
      track.classList.add("paused");
      if (resumeTimer) clearTimeout(resumeTimer);
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaTime = Date.now() - touchStartTime;

      if (Math.abs(deltaX) > 40 && deltaTime < 300) {
        const cardWidth = 320 + 24; // width + gap
        const currentTransform = new WebKitCSSMatrix(
          window.getComputedStyle(track).transform,
        );
        const currentX = currentTransform.m41;
      }

      resumeTimer = setTimeout(() => {
        track.classList.remove("paused");
      }, 2000);
    },
    { passive: true },
  );

  function adjustSpeed() {
    const isMobile = window.innerWidth < 768;
    track.style.animationDuration = isMobile ? "45s" : "60s";
  }

  adjustSpeed();
  window.addEventListener("resize", adjustSpeed);

  const section = document.querySelector(".section-testimonials");

  if (section) {
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            track.style.animationPlayState = "running";
          } else {
            track.style.animationPlayState = "paused";
          }
        });
      },
      { threshold: 0.1 },
    );

    visibilityObserver.observe(section);
  }
});
