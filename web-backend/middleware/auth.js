const { verify } = require("../utils/jwt");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers["authorization"] || " ";
  const [authType, token] = authHeader.split(" ");
  if(authType === "Bearer" && token) {
    const user = verify(token);
    if(user) {
      req.user = user;
      return next()
    }
  }
  return res.status(401).end()
}

module.exports = authMiddleWare;