import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";

export default function RegisPage({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleReg(e) {
    e.preventDefault();
    try {
      // const addedData = { username, password };
      const { data } = await axios.post(
        `${url}/register`,
        { username, email, password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      console.log(data); // Log response dari server
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/login");
      Toastify({
        text: "success register yey",
        style: {
          background: "linear-gradient(to right, #A87676, #FFD0D0)",
        },
      }).showToast();
    } catch (error) {
      console.log(error);

      Toastify({
        text: "wah ga bisa register kenapa ya?",
        style: {
          background: "linear-gradient(to right, #A87676, #FFD0D0)",
        },
      }).showToast();
    }
  }

  return (
    <div className="flex w-full h-full m-0 p-0">
      <div className="flex w-full h-screen">
        <div className="flex flex-col justify-center items-center w-1/2 p-10 box-border bg-[#A87676]">
          {/* <img src="/dessert logo.jpg" alt="Logo" className="w-72 mb-12" />{" "} */}
          <h1 className="mb-5 text-2xl font-bold text-gray-700">
            Sign up as new account
          </h1>
          <form onSubmit={handleReg} className="w-full">
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full p-2 mb-3 border border-[#E1ACAC] rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email address"
              required
              className="w-full p-2 mb-3 border border-[#E1ACAC] rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-2 mb-3 border border-[#E1ACAC] rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full p-2 bg-[#E1ACAC] text-white rounded hover:bg-[#D19696]"
            >
              Sign up
            </button>
            <p className="text-gray-700 mt-2 flex justify-center">
              Already have account?{" "}
              <Link to="/login" className="hover:text-white">
                {" "}
                Login now{" "}
              </Link>
            </p>
          </form>
        </div>
        <div
          className="w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/474x/12/c9/58/12c9585085da28925702d9f1222da970.jpg')",
          }}
        ></div>
      </div>
    </div>
  );
}
