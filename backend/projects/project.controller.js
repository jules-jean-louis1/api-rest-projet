const {
    createProjects,
    getAllProjects,
    getProjectsById,
    getProjects,
    updateProjects
} = require("./project.service");

module.exports = {
    createProjects: (req, res) => {
        const errors = [];
        const name = req.body.name;
        const description = req.body.description;
        const github = req.body.github;
        const website = req.body.website;
        const images = req.file;
        const tags = req.body.tags;
        if (name.length === 0 || description.length === 0 || github.length === 0 || website.length === 0) {
            return res.status(400).json({
                success: 0,
                message: "Tous les champs obligatoires doivent être remplis, y compris l'image."
            });
        }
        if (name.length < 3 || name.length > 50) {
            errors.push({ msg: 'Le nom doit contenir entre 3 et 50 caractères.' });
        }
        if (description.length < 10 || description.length > 1000) {
            errors.push({ msg: 'La description doit contenir entre 10 et 1000 caractères.' });
        }
        if (images.mimetype !== 'image/png' && images.mimetype !== 'image/jpeg' && images.mimetype !== 'image/jpg') {
            errors.push({ msg: 'Le format de l\'image doit être PNG, JPEG ou JPG.' });
        }
        if (errors.length > 0) {
            return res.status(400).json({
                success: 0,
                message: errors
            });
        }
        const projectData = {
            name,
            description,
            github,
            website,
            images,
            tags
        };
        createProjects(projectData, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "Projet créé avec succès."
            });
        });
    },
    getAllProjects: (req, res) => {
        const tags = req.body.tags;
        const name = req.body.name;
        const date = req.body.date;

        getAllProjects(tags, name, date, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getProjectsById: (req, res) => {
        const id = req.params.id;
        getProjectsById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    success: 0,
                    message: "Project not found"
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Project not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getProjects:(req, res) =>{
        getProjects((err, results) =>{
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    },
    updateProjects: (req, res) => {
        const projectId = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const github = req.body.github;
        const website = req.body.website;
        const images = req.file;
        const tags = req.body.tags;
        const projectData = {
            name,
            description,
            github,
            website,
            images,
            tags
        };
        getProjectsById(projectId, (err, project) => {
            if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
            }
            if (!project) {
            return res.status(404).json({
                success: 0,
                message: "Project not found"
            });
            }
            const updatedProject = Object.assign({}, project, projectData);
            updateProject(projectId, updatedProject, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                success: 0,
                message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "Project updated successfully"
            });
            });
        });
        },
};