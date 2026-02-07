// js/langSwitch.js
import { translations } from "./translations.js";
import { setupSkillDescriptions } from "./main.js";

// Mapeamento de seletores e chaves de tradução
const elements = {
  heroTitle: ".txt-topo-site h1",
  heroText: ".txt-topo-site .typewriter",
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

  // Itens adicionais
  contactLink: "header .nav-list li a",
  githubLink: ".link-repositorio",
  skillsDescriptionTitle: ".skills-text h2",
  skillsHoverHint: ".skills-text p.changeDescription"
};

// Função que aplica a tradução
function applyTranslation(lang) {
  const current = translations[lang];
  if (!current) return;

  Object.entries(elements).forEach(([key, selector]) => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach(el => {
      if (el && current[key]) {
        el.innerHTML = current[key]; // permite <span style="">
      }
    });
  });
}

// Troca idioma completo
function switchLanguage(lang) {
  localStorage.setItem("lang", lang);

  // Atualiza textos
  applyTranslation(lang);

  // Atualiza skills (descrições dos cards)
  setupSkillDescriptions(lang);

  // Fecha menu
  const options = document.querySelector(".language-options");
  if (options) options.classList.add("hidden");

  // Atualiza bandeira
  const flag = document.querySelector("#current-language img");
  if (flag) {
    flag.src = lang === "en"
      ? "https://flagcdn.com/w40/us.png"
      : "https://flagcdn.com/w40/br.png";
  }
}

// Executa ao carregar
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "pt";
  switchLanguage(savedLang);
});

// Alterna menu de seleção
document.getElementById("current-language").addEventListener("click", () => {
  const menu = document.querySelector(".language-options");
  if (menu) menu.classList.toggle("hidden");
});

// Atribui ações aos botões de idioma
document.querySelectorAll(".language-options button").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedLang = btn.getAttribute("data-lang");
    switchLanguage(selectedLang);
  });
});
