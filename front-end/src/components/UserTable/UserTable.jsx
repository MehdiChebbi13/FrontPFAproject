import "./UserTable.css";
import { useState } from "react";

const UserTable = ({
  rapport_nom,
  users,
  handleUserCard,
  handleEditUser,
  handleDeleteUser,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);
  const [addUser, setAddUser] = useState(false);

  return (
    <div className="wrapperTable">
      <div className="rapport-desc">{rapport_nom}</div>

      <div className="table-head">
        <div className="left">Utilisateurs</div>
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
              <th>Nom</th>
              <th>Email</th>
              <th>Date de création</th>
              <th>Rôle</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                className="user-row"
              >
                <td onClick={() => handleUserCard(user)}>{user.name}</td>
                <td onClick={() => handleUserCard(user)}>{user.email}</td>
                <td onClick={() => handleUserCard(user)}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <div className="btn-edit">
                    <div
                      className="button-container"
                      onClick={() => handleUserCard(user)}
                    >
                      <button
                        style={{
                          backgroundColor:
                            user.role === "Admin"
                              ? "#d8b339"
                              : user.role === "User"
                              ? "#00a36d"
                              : "transparent",
                        }}
                      >
                        {user.role}
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
                        <span className="material-symbols-outlined">edit</span>
                        {openOptions === index && (
                          <div className="options-list">
                            <button>Show</button>
                            <hr />
                            <button onClick={() => handleEditUser(user)}>
                              Modifier
                            </button>
                            <hr />
                            <button onClick={() => handleDeleteUser(user)}>
                              Supprimer
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
          onClick={() => setAddUser(true)}
        >
          <span className="button__text">Ajouter utilisateur</span>
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
  );
};

export default UserTable;
