import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Stat from "./pages/Stat";
import Profile_Page from "./pages/Profile_Page";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Hooks/useAuthContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* AuthProvider wraps the entire application */}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route
        path="/home"
        element={currentUser ? <Home /> : <Navigate to="/auth/login" />}
      />
      <Route path="/Stat" element={<Stat />} />
      <Route path="/Profile" element={<Profile_Page />} />
      <Route
        path="/auth/login"
        // element={!currentUser ? <Login /> : <Navigate to="/home" />}
        element={<Login />}
      />
      <Route
        path="/auth/register"
        // element={!currentUser ? <SignUp /> : <Navigate to="/home" />}
        element={<SignUp />}
      />
    </Routes>
  );
}

export default App;
