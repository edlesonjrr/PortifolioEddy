
document.addEventListener("DOMContentLoaded", function () {


  const inner = document.querySelector(".blog-cta-inner");
  if (!inner) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          inner.classList.add("visible");
          initParticlesIfDesktop();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(inner);



  function initParticlesIfDesktop() {
    if (window.innerWidth < 768) return;
    if (typeof THREE === "undefined") return;

    const section = document.querySelector(".section-blog-cta");
    const canvas = document.querySelector(".blog-cta-particles");
    if (!section || !canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      section.clientWidth / section.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas });
    renderer.setSize(section.clientWidth, section.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    // Partículas — leve, 300 pontos
    const count = 300;
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++)
      posArray[i] = (Math.random() - 0.5) * 14;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const mesh = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: 0.025,
        color: 0x986dff,
        transparent: true,
        opacity: 0.7,
      }),
    );

    scene.add(mesh);

    let animating = true;

    // Pausa quando sai da viewport
    const visObs = new IntersectionObserver(
      (entries) => {
        animating = entries[0].isIntersecting;
      },
      { threshold: 0.1 },
    );
    visObs.observe(section);

    (function animate() {
      requestAnimationFrame(animate);
      if (!animating) return;
      mesh.rotation.y += 0.0004;
      mesh.rotation.x += 0.0002;
      renderer.render(scene, camera);
    })();

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) return;
      renderer.setSize(section.clientWidth, section.clientHeight);
      camera.aspect = section.clientWidth / section.clientHeight;
      camera.updateProjectionMatrix();
    });
  }
});
