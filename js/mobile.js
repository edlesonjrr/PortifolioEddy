// =================================================================
// MOBILE.JS - Funcionalidades específicas para dispositivos móveis
// =================================================================

// Inicializa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
  initMobileOptimizations();
  initTouchEnhancements();
});

// =================================================================
// MENU MOBILE HAMBURGUER
// =================================================================

function initMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list li");
  const body = document.body;

  if (!mobileMenu || !navList) {
    console.warn("Menu mobile não encontrado");
    return;
  }

  // Toggle do menu ao clicar no hamburguer
  mobileMenu.addEventListener("click", () => {
    navList.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    body.style.overflow = navList.classList.contains("active") ? "hidden" : "";

    // Anima os links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
  });

  // Fecha o menu ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.style.overflow = "";

      navLinks.forEach((link) => {
        link.style.animation = "";
      });
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!mobileMenu.contains(e.target) && !navList.contains(e.target)) {
        if (navList.classList.contains("active")) {
          navList.classList.remove("active");
          mobileMenu.classList.remove("active");
          body.style.overflow = "";

          navLinks.forEach((link) => {
            link.style.animation = "";
          });
        }
      }
    }
  });

  // Fecha o menu ao redimensionar para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navList.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.style.overflow = "";

      navLinks.forEach((link) => {
        link.style.animation = "";
      });
    }
  });
}

// =================================================================
// OTIMIZAÇÕES GERAIS PARA MOBILE
// =================================================================

function initMobileOptimizations() {
  // Detecta se é dispositivo móvel
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  if (isMobile) {
    // Adiciona classe ao body
    document.body.classList.add("is-mobile");

    // Otimiza viewport para mobile
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.name = "viewport";
      document.head.appendChild(viewport);
    }
    viewport.content =
      "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes";
  }

  // Previne zoom em inputs (iOS)
  const inputs = document.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      if (window.innerWidth < 768) {
        const fontSize = window.getComputedStyle(input).fontSize;
        if (parseFloat(fontSize) < 16) {
          input.style.fontSize = "16px";
        }
      }
    });
  });

  // Lazy loading para imagens (performance)
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// =================================================================
// MELHORIAS DE TOQUE E GESTOS
// =================================================================

function initTouchEnhancements() {
  // Adiciona feedback visual em cards ao toque
  const cards = document.querySelectorAll(
    ".especialidades-box, .skills-cards article",
  );

  cards.forEach((card) => {
    // Touch start
    card.addEventListener(
      "touchstart",
      function () {
        this.style.opacity = "0.8";
        this.style.transform = "scale(0.98)";
      },
      { passive: true },
    );

    // Touch end
    card.addEventListener(
      "touchend",
      function () {
        this.style.opacity = "";
        this.style.transform = "";
      },
      { passive: true },
    );

    // Touch cancel
    card.addEventListener(
      "touchcancel",
      function () {
        this.style.opacity = "";
        this.style.transform = "";
      },
      { passive: true },
    );
  });

  // =================================================================
  // EFEITO ESPECIAL PARA CARDS DO PORTFÓLIO
  // =================================================================

  const portfolioCards = document.querySelectorAll(".img-port");

  portfolioCards.forEach((card) => {
    let touchTimeout;
    let isAnimating = false;

    // Ao tocar no card
    card.addEventListener(
      "touchstart",
      function (e) {
        if (!isAnimating) {
          // Adiciona classe que ativa a animação
          this.classList.add("touched");
          isAnimating = true;

          // Remove a classe após a animação completar (8 segundos)
          touchTimeout = setTimeout(() => {
            this.classList.remove("touched");
            isAnimating = false;
          }, 8000);
        }
      },
      { passive: true },
    );

    // Se soltar o dedo antes de completar, mantém a animação
    card.addEventListener(
      "touchend",
      function () {
        // Não faz nada - deixa a animação continuar
      },
      { passive: true },
    );

    // Se cancelar o toque, reseta
    card.addEventListener(
      "touchcancel",
      function () {
        clearTimeout(touchTimeout);
        this.classList.remove("touched");
        isAnimating = false;
      },
      { passive: true },
    );

    // Alternativa: Ao clicar (para navegadores desktop em modo mobile)
    card.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Previne ação padrão apenas em mobile

        if (!isAnimating) {
          this.classList.add("touched");
          isAnimating = true;

          setTimeout(() => {
            this.classList.remove("touched");
            isAnimating = false;
          }, 8000);
        }
      }
    });
  });

  // Melhora scroll suave em mobile
  if (window.innerWidth <= 768) {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Swipe para fechar menu mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const navList = document.querySelector(".nav-list");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (navList) {
    navList.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    navList.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true },
    );

    function handleSwipe() {
      if (
        touchEndX < touchStartX - 50 &&
        navList.classList.contains("active")
      ) {
        // Swipe para esquerda - fecha o menu
        navList.classList.remove("active");
        if (mobileMenu) mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  }
}

// =================================================================
// AJUSTE DINÂMICO DA ALTURA DO VIEWPORT (iOS)
// =================================================================

function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Executa ao carregar e ao redimensionar
setVH();
window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);

// =================================================================
// PERFORMANCE: DEBOUNCE PARA RESIZE
// =================================================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplica debounce no resize
window.addEventListener(
  "resize",
  debounce(() => {
    setVH();

    // Recarrega funcionalidades se necessário
    if (window.innerWidth > 768) {
      const navList = document.querySelector(".nav-list");
      const mobileMenu = document.querySelector(".mobile-menu");
      if (navList) navList.classList.remove("active");
      if (mobileMenu) mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  }, 250),
);

// =================================================================
// ORIENTAÇÃO: ALERTA SE LANDSCAPE EM MOBILE
// =================================================================

function checkOrientation() {
  if (window.innerWidth < 768 && window.innerHeight < window.innerWidth) {
    // Landscape em mobile - opcional: adicionar classe ou alerta
    document.body.classList.add("mobile-landscape");
  } else {
    document.body.classList.remove("mobile-landscape");
  }
}

window.addEventListener("orientationchange", checkOrientation);
checkOrientation();

// =================================================================
// SCROLL SPY MOBILE - INDICA SEÇÃO ATIVA
// =================================================================

function initScrollSpy() {
  const sections = document.querySelectorAll(
    'section[id], section[class*="topo"], section[class*="sobre"], section[class*="portfolio"]',
  );
  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId =
        section.getAttribute("id") || section.className.split(" ")[0];

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(sectionId)) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", debounce(highlightNavigation, 100), {
    passive: true,
  });
}

// Inicializa scroll spy
initScrollSpy();

// =================================================================
// PREVENÇÃO DE SCROLL DURANTE ANIMAÇÕES
// =================================================================

let isAnimating = false;

function preventScrollDuringAnimation(duration = 1000) {
  if (isAnimating) return;

  isAnimating = true;
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    document.body.style.overflow = "";
    isAnimating = false;
  }, duration);
}

// =================================================================
// UTILITÁRIO: DETECTA SE ESTÁ EM MOBILE
// =================================================================

window.isMobileDevice = function () {
  return (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  );
};

// =================================================================
// EFEITO DE RASTRO DE TOQUE - Adicione no final do mobile.js
// =================================================================

// Cria o efeito de rastro quando o usuário toca na tela
function initTouchTrail() {
  // Só ativa em dispositivos móveis
  if (!window.isMobileDevice()) return;

  const trail = [];
  const maxTrailLength = 15; // Quantidade de círculos no rastro

  // Cria e adiciona partículas ao tocar
  function createTrailParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "touch-trail-particle";

    // Posiciona a partícula
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(152, 109, 255, 0.8) 0%, rgba(152, 109, 255, 0) 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%) scale(1);
      animation: trailFade 0.8s ease-out forwards;
    `;

    document.body.appendChild(particle);
    trail.push(particle);

    // Remove partículas antigas
    if (trail.length > maxTrailLength) {
      const oldParticle = trail.shift();
      if (oldParticle && oldParticle.parentNode) {
        oldParticle.remove();
      }
    }

    // Remove a partícula após a animação
    setTimeout(() => {
      if (particle && particle.parentNode) {
        particle.remove();
      }
    }, 800);
  }

  // Adiciona CSS para a animação
  const style = document.createElement("style");
  style.textContent = `
    @keyframes trailFade {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Eventos de toque
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      isDrawing = true;
      const touch = e.touches[0];
      lastX = touch.clientX;
      lastY = touch.clientY;
      createTrailParticle(touch.clientX, touch.clientY);
    },
    { passive: true },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDrawing) return;

      const touch = e.touches[0];
      const currentX = touch.clientX;
      const currentY = touch.clientY;

      // Calcula distância entre o último ponto
      const distance = Math.sqrt(
        Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2),
      );

      // Só cria partícula se moveu pelo menos 10px (evita spam)
      if (distance > 10) {
        createTrailParticle(currentX, currentY);
        lastX = currentX;
        lastY = currentY;
      }
    },
    { passive: true },
  );

  document.addEventListener(
    "touchend",
    () => {
      isDrawing = false;
    },
    { passive: true },
  );

  document.addEventListener(
    "touchcancel",
    () => {
      isDrawing = false;
    },
    { passive: true },
  );

  console.log("✨ Efeito de rastro de toque ativado!");
}

// Inicializa o efeito de rastro
initTouchTrail();

// =================================================================
// INDICADOR DE PROGRESSO DE SCROLL
// Cole este código no final do seu mobile.js
// =================================================================

function initScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress-bar");

  if (!progressBar) {
    console.warn("Barra de progresso não encontrada no DOM");
    return;
  }

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = scrollPercentage + "%";
  }

  // Atualiza no scroll
  window.addEventListener("scroll", updateScrollProgress, { passive: true });

  // Atualiza no carregamento
  updateScrollProgress();

  console.log("📊 Indicador de progresso de scroll ativado!");
}

// Inicializa
initScrollProgress();

// =================================================================
// BOTÃO SCROLL TO TOP
// Cole este código no final do seu mobile.js
// =================================================================

function initScrollToTop() {
  const scrollBtn = document.querySelector(".scroll-to-top");

  if (!scrollBtn) {
    console.warn("Botão scroll to top não encontrado no DOM");
    return;
  }

  // Mostra/esconde o botão baseado no scroll
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  }

  // Scroll suave para o topo
  function scrollToTop(e) {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Event listeners
  window.addEventListener("scroll", debounce(toggleScrollButton, 100), {
    passive: true,
  });
  scrollBtn.addEventListener("click", scrollToTop);

  // Verifica no carregamento
  toggleScrollButton();

  console.log("⬆️ Botão scroll to top ativado!");
}

// Inicializa
initScrollToTop();

// =================================================================
// VIBRAÇÃO HÁPTICA EM INTERAÇÕES
// Cole este código no final do seu mobile.js
// =================================================================

function initHapticFeedback() {
  // Verifica se o dispositivo suporta vibração
  if (!("vibrate" in navigator)) {
    console.log("⚠️ Dispositivo não suporta vibração háptica");
    return;
  }

  // Só ativa em mobile
  if (!window.isMobileDevice()) {
    console.log("⚠️ Vibração háptica desativada - não é mobile");
    return;
  }

  // Elementos que terão feedback háptico
  const hapticElements = document.querySelectorAll(`
    button,
    .btn-contato a,
    .nav-list a,
    .img-port,
    .especialidades-box,
    .skills-cards article,
    .whatsapp-float,
    .scroll-to-top,
    a[href^="#"]
  `);

  hapticElements.forEach((element) => {
    element.addEventListener(
      "touchstart",
      function () {
        // Vibração curta e suave (50ms)
        navigator.vibrate(50);
      },
      { passive: true },
    );
  });

  // Vibração mais forte para ações importantes
  const importantElements = document.querySelectorAll(`
    .btn-contato button,
    .whatsapp-float,
    .mobile-menu
  `);

  importantElements.forEach((element) => {
    element.addEventListener("click", function () {
      // Padrão de vibração: curta, pausa, curta (feedback mais rico)
      navigator.vibrate([30, 20, 30]);
    });
  });

  console.log("📳 Feedback háptico ativado!");
}

// Inicializa
initHapticFeedback();

// =================================================================
// EFEITO DE INCLINAÇÃO BASEADO NA VELOCIDADE DO SCROLL
// =================================================================

function initScrollTiltEffect() {
  // Elementos que terão o efeito de inclinação
  const tiltElements = document.querySelectorAll(`
    .especialidades-box,
    .img-port,
    .skills-cards article,
    .text-content,
    #creator-photo
  `);

  if (tiltElements.length === 0) {
    console.warn('Nenhum elemento encontrado para efeito de inclinação');
    return;
  }

  let lastScrollY = window.pageYOffset;
  let scrollVelocity = 0;
  let ticking = false;

  function calculateScrollVelocity() {
    const currentScrollY = window.pageYOffset;
    scrollVelocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;
  }

  function applyTiltEffect() {
    // Limita a velocidade para evitar inclinações muito extremas
    const maxVelocity = 50;
    const clampedVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, scrollVelocity));
    
    // Calcula o ângulo de inclinação baseado na velocidade
    // Velocidade positiva = scrollando para baixo
    // Velocidade negativa = scrollando para cima
    const tiltAngle = (clampedVelocity / maxVelocity) * 3; // Máximo 3 graus
    
    tiltElements.forEach((element, index) => {
      // Verifica se o elemento está visível na viewport
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        // Alternância: elementos pares inclinam para um lado, ímpares para outro
        const direction = index % 2 === 0 ? 1 : -1;
        const finalAngle = tiltAngle * direction;
        
        // Aplica a transformação
        element.style.transform = `perspective(1000px) rotateX(${finalAngle * 0.5}deg) rotateY(${finalAngle}deg)`;
        element.style.transition = 'transform 0.3s ease-out';
      }
    });

    // Reseta o ticking
    ticking = false;

    // Se parou de scrollar, volta ao normal gradualmente
    if (Math.abs(scrollVelocity) < 1) {
      setTimeout(() => {
        if (Math.abs(scrollVelocity) < 1) {
          tiltElements.forEach(element => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
          });
        }
      }, 100);
    }
  }

  function onScroll() {
    calculateScrollVelocity();
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        applyTiltEffect();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Event listener otimizado
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reset no resize
  window.addEventListener('resize', debounce(() => {
    tiltElements.forEach(element => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
    lastScrollY = window.pageYOffset;
    scrollVelocity = 0;
  }, 250));

  console.log('🎭 Efeito de inclinação no scroll ativado!');
}

// Inicializa
initScrollTiltEffect();


// =================================================================
// LOG DE INICIALIZAÇÃO
// =================================================================

console.log("✅ Mobile.js carregado com sucesso");
console.log("📱 Dispositivo móvel:", window.isMobileDevice());
console.log("📐 Viewport:", window.innerWidth, "x", window.innerHeight);

// =================================================================
// FIM DO MOBILE.JS
// =================================================================
