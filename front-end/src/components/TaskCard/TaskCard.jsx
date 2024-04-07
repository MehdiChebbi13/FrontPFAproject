import { React, useEffect } from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onClose }) => {
  return (
    <div className="card">
      <div className="header">
        <div>
          <a className="title" href="#" onClick={onClose}>
            {task.nom}
          </a>
          <p className="name"></p>
        </div>
        <span className="image"></span>
      </div>
      <p className="description">{task.description}</p>
      <dl className="post-info">
        <div className="cr">
          <dt className="dt">Published</dt>
          <dd className="dd">{task.datePub}</dd>
        </div>
        <div className="cr">
          <dt className="dt">Reading time</dt>
          <dd className="dd">{task.dateComp}</dd>
        </div>
      </dl>
    </div>
  );
};

export default TaskCard;
