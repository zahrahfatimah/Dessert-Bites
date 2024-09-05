import React, { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = ({ url }) => {
  const [sourceName, setSourceName] = useState("");
  const [pricePerServing, setPricePerServing] = useState("");
  const [notes, setNotes] = useState("");
  const [healthScore, setHealthScore] = useState("");
  const [userId, setUserId] = useState(""); // optional if you need it
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing data when the component mounts
  useEffect(() => {
    async function fetchRecipeData() {
      try {
        const response = await axios.get(`${url}/recipe/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        const { sourceName, pricePerServing, notes, healthScore, userId } = response.data;

        // Set the state with the fetched data
        setSourceName(sourceName || "");
        setPricePerServing(pricePerServing || "");
        setNotes(notes || "");
        setHealthScore(healthScore || "");
        setUserId(userId || "");
      } catch (error) {
        console.error("Error fetching data:", error);
        Toastify({
          text: `Failed to fetch recipe: ${error.message}`,
          style: {
            background: "linear-gradient(to right, #A87676, #FFD0D0)",
          },
        }).showToast();
      }
    }

    fetchRecipeData();
  }, [id, url]);

  async function handleEditNotes() {
    try {
      const data = { sourceName, pricePerServing, notes, healthScore, userId };
      await axios.put(`${url}/recipe/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });

      Toastify({
        text: "success input dessert info",
        style: {
          background: "linear-gradient(to right, #A87676, #FFD0D0)",
        },
      }).showToast();
      navigate("/myCollection");
    } catch (error) {
      console.error("Failed to save the data:", error);
      Toastify({
        text: "input dessert info failed",
        style: {
          background: "linear-gradient(to right, #A87676, #FFD0D0)",
        },
      }).showToast();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleEditNotes();
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFD0D0]">
      <div className="w-1/2 bg-[#A87676] p-10 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">
          Edit your notes
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Price:
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Notes:
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Rating:
            </label>
            <input
              type="number"
              autoComplete="off"
              required
              className="mt-1 p-2 w-full border border-[#E1ACAC] rounded"
              onChange={(e) => setHealthScore(e.target.value)}
              value={healthScore}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-[#E1ACAC] text-white rounded hover:bg-[#D19696]"
            >
              save changes?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
