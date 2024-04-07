import React, { useContext, useState, useEffect } from "react";
import "./NavBar.css";
import { GoSignOut } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import unknown from "../../assets/unknown-user.png";
import { useAuth } from "../../Hooks/useAuthContext";

function NavBar() {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");
  const [isActiveHamburger, setisActiveHamburger] = useState(false);

  const { currentUser } = useAuth();
  //generate handle function
  const handleHamburger = () => {
    setisActiveHamburger(!isActiveHamburger);
    console.log(isActiveHamburger);
  };
  const handleClick = () => {
    logout();
  };
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <div
        className={`hamburger ${isActiveHamburger ? "active" : ""}`}
        onClick={handleHamburger}
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      <div className={`nav-wrapper ${isActiveHamburger ? "active" : ""}`}>
        <div className="userdata">
          <div className="img-wrapp">
            {/* el taswira bech tji source mel bara  */}

            <img src={unknown} alt="" />
          </div>
          <div className="name-wrapp">
            <span className="name primaryText">
              {/* name et Family name java elements */}
              {/* <span>iyed </span> <span>grassi </span> */}
              <span>
                {currentUser.firstName} {currentUser.lastName}
              </span>
            </span>
            <span className="secondaryText desc">{currentUser.email} </span>
          </div>
        </div>

        <div className=" menu-wrapper">
          <div className="flexStart  nav-option">
            <span className="material-symbols-outlined">home</span>
            <button className={activePage === "/home" ? "activeBtn" : ""}>
              <Link to="/home">
                <div className="link_inside">
                  Acceuil
                  <div className="arrow">
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </div>
              </Link>
            </button>
          </div>
          <div className="flexStart  nav-option">
            <span className="material-symbols-outlined">show_chart</span>
            <button className={activePage === "/Stat" ? "activeBtn" : ""}>
              <Link to="/Stat">
                <div className="link_inside">
                  Statistique
                  <div className="arrow">
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </div>
              </Link>
            </button>
          </div>

          <div className="flexStart  nav-option">
            <span className="material-symbols-outlined">person</span>
            <button
              className={`btnFlex ${
                activePage === "/Profile" ? "activeBtn" : ""
              }`}
            >
              <Link to="/Profile">
                <div className="link_inside">
                  Profile
                  <div className="arrow">
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </div>
              </Link>
            </button>
          </div>
        </div>

        <hr className="hr2" />
        <div className=" flexStart nav-option2 ">
          <GoSignOut />
          <button onClick={handleClick}>
            <Link to="/Login">Deconnecter</Link>
          </button>
        </div>
        <hr className="hr1" />
      </div>
    </>
  );
}

export default NavBar;
