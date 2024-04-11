const mongoose = require("mongoose");

const questionaireSchema = new mongoose.Schema(
  {},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Questionaire = mongoose.model("Questionaire", questionaireSchema);

module.exports = Questionaire;
