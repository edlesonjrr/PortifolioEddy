// js/langSwitch.js
import { translations } from "./translations.js";
import { setupSkillDescriptions } from "./main.js";
import { typeWrite } from "./typeWrite.js";

// Mapeamento de seletores e chaves de tradução
const elements = {
  heroTitle: ".txt-topo-site h1",
  contactButton: ".btn-contato a:nth-child(1) button",
  downloadCv: ".btn-contato a:nth-child(2) button",
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

  // Novos
  btnTrajetoria: ".btn-trajetoria .traj-label",
  btnVerProjetos: ".btn-ver-projetos",
  popupProjetosTitle: ".projetos-popup__header h2",
  filtroAll: '[data-filter="all"]',
  filtroFront: '[data-filter="front"]',
  filtroBack: '[data-filter="back"]',
  filtroFullstack: '[data-filter="fullstack"]',
  timelineTag: ".timeline-popup__tag",
  timelineTitle: ".timeline-popup__header h2",
  chatPlaceholder: null, // tratado separado (atributo)
  chatAviso: ".chatbot-aviso",
  chatOnline: ".chatbot-header-info span",
  modelsInstruction: ".modelos-instrucao",
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

  // Typewriter no hero — chama animação de digitação
  const typewriterEl = document.querySelector(".txt-topo-site .typewriter");
  if (typewriterEl && current.heroText) {
    typeWrite(typewriterEl, current.heroText);
  }

  // Placeholder do input do chat (atributo, não innerHTML)
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

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "pt";
  switchLanguage(savedLang);
});

document.getElementById("current-language").addEventListener("click", () => {
  const menu = document.querySelector(".language-options");
  if (menu) menu.classList.toggle("hidden");
});

document.querySelectorAll(".language-options button").forEach((btn) => {
  btn.addEventListener("click", () => {
    switchLanguage(btn.getAttribute("data-lang"));
  });
});
