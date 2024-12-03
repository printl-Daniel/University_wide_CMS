const mongoose = require("mongoose");

const stockReductionLogSchema = new mongoose.Schema({
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory", // Reference to the Item model
    required: true,
  },
  patient_name: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
    enum: ["BSIT", "CBM", "EDUC", "BTVLED", "CAS", "CCJE"], // Valid college options
  },
  quantity: {
    type: Number,
    required: true,
  },
  reduced_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date/time
  },
}, {
  collection: "stock_reduction_logs", // Specify the collection name
});

module.exports = mongoose.model("StockReductionLog", stockReductionLogSchema);
