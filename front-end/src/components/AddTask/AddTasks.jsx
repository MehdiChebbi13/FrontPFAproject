import React, { useState } from "react";
import "./AddTask.css";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";

const AddTasks = ({
  setAddTask,
  getrapportId,
  setUpdatedTask,
  updatedTask,
}) => {
  const { currentUser } = useAuth();
  const [project, setProject] = useState([]);
  const date = new Date();

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    project: "", //default value for the select option
    rapportId: getrapportId,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!currentUser) return;

        const response = await axios.get(
          `http://localhost:3001/home/getproject?userId=${currentUser}`
        );
        setProject(response.data);
        // Set default project name if project list is not empty
        if (response.data.length > 0) {
          setNewTask({ ...newTask, project: response.data[0].name });
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [currentUser]);

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/home/createtask", newTask);

      setUpdatedTask(!updatedTask); // Trigger update after adding task
      setAddTask(false); // Close the AddTask modal
      Swal.fire({
        position: "center",
        icon: "success",
        title: "tache ajoutée avec succès",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Failed to submit task:", error);
      // Handle error here, if needed
    }
  };

  return (
    <div className="add-task-container">
      <form className="form" onSubmit={handleAddTask}>
        <div className="heading">
          <p className="title">Ajouter une tâche</p>
          <button className="Btnn" onClick={() => setAddTask(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <label htmlFor="reportName" className="label">
          <span>Nom du rapport</span>
          <input
            required
            type="text"
            className="input"
            id="reportName"
            defaultValue={"Rapport 1"}
            readOnly
          />
        </label>
        <div className="header-tache">
          <label htmlFor="firstname" className="label-tache">
            <span>Nom tache</span>
            <input
              required
              type="text"
              className="input"
              id="firstname"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
          </label>
          <label htmlFor="project" className="label-projet">
            <span>Nom du projet</span>
            <select
              name="project"
              className="project-selection"
              value={newTask.project}
              onChange={(e) =>
                setNewTask({ ...newTask, project: e.target.value })
              }
            >
              {project.map((project1) => (
                <option key={project1._id} value={project1.name}>
                  {project1.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="label-screenshot">
          <span>Ajouter un(des) fichier(s):</span>
          <input
            type="file"
            accept="image/*"
            className="input-file"
            id="screenshot"
          />
          <label htmlFor="screenshot" className="file-label">
            <FaUpload /> Importer
          </label>
        </div>
        <label htmlFor="description" className="label">
          <span>Description</span>
          <textarea
            name=""
            cols="30"
            rows="5"
            className="input"
            id="description"
            placeholder="Ajouter une description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          ></textarea>
        </label>

        <label htmlFor="dueDate" className="label">
          <span>Date</span>
          <input
            required
            type="text"
            className="input"
            id="date"
            defaultValue={date.toLocaleDateString()}
            readOnly
          />
        </label>
        <button className="submit" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddTasks;
