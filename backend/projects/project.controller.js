const {
    createProjects,
    getProjects,
    getProjectsById,
} = require("./project.service");

module.exports = {
    createProject: (req, res) => {
        const body = req.body;
        createProjects(body, (err, results) => {
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
                message: "Project created successfully"
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
