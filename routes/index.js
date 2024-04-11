const express = require("express");
const router = express.Router();
const {
  hashPassword,
  comparePassword,
} = require("../utils/helpers/hashPassword");
const generateOtp = require("../utils/helpers/generateOtp");
const {
  decryptData,
  encryptData,
} = require("../utils/helpers/encryptDecryptData");
const sendMail = require("../utils/helpers/sendMail");
const { createToken, verifyToken } = require("../utils/helpers/token");
const validateDoctor = require("../utils/validator/validateDoctorSignup");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/operations", async (req, res, next) => {
  res.json({
    encEmail: encryptData({
      email: "spsmartdata@gmail.com",
    }),
    encOtpId: encryptData("661716280a7bad67beef7a68"),
    //   decData: decryptData(
    //     "U2FsdGVkX1/JD9gmTdPqjecSCzBWLvS8Fw+1gVINjf8GnKVxImABoZmV4DfPiHJZ5Ew30aV6HEk2NqWlsgL3mg=="
    //   ),
    // encOtp: encryptData({
    //   id: "6615ce083470e4e01b9c708a",
    //   code: 45414,
    // }),
    encCreds: encryptData({
      email: "sumittest@yopmail.com",
      password: "sauRav56@",
    }),
    decLogin: decryptData(
      "U2FsdGVkX1/WIln2aTbDAFvy/QX6COAOdhGk/ugB8GxOYCF3teO7HytpCkQA+RLpMg6alCf+It4niuG9YKm+vjn4ZKqr46YEwJVuI3sgU9FVQyt4EWXNb+GgHX/xqDBvKoXZK+AYDla5nI2pLLp/ipVW7PsGh38jfI/7t2PGdkuXAVhBD0TUmIKk+Gp3Nsgh0MXY0tt5FF6pZWmQJRIZNQOhIlejjqaEjMARo4HiFzlrtl+5tGqYhq2Emo/Yh8WohKpsqK6FQYX5B4UoKxePFfRKrkkmwAEk7sjvBEWDYhS9rMsfxFg/zuDsWg0DulhigXX5xl4xnJlgniwE7LWgM2Ke7gXjt7B1DYVxe7WbfUvOzoVVbRqP3bbf3V4Vj61SKdIB1nWvC36iON5UhyTjAw=="
    ),
    signupEnc: encryptData({
      firstName: "Saurav",
      lastName: "Pandey",
      email: "spsmartdata@gmail.com",
      phoneNumber: "9570823816",
      zipCode: "85853",
      password: "sauRav56@",
      confirmPassword: "sauRav56@",
      speciality: ["Student", "Engineer", "Developer", "Coder"],
    }),
    profileUpdateEnc: encryptData({
      firstName: "Saurav Kumar",
      lastName: "Pandey",
      zipCode: "841213",
      phoneNumber: "+919570823816",
      speciality: ["Student", "Engineer", "Developer", "Coder", "Chef", "Son"],
    }),
  });
});

module.exports = router;
