import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-white text-white font-sans flex items-center justify-center h-screen">
      <div className="flex w-full max-w-6xl">
        {/* Div sebelah kanan */}
        <div className="w-1/2 p-8">
          <img
            src="https://i.pinimg.com/474x/39/0d/9c/390d9cc0712dfc17b86c8e2d42e02bbd.jpg"
            alt="Dessert Image"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Div sebelah kiri */}
        <div className="w-1/2 p-8 flex flex-col justify-center space-y-4">
          <h1 className="text-5xl font-bold mb-4 text-[#B47B84]">
            Dessert Bite
          </h1>
          <p className="text-xl mb-4 text-[#B47B84]">
            디저트 한 입 한 입도 기억에 남을 만한 가치가 있습니다. <br />
            Every bite of dessert also deserves to be remembered
          </p>

          <p className="text-[#B47B84]">
            "Delicious dessert recommendations, Nutritions informations, Dessert
            Recipe, and Cute notes to save your happy moment of your favorite
            dessert"
          </p>

          <Link
            to="/login"
            className="border border-[#B47B84] text-[#B47B84] py-2 px-4 rounded-full text-center font-semibold hover:bg-[#B47B84] hover:text-white transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
