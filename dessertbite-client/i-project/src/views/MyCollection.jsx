import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
// import {FaEdit} from 'react-icons'
import { FaEdit } from 'react-icons/fa'; 
import { FaTrash, FaQuestionCircle } from "react-icons/fa";

export default function MyCollection({ url }) {
  const [collection, setCollection] = useState([]);

  async function fetchData() {
    try {
      const { data } = await axios.get(`${url}/recipe`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (data && Array.isArray(data.recipe)) {
        setCollection(data.recipe);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Toastify({
        text: `Gagal fetch data moms ${error.message}`,
        style: {
          background: "linear-gradient(to right, #A87676, #FFD0D0)",
        },
      }).showToast();
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setCollection((prevCollection) =>
        prevCollection.filter((recipe) => recipe.id !== id)
      );

      Toastify({
        text: "Berhasil menghapus koleksi",
        style: {
          background: "linear-gradient(to right, #A87676, #FFD0D0)",
        },
      }).showToast();
    } catch (error) {
      console.error("Delete error:", error);
      Toastify({
        text: `Gagal menghapus koleksi: ${error.message}`,
        style: {
          background: "linear-gradient(to right, #A87676, #FFD0D0)",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-8 bg-[#A87676]">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Another day another dessert{" <3"}
      </h1>

      <div className="relative flex flex-wrap gap-8 justify-center">
        {collection.length > 0 ? (
          collection.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-[#F9E4C8] border-b-2 border-black rounded-lg shadow-lg p-6 w-80"
              style={{
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              <h2 className="text-2xl font-semibold mb-2 text-black">
                Dessert Name: {recipe.sourceName}
              </h2>
              <p className="text-xl mb-2 text-black">
                Price: {recipe.pricePerServing}
              </p>
              <p className="text-lg mb-2 text-black">Notes: {recipe.notes}</p>
              <p className="text-lg text-black">Rating: {recipe.healthScore}</p>

              {/* Icons including the new edit icon */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-4">
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>

                {/* <Link
                  to={`/recipe/${recipe.id}`}
                  className="text-[#A87676] hover:text-[#E1ACAC] flex items-center"
                >
                  <FaQuestionCircle className="mr-2" />
                  <span className="hidden group-hover:block text-sm bg-white text-black p-2 rounded-lg">
                    ingin mencari cafe terdekat yang memiliki menu dessert ini?
                  </span>
                </Link> */}

                {/* New Edit Icon */}
                <Link to={`/recipe/yes/${recipe.id}`} className="text-blue-600 hover:text-blue-800">
                  <FaEdit />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-center">No data available</p>
        )}
      </div>

      <div className="mt-8 text-center flex justify-center space-x-4">
        <Link to="/add">
          <button className="bg-[#F9E4C8] text-[#A87676] w-40 py-2 rounded-lg shadow-md hover:bg-[#E1ACAC]">
            Add Collection
          </button>
        </Link>
        <Link to="/home">
          <button className="bg-[#F9E4C8] text-[#A87676] w-40 py-2 rounded-lg shadow-md hover:bg-[#E1ACAC]">
            Back?
          </button>
        </Link>
      </div>
    </div>
  );
}
