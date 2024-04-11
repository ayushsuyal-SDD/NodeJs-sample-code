const express = require("express");
const router = express.Router();
const {
  createDoctor,
  verifyDoctorLogin,
  validateEmail,
  resendEmail,
  updateProfile,
} = require("../controllers/doctorController");

const validateDoctor = require("../utils/validator/validateDoctorSignup");
const validateLoginData = require("../utils/validator/validateLoginData");
const validateOtpData = require("../utils/validator/validateOtpData");
const validateProfile = require("../utils/validator/validateProfileUpdate");
const validateResendEmail = require("../utils/validator/validateResendEmail");

const { verifyToken } = require("../utils/helpers/token");

// Route to create a doctor in database
router.post("/signup", validateDoctor, createDoctor);

// Route to approve doctor login request
router.post("/login", validateLoginData, verifyDoctorLogin);

// Route to validate doctor email
router.put("/auth-link", validateOtpData, validateEmail);

// Route to resend verification link email
router.post("/resend-link", validateResendEmail, resendEmail);

// Route to update doctor profile
router.put("/:doctorId", verifyToken, validateProfile, updateProfile);

module.exports = router;
