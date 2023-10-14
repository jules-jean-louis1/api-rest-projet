const {
    createTags,
    getTags,
    updateTags,
    deleteTags,
    getTagsByProjectsId
} = require("./tags.service.js");

module.exports = {
    createTags: (req, res) => {
        const body = req.body;
        createTags(body, (err, results) => {
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
                message: "Tag created successfully"
            });
        });
    },
    updateTags: (req, res) => {
        const body = req.body;
        updateTags(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update tag"
                });
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteTags: (req, res) => {
        const data = req.body;
        deleteTags(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Tag not found"
                });
            }
            return res.json({
                success: 1,
                message: "Tag deleted successfully"
            });
        });
    },
    getTags: (req, res) => {
        getTags((err, results) => {
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
    getTagsByProjectsId : (req, res) => {
        const id = req.params.id;
        console.log(id);
        getTagsByProjectsId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Tag not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
}