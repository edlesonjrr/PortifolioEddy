// js/chatbot.js

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.querySelector(".chatbot-overlay");
  const popup = document.querySelector(".chatbot-popup");
  const btnAbrir = document.querySelector(".chatbot-float");
  const btnFechar = document.querySelector(".chatbot-close");
  const input = document.querySelector(".chatbot-input");
  const btnEnviar = document.querySelector(".chatbot-send");
  const messages = document.querySelector(".chatbot-messages");

  // ============================================
  // RESPOSTAS
  // ============================================

  const respostas = [
    {
      id: "servicos",
      label: "💼 Serviços",
      keywords: [
        "serviço",
        "servico",
        "faz",
        "oferece",
        "trabalho",
        "desenvolve",
      ],
      resposta:
        "O Edleson desenvolve: 🌐 Sites modernos, 🛒 Lojas virtuais, 📱 Landing Pages e aplicações web completas com React e Next.js!",
    },
    {
      id: "precos",
      label: "💰 Preços",
      keywords: [
        "preço",
        "preco",
        "valor",
        "quanto",
        "custo",
        "orçamento",
        "orcamento",
      ],
      resposta:
        "Os valores variam conforme o projeto. O melhor caminho é conversar direto com o Edleson pelo WhatsApp! 📲 Ele responde rápido e faz um orçamento personalizado.",
    },
    {
      id: "prazo",
      label: "⏱️ Prazo",
      keywords: ["prazo", "tempo", "demora", "entrega", "quando"],
      resposta:
        "Uma landing page leva em média 3–7 dias. Um site completo, 1–3 semanas. Projetos maiores são combinados individualmente! ⏱️",
    },
    {
      id: "contato",
      label: "📲 Contato",
      keywords: ["contato", "falar", "conversar", "whatsapp", "zap", "email"],
      resposta:
        "Entre em contato pelo WhatsApp clicando no botão verde na tela, ou pelo LinkedIn: linkedin.com/in/edleson-jr 🚀",
    },
    {
      id: "tecnologias",
      label: "💻 Tecnologias",
      keywords: ["tecnologia", "linguagem", "stack", "usa", "programa"],
      resposta:
        "O Edleson trabalha com React, Next.js, TypeScript, Node.js, CSS/Sass, Tailwind, Three.js e muito mais! 💻",
    },
    {
      id: "projetos",
      label: "🎨 Projetos",
      keywords: ["projeto", "portfolio", "portifólio", "exemplo"],
      resposta:
        "Tem vários projetos no portfólio! Clique em 'Ver mais projetos' para ver todos com links de deploy e GitHub. 🎨",
    },
    {
      id: "experiencia",
      label: "🏆 Experiência",
      keywords: ["experiência", "experiencia", "anos", "tempo de"],
      resposta:
        "O Edleson tem experiência desde 2024, com passagem pela Kode3 Tech como desenvolvedor Web e vários projetos freelancer entregues! 🏆",
    },
    {
      id: "manutencao",
      label: "🔧 Manutenção",
      keywords: ["manutenção", "manutencao", "atualizar", "mexer", "ajuste"],
      resposta:
        "Sim! Edleson também faz manutenção e atualizações em sites existentes. Entre em contato para avaliar o projeto. 🔧",
    },
  ];

  const fallback = [
    "Hmm, não entendi. 🤔 Use os botões abaixo ou pergunte sobre serviços, preços, prazo ou contato!",
    "Essa eu não sei responder! 😅 Tente uma das sugestões abaixo ou chame o Edleson pelo WhatsApp. 📲",
    "Não tenho resposta pra isso ainda! Use os botões de sugestão para as perguntas que sei responder. 👇",
  ];

  const saudacoes = [
    "oi",
    "olá",
    "ola",
    "hey",
    "hello",
    "bom dia",
    "boa tarde",
    "boa noite",
  ];
  const despedidas = [
    "tchau",
    "bye",
    "até mais",
    "ate mais",
    "xau",
    "obrigado",
    "obrigada",
    "valeu",
  ];

  // ============================================
  // FUNÇÕES
  // ============================================

  function getRespostaBot(texto) {
    const lower = texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (saudacoes.some((s) => lower.includes(s)))
      return "Olá! 👋 Fico feliz em ajudar. Escolha uma das opções abaixo ou digite sua dúvida!";

    if (despedidas.some((s) => lower.includes(s)))
      return "Até logo! 👋 Qualquer dúvida pode voltar aqui ou entrar em contato pelo WhatsApp!";

    for (const item of respostas) {
      if (
        item.keywords.some((k) =>
          lower.includes(k.normalize("NFD").replace(/[\u0300-\u036f]/g, "")),
        )
      )
        return item.resposta;
    }

    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  function addMsg(texto, tipo) {
    const msg = document.createElement("div");
    msg.className = `chat-msg ${tipo}`;
    msg.innerHTML = `
      <div class="chat-msg__avatar">${tipo === "bot" ? "🤖" : "👤"}</div>
      <div class="chat-msg__bubble">${texto}</div>
    `;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function addTyping() {
    const typing = document.createElement("div");
    typing.className = "chat-msg bot chat-typing";
    typing.id = "typing-indicator";
    typing.innerHTML = `
      <div class="chat-msg__avatar">🤖</div>
      <div class="chat-msg__bubble">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      </div>
    `;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById("typing-indicator");
    if (t) t.remove();
  }

  // Renderiza sugestões dentro do chat como bolha especial
  function addSugestoes() {
    // Remove sugestões antigas dentro do chat
    const antigas = messages.querySelectorAll(".chat-sugestoes-inline");
    antigas.forEach((el) => el.remove());

    const wrapper = document.createElement("div");
    wrapper.className = "chat-sugestoes-inline";
    wrapper.innerHTML = `
      <p class="chat-sugestoes-hint">Escolha uma opção ou digite sua pergunta:</p>
      <div class="chat-sugestoes-grid">
        ${respostas.map((r) => `<button class="sugestao-btn" data-id="${r.id}">${r.label}</button>`).join("")}
      </div>
    `;
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;

    // Eventos dos botões novos
    wrapper.querySelectorAll(".sugestao-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = respostas.find((r) => r.id === btn.dataset.id);
        if (item) enviarMensagem(item.label);
      });
    });
  }

  function enviarMensagem(texto) {
    const trimmed = texto.trim();
    if (!trimmed) return;

    addMsg(trimmed, "user");
    input.value = "";

    addTyping();

    setTimeout(
      () => {
        removeTyping();
        addMsg(getRespostaBot(trimmed), "bot");
        // Mostra sugestões novamente após cada resposta
        addSugestoes();
      },
      800 + Math.random() * 400,
    );
  }

  // ============================================
  // EVENTOS
  // ============================================

  btnEnviar.addEventListener("click", () => enviarMensagem(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") enviarMensagem(input.value);
  });

  function abrirChat() {
    overlay.classList.add("active");
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
    // Mostra sugestões iniciais se ainda não existirem
    if (!messages.querySelector(".chat-sugestoes-inline")) {
      addSugestoes();
    }
    setTimeout(() => input.focus(), 400);
  }

  function fecharChat() {
    overlay.classList.remove("active");
    popup.classList.remove("active");
    document.body.style.overflow = "";
  }

  btnAbrir.addEventListener("click", abrirChat);
  btnFechar.addEventListener("click", fecharChat);
  overlay.addEventListener("click", fecharChat);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharChat();
  });
}); // fim DOMContentLoaded
