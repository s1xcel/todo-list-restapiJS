const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class UserService {
  generateAccessToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  };

  async registerUser({ username, password }){
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = {
      username,
      password: hashedPassword,
    };

    return userRepository.create(newUser);
  };

  async loginUser ({ username, password }){
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Incorrect username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect username or password');
    }

    return this.generateAccessToken(user._id);
  };

  async getAllUsers(){
    return userRepository.findAll();
  };

}


module.exports = new UserService();
