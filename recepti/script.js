let recipes = [];
let selectedRecipeIndex = null;

fetch('recipes.json')
  .then(res => res.json())
  .then(data => {
    recipes = data;
    renderRecipesTable();
    fillIngredientDropdown();
  });

function renderRecipesTable() {
  const tbody = document.querySelector("#recipesTable tbody");
  tbody.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${recipe.name}</td>
      <td>${recipe.description}</td>
      <td>${recipe.duration}</td>
    `;
    tr.addEventListener("click", () => showRecipeDetails(index));
    if (selectedRecipeIndex === index) tr.classList.add("selected");
    tbody.appendChild(tr);
  });
}

function showRecipeDetails(index) {
  selectedRecipeIndex = index;
  const recipe = recipes[index];
  document.getElementById("recipeTitle").textContent = recipe.name;
  document.getElementById("detailsSection").classList.remove("hidden");
  renderRecipesTable();
  renderIngredientsTable();
  fillIngredientDropdown();
}

function renderIngredientsTable() {
  const tbody = document.querySelector("#ingredientsTable tbody");
  tbody.innerHTML = "";
  const ingredients = recipes[selectedRecipeIndex].ingredients;

  ingredients.forEach((ing, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ing.name}</td>
      <td>${ing.unit}</td>
      <td>${ing.quantity}</td>
      <td><button class="delete" onclick="deleteIngredient(${i})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function fillIngredientDropdown() {
  const select = document.getElementById("ingredientSelect");
  const allIngredients = new Set();
  recipes.forEach(r => r.ingredients.forEach(i => allIngredients.add(i.name)));
  select.innerHTML = "";
  Array.from(allIngredients).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
}

function addIngredient() {
  const name = document.getElementById("ingredientSelect").value;
  const unit = document.getElementById("unitInput").value.trim();
  const quantity = document.getElementById("quantityInput").value.trim();

  if (!unit || !quantity || isNaN(quantity) || Number(quantity) <= 0) {
    alert("Please enter valid unit and quantity (positive number).");
    return;
  }

  recipes[selectedRecipeIndex].ingredients.push({
    name,
    unit,
    quantity: Number(quantity)
  });

  renderIngredientsTable();
  document.getElementById("unitInput").value = "";
  document.getElementById("quantityInput").value = "";
}

function deleteIngredient(index) {
  const ingredients = recipes[selectedRecipeIndex].ingredients;
  if (ingredients.length <= 1) {
    alert("Recipe must have at least one ingredient.");
    return;
  }
  ingredients.splice(index, 1);
  renderIngredientsTable();
}

document.getElementById("deleteRecipeBtn").addEventListener("click", () => {
  if (selectedRecipeIndex === null) return;
  if (confirm("Are you sure you want to delete this recipe?")) {
    recipes.splice(selectedRecipeIndex, 1);
    selectedRecipeIndex = null;
    document.getElementById("detailsSection").classList.add("hidden");
    renderRecipesTable();
  }
});