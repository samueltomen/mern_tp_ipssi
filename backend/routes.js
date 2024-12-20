const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  Login,
} = require("./Controllers/userController");
const {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  updateAnnonce,
  getAnnonceByUserId,
  deleteAnnonce,
} = require("./Controllers/annonceController");

const authMiddleware = require("./Middlewares/authMiddleware");

router.post("/users", registerUser);
router.get("/users", getUsers);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

router.post("/login", Login);

router.post("/annonces", authMiddleware, createAnnonce);
router.get("/annonces", getAnnonces);
router.get("/annonces/:annonceId", getAnnonceById);
router.put("/annonces/:annonceId", authMiddleware, updateAnnonce);
router.get("/annonces/user/:userId", getAnnonceByUserId);
router.delete("/annonces/:annonceId", authMiddleware, deleteAnnonce);

module.exports = router;
