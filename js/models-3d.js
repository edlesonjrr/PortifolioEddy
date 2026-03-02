// =================================================================
// MODELOS 3D — inicializa APENAS quando a seção entra na viewport
// =================================================================

(function () {
  const modelosSection = document.querySelector(".modelos-3d");
  if (!modelosSection) return;

  let initialized = false;

  // =========================
  // CONFIGS DOS MODELOS
  // =========================

  const modelConfigs = [
    {
      name: "carro",
      file: "assets/models/carro.glb",
      scale: [60, 60, 60],
      position: [0, -0.8, 0],
      rotation: [0, Math.PI / 4, 0],
      cameraZ: 4.5,
    },
    {
      name: "rubiks_cube",
      file: "assets/models/rubiks_cube.glb",
      scale: [9.2, 9.2, 9.2],
      position: [0, 0, 0],
      rotation: [0.3, 0.3, 0],
      cameraZ: 4,
    },
    {
      name: "Bullpup_Rifle",
      file: "assets/models/arma.glb",
      scale: [3.8, 3.8, 3.8],
      position: [0, -0.5, 0],
      rotation: [0, 0, 0],
      cameraZ: 4,
    },
  ];

  // =========================
  // INICIALIZAÇÃO LAZY
  // =========================

  function init() {
    if (initialized) return;
    initialized = true;

    initParticles();
    modelConfigs.forEach(initModel);
  }

  // Observa quando a seção entra na tela
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          init();
          observer.disconnect(); // não precisa mais observar
        }
      });
    },
    { rootMargin: "200px" }, // começa 200px antes de aparecer
  );

  observer.observe(modelosSection);

  // =========================
  // PARTÍCULAS DE FUNDO
  // =========================

  function initParticles() {
    const particlesScene = new THREE.Scene();
    const particlesCamera = new THREE.PerspectiveCamera(
      75,
      modelosSection.clientWidth / modelosSection.clientHeight,
      0.1,
      1000,
    );
    const particlesRenderer = new THREE.WebGLRenderer({ alpha: true });

    particlesRenderer.setSize(
      modelosSection.clientWidth,
      modelosSection.clientHeight,
    );
    particlesRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    particlesRenderer.domElement.style.cssText =
      "position:absolute;top:0;left:0;z-index:0;pointer-events:none;";

    modelosSection.style.position = "relative";
    modelosSection.insertBefore(
      particlesRenderer.domElement,
      modelosSection.firstChild,
    );

    particlesCamera.position.z = 5;

    const count = window.innerWidth < 768 ? 300 : 800;
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++)
      posArray[i] = (Math.random() - 0.5) * 15;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const mesh = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: 0.025,
        color: 0x986dff,
        transparent: true,
        opacity: 0.8,
      }),
    );

    particlesScene.add(mesh);

    (function animateParticles() {
      requestAnimationFrame(animateParticles);
      mesh.rotation.y += 0.0005;
      mesh.rotation.x += 0.0002;
      particlesRenderer.render(particlesScene, particlesCamera);
    })();

    window.addEventListener("resize", () => {
      particlesRenderer.setSize(
        modelosSection.clientWidth,
        modelosSection.clientHeight,
      );
      particlesCamera.aspect =
        modelosSection.clientWidth / modelosSection.clientHeight;
      particlesCamera.updateProjectionMatrix();
    });
  }

  // =========================
  // MODELO INDIVIDUAL
  // =========================

  function initModel(config) {
    const canvasContainer = document.querySelector(
      `.modelo-canvas[data-model="${config.name}"]`,
    );
    if (!canvasContainer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasContainer.clientWidth / canvasContainer.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    canvasContainer.appendChild(renderer.domElement);

    camera.position.z = config.cameraZ;

    // Luzes
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const purpleLight = new THREE.PointLight(0x986dff, 0.5, 100);
    purpleLight.position.set(0, 3, 3);
    scene.add(purpleLight);

    // Carrega modelo
    let model = null;
    let targetRotX = config.rotation[0];
    let targetRotY = config.rotation[1];
    let isDragging = false;

    const loader = new THREE.GLTFLoader();

    loader.load(
      config.file,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(...config.scale);
        model.position.set(...config.position);
        model.rotation.set(...config.rotation);
        scene.add(model);
      },
      null,
      (error) => {
        console.error(`Erro ao carregar ${config.name}:`, error);
        // Placeholder se falhar
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshPhongMaterial({ color: 0x986dff }),
        );
        mesh.scale.set(1.5, 1.5, 1.5);
        model = mesh;
        scene.add(model);
      },
    );

    // Animação
    (function animate() {
      requestAnimationFrame(animate);
      if (model) {
        if (!isDragging) targetRotY += 0.004;
        model.rotation.x += (targetRotX - model.rotation.x) * 0.1;
        model.rotation.y += (targetRotY - model.rotation.y) * 0.1;
      }
      renderer.render(scene, camera);
    })();

    // Mouse
    canvasContainer.addEventListener("mousedown", () => {
      isDragging = true;
      canvasContainer.style.cursor = "grabbing";
    });
    canvasContainer.addEventListener("mouseup", () => {
      isDragging = false;
      canvasContainer.style.cursor = "grab";
    });
    canvasContainer.addEventListener("mouseleave", () => {
      isDragging = false;
      canvasContainer.style.cursor = "grab";
    });
    canvasContainer.addEventListener("mousemove", (e) => {
      if (!isDragging || !model) return;
      targetRotY += e.movementX * 0.008;
      targetRotX += e.movementY * 0.008;
      targetRotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotX));
    });

    // Touch
    let lastTX = 0,
      lastTY = 0;
    canvasContainer.addEventListener(
      "touchstart",
      (e) => {
        isDragging = true;
        lastTX = e.touches[0].clientX;
        lastTY = e.touches[0].clientY;
        e.preventDefault();
      },
      { passive: false },
    );
    canvasContainer.addEventListener("touchend", () => {
      isDragging = false;
    });
    canvasContainer.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging || !model) return;
        targetRotY += (e.touches[0].clientX - lastTX) * 0.008;
        targetRotX += (e.touches[0].clientY - lastTY) * 0.008;
        targetRotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotX));
        lastTX = e.touches[0].clientX;
        lastTY = e.touches[0].clientY;
        e.preventDefault();
      },
      { passive: false },
    );

    // Resize
    window.addEventListener("resize", () => {
      renderer.setSize(
        canvasContainer.clientWidth,
        canvasContainer.clientHeight,
      );
      camera.aspect =
        canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
    });
  }
})();
