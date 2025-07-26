const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Compares a plaintext password with an encrypted password
const comparePassword = async (password, encryptedPassword) => {
  // Uses bcrypt to compare the plaintext password with the hashed password
  return await bcrypt.compare(password, encryptedPassword);
};

const signToken = (user) => {
  // Token expiration time to 7 days
  const maxAge = 24 * 7 * 60 * 60;

  // Create the payload for the token
  const tokenBody = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  // Sign the token with the payload, secret key, and expiration time
  return jwt.sign(tokenBody, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

// Extracts the token from a Bearer token string
const extractToken = (bearerToken) => {
  const bearerArr = bearerToken.split(" ");
  if (bearerArr.length !== 2) return null;
  return bearerArr[1];
};

module.exports = {
  comparePassword,
  signToken,
  extractToken,
};
