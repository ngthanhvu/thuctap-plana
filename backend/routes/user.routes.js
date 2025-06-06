const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userController = require('../controllers/user.controller');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', auth.verifyToken, auth.getUser);
router.post('/logout', userController.logout);


module.exports = router;