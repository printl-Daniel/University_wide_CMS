// models/Audit.js
const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  auditId: { type: String, required: true },
  auditDate: { type: Date, required: true },
  auditName: { type: String, required: true },
  itemName: { type: String, required: true },
  quantityOnRecord: { type: Number, required: true },
  quantityCounted: { type: Number, required: true },
  discrepancy: { type: Number, required: true },
  reasonForDiscrepancy: { type: String, required: true },
  auditFindings: { type: String, required: true },
  actionTaken: { type: String, required: true },
});

const Audit = mongoose.model('Audit', auditSchema);

module.exports = Audit;
