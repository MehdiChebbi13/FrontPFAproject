import React from "react";
import "./notification.css";

const Notifications = () => {
  return (
    <div className="notifications">
      <div className="left-notif">
        <h5 className="notif">Notifications</h5>
        <div className="mute-notif">
          <label className="mute-notif-label">
            Désactiver toutes les notifications
          </label>
          <div className="mute-notif-input">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <hr className="hr" />
        <div className="notifs">
          <label className="notifs-label">
            Activer les notifications pour :
          </label>
          <div className="options">
            <div className="comment-option">
              <label className="comment-option-label">Commentaire</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="statut-option">
              <label className="statut-option-label">Statut</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
