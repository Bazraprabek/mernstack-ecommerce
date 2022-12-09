const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY);
  return token;
};

module.exports = generateToken;
