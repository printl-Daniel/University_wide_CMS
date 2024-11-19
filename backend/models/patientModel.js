const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Patient Schema
const patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },  // Still required for login purposes
  contactInfo: { type: String, required: true },
  passwordHash: { type: String, required: true }, // Securely store hashed passwords
  medicalHistoryAccess: { type: Boolean, default: false }, // Allow patients to access medical history
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Hash password before saving to the database
patientSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();  // Only hash if the password is modified
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);  // Hash password with bcrypt
  next();
});

// Optional: Add a method to validate password during login
patientSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);  // Compare provided password with the hashed password
};

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
