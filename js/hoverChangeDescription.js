export function hoverChangeDescription(nameCard, text) {
  const changeDescription = document.querySelector(".changeDescription");
  const card = document.querySelector(nameCard);

  if (!changeDescription || !card) return;

  const fallbackTexts = {
    pt: "*passe o cursor do mouse no card para ler*",
    en: "*hover the mouse over the card to read*"
  };

  card.addEventListener("mouseover", () => {
    changeDescription.textContent = text;
  });

  card.addEventListener("mouseout", () => {
    const currentLang = localStorage.getItem("lang") || "pt";
    changeDescription.textContent = fallbackTexts[currentLang] || fallbackTexts.pt;
  });
}
