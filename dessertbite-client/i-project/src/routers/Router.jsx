import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import LoginPage from "../views/Login";
import AddPage from "../views/AddPage";
import EditPage from "../views/EditPage";
import LandingPage from "../views/LandingPage";
import Home from "../views/Home";
import BaseLayout from "../views/BaseLayout";
import MyCollection from "../views/MyCollection";
import RegisPage from "../views/Register";
import DessertList from "../views/DesserRecommendation";
import DessertInfo from "../views/DessertInfoPage";
const URL = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage url={URL} />,
  },
  {
    path: "/register",
    element: <RegisPage url={URL} />,
  },

  {
    path: "/home",
    element: <Home url={URL} />,
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
        return redirect("/recommandation");
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
        path: "/recommandation",
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
        element: <DessertInfo url={URL} />,
      },
      {
        path: "/recipe/yes/:id",
        element: <EditPage url={URL} />,
      },
    ],
  },
]);

export default router;
