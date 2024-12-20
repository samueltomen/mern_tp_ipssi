import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Annonce.css";

const Annonces = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [annonces, setAnnonces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newAnnonce, setNewAnnonce] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [editingAnnonceId, setEditingAnnonceId] = useState(null); // ID de l'annonce en cours de modification
  const navigate = useNavigate();

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
        const response = await axios.post(
          "http://localhost:8080/annonces",
          newAnnonce,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAnnonces((prevAnnonces) => [...prevAnnonces, response.data]);
        extractCategories([...annonces, response.data]);
        toast.success("Annonce créée avec succès !");
      } catch (error) {
        console.error("Error creating annonce:", error);
        toast.error("Erreur lors de la création de l'annonce.");
      }
    }

    // Réinitialisation du formulaire
    setNewAnnonce({
      title: "",
      description: "",
      price: "",
      category: "",
    });
    setEditingAnnonceId(null); // Réinitialiser le mode édition
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

  const handleViewDetails = (id) => {
    navigate(`/annonces/${id}`);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/annonces?search=${searchQuery}`,
      );
      setAnnonces(response.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  const filteredAnnonces = selectedCategory
    ? annonces.filter((annonce) => annonce.category === selectedCategory)
    : annonces;

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center mb-4">Liste des produits</h1>
      {/* Barre de recherche */}
      <div className="search-bar-container mb-4">
        <form onSubmit={handleSearchSubmit} className="d-flex">
          <input
            type="text"
            className="form-control me-2 search-custom"
            placeholder="Rechercher une annonce..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="btn btn-primary">
            Rechercher
          </button>
        </form>
      </div>
      <div className="mb-4 d-flex justify-content-between">
        <select
          className="form-select w-50"
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
        {isAuthenticated && (
          <button
            className="btn btn-success"
            onClick={() => {
              setNewAnnonce({
                title: "",
                description: "",
                price: "",
                category: "",
              });
              setEditingAnnonceId(null);
              openModal("createAnnonceModal");
            }}
          >
            <i className={"bi bi-plus-lg me-2"}></i>
            Ajouter une annonce
          </button>
        )}
      </div>
      <div className="annonces-grid">
        {filteredAnnonces.map((annonce) => (
          <div className="annonce-card" key={annonce._id}>
            <div className="card-image">
              <img
                src={annonce.image || "../src/assets/bonnet.png"}
                alt={annonce.title}
                style={{ width: "100%", objectFit: "cover" }}
              />
              <span className="card-category">{annonce.category}</span>
            </div>
            <div className="card-content">
              <h5 className="card-title">{annonce.title}</h5>
              <p className="card-description">
                {annonce.description.slice(0, 100)}...
              </p>
              <p className="card-date">
                {new Date(annonce.createdAt).toLocaleDateString()}
              </p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(annonce._id)}
                >
                  Voir plus
                </button>
                {isAuthenticated && user?.id === annonce.author?._id && (
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
        ))}
      </div>

      {/* Modal Créer / Modifier */}
      <div
        className="modal fade"
        id="createAnnonceModal"
        tabIndex="-1"
        aria-labelledby="createAnnonceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-custom">
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
                    className="form-control input-custom"
                    name="title"
                    value={newAnnonce.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control input-custom"
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
                    className="form-control input-custom"
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
                    className="form-control input-custom"
                    name="category"
                    value={newAnnonce.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => closeModal("createAnnonceModal")}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingAnnonceId ? "Modifier" : "Créer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annonces;
