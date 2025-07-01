import { initScrollReveal } from "./scrollReveal.js";
// Removido hoverChangeExperience.js temporariamente, pois os seletores não são encontrados
import { typeWrite } from "./typeWrite.js";
import { hoverChangeDescription } from "./hoverChangeDescription.js";

console.log("main.js carregado com sucesso");

// Inicia o scroll reveal
initScrollReveal();

// Ativa efeito de digitação
const typewriterElement = document.querySelector(".typewriter");
if (typewriterElement) {
  typeWrite(typewriterElement);
}

// Experiências profissionais (comentado temporariamente, pois não estão no HTML)
const experiences = [
  {
    selector: ".innovasfera",
    description: `Trabalhei na InnovaSfera, onde tive a oportunidade de participar
      de vários projetos para diversos clientes. Nessa trajetória,
      trabalhei em várias criações de sites, sistemas e interfaces web
      e mobile com a equipe de tecnologia da empresa. A InnovaSfera é
      referência em qualidade e inovação em suas soluções
      tecnológicas, seja em desenvolvimento ou infraestrutura.`,
    role: "UX Designer & Desenvolvedor Frontend",
    company: "InnovaSfera",
    period: "Maio 2024 - No momento (1 ano)",
  },
  {
    selector: ".codelab",
    description: `Na CodeLab Studio, lidero a criação e implementação de soluções tecnológicas voltadas para o design de produto e desenvolvimento de sistemas web. Nosso foco é entregar produtos inovadores, intuitivos e de alta performance para empresas de diversos segmentos.`,
    role: "UX Designer & Desenvolvedor Frontend",
    company: "CodeLab Studio",
    period: "Jan 2023 - No momento (2 anos)",
  },
  {
    selector: ".digitalhouse",
    description: `Trabalhei como instrutor conteudista em frontend na
      Digital House, o trabalho consistia em criar conteúdos para as
      aulas de especialização frontend. Alguns temas dos conteúdos
      realizados foram: React, Redux, TypeScript, Testes,
      GraphQL, Next.js, MUI, React Hook Form e styled-components.`,
    role: "Professor conteudista em Frontend",
    company: "Digital House",
    period: "Nov 2021 - Nov 2022 (1 ano)",
  },
  {
    selector: ".zuplae",
    description: `Trabalhei como Social Media e Designer na Zuplae que é um escola
      de programação, onde teve como foco as criações de conteúdos sobre
      programação para a comunidade dev através das redes sociais.`,
    role: "Social Media e UX Designer",
    company: "Zuplae",
    period: "Jan 2022 - Abril 2022 (4 meses)",
  },
  {
    selector: ".codigofontetv",
    description: `Trabalhei como Social Media e Designer no Código Fonte TV, 
      onde teve como foco as criações de conteúdos sobre programação 
      para a comunidade dev através das redes sociais.`,
    role: "Social Media e UX Designer",
    company: "Código Fonte TV",
    period: "Jun 2021 - Jan 2022 (8 meses)",
  },
  {
    selector: ".contweb",
    description: `Realizei o estágio na ContWeb, uma empresa de contabilidade. 
      Onde pela primeira vez tive experiência com o React. Além do
      desenvolvimento frontend criei os designs da nova plataforma da empresa.`,
    role: "Developer frontend e UX Designer",
    company: "ContWeb",
    period: "Set 2021 - Nov 2021 (3 meses)",
  },
];

// Conhecimentos técnicos (removido .cypress e .storybook)
const skills = {
  ".skills-cards .html": "HTML é uma linguagem de marcação usada para estruturar páginas web com elementos como títulos, parágrafos, links e imagens.",
  ".skills-cards .css": "CSS é uma linguagem de estilo utilizada para definir a aparência visual de páginas HTML, controlando cores, fontes, layouts e responsividade.",
  ".skills-cards .js": "JavaScript é uma linguagem de programação que permite adicionar interatividade às páginas web, como animações, validações e manipulação do DOM.",
  ".skills-cards .sass": "Sass é um pré-processador CSS que adiciona funcionalidades como variáveis, mixins e aninhamento para tornar o CSS mais dinâmico e organizado.",
  ".skills-cards .react": "React é uma biblioteca JavaScript para criar interfaces de usuário de forma eficiente, componetizada e reativa.",
  ".skills-cards .next": "Next.js é um framework React que oferece renderização do lado do servidor, roteamento avançado e otimização para SEO.",
  ".skills-cards .styled": "Styled-components é uma biblioteca que permite escrever CSS dentro de arquivos JavaScript, aplicando estilos diretamente nos componentes.",
  ".skills-cards .tailwind": "Tailwind CSS é um framework utilitário que permite construir interfaces rapidamente usando classes prontas diretamente no HTML.",
  ".skills-cards .typescript": "TypeScript é um superset do JavaScript que adiciona tipagem estática e recursos avançados, tornando o código mais seguro e escalável.",
  ".skills-cards .git": "Git é um sistema de controle de versão distribuído, essencial para colaborar, rastrear alterações e gerenciar projetos de software.",
  ".skills-cards .docker": "Docker é uma plataforma que permite empacotar aplicações em contêineres, facilitando o deploy, escalabilidade e portabilidade entre ambientes.",
  ".skills-cards .gitlab": "GitLab é uma plataforma DevOps completa que oferece versionamento, integração contínua (CI), entrega contínua (CD) e gerenciamento de projetos. (Conhecimento tambem no Azure DevOps)"
};


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado, iniciando configurações");

  // Comentado temporariamente, pois os seletores não estão no HTML
  /*
  experiences.forEach(({ selector, description, role, company, period }) => {
    const element = document.querySelector(selector);
    if (element) {
      console.log(`Configurando hover para experiência: ${selector}`);
      hoverChangeExperience(selector, description, role, company, period);
    } else {
      console.warn(`Elemento não encontrado para seletor: ${selector}`);
    }
  });
  */

  Object.entries(skills).forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (element) {
      console.log(`Adicionando hover para o seletor: ${selector}`);
      hoverChangeDescription(selector, text);
    } else {
      console.warn(`Elemento não encontrado para seletor: ${selector}`);
    }
  });
});