require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 4000;
const cors = require('cors');
const path = require('path');

const userRoutes = require('./backend/users/user.routes');
const tagsRoutes = require('./backend/tags/tags.routes');
const projectRoutes = require('./backend/projects/project.routes');

const connectDB = require('./config/database');

const corsOptions = {
    origin: 'http://localhost:4000/',
};
connectDB();
app.use(cors(corsOptions));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, './frontend')));

// Routes
app.use('/users', userRoutes);

app.use('/tags', tagsRoutes);

app.use('/projects', projectRoutes);


app.listen(port, () => console.log(`Server is running on port ${port}`));
