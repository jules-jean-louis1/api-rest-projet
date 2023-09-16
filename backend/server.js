require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.APP_PORT || 5000;

const userRoutes = require('./users/user.routes');

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

app.use('/users', userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));