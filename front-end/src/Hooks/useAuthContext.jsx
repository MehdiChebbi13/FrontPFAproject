import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if currentUser is already stored in localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to update user state
  const loginUser = (userData) => {
    // Update currentUser state
    setCurrentUser(userData);
    // Store currentUser in localStorage
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  // Function to logout user
  const logoutUser = () => {
    // Remove currentUser from state and localStorage
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
