export function typeWrite(elemento, texto) {
  // Se passou texto externo, usa ele. Senão pega o que está no elemento.
  const conteudo = texto || elemento.textContent.trim();

  // Zera e torna visível
  elemento.textContent = "";
  elemento.classList.add("ready");
  delete elemento.dataset.typed;
  elemento.dataset.typed = "true";

  conteudo.split("").forEach(function (letra, i) {
    setTimeout(function () {
      elemento.textContent += letra;
    }, 75 * i);
  });
}