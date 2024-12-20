# IpssiProjetSoloMERN

Ce projet est une application MERN (MongoDB, Express, React, Node.js) développée dans le cadre d'un projet individuel à
l'IPSSI. L'application permet de gérer des annonces (création, édition, suppression, consultation) avec un système
d'authentification utilisateur.  
*Note : Le projet est en cours d'implémentation de la sécurité des routes (authentification, autorisation, etc.).*

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Architecture du Projet](#architecture-du-projet)
- [Technologies Utilisées](#technologies-utilisées)
- [Authentification et Sécurité](#authentification-et-sécurité)

## Fonctionnalités

- **Authentification utilisateur** : Inscription, connexion et déconnexion.
- **Gestion des annonces** :
    - Création d’annonces avec titre, description, prix et catégorie.
    - Modification et suppression d’annonces (uniquement pour l’utilisateur connecté).
    - Affichage et filtrage des annonces par catégorie.
- **Interface utilisateur** :
    - Utilisation de React et Bootstrap pour une interface moderne et responsive.
    - Modals pour l’ajout, la modification et la visualisation des annonces.

## Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/EddyTerosier/IpssiProjetSoloMERN.git
    ```

2. **Installer les dépendances** :  
   Dans le dossier racine du projet :
   ```bash
   cd backend
   npm install
   ```
   Puis dans le dossier frontend :
   ```bash
    cd frontend
    npm install
    ```
3. **Configuration** :
   Dans votre dossier backend, créez un fichier .env et ajoutez les variables d'environnement suivantes :
    ```bash
    JWT_SECRET=[remplacer ici avec votre secret_key ]
    JWT_EXPIRES_IN=[remplacer ici pour determiner la durée de vie du token]
    ``` 

## Démarrage

1. **Démarrer le serveur** :  
   Dans le dossier backend du projet :
   ```bash
    npm run dev
    ```

2. **Démarrer le client** :
   Dans le dossier frontend du projet :
    ```bash
     npm run dev
     ```

3. **Accéder à l'application** :
   Le frontend sera disponible sur http://localhost:5173.

## Architecture du Projet

Backend :

- Models/ : Contient les schémas Mongoose pour les utilisateurs et les annonces.
- Controllers/ : Contient la logique métier pour la gestion des annonces et des utilisateurs.
- Routes/ : Définition des routes API (utilisateurs, annonces).
- Middlewares/ : Contient les middlewares pour l'authentification (JWT).
- server.js : Point d'entrée principal du serveur Express.

Frontend :

- src/ :
    - components/ : Composants React pour l'interface utilisateur.
    - context/ : Contexte React pour la gestion de l'authentification.
    - pages/ : Pages React pour l'application.
    - App.js : Point d'entrée principal de l'application React.

## Packages Utilisés

### Backend

- `express` : Framework web pour Node.js.
- `mongoose` : Outil de modélisation d'objets MongoDB.
- `bcryptjs` : Hachage de mots de passe.
- `jsonwebtoken` : Génération et vérification de tokens.
- `cors` : Activer le partage de ressources entre origines multiples.
- `dotenv` : Charger les variables d'environnement.

### Frontend

- `react` : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- `react-router-dom` : Bibliothèque de routage pour React.
- `axios` : Client HTTP.
- `react-toastify` : Notifications pour React.
- `bootstrap` : Framework frontend pour le design réactif.

## Technologies Utilisées

- **Backend** :
    - Node.js
    - Express
    - MongoDB
    - Mongoose
    - JWT (JSON Web Tokens)
- **Frontend** :
    - React
    - Bootstrap
    - Axios

## Authentification et Sécurité

- JWT : Gestion des sessions utilisateurs avec des tokens JWT. Les tokens sont stockés dans le localStorage.
- Middleware d’authentification : Vérifie les tokens sur les routes protégées.
- Sécurisation des accès :
    - Redirection des utilisateurs non authentifiés vers la page de connexion.
    - Règles d’autorisation en cours d’implémentation pour les fonctionnalités administratives.


