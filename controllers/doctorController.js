const {
  hashPassword,
  comparePassword,
} = require("../utils/helpers/hashPassword");
const { createToken } = require("../utils/helpers/token");
const {
  decryptData,
  encryptData,
} = require("../utils/helpers/encryptDecryptData");
const response = require("../utils/responses/response");
const sendMail = require("../utils/helpers/sendMail");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const Notifications = require("../models/notifications.model");

// Method to create a doctor in database
const createDoctor = async (req, res) => {
  let status = null;
  let message = null;
  let data = null;

  try {
    const dataValues = req.doctorData;

    let isExists = await User.findOne({
      email: dataValues.email.toLowerCase(),
    }).select("email");

    if (isExists) {
      status = 409;
      message = "Email already in use!";
    } else {
      const values = {
        firstName: dataValues.firstName,
        lastName: dataValues.lastName,
        email: dataValues.email.toLowerCase(),
        phoneNumber: dataValues.phoneNumber,
        zipCode: dataValues.zipCode,
        password: await hashPassword(dataValues.password),
        speciality: dataValues.speciality,
      };
      const newDoctor = await User.create(values);

      const otp = await Otp.create({ doctorId: newDoctor._id });

      sendMail({
        email: dataValues.email.toLowerCase(),
        subject: "Account Verification",
        title: "Welcome to NVM Patient Portal",
        text: "Thank you for joining our platform. Please verify your account by clicking the button below.",
        verificationLink: `http://172.24.0.213:3347/email-verified?auth=${encryptData(
          otp._id
        )}`,
      });

      status = 201;
      message = "Account Created!";
    }
  } catch (err) {
    message = "Internal server error!";
    status = 500;
  }

  return response(res, status, message, data);
};

// Method to verify doctor email
const validateEmail = async (req, res) => {
  let status = null;
  let message = null;
  let data = null;

  try {
    const otpId = req.otpId;

    let otp = await Otp.findById(otpId).select("doctorId");

    if (otp) {
      await User.updateOne({ _id: otp.doctorId }, { isEmailVerified: true });
      status = 200;
      message = "Email verified!";
    } else {
      status = 401;
      message = "Incorrect Otp!";
    }
  } catch (err) {
    message = "Internal server error!";
    status = 500;
  }
  return response(res, status, message, data);
};

// Method to resend verification link email
const resendEmail = async (req, res) => {
  let status = null;
  let message = null;
  let data = null;

  try {
    const email = req.email;

    let user = await User.findOne({
      email: email.toLowerCase(),
      status: true,
      deletedAt: null,
      role: "doctor",
    }).select("_id");

    if (user) {
      const otp = await Otp.create({ doctorId: user._id });

      sendMail({
        email: email.toLowerCase(),
        subject: "Account Verification",
        title: "Welcome to NVM Patient Portal",
        text: "Thank you for joining our platform. Please verify your account by clicking the button below.",
        verificationLink: `http://172.24.0.213:3347/email-verified?auth=${encryptData(
          otp._id
        )}`,
      });
    }

    status = 200;
    message = "Verification Link Sent!";
  } catch (err) {
    message = "Internal server error!";
    status = 500;
  }
  return response(res, status, message, data);
};

// Route to approve doctor login
const verifyDoctorLogin = async (req, res) => {
  let status = null;
  let message = null;
  let data = null;

  try {
    const values = req.loginData;

    let { email, password } = values;

    let user = await User.findOne({
      email: email.toLowerCase(),
      status: true,
      deletedAt: null,
      role: "doctor",
    }).select("_id password isEmailVerified");

    if (user) {
      const isValid = await comparePassword(password, user.password);

      if (isValid) {
        if (!user.isEmailVerified) {
          const otp = await Otp.create({ doctorId: user._id });
          sendMail({
            email: email.toLowerCase(),
            subject: "Account Verification",
            title: "Welcome to NVM Patient Portal",
            text: "Thank you for joining our platform. Please verify your account by clicking the button below.",
            verificationLink: `http://172.24.0.213:3347/email-verified?auth=${encryptData(
              otp._id
            )}`,
          });
        }

        status = 200;
        message = "Login Successfull!";
        data = encryptData({
          id: user._id,
          token: createToken({
            email: email.toLowerCase(),
            id: user._id,
          }),
          isEmailVerified: user.isEmailVerified,
        });
      } else {
        status = 401;
        message = "Invalid User!";
      }
    } else {
      status = 401;
      message = "Invalid User!";
    }
  } catch (err) {
    status = 500;
    message = "Something is wrong!";
  }

  // return response(res, status, message, data);
  res.status(status).json({ status, message, data });
};

// Route to Edit and Update doctor profile
const updateProfile = async (req, res) => {
  let status = null;
  let message = null;
  let data = null;

  try {
    const dataValues = req.profileData;
    const previousData = await User.findById(req.user.id).select("zipCode");

    if (previousData.zipCode !== dataValues.zipCode) {
      const content = `Doctor has requested to change his Zip code to <${dataValues.zipCode}>`;
      await Notifications.create({ senderId: previousData._id, content });
    }

    await previousData.updateOne({
      $set: {
        firstName: dataValues.firstName,
        lastName: dataValues.lastName,
        phoneNumber: dataValues.phoneNumber,
        speciality: dataValues.speciality,
      },
    });

    status = 200;
    message = "Account Updated!";
  } catch (err) {
    message = "Internal server error!";
    status = 500;
  }

  return response(res, status, message, data);
};

module.exports = {
  createDoctor,
  verifyDoctorLogin,
  validateEmail,
  resendEmail,
  updateProfile,
};
