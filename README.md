# API de Gestion du Port de Plaisance

API complète pour la gestion d'un port de plaisance, incluant la gestion des catways, des réservations et des utilisateurs.

## 📋 Table des matières

-   [Fonctionnalités](#-fonctionnalités)
-   [Prérequis techniques](#-prérequis-techniques)
-   [Installation](#-installation)
-   [Configuration](#-configuration)
-   [Démarrage](#-démarrage)
-   [Documentation de l'API](#-documentation-de-lapi)
-   [Structure du projet](#-structure-du-projet)
-   [Auteur](#-auteur)

## ✨ Fonctionnalités

-   **Gestion des utilisateurs** : Création, connexion, déconnexion et gestion des profils
-   **Gestion des catways** : Création, lecture, mise à jour et suppression des catways
-   **Gestion des réservations** : Réservation de catways avec gestion des dates
-   **Interface d'administration** : Tableau de bord pour la gestion complète
-   **Sécurité** : Authentification par session et hachage des mots de passe
-   **Validation des données** : Vérification des entrées utilisateur

## 🖥️ Prérequis techniques

-   Node.js (v14 ou supérieur)
-   MongoDB (v6.0 ou supérieur)
-   npm (v6 ou supérieur) ou yarn

## 🚀 Installation

1. Cloner le dépôt :

    ```bash
    git clone https://github.com/LamarreLeo/Devoir-API-Port.git
    cd Devoir-API-Port
    ```

2. Installer les dépendances :
    ```bash
    npm install
    # ou
    yarn install
    ```

## ⚙️ Configuration

1. Créer un fichier `.env` à la racine du projet :

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/port-de-plaisance
    SESSION_SECRET=votre_secret_session
    ```

2. Modifier les variables selon votre configuration.

## 🏃 Démarrage

```bash
npm start
# ou
yarn start
```

## 📚 Documentation de l'API

### Authentification

| Méthode | Endpoint           | Description                |
| ------- | ------------------ | -------------------------- |
| POST    | /api/auth/register | Enregistrement utilisateur |
| POST    | /api/auth/login    | Connexion utilisateur      |
| POST    | /api/auth/logout   | Déconnexion                |

### Utilisateurs

| Méthode | Endpoint          | Description              |
| ------- | ----------------- | ------------------------ |
| GET     | /api/users        | Liste des utilisateurs   |
| GET     | /api/users/:email | Détails d'un utilisateur |
| PUT     | /api/users/:email | Mise à jour utilisateur  |
| DELETE  | /api/users/:email | Suppression utilisateur  |

### Catways

| Méthode | Endpoint         | Description             |
| ------- | ---------------- | ----------------------- |
| GET     | /api/catways     | Liste des catways       |
| POST    | /api/catways     | Création d'un catway    |
| GET     | /api/catways/:id | Détails d'un catway     |
| PUT     | /api/catways/:id | Mise à jour d'un catway |
| DELETE  | /api/catways/:id | Suppression d'un catway |

### Réservations

| Méthode | Endpoint              | Description                   |
| ------- | --------------------- | ----------------------------- |
| GET     | /api/reservations     | Liste des réservations        |
| POST    | /api/reservations     | Création d'une réservation    |
| GET     | /api/reservations/:id | Détails d'une réservation     |
| PUT     | /api/reservations/:id | Mise à jour d'une réservation |
| DELETE  | /api/reservations/:id | Suppression d'une réservation |

## 📁 Structure du projet

```
src/
├── config/              # Fichiers de configuration
├── controllers/         # Contrôleurs de l'API
├── middlewares/         # Middlewares personnalisés
├── models/              # Modèles de données
├── routes/              # Définition des routes
├── services/            # Logique métier
├── validators/          # Validation des données
└── views/               # Vues EJS
```

## 👤 Auteur

**Lamarre Léo**

-   GitHub: [@LamarreLeo](https://github.com/LamarreLeo)
