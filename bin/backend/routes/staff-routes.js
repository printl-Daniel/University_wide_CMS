const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.post('/add-staff', staffController.createStaff);

module.exports = router;