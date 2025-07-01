export function hoverChangeDescription(nameCard, text) {
  const changeDescription = document.querySelector(".changeDescription");
  const card = document.querySelector(nameCard);

  if (!changeDescription || !card) {
    console.warn(`Elemento não encontrado: ${nameCard} ou .changeDescription`);
    return;
  }

  card.addEventListener("mouseover", () => {
    console.log(`Hover em ${nameCard}: definindo texto para "${text}"`);
    changeDescription.innerHTML = text;
  });

  card.addEventListener("mouseout", () => {
    console.log(`Saiu do hover em ${nameCard}`);
    changeDescription.innerHTML = "*passe o cursor do mouse no card para ler*";
  });
}
