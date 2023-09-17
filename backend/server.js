require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.APP_PORT || 5000;
const path = require('path');

const userRoutes = require('./users/user.routes');
const tagsRoutes = require('./tags/tags.routes');

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servez des fichiers statiques depuis le dossier "frontend"
app.use(express.static((__dirname, 'frontend')));

// Les routes définies dans frontend/index.html seront gérées automatiquement par express.static

app.use('/users', userRoutes);
app.use('/tags', tagsRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
