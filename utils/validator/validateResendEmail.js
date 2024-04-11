const Joi = require("joi");
const response = require("../responses/response");
const { decryptData } = require("../helpers/encryptDecryptData");

function validateResendEmail(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  }).options({ abortEarly: false });

  try {
    const dataValues = decryptData(req.body.data);
    const { error } = schema.validate(dataValues);

    if (error) {
      return response(res, 400, "Invalid Email!", null);
    }
    req.email = dataValues.email;
    next();
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal server error!", null);
  }
}

module.exports = validateResendEmail;
