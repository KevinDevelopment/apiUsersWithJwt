require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "no token provided" });
  }

  const partsOfToken = authHeader.split(' ');

  if (!partsOfToken.length === 2) {
    return res.status(401).json({ error: "token error" });
  }

  const [scheme, token] = partsOfToken;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "token malformatted" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "token invalid" });
    }

    req.userId = decoded.id
    req.userEmail = decoded.email
    return next();
  })
}