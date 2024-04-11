const express = require("express");
const router = express.Router();
const { saveQuestionAnswer } = require("../controllers/leadController");
const verifySign = require("../utils/middlewares/verifyFormsortSign");

// Route to store questions and answers in database
router.post("/formsort-webhook", verifySign, saveQuestionAnswer);

module.exports = router;
