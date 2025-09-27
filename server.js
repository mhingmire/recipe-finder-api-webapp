//im using Express for the backend server; so iporting that
const express = require("express");
//dynamic import of node-fetch to avoid ESM/CommonJS conflicts
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express(); //initilaizing the Express
const PORT = 3000;

app.use(express.static("public")); // serving frontend files from the public folder

//Endpoints to fetch recipes by one or more ingredients
app.get("/recipes", async (req, res) => {
	const ingredientsQuery = req.query.ingredient; //reading the typed ingredient from url
	if (!ingredientsQuery) return res.status(400).send({ error: "Ingredient is required" });

	//this is very imporatnt
	//this reads the ingredients(comma-seperated) and stores it as an array
	//this will then help us to get the recipes by going over all the ingredients in the array and then finding the best possible match
	const ingredients = ingredientsQuery.split(",").map(i => i.trim());

	try {
		//finding the recipes
		const mealsPerIngredient = await Promise.all(
			ingredients.map(async ing => {
				const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`); //API filter by ingredient endpoint
				const data = await apiResponse.json();
				return data.meals || []; //suppose if no recipes found based on ingredients it returns an empty array
			})
		);

		//Flattening the recipe lists and removing duplicates using Map keyed by idMeal
		const uniqueMealsMap = new Map();
		mealsPerIngredient.flat().forEach(meal => {
			if (!uniqueMealsMap.has(meal.idMeal)) {
				uniqueMealsMap.set(meal.idMeal, meal);
			}
		});

		//10 best meal results are returned to us
		//this contains all the details; ingredients, instruction, links etc
		const topMeals = Array.from(uniqueMealsMap.values()).slice(0, 10);
		const mealsWithDetails = await Promise.all(
			topMeals.map(async meal => {
				const detailRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
				const detailData = await detailRes.json();
				return detailData.meals[0];
			})
		);

		//sending back JSON  response to frontend
		res.json({ results: mealsWithDetails });
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: "Failed to fetch recipes" });
	}
});

//finally starting our server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
