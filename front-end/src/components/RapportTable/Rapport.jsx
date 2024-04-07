// Import necessary dependencies
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuthContext";
import Maintable from "../Maintable/Maintable";
import "./Rapport.css";
import Swal from "sweetalert2";

// Define the Rapport component
function Rapport({
  addTask,
  setAddTask,
  editReport,
  setEditReport,
  setRapport,
  getRapportId,
  updatedTask,
  setTaskToEdit,
  setEditTask,
  setTask,
  setTaskCard,
}) {
  // Retrieve currentUser from AuthContext
  const { currentUser } = useAuth();
  console.log(currentUser);
  // State variables initialization
  const [clickedTask, setClickedTask] = useState(false);
  const [rapportArray, setRapportState] = useState([]);
  const [rapports, setRapports] = useState([]);
  const [rapportId, setRapportId] = useState("");
  const [rapportNom, setRapportNom] = useState(null);
  const [hoverPlus, setHoverPlus] = useState(false);
  const [disabledRows, setDisabledRows] = useState([]);
  const [addReport, setAddReport] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);
  const [action, setAction] = useState(false);
  const [rapport_nom, setNomRapport] = useState(""); // Initialize rapport state for report name
  const [editingRow, setEditingRow] = useState(null); // New state to hold the data of the row being edited

  const date = new Date();

  // Function to handle adding a report
  const handleAddReport = async () => {
    try {
      await axios.post("http://localhost:3001/home", {
        name: rapport_nom,
        userId: currentUser._id, // Pass userId to the server
      });

      // Display success message using SweetAlert
      Swal.fire("Rapport ajouté!", "Le rapport a été ajouté.", "success");

      setAddReport(false); // Close the AddRapport modal
      navigate("/home"); // Navigate to the home page
    } catch (error) {
      setErrorMessage("Failed to submit report."); // Set error message if request fails
    }
  };

  // ! Function to handle selecting a report
  const handleTaskRapport = (rap) => {
    setRapportId(rap._id);
    getRapportId(rap._id);
    setRapportNom(rap.nom);
    setClickedTask(true);
  };

  // ? Function to handle disabling a row
  // Function to handle deleting a report
  const handleDeleteRapport = async (rapportId) => {
    // Use SweetAlert to confirm deletion
    const result = await Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer ce rapport?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "royalblue",
      cancelButtonColor: "gray",
      confirmButtonText: "Confirmer",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/home/deleterapport/${rapportId}?userId=${currentUser._id}`
        );

        // Handle success response from the server
        if (response.status === 200) {
          // Display success message using SweetAlert
          await Swal.fire("Supprimé", response.data.message, "success");
          // Refresh the data from local storage
        }
      } catch (error) {
        // Handle error response from the server
        console.error("Error deleting rapport:", error);
        // Display error message using SweetAlert
        await Swal.fire("Error!", "Failed to delete rapport.", "error");
      }
    }
  };
  //  Function to handle editing a report
  const handleEditRapport = async (rapport) => {
    const { value: updatedRapportName } = await Swal.fire({
      title: "Modifier le nom du rapport",
      input: "text",
      inputValue: rapport.name, // Prefill the input with current rapport name
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Vous devez saisir un nom pour le rapport!";
        }
      },
      confirmButtonColor: "royalblue", // Set the color of the confirm button to royalblue
      cancelButtonColor: "gray", // Set the color of the cancel button to red
      confirmButtonText: "Modifier", // Set the text of the confirm button to "Modifier"
      cancelButtonText: "Annuler", // Set the text of the cancel button to "Annuler"
    });

    if (updatedRapportName) {
      try {
        await axios.patch(`http://localhost:3001/home/modify/${rapport._id}`, {
          name: updatedRapportName,
        });

        Swal.fire(
          "Rapport mis à jour!",
          "Le rapport a été modifié.",
          "success"
        );

        // Refresh the rapport data
        const updatedRapports = rapportArray.map((r) =>
          r._id === rapport._id ? { ...r, name: updatedRapportName } : r
        );
        setRapportState(updatedRapports);
        localStorage.setItem("rapportArray", JSON.stringify(updatedRapports));
      } catch (error) {
        console.error("Error updating rapport:", error);
        Swal.fire(
          "Erreur!",
          "Une erreur est survenue lors de la mise à jour du rapport.",
          "error"
        );
      }
    }
  };
  // Effect to load data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("rapportArray");

    if (storedData) {
      setRapportState(JSON.parse(storedData));
    }
  }, []);

  // Effect to fetch data from the server
  useEffect(() => {
    const userId = currentUser._id;

    if (userId) {
      axios
        .get(`http://localhost:3001/home/getReport?userId=${userId}`)
        .then((response) => {
          const data = response.data;
          // Sort data by createdAt date in descending order
          data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          setRapportState(data);

          // Store data in local storage
          localStorage.setItem("rapportArray", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching rapports:", error);
        });
    }
  }, [addReport]);

  // Return JSX
  return (
    <>
      {!clickedTask ? (
        <div className="rap-wrapperTable">
          <div className="rapport-desc">
            Bienvenue Mr {currentUser.lastName}
          </div>
          <div className="rap-table-head">
            <div className="rap-search">
              <div className="description1">Rapport</div>
              <input
                type="search"
                className="rap-search-input"
                placeholder="Rechercher..."
              ></input>
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

          <div className="rap-table">
            <table className="rap-tableaux-rapport">
              <tbody>
                <tr className="rap-elhead">
                  <th>Nom Rapport</th>

                  <th>Date creation</th>
                  <th>Date modification</th>
                </tr>
                {addReport && (
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="text"
                        placeholder="Nom du rapport"
                        value={rapport_nom}
                        onChange={(e) => setNomRapport(e.target.value)}
                        className="input-nom-rapport"
                      />
                    </td>

                    <td>
                      <div className="rap-action">
                        <button
                          className="rap-button add-button"
                          onClick={handleAddReport} // Call handleAddReport on button click
                        >
                          <span className="material-symbols-outlined">add</span>{" "}
                          Ajouter
                        </button>
                        <button
                          onClick={() => setAddReport(false)}
                          className="rap-button cancel-button"
                        >
                          <span className="material-symbols-outlined">
                            cancel
                          </span>{" "}
                          Annuler
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {rapportArray
                  .filter((rapport) => rapport.active)
                  .map((rapport, index) => (
                    <tr
                      key={index}
                      className={
                        "rap-report-row " +
                        (disabledRows.includes(rapport._id) ? "disabled" : "")
                      }
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td onClick={() => handleTaskRapport(rapport)}>
                        {rapport.name}
                      </td>

                      <td>
                        {new Date(rapport.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="btn-edit">
                          <p>{new Date(rapport.updatedAt).toLocaleString()}</p>
                          {hoveredRow === index && (
                            <div
                              className="edit-icon"
                              onClick={() => {
                                setOpenOptions(
                                  openOptions === index ? null : index
                                );
                                setAction(true);
                              }}
                              onMouseLeave={() => {
                                setOpenOptions(null);
                                setAction(false);
                              }}
                            >
                              <span
                                className="material-symbols-outlined"
                                style={
                                  action
                                    ? { color: "#3e4676", opacity: "1" }
                                    : {}
                                }
                              >
                                edit
                              </span>
                              {openOptions === index && (
                                <div className="options-list">
                                  <button>Show</button>
                                  <hr />
                                  <button
                                    onClick={() => handleEditRapport(rapport)}
                                  >
                                    Modify
                                  </button>
                                  <hr />
                                  <button
                                    onClick={() =>
                                      handleDeleteRapport(rapport._id)
                                    }
                                  >
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
              onClick={() => setAddReport(true)}
            >
              <span className="button__text">Ajouter rapport</span>
              <span className="button__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
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
      ) : (
        <Maintable
          rapport_id={rapportId}
          rapport_nom={rapportNom}
          setRapportId={setRapportId}
          setRapportNom={setRapportNom}
          back_button={setClickedTask}
          state={clickedTask}
          setAddTask={setAddTask}
          updatedTask={updatedTask}
          setTaskToEdit={setTaskToEdit}
          setEditTask={setEditTask}
          setTask={setTask}
          setTaskCard={setTaskCard}
        />
      )}
    </>
  );
}

export default Rapport;
