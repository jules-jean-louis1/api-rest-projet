const router = require('express').Router();
const { checkToken } = require('./../auth/token_validation');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './frontend/elements/images/projects/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 Mo (en octets)
});

const {
    createProjects,
    getAllProjects,
    getProjectsById,
} = require("./project.controller");

router.post('/submit', checkToken, upload.single('images'), createProjects);
router.get('/display', checkToken, getAllProjects);
//router.get('/:id', checkToken, getProjectsById);

module.exports = router;