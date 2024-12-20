import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AnnonceDetails.css";

const AnnonceDetails = () => {
  const { id } = useParams(); // Récupérer l'ID de l'annonce depuis l'URL
  const [annonce, setAnnonce] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnnonceDetails();
  }, []);

  const fetchAnnonceDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/annonces/${id}`);
      setAnnonce(response.data);
    } catch (error) {
      console.error("Error fetching annonce details:", error);
    }
  };

  if (!annonce) {
    return <p>Chargement des détails de l'annonce...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="annonce-details-card">
        <div className="details-header">
          <h1>{annonce.title}</h1>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/annonces")}
          >
            Retour à la liste
          </button>
        </div>
        <div className="details-body">
          <img
            src={annonce.image || "../src/assets/bonnet.png"}
            alt={annonce.title}
            className="details-image"
          />
          <p className="details-description">{annonce.description}</p>
          <p className="details-price">
            <strong>Prix :</strong> {annonce.price} €
          </p>
          <p className="details-category">
            <strong>Catégorie :</strong> {annonce.category}
          </p>
          <p className="details-author">
            <strong>Auteur :</strong> {annonce.author?.email || "Inconnu"}
          </p>
          <p className="details-date">
            <strong>Date :</strong>{" "}
            {new Date(annonce.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnonceDetails;
