import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { toast } from "react-toastify";

export default function UsersAnnonce() {
  const { user } = useContext(AuthContext);
  const userId = user.id;
  const [annonces, setAnnonces] = useState([]);

  async function getAnnonces(userId) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/annonces/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAnnonces(response.data);
    } catch (error) {
      toast.error("Erreur lors de lors de la recupération des datas");
      console.log(error);
    }
  }

  useEffect(() => {
    getAnnonces(userId);
  }, []);

  return (
    <>
      {/* Liste des produits */}
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h5 className="card-title mb-0">Mes Annonces</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Titre</th>
                    <th>Prix</th>
                    <th>Categories</th>
                    <th>Date de publication</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {annonces.map((annonce) => (
                  <tbody key={annonce}>
                    <tr>
                      <td>
                        <img
                          src={
                            annonce.image
                              ? annonce.image
                              : "../src/assets/bonnet.png"
                          }
                          alt="image par default"
                          className="product-img"
                        />
                      </td>
                      <td>{annonce.title}</td>
                      <td>{annonce.price}</td>
                      <td>
                        <span className="badge bg-success">
                          {annonce.category}
                        </span>
                      </td>
                      <td>
                        Publié le :{" "}
                        {new Date(annonce.createdAt).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </td>
                      <td>{annonce.description}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-outline-dark btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#editProductModal"
                          >
                            <i className="bi bi-pencil-square me-1"></i>
                            Modifier
                          </button>
                          <button className="btn btn-outline-danger btn-sm opacity-75">
                            <i className="bi bi-trash me-1"></i>
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ajout annonce */}
      <div className="modal fade" id="addProductModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter une annonce</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Nom de l'annonce
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productPrice" className="form-label">
                    Prix
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="productPrice"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="productImage"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="productDescription"
                    rows="3"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button>
              <button type="button" className="btn btn-primary">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Modification annonce */}
      <div className="modal fade" id="editProductModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modifier l'annonce</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editProductName" className="form-label">
                    Nom de l&#39;annonce
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editProductName"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editProductPrice" className="form-label">
                    Prix
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="editProductPrice"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editProductImage" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="editProductImage"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="editProductDescription"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="editProductDescription"
                    rows="3"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button>
              <button type="button" className="btn btn-primary">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
