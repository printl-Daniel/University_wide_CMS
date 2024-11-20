const express = require('express');
const router = express.Router();
const patientController = require('../controller/user/patientController');

// Registration and OTP verification routes
router.post('/register', patientController.registerPatient);
router.post('/verify-otp', patientController.verifyOtp);
router.post('/login', patientController.loginPatient);

module.exports = router;
