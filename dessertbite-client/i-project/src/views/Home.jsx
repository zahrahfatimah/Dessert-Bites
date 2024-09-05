import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home({ url }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const { id } = useParams();

  async function fetchRecipe(sourceName) {
    try {
      const genAI = new GoogleGenerativeAI(
        `AIzaSyDL1Tj_j5iqPvX2IhdtRf57K82BFAs65k8`
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Give me some names of cafes in Jakarta that sell ${sourceName} in order from number 1 onwards.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      console.log(result.response.text());

      setSuggestions(text);
    } catch (error) {
      setError(`Failed to fetch suggestions`);
      console.log(error);
    }
  }

  async function Recipes() {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/recipe`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response, "Response from API"); // Cek respons dari API
      if (response.data.recipe) {
        setRecipes(response.data.recipe);
        await fetchRecipe(response.data.recipe.sourceName);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load recipes.");
    } finally {
      setLoading(false); // Pastikan loading di-set false
    }
  }

  useEffect(() => {
    Recipes();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <h1>Loading .. </h1>
        </div>
      ) : error ? (
        <div>
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div>
          <p>{recipes.sourceName}</p>
          <p>Here are some cafes that have this dessert:</p>
          {suggestions}
        </div>
      )}
    </>
  );
}
