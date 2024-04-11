const Joi = require("joi");
const response = require("../responses/response");
const { decryptData } = require("../helpers/encryptDecryptData");

function validateOtpData(req, res, next) {
  const schema = Joi.object({
    otpId: Joi.string().required(),
  }).options({ abortEarly: false });

  try {
    const dataValues = decryptData(req.body.data);
    console.log(dataValues);
    const { error } = schema.validate({ otpId: dataValues });

    if (error) {
      return response(res, 401, "Incorrect Otp", null);
    }
    req.otpId = dataValues;
    next();
  } catch (error) {
    return response(res, 500, "Internal server error!", null);
  }
}

module.exports = validateOtpData;
