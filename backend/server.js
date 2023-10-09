require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 5000;
const path = require('path');

const userRoutes = require('./users/user.routes');
const tagsRoutes = require('./tags/tags.routes');
const projectRoutes = require('./projects/project.routes');

// Middleware pour gérer les données JSON et les formulaires URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir des fichiers statiques depuis le dossier "frontend"
//app.use(express.static(path.join(__dirname, '/frontend')));
app.use(express.static(path.join(__dirname, '../frontend')));
// Routes pour les utilisateurs
app.use('/users', userRoutes);

// Routes pour les tags
app.use('/tags', tagsRoutes);

// Routes pour les projets
app.use('/projects', projectRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
