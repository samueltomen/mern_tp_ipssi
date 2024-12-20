import "./Admin.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Register from "../Register/Register.jsx";
import { toast } from "react-toastify";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8080/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const updateUser = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/users/${editingUser._id}`,
        editingUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Utilisateur modifié avec succès");
      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? response.data : user,
        ),
      );
      setEditingUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.error("Utilisateur supprimé avec succès");
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className={"d-flex flex-column align-items-center"}>
      <h1 className={"text-center"}>Admin</h1>
      <Register onUserAdded={handleUserAdded} />
      <div>
        <h2 className={"text-center mt-5"}>Utilisateurs</h2>
        <table className={"table"}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className={"d-flex gap-2"}>
                    <button
                      className={"btn btn-warning"}
                      onClick={() => handleEditClick(user)}
                    >
                      Modifier
                    </button>
                    <button
                      className={"btn btn-danger"}
                      onClick={() => deleteUser(user._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier Utilisateur</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={updateUser}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={editingUser.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={editingUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={editingUser.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Enregistrer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
