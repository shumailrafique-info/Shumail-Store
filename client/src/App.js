import React, { useEffect } from "react";
import "./App.scss";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage.jsx";
import Ckeckout from "./pages/Ckeckout";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { loadUser } from "./features/auth/authAPI";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import UserDetails from "./features/userProfile/components/userDetails";
import EditProfile from "./features/userProfile/components/EditProfile";
import UserOrders from "./features/userProfile/components/UserOrders";
import ChangePassword from "./features/userProfile/components/ChangePassword";
import Product from "./pages/ProductPage";
import { fetchCategories } from "./features/product/productAPI";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 4000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchCategories());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },

    {
      path: `${"/login"}`,
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/signup",
      element: <SignupPage></SignupPage>,
    },
    {
      path: "/profile",
      element: <ProfilePage></ProfilePage>,
      children: [
        {
          path: "",
          element: <UserDetails />,
        },
        {
          path: "orders",
          element: <UserOrders />,
        },
        {
          path: "edit",
          element: <EditProfile />,
        },
        {
          path: "change",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "/forgot/password",
      element: <ForgotPasswordPage></ForgotPasswordPage>,
    },
    {
      // For Testing purpose
      path: "/cart",
      element: <CartPage></CartPage>,
    },
    {
      // For Testing purpose
      path: "/checkout",
      element: <Ckeckout></Ckeckout>,
    },
    {
      path: "/products",
      element: <Product></Product>,
    },
    {
      // For Testing purpose
      path: "products/product/:id",
      element: <ProductDetailsPage></ProductDetailsPage>,
    },
  ]);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div>
        <RouterProvider router={router} />
      </div>
    </AlertProvider>
  );
}

export default App;
