const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  doctorId: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1h" }, // OTP expires in 59 minutes
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
