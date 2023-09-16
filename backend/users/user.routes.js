const { createUser, getUsersController, updateUserController, deleteUserController, loginController } = require('./user.controller');
const router = require('express').Router();

router.post('/', createUser);
router.get('/', getUsersController);
router.patch('/', updateUserController);
router.delete('/', deleteUserController);

router.post('/login', loginController);

module.exports = router;