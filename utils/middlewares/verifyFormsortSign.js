const express = require("express");

const app = express();
app.use(express.json());

const bodyParser = require("body-parser");

const verifySign = (req, res, next) => {
  console.log("req.header = ", req.header("x-formsort-secure"));
  if (req.header("x-formsort-secure") === "sign") {
    bodyParser.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
  //   next();
};

module.exports = verifySign;
