const Joi = require("joi");
const response = require("../responses/response");
const { decryptData } = require("../helpers/encryptDecryptData");

function validateProfileUpdate(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30),
    phoneNumber: Joi.string().required(),
    zipCode: Joi.string().min(5).max(10).required(),
    speciality: Joi.array().items(Joi.string().max(100)).required(),
  }).options({ abortEarly: false });

  try {
    let dataValues = {};
    if (req.body.data) {
      dataValues = decryptData(req.body.data);
    }
    const { error } = schema.validate(dataValues);

    if (error) {
      console.log(error);
      return response(res, 400, "Invalid Data", null);
    }
    req.profileData = dataValues;
    next();
  } catch (error) {
    return response(res, 500, "Internal server error!", null);
  }
}

module.exports = validateProfileUpdate;
