const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true,},
  feedbackText: { type: String, required: true },
  sentiment: { type: String, required: true },
  feedbackDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
