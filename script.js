// script.js
const ingredientsForm = document.getElementById('ingredientsForm');
const recipeTitleElement = document.getElementById('recipeTitle');
const recipeDescriptionElement = document.getElementById('recipeDescription');
const recipeIngredientsElement = document.getElementById('recipeIngredients');
const recipeInstructionsElement = document.getElementById('recipeInstructions');
const recipeOutputElement = document.getElementById('recipe-output');

function handleSubmit(event) {
  event.preventDefault();

  const ingredientsInput = document.getElementById('ingredients');
  const ingredients = ingredientsInput.value.trim().split(',');

  fetch('/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Response:', response);
      console.log('Data:', data);

      if (data.recipe) {
        const recipe = data.recipe;
        recipeTitleElement.textContent = recipe.title;
        recipeDescriptionElement.textContent = recipe.description;
        recipeIngredientsElement.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;
        recipeInstructionsElement.textContent = `Instructions: ${recipe.instructions}`;
        recipeOutputElement.textContent = '';
      } else {
        recipeTitleElement.textContent = 'No recipe found.';
        recipeDescriptionElement.textContent = '';
        recipeIngredientsElement.textContent = '';
        recipeInstructionsElement.textContent = '';
        recipeOutputElement.textContent = JSON.stringify(data, null, 2);
      }
    })
    .catch(error => console.error('Error:', error));

  ingredientsInput.value = '';
}

ingredientsForm.addEventListener('submit', handleSubmit);

