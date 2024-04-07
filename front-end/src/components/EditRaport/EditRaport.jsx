import React, { useState } from 'react'

const EditReport = ({ editReport, setEditReport,rapport}) => {
    const[newRapport,setNewRapport]=useState({
      nom:rapport.nom,
      description:rapport.description,
      createdAt:Date.now(),
    })
    
    console.log(newRapport);
    const handleUpdate = (e) => {
        e.preventDefault()  
        console.log(newRapport);
        fetch(`http://localhost:5001/api/reports/${rapport._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRapport),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data)
          })
          .catch((error) => {
            console.error('Error:', error)
          })      
          window.location.reload();
          
    }
  return (
    <div className="add-task-container">
      <form className="form" onSubmit={handleUpdate} >
        <div className="heading">
          <p className="title">Modifier un rapport </p>
          <button className="Btnn" onClick={() => setEditReport(false)}>
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
            defaultValue={rapport.nom}
            onChange={(e) => setNewRapport({ ...newRapport, nom: e.target.value })}
            />
        </label>
        <div className="header-tache">
          <label htmlFor="firstname" className="label-tache">
            <span>Description</span>
            <input required type="text" className="input" id="firstname" 
            onChange={(e) => setNewRapport({ ...newRapport, description: e.target.value })}
            defaultValue={rapport.description} />
          </label>
          {/* <label htmlFor="project" className="label-projet">
            <span>Nom du projet</span>
            <select name="project" id="" className="project-selection">
              <option value="projet1">projet1</option>
              <option value="projet2">projet2</option>
              <option value="projet3">projet3</option>
              <option value="projet4">projet4</option>
              <option value="projet5">projet5</option>
            </select>
          </label> */}
        </div>

        <button className="submit"  >Modifier</button>
      </form>
    </div>
  )
}

export default EditReport