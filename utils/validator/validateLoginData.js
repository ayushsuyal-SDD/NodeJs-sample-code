const Joi = require("joi");
const response = require("../responses/response");
const { decryptData } = require("../helpers/encryptDecryptData");

function validateLoginData(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });

  try {
    const dataValues = decryptData(req.body.data);
    const { error } = schema.validate(dataValues);

    if (error) {
      return response(
        res,
        400,
        error.details.map((err) => err.message),
        null
      );
    }
    req.loginData = dataValues;
    next();
  } catch (error) {
    return response(res, 500, "Internal server error!", null);
  }
}

module.exports = validateLoginData;
