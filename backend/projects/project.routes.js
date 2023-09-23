const {
    createProjects,
    getProjects,
    getProjectsById,
} = require("./project.controller");

const router = require('express').Router();
const { checkToken } = require('./../auth/token_validation');


router.post('/', checkToken, createProjects);
//router.get('/', checkToken, getProjects);
//router.get('/:id', checkToken, getProjectsById);


module.exports = router;

