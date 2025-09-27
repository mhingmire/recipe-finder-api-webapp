# Recipe Finder API Webapp 🍽️

**Description:**  
Recipe Finder is a fun and interactive web app that helps you discover new recipes using the **TheMealDB API**. You can search recipes by ingredient, filter by category or cuisine, and even get a completely random recipe with a single click. Perfect for food lovers looking for inspiration or a quick idea for what to cook.

---

## **Key Features**

- Search recipes by **one or multiple ingredients**  
- Filter recipes by **category** (All, Beef, Chicken, Seafood, Pork, Lamb, Vegetarian)  
- Filter recipes by **cuisine/area** (All, Indian, British, French, Jamaican, Thai, Japanese, Russian)  
- **Random recipe surprise** button to get inspiration instantly  
- **Responsive design** – works well on mobile and desktop  
- **Interactive recipe cards** with hover effects  
- Shows recipe **title, image, ingredients, and source link**  

---

## **API Used**

- **[TheMealDB API](https://www.themealdb.com/)** – provides international recipes and detailed meal information

---

## **Tech Stack / Scripts**

- **Frontend:** HTML, CSS, JavaScript  
  - Ingredient search input, filter dropdowns, recipe cards display  
  - Vanilla JS to fetch data from the backend and handle DOM updates  
- **Backend:** Node.js with **Express.js**  
  - Serves static frontend files  
  - Handles API requests to TheMealDB  
  - Combines results from multiple ingredient searches  
  - Ensures no duplicate recipes  
- **Other dependencies:**  
  - `node-fetch` – for making API requests  
  - `dotenv` – optional for storing environment variables  

---

## **How It Works**

1. User enters ingredient(s) in the search box.  
2. Backend fetches recipes from TheMealDB API.  
3. Recipes are stored and displayed as **interactive cards**.  
4. User can apply **category or area filters** to refine results.  
5. User can click **“Surprise Me!”** to get a random recipe.  
6. Each recipe card shows image, name, ingredients, and a link to full recipe.  

---

## **How to Run Locally**

1. Clone the repository:
```bash
git clone https://github.com/your-username/recipe-finder-api-webapp.git
cd recipe-finder-api-webapp
```
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
node server.js
```
4. Click on the link and open in browser:
```bash
http://localhost:3000
```
5. Start Exploring!!

## **Preview**
<img width="2880" height="1800" alt="Screenshot (19)" src="https://github.com/user-attachments/assets/332ded95-24a1-473b-a0ba-553cc55f5048" />
<img width="2880" height="1800" alt="Screenshot (20)" src="https://github.com/user-attachments/assets/c7d72875-9f6b-45df-b4a3-bc6c1cd48c1e" />

