



#  bibliothèque-app

##  Application de gestion de bibliothèque (Node.js + Express + PostgreSQL + EJS)

Application web CRUD permettant de gérer une bibliothèque :
- Gestion des livres
- Gestion des auteurs
- Ajout / modification / suppression
- Interface dynamique avec EJS

---

##  Stack technique

- Runtime : Node.js (ESModules)
- Framework : Express.js
- Base de données : PostgreSQL (pg pool)
- Template engine : EJS
- Frontend : HTML / CSS / Bootstrap (optionnel)
- Architecture : MVC

---

## 📁 Structure du projet
```
bibliotheque-app/
├── config/
│   └── db.js
├── controllers/
│   ├── livreController.js
│   └── auteurController.js
├── models/
│   ├── livreModel.js
│   └── auteurModel.js
├── routes/
│   ├── livreRoutes.js
│   └── auteurRoutes.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── navigation.ejs
│   │   └── footer.ejs
│   └── pages/
│       ├── home.ejs
│       ├── livres/
│       │   ├── liste.ejs
│       │   ├── ajouter.ejs
│       │   ├── modifier.ejs
│       │   └── details.ejs
│       └── auteurs/
│           ├── liste.ejs
│           └── ajouter.ejs
├── public/
│   ├── css/
│   └── js/
├── app.js
├── .env
└── package.json
```
---
## Demonstration video 
https://github.com/user-attachments/assets/f0405494-f347-4420-babb-e0bd156a4a52

---
## ⚙️ Prérequis

- Node.js ≥ 18
- npm ≥ 9
- PostgreSQL ≥ 14

---

## 📥 Installation

git clone https://github.com/salmaly-ui/Tp4NodeJs.git


npm install  

---

## 🔧 Configuration (.env)

DB_USER=postgres  
DB_PASSWORD=motdepasse  
DB_HOST=localhost  
DB_PORT=5432  
DB_DATABASE=bibliotheque_db  
PORT=3000  

---

##  Base de données

CREATE TABLE auteurs (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL
);

CREATE TABLE livres (
  id SERIAL PRIMARY KEY,
  titre VARCHAR(200) NOT NULL,
  auteur_id INT REFERENCES auteurs(id) ON DELETE CASCADE,
  annee_publication INT,
  genre VARCHAR(50),
  isbn VARCHAR(20) UNIQUE,
  resume TEXT,
  disponible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

##  Lancement du projet

npx nodemon app.js  

ou  

node app.js  

---

## 🌐 Accès

http://localhost:3000  

---

## 🌐 Routes

### Livres
GET     /livres  
GET     /livres/ajouter  
POST    /livres/ajouter  
GET     /livres/:id  
GET     /livres/:id/modifier  
POST    /livres/:id/modifier  
POST    /livres/:id/delete  

### Auteurs
GET     /auteurs  
GET     /auteurs/ajouter  
POST    /auteurs/ajouter  

---

## 🔄 Fonctionnalités

✔ CRUD Livres  
✔ CRUD Auteurs  
✔ Relations SQL (auteur_id)  
✔ Interface EJS  

---

##  Sécurité

✔ Requêtes paramétrées  
✔ ISBN UNIQUE  
✔ Gestion erreurs serveur  

---

##  Améliorations possibles

- Authentification admin
- Pagination
- Recherche livres
- Dashboard statistiques
- Upload images couverture
- API REST

---

##  Auteur

Projet réalisé dans le cadre d’un TP Node.js / Express / PostgreSQLc
