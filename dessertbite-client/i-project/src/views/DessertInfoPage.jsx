import React, { useState } from "react";
import axios from "axios";

export default function DessertInfo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    // if (!selectedFile) {
    //   setError("Please select a file first");
    //   return;
    // }

    // const data = new FormData();
    // data.append("file", selectedFile);

    // const options = {
    //   method: "POST",
    //   url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/images/analyze",
    //   headers: {
    //     "x-rapidapi-key": "2f65806f71msh08642d52c493d1ap15c3adjsn8941a614a5e2",
    //     "x-rapidapi-host":
    //       "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    //   },
    //   data: data,
    // };
    try {
      const response = await axios.request(options);
      const firstFiveRecipes = response.data.recipes.slice(0, 5); // Mengambil 5 resep pertama

      const recipeDetails = firstFiveRecipes.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        url: recipe.url,
      }));

      setNutritionData({
        dessertName: response.data.category.name,
        calories: response.data.nutrition.calories.value,
        protein: response.data.nutrition.protein.value,
        carbs: response.data.nutrition.carbs.value,
        fat: response.data.nutrition.fat.value,
        recipes: recipeDetails, // Menyimpan detail 5 resep pertama
      });
      setError(null);
    } catch (error) {
      setError("Failed to analyze the image. Please try again.");
      setNutritionData(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#A87676]">
      <div className="text-center">
        <h1 className="text-2xl text-white mb-4">
          Upload Dessert Picture To Check Nutrition Information and Dessert
          Recipes {":)"}
        </h1>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-[#E1ACAC] hover:bg-white hover:text-[#E1ACAC]   text-white rounded"
        >
          Upload and Analyze
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {nutritionData && (
          <div className="mt-4 p-4 text-[#E1ACAC] border rounded bg-gray-100">
            <h2 className="text-xl text-[#E1ACAC] font-bold">
              Nutrition Facts
            </h2>
            <p>Dessert Name: {nutritionData.dessertName}</p>
            <p>Calories: {nutritionData.calories}</p>
            <p>Protein: {nutritionData.protein} g</p>
            <p>Carbs: {nutritionData.carbs} g</p>
            <p>Fat: {nutritionData.fat} g</p>
            <br />
            <h2 className="text-xl text-[#E1ACAC] font-bold">
              Top 5 Dessert Recipes similar
            </h2>
            {nutritionData.recipes.map((recipe, index) => (
              <div key={index} className="mb-2">
                <p>
                  <strong>{recipe.title}</strong>
                </p>
                {/* <p>ID: {recipe.id}</p> */}
                <p>
                  Click here for more:{" "}
                  <a
                    href={recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {recipe.url}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
