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
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    const data = new FormData();
    data.append("file", selectedFile);

    const options = {
      method: "POST",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/images/analyze",
      headers: {
        "x-rapidapi-key": "2f65806f71msh08642d52c493d1ap15c3adjsn8941a614a5e2",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
      data: data,
    };
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
      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl h-[500px] overflow-auto">
        <h1 className="text-2xl font-bold text-[#A87676] mb-6">
          Upload Your Dessert Picture to Get Nutrition & Recipe Information
        </h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded cursor-pointer w-full"
        />
        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-[#E1ACAC] hover:bg-white hover:text-[#E1ACAC] text-white font-semibold rounded transition duration-300 ease-in-out"
        >
          Upload and Analyze
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {nutritionData && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md text-left h-full overflow-y-auto">
            <h2 className="text-xl font-bold text-[#A87676] mb-4">Nutrition Facts</h2>
            <p className="text-gray-800 mb-2">
              <strong>Dessert Name:</strong> {nutritionData.dessertName}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Calories:</strong> {nutritionData.calories} kcal
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Protein:</strong> {nutritionData.protein} g
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Carbs:</strong> {nutritionData.carbs} g
            </p>
            <p className="text-gray-800 mb-4">
              <strong>Fat:</strong> {nutritionData.fat} g
            </p>
            <h2 className="text-xl font-bold text-[#A87676] mb-4">
              Top 5 Dessert Recipes Similar
            </h2>
            {nutritionData.recipes.map((recipe, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-800 font-semibold">{recipe.title}</p>
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline"
                >
                  Click here for more
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
