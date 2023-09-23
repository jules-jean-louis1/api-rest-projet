const {
    createProjects,
    getProjects,
    getProjectsById,
} = require("./project.service");

module.exports = {
    createProjects: (req, res) => {
        const { name, description, github, website, images, tags } = req.body;
        console.log(req.body);
        // Vérifiez ici que les champs obligatoires sont présents
        if (!name || !description || !github || !website || !images) {
            return res.status(404).json({
                success: 0,
                message: "Tous les champs obligatoires doivent être remplis."
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
    getProjects: (req, res) => {
        getProjects((err, results) => {
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
                return;
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
}
