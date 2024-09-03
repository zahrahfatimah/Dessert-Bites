import React, { useEffect, useState } from "react";
import axios from 'axios';
import Toastify from 'toastify-js';
import { useNavigate } from "react-router-dom";

const AddPage = ({ url }) => {
  const [sourceName, setSourceName] = useState("");
  const [pricePerServing, setPricePerServing] = useState("");
  const [notes, setNotes] = useState("");
  const [healthScore, setHealthScore] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  async function handleAddInfo() {
    try {
      const data = { sourceName, pricePerServing, notes, healthScore, userId };
      const response = await axios.post(`${url}/recipe`, data, {
        headers: { Authorization: `Bearer ${localStorage.accessToken}` }
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

  async function handleDelete() {
    try {
      await axios.delete(`${url}/recipe/${recipeId}`, {
        headers: { Authorization: `Bearer ${localStorage.accessToken}` }
      });

      Toastify({
        text: "Deleted Dessert Info",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold"
        }
      }).showToast();
      navigate("/myCollection");
    } catch (error) {
      console.error("Failed to delete the data:", error);
      Toastify({
        text: 'Failed to Delete Dessert Info',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold"
        }
      }).showToast();
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await handleAddInfo();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFD0D0]">
      <div className="w-1/2 bg-[#A87676] p-10 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">
          Save your favorite dessert to your collection
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium text-gray-700">Rating:</label>
            <input
              type="number"
              autoComplete="off"
              required
              className="mt-1 p-2 w-full border border-[#E1ACAC] rounded"
              onChange={(e) => setHealthScore(e.target.value)}
              value={healthScore}
            />
            <div className="mt-2 text-sm text-gray-700">
              wanna know this dessert nutrition and what the health score is?{" "}
              <button
                type="button"
                className="hover:underline text-gray-700"
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
};

export default AddPage;
