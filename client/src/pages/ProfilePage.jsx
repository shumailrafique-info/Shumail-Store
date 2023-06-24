import React from "react";
import Navbar from "../features/navbar/Navbar";
import Profile from "../features/userProfile/components/Profile";

const ProfilePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Profile></Profile>
    </div>
  );
};

export default ProfilePage;
