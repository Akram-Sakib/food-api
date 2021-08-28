let searchFood = () => {
  const cardRow = document.getElementById("card-row");
  const mealDetails = document.getElementById("meal-details");
  const searchField = document.getElementById("search-field");
  searchValue = searchField.value;
  if (searchValue == "") {
    mealDetails.textContent = '';
   return (cardRow.innerHTML = `
      <h3 class='mx-auto text-center'><strong>Please!</strong> Search By Food Name</h3>
      `);
  }
    //Clear Data
  searchField.value = "";

  
    //Search Data
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals)=>{
    const cardRow = document.getElementById("card-row");
    cardRow.textContent = '';
    const mealDetails = document.getElementById("meal-details");
    mealDetails.textContent = "";

     if (meals == null) {
     mealDetails.innerHTML = `
      <h3 class='mx-auto text-center'><strong>Sorry!</strong> Your searched Food is not available</h3>
      `;
    }
      meals.forEach((meal) => {
        const div = document.createElement("div");
        div.classList.add("col"); 
        div.innerHTML = `
    <div onclick="loadMealDetails(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}...</p>
        </div>
        </div>
    `;
        cardRow.appendChild(div);
      });
    
} 

const loadMealDetails = (mealId) =>{

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySingleMealDetails(data.meals[0]));

} 

const displaySingleMealDetails = (meal)=>{
    console.log(meal);
    const mealDetails = document.getElementById("meal-details");
    mealDetails.textContent = "";
    const cardRow = document.getElementById("card-row");
    cardRow.textContent = "";

    const div = document.createElement("div");
    div.classList.add("col");
    div.classList.add("mb-4");
    div.innerHTML = `
    <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 250)}...</p>
        </div>
        </div>
    `;
    mealDetails.appendChild(div)
}