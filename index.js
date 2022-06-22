const result = document.getElementById("result");
const form = document.querySelector("form");
// const input = document.querySelector("input");
const inputName = document.querySelector("input[type='text']");
let meals = [];
let name = "";

async function fetchMeals(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

  console.log(meals);
}

function mealsDisplay() {
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultat</h2>";
  } else {
    meals.length = 12;

    result.innerHTML = meals
      .map((meal) => {
        return `
            <li class="card">
            <div class="info">
              <h2 class="title">${meal.strMeal}</h2>
              <p>${meal.strArea}</p>
              </div>
              <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
              
            </li>
            `;
      })
      .join("");
    let mealOne;
    const titles = document.querySelectorAll(".title");
    const obj = {
      mealOne: "",
    };
    titles.forEach((title) => {
      title.addEventListener("click", (e) => {
        obj.mealOne = e.target.textContent;
        localStorage.data = JSON.stringify(obj);
        window.open("./recette.html");
      });
    });
  }
}

inputName.addEventListener("input", (e) => {
  let name;
  const namePlat = {
    name: "",
  };
  namePlat.name = e.target.value;
  localStorage.dataName = JSON.stringify(namePlat);
  fetchMeals(e.target.value);
});
console.log(name);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameStorage = JSON.parse(localStorage.getItem("dataName"));
  let nameOne = nameStorage.name;
  let nameT = nameOne.toLowerCase();
  console.log(nameT);
  if(nameT !== "pork"){
  mealsDisplay();
  }else{
    alert("non")
  }
});
name.toLowercase