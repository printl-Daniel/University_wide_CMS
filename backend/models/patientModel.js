const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Patient Schema
const patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactInfo: { type: String, required: true },
  medicalHistoryAccess: { type: Boolean, default: false }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
