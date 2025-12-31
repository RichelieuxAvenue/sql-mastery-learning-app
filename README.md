# 🎓 SQL Mastery - Plateforme Interactive d'Apprentissage SQL

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

**SQL Mastery** est un environnement de développement (IDE) interactif conçu pour apprendre et maîtriser le langage SQL (DML). L'application propose un cursus progressif de plus de 60 exercices, allant des simples requêtes `SELECT` aux divisions relationnelles complexes.

> 🎓 **Projet Portfolio - Développeur Junior** : Ce projet démontre la capacité à construire une application Frontend moderne, robuste et pédagogique, intégrant des pratiques d'ingénierie logicielle avancées (Typage strict, Dockerisation, CI/CD).

## ✨ Fonctionnalités Clés

*   **🖥️ IDE SQL Embarqué** : Un éditeur de code complet (basé sur Monaco Editor, le moteur de VS Code) avec coloration syntaxique SQL.
*   **⚡ Exécution Client-Side** : Moteur SQL 100% navigateur (via AlaSQL), garantissant une rapidité extrême et une confidentialité totale des données (rien ne part sur un serveur).
*   **📚 Pédagogie Active** : Chaque exercice est accompagné d'une théorie contextuelle générée dynamiquement, expliquant les concepts clés (Jointures, Agrégats, Logique Booléenne) avec des analogies simples.
*   **🎨 UI/UX Moderne** : Interface soignée utilisant Tailwind CSS, supportant le Dark Mode et offrant une visualisation claire des schémas de base de données.
*   **🚀 DevOps Ready** : Configuration Docker optimisée pour la production et déploiement continu automatisé via GitHub Actions.

## 🛠️ Stack Technique

Ce projet a été développé en utilisant les standards modernes de l'industrie :

*   **Frontend** : React 18, TypeScript, Vite.
*   **Styling** : Tailwind CSS, clsx, lucide-react (icônes).
*   **Logic** : AlaSQL (Moteur SQL in-memory), Monaco Editor (Éditeur de code).
*   **DevOps** : Docker (Multi-stage build), GitHub Actions (CI/CD vers GitHub Pages).

## 🐳 Installation & Démarrage

### Via Docker (Recommandé)
L'application peut être lancée instantanément sans installer Node.js :

**1. Construire l'image**
```bash
docker build -t sql-mastery .
```

**2. Lancer le conteneur sur le port 8080**
```bash
docker run -p 8080:80 sql-mastery
```
Ouvrez ensuite `http://localhost:8080` dans votre navigateur.

### En mode Développement

**Installation des dépendances**
```bash
npm install
```

**Lancer le serveur de développement**
```bash
npm run dev
```

## 📝 Structure du Projet

```text
src/
├── components/    # Composants React réutilisables (Navbar, Editor, Console...)
├── data/          # Définition du Curriculum et Seed de la base de données
├── lib/           # Logique métier (Moteur SQL, Utilitaires)
└── App.tsx        # Point d'entrée principal
```

---
*Développé avec ❤️ par Rashid Kadisha alias RichelieuxAvenue - 2024*
