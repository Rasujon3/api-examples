const loadCountries = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => displayCountries(data));
};

loadCountries();

const displayCountries = (countries) => {
  const countriesDiv = document.getElementById("countries");
  for (const country of countries) {
    const h3 = document.createElement("h3");
    h3.innerText = country.name.common;
    countriesDiv.appendChild(h3);

    const p = document.createElement("p");
    p.innerText = country.capital;
    countriesDiv.appendChild(p);
  }
};
