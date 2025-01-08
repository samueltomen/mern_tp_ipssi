const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

// Création de l'application Express
const app = express();
app.use(express.json());
app.use(cors());

// Port d'écoute
const PORT = process.env.PORT || 8080;

// URI MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/merntpsolo";

// Connexion à MongoDB avec gestion des erreurs
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Ajout des routes
app.use("/", routes);

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});