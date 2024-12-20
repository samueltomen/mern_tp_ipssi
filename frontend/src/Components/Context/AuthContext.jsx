import  { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = statut inconnu
  const [user, setUser] = useState(null); // Informations de l'utilisateur connecté (id, email, etc.)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUser({ id: decodedToken.id, email: decodedToken.email });
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const login = (token) => {
    try {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);
      setUser({ id: decodedToken.id, email: decodedToken.email });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isAuthenticated === null) {
    // Affiche un écran de chargement ou rien tant que le statut d'authentification est inconnu
    return null;
  }

  return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};
