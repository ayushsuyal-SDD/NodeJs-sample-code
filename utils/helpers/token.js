const jwt = require("jsonwebtoken");
const express = require("express");

const app = express();
app.use(express.json());

const verifyToken = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const token = req.headers["authorization"]?.split(" ")[1] || "";

  if (!token) {
    return res.status(403).json({ message: "Token not provided!" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token!" });
    }
    req.user = decoded;
    next();
  });
};

function createToken(payload) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
}

module.exports = { createToken, verifyToken };
