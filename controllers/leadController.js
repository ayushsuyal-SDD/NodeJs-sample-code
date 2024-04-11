const response = require("../utils/responses/response");
const Notifications = require("../models/notifications.model");
const Questionaire = require("../models/questionaire.model");
const hmacSign = require("../utils/helpers/hmacSign");

const saveQuestionAnswer = async (req, res) => {
  console.log("..........??????????>>>>>>>>>");
  const signature = hmacSign(process.env.FORMSORT_SIGNING_KEY, req.body);

  console.log("Signature is : ", signature);
  console.log("Signature header = ", req.header("x-formsort-signature"));
  //   if (signature !== req.header("x-formsort-signature")) {
  //     return res.status(401).json({ message: "Formsort signature mismatch" });
  //   }

  const answers = JSON.parse(req.body);

  console.log(
    "Answer is : ",
    answers,
    " ....................>>>>>>>>>>>>>>>..."
  );
  return res.json({
    message: "Well now, it looks like you are all good.",
    answers,
  });
};

module.exports = { saveQuestionAnswer };
