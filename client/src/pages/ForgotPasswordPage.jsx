import React from "react";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import Navbar from "../features/navbar/Navbar";

const ForgotPasswordPage = () => {
  return (
    <div>
      <Navbar>
      <ForgotPassword></ForgotPassword>
      </Navbar>
    </div>
  );
};

export default ForgotPasswordPage;
