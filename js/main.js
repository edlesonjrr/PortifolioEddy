// js/main.js
import { initScrollReveal } from "./scrollReveal.js";
import { typeWrite } from "./typeWrite.js";
import { hoverChangeDescription } from "./hoverChangeDescription.js";
import { skillsHoverDescriptions } from "./translations.js";

console.log("main.js carregado com sucesso");

// Inicia o scroll reveal
initScrollReveal();

// Ativa efeito de digitação
const typewriterElement = document.querySelector(".typewriter");
if (typewriterElement) {
  typeWrite(typewriterElement);
}

// Configura descrições técnicas dos cards de habilidades
function setupSkillDescriptions(lang = "pt") {
  const currentSkills = skillsHoverDescriptions[lang];
  if (!currentSkills) return;

  Object.entries(currentSkills).forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (element) {
      hoverChangeDescription(selector, text);
    }
  });
}

// Aplica ao carregar
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "pt";
  setupSkillDescriptions(lang);
});

// Exporta para langSwitch.js ativar ao trocar idioma
export { setupSkillDescriptions };
