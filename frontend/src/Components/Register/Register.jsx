import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

const Register = ({ onUserAdded }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newUser.termsAccepted) {
      toast.error("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/users", {
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        password: newUser.password,
      });
      toast.success("User created successfully");
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        termsAccepted: false,
      });
      if (onUserAdded) {
        onUserAdded(response.data);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error creating user. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="text-center mb-4">
          <h2 className="text-purple">S'inscrire</h2>
          <p>Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={newUser.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={newUser.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address / Username"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group position-relative">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="termsAccepted"
              checked={newUser.termsAccepted}
              onChange={handleInputChange}
              required
            />
            <label className="form-check-label">
              Agree with <a href="/terms">Terms & Conditions.</a>
            </label>
          </div>
          <button type="submit" className="btn-submit">
            Sign Up
          </button>
        </form>
        <div className="login-footer">
          <p>
            Already have an account? <a href="/">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
