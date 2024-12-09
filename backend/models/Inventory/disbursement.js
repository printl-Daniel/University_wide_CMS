const mongoose = require('mongoose');

const disbursementSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  patientName: { type: String, required: true },
  reason: { type: String, required: true },
  college: { type: String, required: true,
    enum: ["BSIT", "CBM", "EDUC", "BTVLED", "CAS", "CCJE"],
   },
  date: { type: Date, default: Date.now },
});

const Disbursement = mongoose.model('Disbursement', disbursementSchema);

module.exports = Disbursement;
