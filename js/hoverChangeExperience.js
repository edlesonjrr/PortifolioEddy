export function hoverChangeExperience(
  nameCard,
  changeDescription,
  titleExperience,
  companyExperience,
  dateExperience
) {
  document.addEventListener("DOMContentLoaded", () => {
    const varChangeDescription = document.querySelector(".changeExperience");
    const varTitleExperience = document.querySelector(".titleExperience");
    const varCompanyExperience = document.querySelector(".companyExperience");
    const varDateExperience = document.querySelector(".dateExperience");
    const card = document.querySelector(nameCard);

    if (varChangeDescription && varTitleExperience && varCompanyExperience && varDateExperience && card) {
      card.addEventListener("click", () => {
        varChangeDescription.innerHTML = changeDescription;
        varCompanyExperience.innerHTML = companyExperience;
        varTitleExperience.innerHTML = titleExperience;
        varDateExperience.innerHTML = dateExperience;
      });
    } else {
      console.warn(`Algum elemento não encontrado: nameCard=${nameCard}, .changeExperience, .titleExperience, .companyExperience, ou .dateExperience`);
    }
  });
}