const Joi = require("joi");
const response = require("../responses/response");
const { decryptData } = require("../helpers/encryptDecryptData");

function validateDoctor(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    zipCode: Joi.string().min(5).max(10).required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w]).*$/)
      .message(
        "Password must include a number, lowercase and uppercase letter, and a special character!"
      )
      .required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Passwords must match!" }),
    speciality: Joi.array().items(Joi.string().max(100)).required(),
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
    req.doctorData = dataValues;
    next();
  } catch (error) {
    return response(res, 500, "Internal server error!", null);
  }
}

module.exports = validateDoctor;
