import React from "react";
import "./Password.css";

const Password = () => {
  return (
    <div className="password">
      <div className="pass-div">
        <h5 className="pass-title">Mot De Passe</h5>
        <form className="pass-body">
          <span className="current-pass">
            <label className="current-pass-label">Mot de passe actuel</label>
            <span className="current-pass-input">
              <input type="password" />
            </span>
            <a className="forgot-current-pass" href="#">
              Mot de passe oublié?
            </a>
          </span>
          <span className="new-pass">
            <label className="new-pass-label">Nouveau mot de passe</label>
            <span className="new-pass-input">
              <input type="password" />
            </span>
          </span>
          <span className="confirm-new-pass">
            <label className="confirm-new-pass-label">
              confirmer le nouveau mot de passe
            </label>
            <span className="confirm-new-pass-input">
              <input type="password" />
            </span>
          </span>
          <button type="submit" className="save-changes">
            Sauvegarder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
