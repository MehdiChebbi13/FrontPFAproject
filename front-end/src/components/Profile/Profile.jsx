import React, { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Account from "./Account/Account";
import Password from "./Password/Password";
import Notifications from "./notification/notification";
import "./profile.css";
const Profile = () => {
  const [currentComponent, setCurrentComponent] = useState(<Account />);

  const handleButtonClick = (component) => {
    setCurrentComponent(component);
  };
  return (
    <div className="profile">
      <div className="settings">
        <div className="profile-settings">
          <h5>Paramètres de profil</h5>
        </div>

        <div className="list-settings" role="tablist">
          <div className="settings-account">
            <a onClick={() => handleButtonClick(<Account />)}>Compte</a>
          </div>
          <hr className="br" />
          <div className="settings-password">
            <a onClick={() => handleButtonClick(<Password />)}>Mot de passe</a>
          </div>

          <hr className="br" />
          <div className="settings-web-notifications">
            <Link
              to=""
              aria-selected="false"
              onClick={() => handleButtonClick(<Notifications />)}
            >
              Notifications
            </Link>
          </div>
          <hr className="br" />
          <div className="settings-delete-account">
            <Link to="" aria-selected="false">
              Delete Account
            </Link>
          </div>
          <hr className="br" />
        </div>
      </div>
      <div className="scrollable">{currentComponent}</div>
    </div>
  );
};

export default Profile;
