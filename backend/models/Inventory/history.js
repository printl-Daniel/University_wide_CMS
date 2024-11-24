// models/History.js
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  transactionDate: { type: Date, required: true },
  itemName: { type: String, required: true },
  actionType: { type: String, required: true }, // Purchase/Usage
  quantityChanged: { type: Number, required: true },
  remainingQuantity: { type: Number, required: true },
  responsiblePerson: { type: String, required: true },
  reasonForAction: { type: String, required: true },
  supplier: { type: String, required: true },
});

const History = mongoose.model('History', historySchema);

module.exports = History;
