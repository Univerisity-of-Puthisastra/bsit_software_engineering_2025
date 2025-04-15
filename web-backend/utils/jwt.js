const jwt = require("jsonwebtoken");
const secret = "sfjdskljfdskjf";

const generateToken = (user) => {
  const token = jwt.sign(user, secret, { expiresIn: 3600, algorithm: "HS512" });
  return token;
};

const verify = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verify,
};
