const express = require('express');
const router = express.Router();
const { registerPatient, verifyPatientEmail } = require('../controller/patientController');

router.post('/register', registerPatient);
router.get('/verify-email/:token', verifyPatientEmail);

module.exports = router;