const searchFood = async () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  if (searchText == "") {
    const noResultContainer = document.getElementById("no-result");
    const h1 = document.createElement("h1");
    h1.innerText = "Search field can't be empty";
    noResultContainer.appendChild(h1);
    return;
  } else {
    document.getElementById("no-result").style.display = "none";
    //   clear data
    searchField.value = "";
    // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      displaySearchResult(data.meals);
    } catch (error) {
      console.log(error);
    }
    /* fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.meals)); */
  }
};

const displaySearchResult = (meals) => {
  console.log(typeof meals);
  console.log(meals.length);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  if (meals.length < 1 || meals === "object") {
    //   show no result found
    const noResultContainer = document.getElementById("no-result");
    const h1 = document.createElement("h1");
    h1.innerText = "No result found";
    noResultContainer.appendChild(h1);
  }
  for (const meal of meals) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
          <div onclick="loadMealDetail(${meal.idMeal})" class="card">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">
                  ${meal.strInstructions.slice(0, 200)}
                  </p>
              </div>
          </div>
      `;
    searchResult.appendChild(div);
  }
};

const loadMealDetail = async (mealId) => {
  console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetail(data.meals[0]);
  /* fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0])); */
};

const displayMealDetail = (meal) => {
  console.log(meal);
  const mealDetails = document.getElementById("meal-details");
  mealDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">
            ${meal.strInstructions.slice(0, 150)}
            </p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Watch Video</a>
          </div>
    `;
  mealDetails.appendChild(div);
};
