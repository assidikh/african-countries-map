console.log("Script chargé");

const countrySelect = document.getElementById("country");
const infoDiv = document.getElementById("info");
const flagImg = document.getElementById("flag");
const capitalSpan = document.getElementById("capital");
const populationSpan = document.getElementById("population");
const currencySpan = document.getElementById("currency");
const searchInput = document.getElementById("search");

// Pour stocker tous les pays dans un tableau
let allCountries = [];

// Charger les pays africains
async function loadCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/region/africa");
    const countries = await res.json();

    // Tri alphabétique en français
    countries.sort((a, b) =>
      a.translations.fra.common.localeCompare(
        b.translations.fra.common
      )
    );

    // Stocker TOUS les pays
    allCountries = countries;

    // Affichage initial
    displayCountries(allCountries);

  } catch (err) {
    console.error("Erreur chargement pays :", err);
  }
}

// Fonction pour afficher les pays 
function displayCountries(countries) {
  countrySelect.innerHTML =
    '<option value="">-- Sélectionner un pays --</option>';

  countries.forEach(c => {
    const opt = document.createElement("option");

    opt.value = c.cca3;
    opt.textContent = c.translations.fra.common;

    opt.dataset.capital = c.capital ? c.capital[0] : "N/A";
    opt.dataset.population = c.population;
    opt.dataset.currency = c.currencies
      ? Object.keys(c.currencies).join(", ")
      : "N/A";
    opt.dataset.flag = c.flags?.png || "";

    countrySelect.appendChild(opt);
  });
}

loadCountries();

// Afficher infos quand pays sélectionné
countrySelect.addEventListener("change", () => {
  const selected = countrySelect.selectedOptions[0];
  if (!selected.value) {
    infoDiv.classList.add("hidden");
    return;
  }

  flagImg.src = selected.dataset.flag;
  flagImg.alt = `Drapeau de ${selected.textContent}`;
  capitalSpan.textContent = selected.dataset.capital;
  populationSpan.textContent = Number(selected.dataset.population).toLocaleString();
  currencySpan.textContent = selected.dataset.currency;

  infoDiv.classList.remove("hidden");
});


searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredCountries = allCountries.filter(country =>
    country.translations.fra.common
      .toLowerCase()
      .includes(searchValue)
  );

  displayCountries(filteredCountries);
});

