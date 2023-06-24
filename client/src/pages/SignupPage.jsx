import React from "react";
import Signup from "../features/auth/components/Signup";
import Navbar from "../features/navbar/Navbar";

const SignupPage = () => {
  return (
    <div>
      <Navbar>

      <Signup></Signup>
      </Navbar>
    </div>
  );
};

export default SignupPage;
