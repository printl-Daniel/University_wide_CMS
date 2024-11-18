const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Patient Schema
const patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactInfo: { type: String, required: true },
  passwordHash: { type: String, required: true }, // Securely store hashed passwords
  emailVerified: { type: Boolean, default: false }, // Email verification status
  verificationToken: { type: String }, // Token for email verification
  medicalHistoryAccess: { type: Boolean, default: false },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
