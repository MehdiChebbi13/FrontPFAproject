import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import AddTaks from "../components/AddTask/AddTasks";
import EditReport from "../components/EditRaport/EditRaport";
import EditTask from "../components/EditTask/EditTask";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import Rapport from "../components/RapportTable/Rapport";
import TaskCard from "../components/TaskCard/TaskCard";
import { useAuth } from "../Hooks/useAuthContext";
function Home() {
  const [addTask, setAddTask] = useState(false);
  const [editReport, setEditReport] = useState(false);
  const [rapport, setRapport] = useState(null);
  const [getrapportId, setGetRapportId] = useState("");
  const [updatedTask, setUpdatedTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [task, setTask] = useState(null);
  const [taskCard, setTaskCard] = useState(false);
  const { currentUser } = useAuth();
  const [userdata, setUserData] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/profile/${currentUser}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the fetchUserData function
  }, [currentUser]); 

  return (
    <>
      {taskCard ? (
        <TaskCard task={task} onClose={() => setTaskCard(false)} />
      ) : null}
      {addTask ? (
        <AddTaks
          addTask={addTask}
          setAddTask={setAddTask}
          getrapportId={getrapportId}
          setUpdatedTask={setUpdatedTask}
          updatedTask={updatedTask}
        />
      ) : null}
      {editReport ? (
        <EditReport
          editReport={editReport}
          setEditReport={setEditReport}
          rapport={rapport}
        />
      ) : null}
      {editTask ? (
        <EditTask
          task={taskToEdit}
          setEditTask={setEditTask}
          setUpdatedTask={setUpdatedTask}
        />
      ) : null}
      <div className={"All"}>
        <div className="App" />
        <Header />
        <div className="center">
          <div className="the-nav">
            <NavBar userdata={userdata} />
          </div>
          <Rapport
            addTask={addTask}
            setAddTask={setAddTask}
            editReport={editReport}
            setEditReport={setEditReport}
            setRapport={setRapport}
            getRapportId={setGetRapportId}
            updatedTask={updatedTask}
            setEditTask={setEditTask}
            setTaskToEdit={setTaskToEdit}
            setTask={setTask}
            setTaskCard={setTaskCard}
            userdata={userdata}
          />
        </div>
        {addTask && <div className="All-b"></div>}
        {editReport && <div className="All-b"></div>}
        {editTask && <div className="All-b"></div>}
        <div className="ft">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
