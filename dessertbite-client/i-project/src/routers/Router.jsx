import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import LoginPage from "../views/Login";
import AddPage from "../views/AddPage"; // Import AddPage
import LandingPage from "../views/LandingPage";
import DessertList from "../views/Home";
import BaseLayout from "../views/BaseLayout";
import MyCollection from "../views/MyCollection";
import RegisPage from "../views/Register";
import Nutrition from "../views/NutritionCheckPage";

const URL = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/register",
    element:<RegisPage url={URL}/>
  },
  {
    path: "/",
    element: <LandingPage url={URL} />,
  },
  {
    path: "/login",
    element: <LoginPage url={URL} />,
    loader: () => {
      if (localStorage.accessToken) {
        Toastify({
          text: `kamu sudah login`,
          style: {
            background: "linear-gradient(to right, #A87676, #FFD0D0)",
          },
        }).showToast();
        return redirect("/home");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.accessToken) {
        Toastify({
          text: `Please log in first`,
          style: {
            background: "linear-gradient(to right, #A87676, #FFD0D0)",
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/home",
        element: <DessertList url={URL} />,
      },
      {
        path: "/myCollection",
        element: <MyCollection url={URL} />,
      },
      {
        path: "/add",
        element: <AddPage url={URL} />,
      },
      {
        path: "/nutrition",
        element: <Nutrition url={URL} />,
      },
    ],
  },
]);

export default router;
