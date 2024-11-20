const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('../../models/role');
const Patient = require('../../models/patientModel');
const Staff = require('../../models/staffModel');

// Register Patient
exports.registerPatient = async (req, res) => {
  try {
    const { email, password, firstName, lastName, contactInfo, medicalHistoryAccess } = req.body;

    // Check if user already exists
    const existingUser = await Role.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create Role for patient
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Role({
      email,
      password: hashedPassword,
      role: 'patient',
    });
    await newUser.save();

    // Create Patient
    const newPatient = new Patient({
      user: newUser._id,
      firstName,
      lastName,
      contactInfo,
      medicalHistoryAccess,
    });
    await newPatient.save();

    res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register Staff (Admin can create staff)
exports.registerStaff = async (req, res) => {
  try {
    const { email, password, firstName, lastName, department, specialization, role } = req.body;

    // Only allow admin to register staff or doctors
    if (role !== 'staff' && role !== 'doctor') {
      return res.status(400).json({ message: 'Invalid role. Admin can only register staff or doctor.' });
    }

    // Check if user already exists
    const existingUser = await Role.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create Role for staff/doctor
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Role({
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // Create Staff/Doctor record
    let newStaff = null;
    if (role === 'staff') {
      newStaff = new Staff({
        user: newUser._id,
        firstName,
        lastName,
        department,
      });
    } else if (role === 'doctor') {
      newStaff = new Staff({
        user: newUser._id,
        firstName,
        lastName,
        department,
        specialization,
      });
    }
    await newStaff.save();

    res.status(201).json({ message: 'Staff/Doctor registered successfully', staff: newStaff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
