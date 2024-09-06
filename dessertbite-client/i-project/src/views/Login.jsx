import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      // const addedData = { username, password };
      const { data } = await axios.post(
        `${url}/login`,
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      console.log(data); // Log response dari server
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/recommandation");
      Toastify({
        text: "success Login yey",
        style: {
          background: "linear-gradient(to right, #A87676, #FFD0D0)",
        },
      }).showToast();
    } catch (error) {
      console.log(error);

      Toastify({
        text: "wah ga bisa login nih tante",
        style: {
          background: "linear-gradient(to right, #A87676, #FFD0D0)",
        },
      }).showToast();
    }
  }

  async function googleLogin(response) {
    console.log(response);

    try {
      const { data } = await axios.post(`${url}/google-login`, null, {
        headers: {
          google_token: response.credential,
        },
      });

      // const { data } = await axios.post(`${url}/google-login`, null, {
      //   headers: {
      //     Authorization: `Bearer ${response.credential}`,
      //   },
      // });

      localStorage.setItem("accessToken", data.accessToken);
      navigate("/recommandation");
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Gagal login (googlelogin)",
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
          <h1 className="mb-5 text-2xl font-bold text-gray-700">
            Sign in to your account
          </h1>
          <form onSubmit={handleLogin} className="w-full">
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
              Sign in
            </button>
            <p className="text-gray-700 mt-2 flex justify-center">
              Don't have an account?{" "}
              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            </p>
          </form>
          <div className="divider px-10 text-gray-700">OR</div>
          <div className="flex justify-center items-center">
            <GoogleLogin
              onSuccess={googleLogin}
              onFailure={(error) => {
                console.error(error);
                Toastify({
                  text: "Gagal login dengan Google",
                  style: {
                    background: "linear-gradient(to right, #A87676, #FFD0D0)",
                  },
                }).showToast();
              }}
            />
          </div>
        </div>
        <div
          className="w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/474x/12/c9/58/12c9585085da28925702d9f1222da970.jpg')",
          }}
        >
          <Link
            to="/home"
            className="absolute top-2 right-4 text-white text-lg hover:underline"
          >
            Back to home?
          </Link>
        </div>
      </div>
    </div>
  );
}
