import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form({ handleSubmit, recipe }) {
  const [sourceName, setSourceName] = useState("");
  const [pricePerServing, setPricePerServing] = useState("");
  const [notes, setNotes] = useState("");
  const [healthScore, setHealthScore] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (recipe) {
      setSourceName(recipe.sourceName);
      setPricePerServing(recipe.pricePerServing);
      setNotes(recipe.notes);
      setHealthScore(recipe.healthScore);
      setUserId(recipe.userId);
    }
  }, [recipe]);

  const onSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await handleSubmit(sourceName, pricePerServing, notes, healthScore, userId);
      navigate("/myCollection"); 
    } catch (error) {
      console.error("Failed to save the data:", error); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFD0D0]">
      <div className="w-1/2 bg-[#A87676] p-10 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">
          Save your favorite dessert to your collection
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              autoComplete="off"
              required
              className="mt-1 p-2 w-full border border-[#E1ACAC] rounded"
              onChange={(e) => setSourceName(e.target.value)}
              value={sourceName}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="number"
              autoComplete="off"
              required
              className="mt-1 p-2 w-full border border-[#E1ACAC] rounded"
              onChange={(e) => setPricePerServing(e.target.value)}
              value={pricePerServing}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Notes:</label>
            <textarea
              rows="4"
              autoComplete="off"
              required
              className="mt-1 p-2 w-full border border-[#E1ACAC] rounded"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Health Score:</label>
            <input
              type="number"
              autoComplete="off"
              required
              className="mt-1 p-2 w-full border border-[#E1ACAC] rounded"
              onChange={(e) => setHealthScore(e.target.value)}
              value={healthScore}
            />
            <div className="mt-2 text-sm text-gray-700">
              Don't know what the health score is?{" "}
              <button
                type="button"
                className="hover:underline text-gray-700"
                // onClick={() => alert('Health score is a measure of...')}
              >
                Ask me
              </button>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full p-2 bg-[#E1ACAC] text-white rounded hover:bg-[#D19696]">
              Add to your collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
