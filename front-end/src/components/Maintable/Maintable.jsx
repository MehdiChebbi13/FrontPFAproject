import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Maintable.css";
import AddTaks from "../AddTask/AddTasks";
import Swal from "sweetalert2";

function Maintable(props) {
  const {
    rapport_nom,
    rapport_id,
    setRapportId,
    setRapportNom,
    back_button,
    state,
    setAddTask,
    updatedTask,
    setTaskToEdit,
    setEditTask,
    setTask,
    setTaskCard,
  } = props;

  const [Tasks, setTasks] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);
  const [deleteTask, setDeleteTask] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/home/gettask?rapportId=${rapport_id}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [updatedTask, deleteTask]);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setEditTask(true);
  };

  const handleTaskCard = (task) => {
    setTask(task);
    setTaskCard(true);
  };

  const handleDeleteTask = async (task) => {
    const result = await Swal.fire({
      title: "Etes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",     
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:3001/home/deletetask/${task._id}?rapportId=${rapport_id}`
        );
        setDeleteTask(!deleteTask);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <>
      <div className="wrapperTable">
        <div className="rapport-desc">{rapport_nom}</div>

        <div className="table-head">
          <div className="left">Taches</div>
          <div className="search">
            <input
              type="search"
              className="search-input"
              placeholder="Rechercher..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="30"
              fill="#838383"
              className="dots"
              viewBox="6 0 6 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </div>
        </div>

        <div className="table">
          <table className="tableaux-rapport">
            <thead>
              <tr className="elhead">
                <th>Projet</th>
                <th>Nom</th>
                <th>Date de publication</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {Tasks.filter((task) => task.active).map((task, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="task-row"
                >
                  <td onClick={() => handleTaskCard(task)}>{task.project}</td>
                  <td onClick={() => handleTaskCard(task)}>{task.name}</td>
                  <td onClick={() => handleTaskCard(task)}>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="btn-edit">
                      <div
                        className="button-container"
                        onClick={() => handleTaskCard(task)}
                      >
                        <button
                          style={{
                            backgroundColor:
                              task.status === "En cours"
                                ? "#d8b339"
                                : task.status === "Validé"
                                ? "#00a36d"
                                : task.status === "refusé"
                                ? "#db3434"
                                : "transparent",
                          }}
                        >
                          {task.status}
                        </button>
                      </div>
                      {hoveredRow === index && (
                        <div
                          className="edit-icon"
                          onClick={() =>
                            setOpenOptions(openOptions === index ? null : index)
                          }
                          onMouseLeave={() => setOpenOptions(null)}
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                          {openOptions === index && (
                            <div className="options-list">
                              <button>Show</button>
                              <hr />
                              <button onClick={() => handleEditTask(task)}>
                                Modify
                              </button>
                              <hr />
                              <button onClick={() => handleDeleteTask(task)}>
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer-table">
          <button
            type="button"
            className="button"
            onClick={() => setAddTask(true)}
          >
            <span className="button__text">Ajouter tache</span>
            <span className="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                className="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div
        className="back-button"
        onClick={() => {
          back_button(!state);
          setRapportId("");
          setRapportNom("");
        }}
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
    </>
  );
}

export default Maintable;

