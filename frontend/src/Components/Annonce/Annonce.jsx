import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";

const Annonces = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [annonces, setAnnonces] = useState([]);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newAnnonce, setNewAnnonce] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [editingAnnonceId, setEditingAnnonceId] = useState(null); // ID de l'annonce en cours de modification

  useEffect(() => {
    getAllAnnonces();
  }, []);

  const getAllAnnonces = async () => {
    try {
      const response = await axios.get("http://localhost:8080/annonces");
      setAnnonces(response.data);
      extractCategories(response.data);
    } catch (error) {
      console.error("Error fetching annonces:", error);
    }
  };

  const extractCategories = (annonces) => {
    const uniqueCategories = [
      ...new Set(annonces.map((annonce) => annonce.category)),
    ];
    setCategories(uniqueCategories);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnonce((prevAnnonce) => ({
      ...prevAnnonce,
      [name]: value,
    }));
  };

  const handleCreateOrUpdateAnnonce = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (editingAnnonceId) {
      // Mode modification
      try {
        const response = await axios.put(
          `http://localhost:8080/annonces/${editingAnnonceId}`,
          newAnnonce,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAnnonces((prevAnnonces) =>
          prevAnnonces.map((annonce) =>
            annonce._id === editingAnnonceId ? response.data : annonce,
          ),
        );
        toast.success("Annonce modifiée avec succès !");
      } catch (error) {
        console.error("Error updating annonce:", error);
        toast.error("Erreur lors de la modification de l'annonce.");
      }
    } else {
      // Mode création
      try {
        console.log("newAnnonce", newAnnonce);
        const response = await axios.post(
          "http://localhost:8080/annonces",
          newAnnonce,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // Au lieu de juste push l'annonce, on va rappeler getAllAnnonces pour re-synchroniser tout
        toast.success("Annonce créée avec succès !");
        await getAllAnnonces();
      } catch (error) {
        console.error("Error creating annonce:", error);
        toast.error("Erreur lors de la création de l'annonce.");
      }
    }

    // Réinitialisation du formulaire et du mode édition
    setNewAnnonce({
      title: "",
      description: "",
      price: "",
      category: "",
    });
    setEditingAnnonceId(null);
    closeModal("createAnnonceModal");
  };

  const handleEditAnnonce = (annonce) => {
    setNewAnnonce({
      title: annonce.title,
      description: annonce.description,
      price: annonce.price,
      category: annonce.category,
    });
    setEditingAnnonceId(annonce._id); // Activer le mode édition
    openModal("createAnnonceModal");
  };

  const handleShowModal = (annonce) => {
    setSelectedAnnonce(annonce);
    openModal("viewAnnonceModal");
  };

  const handleDeleteAnnonce = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/annonces/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnnonces((prevAnnonces) =>
          prevAnnonces.filter((annonce) => annonce._id !== id),
        );
        extractCategories(annonces.filter((annonce) => annonce._id !== id));
        toast.success("Annonce supprimée avec succès !");
      } catch (error) {
        console.error("Error deleting annonce:", error);
        toast.error("Erreur lors de la suppression de l'annonce.");
      }
    }
  };

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.classList.add("show", "d-block");
    document.body.classList.add("modal-open");
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.classList.remove("show", "d-block");
    document.body.classList.remove("modal-open");
  };

  const filteredAnnonces = selectedCategory
    ? annonces.filter((annonce) => annonce.category === selectedCategory)
    : annonces;

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center mb-4">Liste des Annonces</h1>
      <div className="mb-4">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        {/* Bouton Créer une annonce : On réinitialise le mode édition et le formulaire */}
        <button
          className="btn btn-success"
          onClick={() => {
            setEditingAnnonceId(null);
            setNewAnnonce({
              title: "",
              description: "",
              price: "",
              category: "",
            });
            openModal("createAnnonceModal");
          }}
        >
          Créer une annonce
        </button>
      </div>
      <div className="row">
        {filteredAnnonces.map((annonce) => (
          <div className="col-md-4" key={annonce._id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{annonce.title}</h5>
                <p className="card-text">{annonce.description}</p>
                <p className="card-text">
                  <strong>{annonce.price} €</strong>
                </p>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleShowModal(annonce)}
                  >
                    Voir plus
                  </button>
                  {isAuthenticated && (
                    <>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEditAnnonce(annonce)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteAnnonce(annonce._id)}
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Voir plus */}
      <div
        className="modal fade"
        id="viewAnnonceModal"
        tabIndex="-1"
        aria-labelledby="viewAnnonceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewAnnonceModalLabel">
                {selectedAnnonce?.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => closeModal("viewAnnonceModal")}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{selectedAnnonce?.description}</p>
              <p>
                <strong>Prix :</strong> {selectedAnnonce?.price} €
              </p>
              <p>
                <strong>Catégorie :</strong> {selectedAnnonce?.category}
              </p>
              <p>
                <strong>Auteur :</strong> {selectedAnnonce?.author?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Créer / Modifier */}
      <div
        className="modal fade"
        id="createAnnonceModal"
        tabIndex="-1"
        aria-labelledby="createAnnonceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createAnnonceModalLabel">
                {editingAnnonceId
                  ? "Modifier l'annonce"
                  : "Créer une nouvelle annonce"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => closeModal("createAnnonceModal")}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateOrUpdateAnnonce}>
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={newAnnonce.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={newAnnonce.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Prix</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={newAnnonce.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Catégorie</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={newAnnonce.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingAnnonceId ? "Modifier" : "Créer"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annonces;
