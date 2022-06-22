let recette = JSON.parse(localStorage.getItem("data"));
let meal = recette.mealOne;
const title = document.querySelector(".title");
const app = document.querySelector(".app");
const img = document.querySelector(".img");
const headTitle = document.querySelector("title")
console.log(headTitle);
headTitle.textContent = meal
title.innerText = meal;
let meals;
const fetchMeals = async () => {
  await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${title.innerText}`
  )
    .then((res) => res.json())
    .then((data) => (meals = data.meals));
  console.log(meals);

  app.innerHTML = meals.map((meal) => {
    let ingredients = [];
    for (i = 1; i < 21; i++) {
      
      if (meal[`strIngredient${i}`]) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        ingredients.push(`<li>${ingredient} - ${measure}</li>`);
        
      }
      if (meal[`strIngredient${i}`]==="Red Wine") {
        meal[`strIngredient${i}`]="Water"
        console.log(meal);
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        ingredients.pop(`<li>${ingredient} - ${measure}</li>`);
        ingredients.push(`<li>${ingredient} - ${measure}</li>`);
      };
    }
    

    return `
    <h1>${meal.strMeal}</h1>
    <div class="card">
  <img src =${meal.strMealThumb} alt ="photo de ${meal.strMeal}"/>
  <div class="ingredients">
  <h2>Listes des ingrédients</h2>
  <ul>${ingredients.join("")}</ul>
 </div>
 <div class="recette">
 <h3>Recette</h3>
 <p>${meal.strInstructions}</p>
 <a href=${meal.strYoutube}>Voir la recette en video</a>
 </div>

  </div>
  
 
  
 
 
 
 `;
  });
};
window.addEventListener("load", () => {
  fetchMeals();
});
