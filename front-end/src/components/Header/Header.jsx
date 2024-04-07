import React, { useState, useEffect } from "react";
import "./Header.css";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import logo from "../../../src/assets/newlogo.png";
function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [mode, setMode] = useState("inactive");
  const handleClick = () => {
    setMode(mode === "active" ? "inactive" : "active");
    console.log(mode);
  };
  return (
    <div className=" flexCenter h-wrapper">
      <img src={logo} alt="no logo" className="logo" />
      <div className=" icon-container">
        <IoIosNotificationsOutline
          className="icon1"
          // on the onclick make a function that will open the notification page
          onClick={() => {
            handleClick();
          }}
        />
        <IoSettingsOutline className="icon2" />
        <div className="notification-box">
          {isVisible && (
            <div className={`notification ${mode}`}>
              <p>put the notification here aazeazehatrrtrtzuieauieg</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
