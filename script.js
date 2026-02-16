console.log("Script chargé");

const countrySelect = document.getElementById("country");
const infoDiv = document.getElementById("info");
const flagImg = document.getElementById("flag");
const capitalSpan = document.getElementById("capital");
const populationSpan = document.getElementById("population");
const currencySpan = document.getElementById("currency");

// Charger les pays africains
async function loadCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/region/africa");
    const countries = await res.json();

    // Trier alphabétiquement
    countries.sort((a,b) => a.name.common.localeCompare(b.name.common));

    // Remplir le select
    countrySelect.innerHTML = '<option value="">-- Sélectionner un pays --</option>';
    countries.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.cca3; // code ISO
      opt.textContent = c.name.common;
      opt.dataset.capital = c.capital ? c.capital[0] : "N/A";
      opt.dataset.population = c.population;
      opt.dataset.currency = c.currencies ? Object.keys(c.currencies).join(", ") : "N/A";
      opt.dataset.flag = c.flags?.png || "";
      countrySelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Erreur chargement pays :", err);
  }
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
