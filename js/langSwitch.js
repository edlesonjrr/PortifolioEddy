// js/langSwitch.js
import { translations } from "./translations.js";
import { setupSkillDescriptions } from "./main.js";
import { typeWrite } from "./typeWrite.js";

const elements = {
  heroTitle: ".txt-topo-site h1",
  contactButton: ".btn-ver-precos",
  downloadCv: ".btn-cv",
  specialtiesTitle: ".especiliadades h2.titulo",
  portfolioTitle: ".portfolio h2.titulo",
  skillsTitle: ".section-skills h2.titulo",
  website: ".especialidades-box:nth-child(1) h3",
  websiteDesc: ".especialidades-box:nth-child(1) p",
  store: ".especialidades-box:nth-child(2) h3",
  storeDesc: ".especialidades-box:nth-child(2) p",
  landing: ".especialidades-box:nth-child(3) h3",
  landingDesc: ".especialidades-box:nth-child(3) p",
  whoAmI: ".text-content h4",
  name: ".text-content h2",
  role: ".text-content h3",
  aboutDesc: ".text-content p",
  contactLink: "header .nav-list li a",
  githubLink: ".link-repositorio",
  skillsDescriptionTitle: ".skills-text h2",
  skillsHoverHint: ".skills-text p.changeDescription",

  btnTrajetoria: ".btn-trajetoria .traj-label",
  btnVerProjetos: ".btn-ver-projetos",
  popupProjetosTitle: ".projetos-popup__header h2",
  filtroAll: '[data-filter="all"]',
  filtroFront: '[data-filter="front"]',
  filtroBack: '[data-filter="back"]',
  filtroFullstack: '[data-filter="fullstack"]',
  timelineTag: ".timeline-popup__tag",
  timelineTitle: ".timeline-popup__header h2",
  chatPlaceholder: null,
  chatAviso: ".chatbot-aviso",
  chatOnline: ".chatbot-header-info span",
  modelsInstruction: ".modelos-instrucao",

  metricLabelProjects: ".hero-metrics .metric-item:nth-child(1) .metric-label",
  metricLabelPerformance: ".hero-metrics .metric-item:nth-child(3) .metric-label",
  metricLabelExperience: ".hero-metrics .metric-item:nth-child(5) .metric-label",

  testimonialsTag: ".testimonials-tag",
  testimonialsTitle: ".testimonials-header h2",
  testimonialsDesc: ".testimonials-header p",
  btnTestimonialsPrimary: ".btn-testimonials-primary",
  btnTestimonialsSecondary: ".btn-testimonials-secondary",

  blogCtaTag: ".blog-cta-tag",
  blogCtaTitle: ".blog-cta-title",
  blogCtaSubtitle: ".blog-cta-subtitle",
  blogCtaItem1: ".blog-cta-list li:nth-child(1)",
  blogCtaItem2: ".blog-cta-list li:nth-child(2)",
  blogCtaItem3: ".blog-cta-list li:nth-child(3)",
  blogCtaItem4: ".blog-cta-list li:nth-child(4)",
  blogCtaItem5: ".blog-cta-list li:nth-child(5)",
  btnBlogCta: ".btn-blog-cta",
  blogCtaNote: ".blog-cta-note",

  // Pricing Modal — header
  pricingTag: ".pricing-tag",
  pricingTitle: ".pricing-header h2",
  pricingDesc: ".pricing-header p",
  pricingNote: ".pricing-note",

  // Pricing Card 1 — Landing Page
  pricingName1: ".pricing-card:nth-child(1) .pricing-name",
  pricingFrom1: ".pricing-card:nth-child(1) .pricing-from",
  pricingDeadline1: ".pricing-card:nth-child(1) .pricing-deadline",
  pricingFeat1a: ".pricing-card:nth-child(1) .pricing-features li:nth-child(1)",
  pricingFeat1b: ".pricing-card:nth-child(1) .pricing-features li:nth-child(2)",
  pricingFeat1c: ".pricing-card:nth-child(1) .pricing-features li:nth-child(3)",
  pricingFeat1d: ".pricing-card:nth-child(1) .pricing-features li:nth-child(4)",
  pricingFeat1e: ".pricing-card:nth-child(1) .pricing-features li:nth-child(5)",
  pricingFeat1f: ".pricing-card:nth-child(1) .pricing-features li:nth-child(6)",
  pricingCta1: ".pricing-card:nth-child(1) .pricing-cta",

  // Pricing Card 2 — Site Institucional
  pricingBadge2: ".pricing-card:nth-child(2) .badge-popular",
  pricingName2: ".pricing-card:nth-child(2) .pricing-name",
  pricingFrom2: ".pricing-card:nth-child(2) .pricing-from",
  pricingDeadline2: ".pricing-card:nth-child(2) .pricing-deadline",
  pricingFeat2a: ".pricing-card:nth-child(2) .pricing-features li:nth-child(1)",
  pricingFeat2b: ".pricing-card:nth-child(2) .pricing-features li:nth-child(2)",
  pricingFeat2c: ".pricing-card:nth-child(2) .pricing-features li:nth-child(3)",
  pricingFeat2d: ".pricing-card:nth-child(2) .pricing-features li:nth-child(4)",
  pricingFeat2e: ".pricing-card:nth-child(2) .pricing-features li:nth-child(5)",
  pricingFeat2f: ".pricing-card:nth-child(2) .pricing-features li:nth-child(6)",
  pricingCta2: ".pricing-card:nth-child(2) .pricing-cta",

  // Pricing Card 3 — E-commerce
  pricingName3: ".pricing-card:nth-child(3) .pricing-name",
  pricingFrom3: ".pricing-card:nth-child(3) .pricing-from",
  pricingDeadline3: ".pricing-card:nth-child(3) .pricing-deadline",
  pricingFeat3a: ".pricing-card:nth-child(3) .pricing-features li:nth-child(1)",
  pricingFeat3b: ".pricing-card:nth-child(3) .pricing-features li:nth-child(2)",
  pricingFeat3c: ".pricing-card:nth-child(3) .pricing-features li:nth-child(3)",
  pricingFeat3d: ".pricing-card:nth-child(3) .pricing-features li:nth-child(4)",
  pricingFeat3e: ".pricing-card:nth-child(3) .pricing-features li:nth-child(5)",
  pricingFeat3f: ".pricing-card:nth-child(3) .pricing-features li:nth-child(6)",
  pricingCta3: ".pricing-card:nth-child(3) .pricing-cta",
};

function applyTranslation(lang) {
  const current = translations[lang];
  if (!current) return;

  Object.entries(elements).forEach(([key, selector]) => {
    if (!selector) return;
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((el) => {
      if (el && current[key]) {
        el.innerHTML = current[key];
      }
    });
  });

  // Troca o arquivo do CV conforme o idioma
  const cvLink = document.querySelector(".btn-contato a[download]");
  if (cvLink) {
    cvLink.href = lang === "en"
      ? "assets/CV ENGLISH.pdf"
      : "assets/CV TECH.pdf";
  }

  // Preços — troca valor e símbolo da moeda
  const priceValues = document.querySelectorAll(".pricing-value");
  const pricingPrices = current.pricingPrices;
  if (pricingPrices && priceValues.length) {
    priceValues.forEach((el, i) => {
      if (pricingPrices[i]) {
        el.innerHTML = pricingPrices[i];
      }
    });
  }

  // Typewriter
  const typewriterEl = document.querySelector(".txt-topo-site .typewriter");
  if (typewriterEl && current.heroText) {
    typeWrite(typewriterEl, current.heroText);
  }

  // Placeholder do chat
  const chatInput = document.querySelector(".chatbot-input");
  if (chatInput && current.chatPlaceholder) {
    chatInput.setAttribute("placeholder", current.chatPlaceholder);
  }
}

function switchLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyTranslation(lang);
  setupSkillDescriptions(lang);

  const options = document.querySelector(".language-options");
  if (options) options.classList.add("hidden");

  const flag = document.querySelector("#current-language img");
  if (flag) {
    flag.src =
      lang === "en"
        ? "https://flagcdn.com/w40/us.png"
        : "https://flagcdn.com/w40/br.png";
  }
}

function init() {
  const savedLang = localStorage.getItem("lang") || "pt";
  switchLanguage(savedLang);

  document.getElementById("current-language").addEventListener("click", () => {
    const menu = document.querySelector(".language-options");
    if (menu) menu.classList.toggle("hidden");
  });

  document.querySelectorAll(".language-options button").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchLanguage(btn.getAttribute("data-lang"));
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}