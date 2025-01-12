const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../controllers/userController');

router.post('/register', [
  check('username','имя пользователя не может быть пустым').notEmpty(),
  check('password', 'пароль должен быть не меньше 6 символов').isLength({min: 6})
], userController.register);

router.post('/login', userController.login);

router.get('/', userController.getAllUsers);

module.exports = router;
