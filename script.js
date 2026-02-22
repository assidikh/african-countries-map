console.log("Script chargé");

const searchInput = document.getElementById("search");
const countryList = document.getElementById("country-list");

const infoDiv = document.getElementById("info");
const flagImg = document.getElementById("flag");
const capitalSpan = document.getElementById("capital");
const populationSpan = document.getElementById("population");
const currencySpan = document.getElementById("currency");

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

  } catch (err) {
    console.error("Erreur chargement pays :", err);
  }
}

// Affichage des infos pays
function showCountryInfo(country) {
  flagImg.src = country.flags?.png || "";
  flagImg.alt = `Drapeau de ${country.translations.fra.common}`;

  capitalSpan.textContent = country.capital
    ? country.capital[0]
    : "N/A";

  populationSpan.textContent = country.population.toLocaleString();

  currencySpan.textContent = country.currencies
    ? Object.keys(country.currencies).join(", ")
    : "N/A";

  infoDiv.classList.remove("hidden");
}

loadCountries();

// Recherche en tmps réel
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  // Nettoyer la liste
  countryList.innerHTML = "";

  if (value === "") {
    countryList.classList.add("hidden");
    return;
  }

  const filtered = allCountries.filter(c =>
    c.translations.fra.common.toLowerCase().includes(value)
  );

  filtered.forEach(country => {
    const li = document.createElement("li");
    li.textContent = country.translations.fra.common;

    li.addEventListener("click", () => {
      showCountryInfo(country);
      countryList.classList.add("hidden");
      searchInput.value = country.translations.fra.common;
    });

    countryList.appendChild(li);
  });

  countryList.classList.remove("hidden");
});

