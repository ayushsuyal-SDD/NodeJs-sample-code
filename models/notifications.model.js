const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    senderId: { type: Object, required: false, default: null },
    receiverId: { type: Object, required: false, default: null },
    content: { type: String, required: true },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Notifications = mongoose.model("Notifications", notificationSchema);

module.exports = Notifications;
