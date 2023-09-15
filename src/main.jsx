import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout.jsx";
import SignIn from "./Component/SignIn/SignIn.jsx";
import SignUp from "./Component/SignIn/SignUp.jsx";
import { LoginContextProvider } from "./Context/LoginContext.jsx";
import CardContainer from "./Component/Home/CardContainer.jsx";
import Hero from "./Component/Home/Hero.jsx";
import About from "./Component/Standalone/About.jsx";
import Calisthenics from "./Component/Exercises/Calisthenics.jsx";
import Cycling from "./Component/Exercises/Cycling.jsx";
import Running from "./Component/Exercises/Running.jsx";
import Swimming from "./Component/Exercises/Swimming.jsx";
import Walking from "./Component/Exercises/Walking.jsx";
import Yoga from "./Component/Exercises/Yoga.jsx";
import Profile from "./Component/User/Profile.jsx";
import Dashboard from "./Component/User/Dashboard.jsx";
import EditProfile from "./Component/User/EditProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Hero />
        <CardContainer />
      </Layout>
    ),
  },
  {
    path: "/signin",
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/yoga",
    element: (
      <Layout>
        <Yoga />
      </Layout>
    ),
  },
  {
    path: "/swimming",
    element: (
      <Layout>
        <Swimming />
      </Layout>
    ),
  },
  {
    path: "/calisthenics",
    element: (
      <Layout>
        <Calisthenics />
      </Layout>
    ),
  },
  {
    path: "/walking",
    element: (
      <Layout>
        <Walking />
      </Layout>
    ),
  },
  {
    path: "/cycling",
    element: (
      <Layout>
        <Cycling />
      </Layout>
    ),
  },
  {
    path: "/running",
    element: (
      <Layout>
        <Running />
      </Layout>
    ),
  },
  {
    path: "/home",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/edit-profile",
    element: (
      <Layout>
        <EditProfile />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginContextProvider>
      <RouterProvider router={router} />
    </LoginContextProvider>
  </React.StrictMode>
);
