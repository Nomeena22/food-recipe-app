const searcBox = document.querySelector(".searchbox");
const searcBtn = document.querySelector(".searchbtn");
const recipeCon = document.querySelector(".recipe-container");
const closeBtn = document.querySelector(".close-btn");
const recipeContent = document.querySelector(".recipe-content");
const modalContainer = document.querySelector(".modal-container");

searcBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  recipeCon.innerHTML = "<h2>fetching recipes ...<h2>";
  console.log("button", searcBox.value);

  //   const data = await fetch(`www.themealdb.com/api/json/v1/1/search.php?s= ${searcBox.value}`);
  const data = await fetch(`
  https://www.themealdb.com/api/json/v1/1/search.php?s=${searcBox.value}
`);

  const respons = await data.json();
  recipeCon.innerHTML = "";
  respons.meals.forEach((meal) => {
    // console.log(meal);
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
    <img src = ${meal.strMealThumb}>
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea}</p>
    <p>${meal.strCategory}</p>

    `;
    // button for get recipe
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = "View Recipe";
    recipeDiv.appendChild(btn);

    // run a function on get recipe btn

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openRecipe(meal);
    });
    console.log("button click");
    recipeCon.appendChild(recipeDiv);
  });
  console.log(respons);

  const openRecipe = (meal) => {
    console.log(meal);
    recipeContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%; max-width:300px;">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Origin:</strong> ${meal.strArea}</p>
        <p><strong>Instructions:</strong></p>
        <p>${meal.strInstructions}</p>
    `;

    // Update modal styles for centering
    modalContainer.style.display = "flex";
    modalContainer.style.position = "fixed"; // Use 'fixed' for fullscreen or 'absolute' for positioning within a parent
    modalContainer.style.justifyContent = "center";
    modalContainer.style.alignItems = "center";
    modalContainer.style.top = "0";
    modalContainer.style.left = "0";
    modalContainer.style.width = "100%";
    modalContainer.style.height = "100%";
    modalContainer.style.backgroundColor = "rgba(0,0,0,0.5)"; // Semi-transparent background
    modalContainer.style.zIndex = "1000"; // Ensure it's above other content
  };

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modalContainer.style.display = "none";
  });
});
