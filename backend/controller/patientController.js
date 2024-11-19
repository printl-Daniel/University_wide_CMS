const Patient = require('../models/patientModel');

const register = async (req, res) => {
  const { firstName, lastName, email, contactInfo, password } = req.body;
  
  try {
    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient already exists.' });
    }

    // Create new patient instance
    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      contactInfo,
      passwordHash: password, // Will be hashed automatically via pre-save middleware
    });

    // Save patient to the database
    await newPatient.save();

    res.status(201).json({ message: 'Patient registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register };