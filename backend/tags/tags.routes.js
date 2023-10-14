const {
    createTags,
    getTags,
    updateTags,
    deleteTags,
    getTagsByProjectsId
} = require("./tags.controller");

const router = require('express').Router();
const { checkToken } = require('./../auth/token_validation');

router.post('/', checkToken, createTags);
router.get('/', getTags);
// Route pour obtenir les tags d'un projet spécifique
router.get('/projets/:id', getTagsByProjectsId);
router.patch('/:id', checkToken, updateTags);
router.delete('/:id', checkToken, deleteTags);

module.exports = router;