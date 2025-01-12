const userService = require('../services/userService');

const { validationResult } = require('express-validator');

class UserController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({"message": errors});
      }
      const newUser = await userService.registerUser(req.body);
      return res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const token = await userService.loginUser(req.body);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
