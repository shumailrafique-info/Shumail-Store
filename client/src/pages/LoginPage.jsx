import React from "react";
import LoginComponent from "../features/auth/components/Login";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/footer/Footer";

const Login = () => {
  return (
    <div>
      <Navbar></Navbar>
      <LoginComponent />
      <hr />
      <Footer></Footer>
    </div>
  );
};

export default Login;
