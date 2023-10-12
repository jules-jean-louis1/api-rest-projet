const {
    createTags,
    getTags,
    updateTags,
    deleteTags
} = require("./tags.controller");

const router = require('express').Router();
const { checkToken } = require('./../auth/token_validation');

router.post('/', checkToken, createTags);
router.get('/', getTags);
router.patch('/:id', checkToken, updateTags);
router.delete('/:id', checkToken, deleteTags);

module.exports = router;