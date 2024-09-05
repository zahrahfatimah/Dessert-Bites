import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";

export default function Home({ url }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [sourceName, setSourceName] = useState(""); // State baru untuk input source name

  async function fetchRecipe(sourceName) {
    try {
      const genAI = new GoogleGenerativeAI(
        `AIzaSyDL1Tj_j5iqPvX2IhdtRf57K82BFAs65k8`
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Give me a JSON formatted list of cafes in Jakarta that might sell ${sourceName} like this without json only array of object{ "name": "Kopi Kenangan", "description": "A popular Indonesian coffee chain known for its affordable and delicious coffee and snacks.", "menu": "Oreo Cheesecake" }. Each item in the list should include the cafe's name, a short description of the cafe, and an example of what type of ${sourceName} they may offer. without backtick or grave accen and text json just array and object `;
      const result = await model.generateContent(prompt);
      const text = await result.response.text(); // Dapatkan teks dari respons
      console.log(text);

      const suggestions = JSON.parse(text); // Parsing JSON dari teks
      setSuggestions(suggestions);
    } catch (error) {
      setError("Failed to parse JSON from Gemini AI response.");
      console.log("JSON Parsing Error:", error);
    }
  }

  // async function fetchRecipe(sourceName) {
  //   try {
  //     const genAI = new GoogleGenerativeAI(
  //       `AIzaSyDL1Tj_j5iqPvX2IhdtRf57K82BFAs65k8`
  //     );

  //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  //     const prompt = `Give me a JSON formatted list of cafes in Jakarta that might sell ${sourceName}. Each item in the list should include the cafe's name, a short description of the cafe, and an example of what type of ${sourceName} they may offer.`;

  //     const result = await model.generateContent(prompt);
  //     const text = await result.response.text(); // Dapatkan teks dari respons

  //     try {
  //       const suggestions = JSON.parse(text); // Parsing JSON dari teks
  //       setSuggestions(suggestions); // Set hasil JSON
  //     } catch (jsonError) {
  //       setError("Failed to parse JSON from Gemini AI response.");
  //       console.log("JSON Parsing Error:", jsonError);
  //     }
  //   } catch (error) {
  //     setError(`Failed to fetch suggestions`);
  //     console.log(error);
  //   }
  // }

  async function fetchRecipes() {
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
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load recipes.");
    } finally {
      setLoading(false); // Pastikan loading di-set false
    }
  }

  const handleSearch = () => {
    fetchRecipe(sourceName); // Fetch recipe berdasarkan input sourceName
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // return (
  //   <>
  //     {loading ? (
  //       <div>
  //         <h1>Loading .. </h1>
  //       </div>
  //     ) : error ? (
  //       <div>
  //         <p className="text-red-500">{error}</p>
  //       </div>
  //     ) : (
  //       <div>
  //         <p>Here are some cafes that have this dessert:</p>

  //         <input
  //           type="text"
  //           value={sourceName}
  //           onChange={(e) => setSourceName(e.target.value)} // Update sourceName dari input
  //           placeholder="Enter source name"
  //         />
  //         <button onClick={handleSearch}>Search</button>

  //         <div>{suggestions}</div>
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-[#FFD0D0]">
          <h1 className="text-4xl font-bold text-[#A87676] animate-bounce">
            Loading...
          </h1>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen bg-pink-100">
          <p className="text-red-500 text-xl font-semibold">{error}</p>
        </div>
      ) : (
        <div className="bg-[#FFD0D0] min-h-screen">
          {/* Background Image Section */}
          <div
            className="relative flex justify-center items-center h-96 bg-cover bg-center text-white"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/474x/82/88/43/8288438a390cf41bd47d8c23eca69f6f.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h2 className="relative text-5xl font-bold text-white z-10">
              Sweet Dessert Bites Cafe Finder
            </h2>

            {/* Link ke halaman login menggunakan react-router-dom */}
            <Link
              to="/login"
              className="absolute top-4 right-4 text-white font-semibold underline z-10"
            >
              Login?
            </Link>
          </div>

          <div className="p-8 text-center mb-8">
            <p className="text-[#A87676] text-lg font-bold">
              Here are some nearest cafes that might have this dessert:
            </p>
          </div>

          {/* Input untuk memasukkan source name */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)} // Update sourceName dari input
              placeholder="Enter dessert name"
              className="border-2 border-[#A87676] rounded-full py-2 px-4 w-2/3 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-[#A87676] text-white px-6 py-2 ml-4 rounded-full shadow-lg hover:bg-white hover:text-[#A87676] transition-all"
            >
              Search
            </button>
          </div>

          {/* Menampilkan hasil suggestion */}
          {suggestions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {suggestions.map((cafe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 border-2 border-[#E1ACAC] hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-[#A87676]">
                    {cafe.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{cafe.description}</p>
                  <p className="text-gray-500 mt-2 font-medium">
                    Special dessert:{" "}
                    <span className="text-[#A87676]">{cafe.menu}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#A87676] text-lg mt-6">
              No cafes found for{" "}
              <span className="font-semibold">{sourceName}</span>.
            </p>
          )}
        </div>
      )}
    </>
  );
}
