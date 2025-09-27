//we are loading all the DOM elements needed for our webpage
//button for searchiong recipes, random recipe generator, applying filters and recipe cards
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const applyFiltersBtn = document.getElementById("applyFilters");
const recipesDiv = document.getElementById("recipes");

let allRecipes = []; //storing fetched recipes so filters can be appllied after

//searching recipes by ingredients, could be single or multiple
searchBtn.addEventListener("click", () => {
	const ingredient = document.getElementById("ingredient").value.trim();
	if (ingredient) fetchRecipes(ingredient); //calling our API if the input is not empty
});

//our surpise random recipe option
randomBtn.addEventListener("click", async () => {
	recipesDiv.innerHTML = "Loading random recipe...";
	try {
		const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`); //this felps us pick a random recipe from TheMealDB
		const data = await res.json();
		//storing the randomized recipe in aaray so the filters can be applied again (if any)
		allRecipes = [data.meals[0]]; 
		displayRecipes(allRecipes);
	} catch (error) {
		recipesDiv.innerHTML = "Error fetching recipe!";
		console.error(error);
	}
});

//applying filters; im adding 2 one by the cuisine and then the other is category of the meal
//this is basically just to add variety to my project; its a completely optional button though
applyFiltersBtn.addEventListener("click", () => {
	const category = document.getElementById("categoryFilter").value;
	const area = document.getElementById("areaFilter").value;

	const filtered = allRecipes.filter(recipe => {
		return (!category || recipe.strCategory === category) &&
					 (!area || recipe.strArea === area);
	});

	displayRecipes(filtered); //other recipes(general) get discarded once the filters have been applied
});

//getting recipes by the specified ingredient(s)
async function fetchRecipes(ingredient) {
	recipesDiv.innerHTML = "Loading recipes...";

	try {
		//hitting our backend endpoint that queries TheMealDB
		const response = await fetch(`/recipes?ingredient=${ingredient}`);
		const data = await response.json();
		//if no results found showing the message
		if (!data.results || data.results.length === 0) {
			recipesDiv.innerHTML = "No recipes found!";
			allRecipes = [];
			return;
		}

		//storing all recipes and displaying them
		allRecipes = data.results;
		displayRecipes(allRecipes);
	} catch (error) {
		recipesDiv.innerHTML = "Error fetching recipes!";
		console.error(error);
	}
}

//this helps us deploy the found recipes on the webpage
function displayRecipes(recipes) {
	recipesDiv.innerHTML = ""; //clearing any previously seacrhed results

	//crrating thoise cards on the page for all the recipes that will show up
	//honestly for design purposed only' looks good add the aesthetic
	recipes.forEach(recipe => {
		const card = document.createElement("div");
		card.classList.add("recipe-card");

		//making the ingredients list for the recipes
		//TheMealDB supports up to 20 ingredients
		let ingredientsList = "";
		for (let i = 1; i <= 20; i++) {
			const ingredient = recipe[`strIngredient${i}`];
			const measure = recipe[`strMeasure${i}`];
			if (ingredient && ingredient.trim() !== "") {
				ingredientsList += `<li>${ingredient} - ${measure}</li>`;
			}
		}

		//filling the recipe card with the recipe info
		//basically gets all the neccesary info for the recipes and adds to the car; brings it all together mopre cohesive
		card.innerHTML = `
			<img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
			<h3>${recipe.strMeal}</h3>
			<span class="badge category-badge">${recipe.strCategory || "N/A"}</span>
			<span class="badge area-badge">${recipe.strArea || "N/A"}</span>
			<ul>${ingredientsList}</ul>
			<a href="${recipe.strSource || recipe.strYoutube}" target="_blank">View Full Recipe</a>
		`;

		recipesDiv.appendChild(card); //lastly adding the finalized recipe card to the page
	});
}
