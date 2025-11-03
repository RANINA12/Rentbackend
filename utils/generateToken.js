const jwt = require('jsonwebtoken');

/**
 * Generates a JWT for a given user ID.
 * @param {string} id - The user's MongoDB document ID.
 * @returns {string} - The generated JSON Web Token.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token will expire in 30 days
  });
};

module.exports = generateToken;
