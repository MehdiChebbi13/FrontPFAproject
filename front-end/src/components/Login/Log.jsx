// import React, { useState, useEffect } from "react";
// import "./Log.css";
// import { Link } from "react-router-dom";
// import { useLogIn } from "../../hooks/useLogIn";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";
function Log() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { handleLogIn, error, isLoading } = useLogIn();
  const { user } = useAuthContext();
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogIn(email, password);
  };
  return (
    <div className="wrapper_log">
      <h2>Se Connecter</h2>
      <form action="#" className="f-login" onSubmit={handleSubmit}>
        <div className="input-box-login">
          <input
            type="email"
            placeholder="Entrer votre email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-box-login">
          <input
            type="password"
            placeholder="Entrer Votre mot de passe"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="input-box-login button">
          <button disabled={isLoading}>Login</button>
        </div>
        <div className="text">
          <h3>
            Vouns n'avez pas de compte ? <Link to="/SignUp">Sing Up</Link>
          </h3>
        </div>
      </form>
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}
export default Log;
