# MERN_TP_IPSSI

## Description

Ce projet est une application web construite avec la pile technologique **MERN** (MongoDB, Express, React, Node.js) développée dans le cadre d'un TP à l'IPSSI. L'application permet de gérer des annonces avec des fonctionnalités d'authentification utilisateur.

---

## Fonctionnalités de l'application

### **Authentification**
- Inscription et connexion des utilisateurs avec gestion des tokens JWT.
- Protection des routes privées nécessitant une authentification.

### **Gestion des annonces**
- **CRUD des annonces** :
    - Création, lecture, mise à jour et suppression des annonces (limitées à l'auteur de l'annonce).
    - Affichage de toutes les annonces publiques.
- **Recherche et filtres** :
    - Recherche d'annonces par mot-clé.
    - Filtrage des annonces par catégorie.
- Affichage détaillé d'une annonce incluant le titre, la description, le prix, la catégorie et l'auteur.

### **Interface utilisateur**
- Frontend moderne et responsive conçu avec **React.js**.
- Utilisation de cartes pour afficher les annonces.
- Modals pour créer et modifier des annonces.

---

## Prérequis

- **Node.js** (version 14 ou plus).
- **npm** ou **yarn** pour la gestion des dépendances.
- **MongoDB** : Une instance de MongoDB locale ou distante.

---

## Installation et lancement du projet

### **1. Cloner le dépôt**
```bash
https://github.com/samueltomen/mern_tp_ipssi.git
cd mern_tp_ipssi
```

### **2. Configuration du Backend**
1. Accédez au dossier `backend` :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Créez un fichier `.env` pour la configuration des variables d'environnement :
   ```
   JWT_EXPIRES_IN=your_expiration_date
   JWT_SECRET=your_secret_key
   ```
4. Lancez le serveur backend :
   ```bash
   npm start
   ```
   Le backend sera disponible à l'adresse : `http://localhost:8080`

### **3. Configuration du Frontend**
1. Accédez au dossier `frontend` :
   ```bash
   cd ../frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Créez un fichier `.env` si nécessaire pour définir l'URL du backend :
   ```
   REACT_APP_API_URL=http://localhost:5173
   ```
4. Lancez le serveur frontend :
   ```bash
   npm start
   ```
   Le frontend sera disponible à l'adresse : `http://localhost:5173`

---

## Structure du projet

```
mern_tp_ipssi/
├── backend/               # Code du serveur Node.js
│   ├── controllers/       # Contrôleurs pour les routes
│   ├── models/            # Schémas Mongoose
│   ├── routes/            # Définition des routes API
│   ├── .env               # Variables d'environnement
│   └── server.js          # Point d'entrée du backend
├── frontend/              # Code React.js
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── pages/         # Pages principales
│   │   ├── App.js         # Point d'entrée de l'application
│   │   └── index.js       # Point d'entrée React
│   └── public/            # Fichiers publics (HTML, images)
└── README.md
```

---

## Scripts utiles

### **Backend**
- `npm start` : Lance le serveur backend en mode production.
- `npm run dev` : Lance le serveur backend avec **nodemon** pour un rechargement automatique.

### **Frontend**
- `npm start` : Lance l'application React en mode développement.
- `npm build` : Compile l'application pour un déploiement en production.

---

## Technologies utilisées

### **Frontend**
- React.js
- CSS pour le style des composants
- React Router pour la gestion des routes

### **Backend**
- Node.js avec Express
- MongoDB avec Mongoose
- JSON Web Tokens (JWT) pour l'authentification

---
