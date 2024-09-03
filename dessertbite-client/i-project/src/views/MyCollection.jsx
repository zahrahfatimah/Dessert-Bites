import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { Link } from "react-router-dom"; 
import { FaTrash } from "react-icons/fa"; 

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

      <div className="flex flex-wrap gap-8 justify-center">
        {collection.length > 0 ? (
          collection.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-[#F9E4C8] border border-[#F9E4C8] rounded-lg shadow-lg p-6 w-80"
              style={{
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                transform: "rotate(-2deg)",
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
              <p className="text-lg text-black">
                Rating: {recipe.healthScore}
              </p>
              {/* Tambahkan ikon tempat sampah */}
              <button 
                onClick={() => handleDelete(recipe.id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
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
