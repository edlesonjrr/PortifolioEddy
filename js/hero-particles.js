// hero-particles.js — Sistema de partículas 3D com 3 camadas de profundidade

window.addEventListener("load", function () {
  const heroSection = document.querySelector(".topo-do-site");
  if (!heroSection || typeof THREE === "undefined") return;

  const isMobile = window.innerWidth < 768;

  // ============================================
  // CAMADAS DE PROFUNDIDADE
  // ============================================
  // Cada camada tem: count, zRange, speed, size, opacity, connectionDist, mouseStrength

  const LAYERS = isMobile
    ? [
        {
          count: 40,
          zMin: -6,
          zMax: -2,
          speed: 0.0008,
          size: 0.018,
          opacity: 0.35,
          connDist: 0,
          mouseStr: 0,
        },
        {
          count: 50,
          zMin: -2,
          zMax: 2,
          speed: 0.0015,
          size: 0.028,
          opacity: 0.55,
          connDist: 0,
          mouseStr: 0,
        },
        {
          count: 30,
          zMin: 2,
          zMax: 5,
          speed: 0.002,
          size: 0.038,
          opacity: 0.7,
          connDist: 0,
          mouseStr: 0,
        },
      ]
    : [
        {
          count: 100,
          zMin: -8,
          zMax: -3,
          speed: 0.0008,
          size: 0.018,
          opacity: 0.3,
          connDist: 1.2,
          mouseStr: 0.05,
        },
        {
          count: 160,
          zMin: -3,
          zMax: 2,
          speed: 0.0018,
          size: 0.03,
          opacity: 0.6,
          connDist: 1.8,
          mouseStr: 0.14,
        },
        {
          count: 80,
          zMin: 2,
          zMax: 6,
          speed: 0.0028,
          size: 0.045,
          opacity: 0.8,
          connDist: 0.8,
          mouseStr: 0.25,
        },
      ];

  // ============================================
  // SETUP THREE.JS
  // ============================================

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    70,
    heroSection.clientWidth / heroSection.clientHeight,
    0.1,
    1000,
  );
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: !isMobile,
  });
  renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.domElement.style.cssText =
    "position:absolute;top:0;left:0;z-index:0;pointer-events:none;";
  heroSection.appendChild(renderer.domElement);

  // ============================================
  // CRIAR PARTÍCULAS POR CAMADA
  // ============================================

  const layerData = LAYERS.map((cfg, layerIdx) => {
    const count = cfg.count;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 16;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = cfg.zMin + Math.random() * (cfg.zMax - cfg.zMin);

      const s = cfg.speed;
      velocities[i3] = (Math.random() - 0.5) * s;
      velocities[i3 + 1] = (Math.random() - 0.5) * s;
      velocities[i3 + 2] = (Math.random() - 0.5) * s * 0.3;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: cfg.size,
      color: 0x986dff,
      transparent: true,
      opacity: cfg.opacity,
      sizeAttenuation: true,
    });

    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);

    return {
      cfg,
      count,
      positions,
      velocities,
      geo,
      mat,
      mesh,
      linesMesh: null,
    };
  });

  // ============================================
  // CONEXÕES (desktop apenas, camadas 1 e 2)
  // ============================================

  function updateConnections(layer) {
    if (isMobile || layer.cfg.connDist === 0) return;

    const linePositions = [];
    const pos = layer.positions;
    const dist2 = layer.cfg.connDist * layer.cfg.connDist;

    for (let i = 0; i < layer.count; i++) {
      for (let j = i + 1; j < layer.count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < dist2) {
          linePositions.push(
            pos[i * 3],
            pos[i * 3 + 1],
            pos[i * 3 + 2],
            pos[j * 3],
            pos[j * 3 + 1],
            pos[j * 3 + 2],
          );
        }
      }
    }

    if (layer.linesMesh) {
      scene.remove(layer.linesMesh);
      layer.linesMesh.geometry.dispose();
    }

    if (linePositions.length > 0) {
      const lg = new THREE.BufferGeometry();
      lg.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(linePositions), 3),
      );
      layer.linesMesh = new THREE.LineSegments(
        lg,
        new THREE.LineBasicMaterial({
          color: 0x986dff,
          transparent: true,
          opacity: 0.1,
        }),
      );
      scene.add(layer.linesMesh);
    }
  }

  // ============================================
  // MOUSE
  // ============================================

  const mouse3D = { x: 9999, y: 9999 };
  const mouseNorm = { x: 0, y: 0 };
  let camPX = 0,
    camPY = 0;

  // Estado de inatividade (consumido por hero-inactivity.js)
  window._heroMouseNorm = mouseNorm;

  window.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    if (e.clientY > rect.bottom) return;
    mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseNorm.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouse3D.x = mouseNorm.x * 8;
    mouse3D.y = mouseNorm.y * 5;
  });

  heroSection.addEventListener("mouseleave", () => {
    mouse3D.x = 9999;
    mouse3D.y = 9999;
    mouseNorm.x = 0;
    mouseNorm.y = 0;
  });

  // ============================================
  // EASTER EGG — estado exposto para hero-inactivity.js
  // ============================================

  window._heroInactive = false;
  window._heroLayerData = layerData;
  window._heroScene = scene;

  // ============================================
  // ANIMAÇÃO
  // ============================================

  let frame = 0;
  const BOUNDS_X = 8,
    BOUNDS_Y = 5.5,
    BOUNDS_Z = 3;

  function animate() {
    requestAnimationFrame(animate);
    frame++;

    const inactive = window._heroInactive;

    layerData.forEach((layer, li) => {
      const pos = layer.positions;
      const vel = layer.velocities;
      const cfg = layer.cfg;

      for (let i = 0; i < layer.count; i++) {
        const i3 = i * 3;

        if (inactive) {
          // Easter egg: órbita suave em torno da origem
          const angle = frame * 0.003 * (li + 1) + i * 0.15;
          const radius =
            Math.sqrt(pos[i3] * pos[i3] + pos[i3 + 1] * pos[i3 + 1]) || 1;
          pos[i3] += -Math.sin(angle) * 0.008 - pos[i3] * 0.001;
          pos[i3 + 1] += Math.cos(angle) * 0.008 - pos[i3 + 1] * 0.001;
        } else {
          // Movimento orgânico
          pos[i3] += vel[i3];
          pos[i3 + 1] += vel[i3 + 1];
          pos[i3 + 2] += vel[i3 + 2];

          // Bounce
          if (Math.abs(pos[i3]) > BOUNDS_X) vel[i3] *= -1;
          if (Math.abs(pos[i3 + 1]) > BOUNDS_Y) vel[i3 + 1] *= -1;
          if (Math.abs(pos[i3 + 2]) > BOUNDS_Z) vel[i3 + 2] *= -1;

          // Repulsão do mouse — mais forte na camada frontal
          if (!isMobile && mouse3D.x !== 9999) {
            const dx = pos[i3] - mouse3D.x;
            const dy = pos[i3 + 1] - mouse3D.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const mouseRadius = 2.0 + li * 0.5;

            if (dist < mouseRadius) {
              const force = (mouseRadius - dist) / mouseRadius;
              pos[i3] += dx * force * cfg.mouseStr;
              pos[i3 + 1] += dy * force * cfg.mouseStr;
            }
          }
        }
      }

      layer.geo.attributes.position.needsUpdate = true;

      // Easter egg: intensifica opacidade das conexões
      if (layer.linesMesh) {
        layer.linesMesh.material.opacity = inactive ? 0.22 : 0.1;
      }

      // Conexões a cada 4 frames
      if (!isMobile && frame % 4 === li) updateConnections(layer);
    });

    // Parallax câmera suave (lerp)
    camPX += (mouseNorm.x * 0.5 - camPX) * 0.035;
    camPY += (mouseNorm.y * 0.4 - camPY) * 0.035;
    camera.position.x = camPX;
    camera.position.y = camPY;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // ============================================
  // EXPÕE PARA OUTROS MÓDULOS
  // ============================================

  window._heroRenderer = renderer;
  window._heroCamera = camera;

  // ============================================
  // RESIZE
  // ============================================

  window.addEventListener("resize", () => {
    renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
    camera.aspect = heroSection.clientWidth / heroSection.clientHeight;
    camera.updateProjectionMatrix();
  });
});
