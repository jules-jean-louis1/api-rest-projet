const { createUser, getUsersController, updateUserController, deleteUserController, loginController } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', checkToken, createUser);
router.get('/', checkToken, getUsersController);
router.patch('/', checkToken, updateUserController);
router.delete('/', checkToken, deleteUserController);

router.post('/login', loginController);

module.exports = router;