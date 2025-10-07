#  Technical_Project - Catalogue Produits

> **Application web full-stack** de gestion de catalogue de produits e-commerce développée avec React, Node.js/Express et MongoDB.

##  Objectif du projet

Ce projet a été développé dans le cadre d'un **test technique** pour démontrer les compétences suivantes :

-  Développement d'une API REST avec Node.js/Express
-  Interface utilisateur moderne avec React et Material-UI
-  Gestion d'état avec Redux Toolkit
-  Base de données MongoDB avec opérations CRUD
-  Conteneurisation avec Docker
-  Architecture full-stack complète

##  Fonctionnalités

###  Gestion de catalogue
- **Affichage** : Liste des produits en tableau simple et lisible
- **Ajout** : Création de nouveaux produits avec formulaire de saisie
- **Modification** : Édition des informations d'un produit existant
- **Suppression** : Suppression définitive d'un produit
- **Validation** : Contrôles de saisie et validation des données

###  Interface utilisateur
- Design avec Material-UI
- Formulaires modaux pour les opérations CRUD
- Feedback utilisateur (messages de succès/erreur)

###  Fonctionnalités techniques
- API REST sécurisée avec authentification JWT
- Gestion d'état centralisée avec Redux
- Validation des données côté client et serveur
- Gestion d'erreurs complète

##  Technologies utilisées

### Frontend
- **React** 18.2.0 - Bibliothèque JavaScript pour l'interface utilisateur
- **Material-UI** v5 - Framework UI moderne avec composants prêts
- **Redux Toolkit** - Gestion d'état prévisible pour JavaScript
- **Axios** - Client HTTP pour les appels API
- **React Hooks** - Gestion d'état locale dans les composants

### Backend
- **Node.js** 22.19.0 - Environnement d'exécution JavaScript côté serveur
- **Express.js** - Framework web minimaliste et flexible
- **MongoDB** 3.2.7 - Base de données NoSQL orientée documents
- **JWT** - Authentification par tokens JSON Web
- 
### Prérequis
- ** Docker 4.47.0
  
### DevOps & Outils
- **Docker** & **Docker Compose** - Conteneurisation et orchestration / utilisation de awesome-compose react-express-mongodb: (https://github.com/docker/awesome-compose/tree/master/react-express-mongodb)
- **ESLint** - Linting et qualité de code JavaScript
- **Git** - Contrôle de version distribué

### Flux de données
1. **Frontend** : Interface utilisateur React avec Material-UI
2. **State Management** : Redux store pour l'état global de l'application
3. **API Communication** : Axios pour les requêtes HTTP vers le backend
4. **Backend** : API Express.js avec middleware d'authentification
5. **Database** : MongoDB pour le stockage persistant des données



###  Lancement avec Docker

```bash
# Cloner le projet
git clone https://github.com/BencherifAyman/Technical_Project.git
cd Technical_Project/Project

# Lancer tous les services
docker compose up -d

# Vérifier que les conteneurs sont actifs
docker compose ps

# Lancer l'application sur le navigateur avec localhost
localhost:3000
```



### Commandes Docker utiles
```bash
# Démarrer tous les services
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter tous les services
docker compose down

# Rebuild et redémarrer
docker compose up --build

---

```
### Améliorations possible
- Sauvegarder le token dans la base de données
- Utiliser un .env pour les variables sensibles
- Amélioration du design
