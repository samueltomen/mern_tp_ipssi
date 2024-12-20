import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext.jsx";
import "./Navbar.css";
import {useContext} from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    toast.error("Déconnexion réussie !");
    logout();
    navigate("/");
  };

  return (
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/annonces">
            MERN
          </Link>

          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {isAuthenticated && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/annonces">
                      <i className="bi bi-house-door me-1"></i>
                      Accueil
                    </Link>
                  </li>
              )}

              {isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">
                        <i className="bi bi-gear me-1"></i>
                        Admin
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                          className="nav-link btn-logout"
                          onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-1"></i>
                        Déconnexion
                      </button>
                    </li>
                    <li className="nav-item ms-2">
                      <div className="avatar-circle">
                        <span>U</span>
                      </div>
                    </li>
                  </>
              ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        <i className="bi bi-box-arrow-in-right me-1"></i>
                        Connexion
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link btn btn-primary signup-btn" to="/register">
                        <i className="bi bi-person-plus me-1"></i>
                        Inscription
                      </Link>
                    </li>
                  </>
              )}
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;