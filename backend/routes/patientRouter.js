const express = require('express');
const router = express.Router();
const { register } = require('../controller/patientController');  // Changed to register

router.post('/register', register);  // Use the correct function name here

module.exports = router;
