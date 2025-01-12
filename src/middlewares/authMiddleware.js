require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
