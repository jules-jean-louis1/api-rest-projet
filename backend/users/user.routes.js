const { createUser,
    getUsersController,
    loginController
} = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('./../auth/token_validation');

router.post('/', createUser);
router.post('/login', loginController);

module.exports = router;