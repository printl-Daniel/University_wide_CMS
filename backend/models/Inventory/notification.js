const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  itemId: { type: String, required: true },
  status: { type: String, default: "unread" }, 
});

module.exports = mongoose.model("Notification", notificationSchema);
