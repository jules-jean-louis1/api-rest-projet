const router = require('express').Router();
const { checkToken } = require('./../auth/token_validation');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../frontend/elements/images/projects/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

const {
    createProjects,
    getProjects,
    getProjectsById,
} = require("./project.controller");


router.post('/submit', checkToken, upload.single('images'), createProjects);
//router.get('/', checkToken, getProjects);
//router.get('/:id', checkToken, getProjectsById);


module.exports = router;

