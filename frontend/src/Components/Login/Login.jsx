import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      toast.success(`Connexion réussie ${response.data.name} !`);
      login(response.data.token); // Call the login function from AuthContext
      navigate("/annonces");
    } catch (error) {
      alert("Login failed: " + error.response.data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Berry</h1>
          <h2>Hi, Welcome Back</h2>
          <p>Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address / Username</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Sign In
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
