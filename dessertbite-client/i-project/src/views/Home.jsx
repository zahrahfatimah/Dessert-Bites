import React, { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import "@fontsource/dancing-script"; 

export default function DessertList() {
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await axios.get(
        //   "https://the-birthday-cake-db.p.rapidapi.com/",
        //   {
        //     headers: {
        //       "x-rapidapi-key":
        //         "2f65806f71msh08642d52c493d1ap15c3adjsn8941a614a5e2",
        //       "x-rapidapi-host": "the-birthday-cake-db.p.rapidapi.com",
        //     },
        //   }
        // );

        // const data = response.data;

        if (Array.isArray(data)) {
          setDesserts(data);
        } else {
          console.error("Expected an array but got:", data);
          Toastify({
            text: "Unexpected data format from API",
            style: {
              background: "linear-gradient(to right, #A87676, #FFD0D0)",
            },
          }).showToast();
        }
      } catch (error) {
        console.error(error);
        Toastify({
          text: `Error fetching data`,
          style: {
            background: "linear-gradient(to right, #A87676, #FFD0D0)",
          },
        }).showToast();
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#A87676]">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8 font-[Dancing Script] text-white">
          Desserts Library
        </h1>
        <div className="dessert-list flex flex-wrap gap-8 justify-center">
          {desserts.map((dessert) => (
            <div
              className="card bg-transparent p-4 shadow border-2 border-white rounded w-72"
              key={dessert.title}
            >
              <img
                src={dessert.image || "https://via.placeholder.com/150"}
                alt={dessert.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-2xl font-light text-white">{dessert.title}</h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
