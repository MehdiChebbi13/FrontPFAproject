import React from "react";
import "../App.css";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer/Footer";
import "./Profile_Page.css";
function Profile_Page() {
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
