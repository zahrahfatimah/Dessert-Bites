import React, { useState, useEffect } from "react";
// import Toastify from "toastify-js";
import "@fontsource/dancing-script";
import { fetchCafesAsync } from "../features/cafeSlice";
import { useDispatch, useSelector } from "react-redux";
export default function DessertList() {
  const { cafes, isLoading, errorMsg } = useSelector((state) => state.cafe);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCafesAsync());
  }, []);
 
  return (
    <div className="bg-[#A87676]">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8 font-[Dancing Script] text-white">
          Desserts Library
        </h1>
        <p className="text-4xl text-center mb-8 font-[Dancing Script] text-white">
          lovely recommendation dessert for you
        </p>
  
        {isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : errorMsg ? (
          <p className="text-center text-white ">{errorMsg}</p>
        ) : (
          <div className="dessert-list flex flex-wrap gap-8 justify-center">
            {cafes.map((cafe) => (
              <div
                className="card bg-transparent p-4 shadow border-2 border-white rounded w-72"
                key={cafe.title}
              >
                <img
                  src={cafe.image || "https://via.placeholder.com/150"}
                  alt={cafe.title} 
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-2xl font-light text-white">{cafe.title}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
  
}
