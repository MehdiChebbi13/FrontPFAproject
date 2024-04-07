import { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer/Footer";
import "./Profile_Page.css";
import { useAuth } from "../Hooks/useAuthContext";
function Profile_Page() {
  const { currentUser } = useAuth();

  return (
    <div className="All">
      <div className="App" />
      <Header />
      <div className="center">
        <div className="the-nav">
          <NavBar />
        </div>
        <div className="profile_pagedes">
          <Profile />
        </div>
      </div>
      <div className="ft">
        <Footer />
      </div>
    </div>
  );
}

export default Profile_Page;
