const express = require('express');
const router = express.Router();
const staffController = require('../controller/staff-controller');

router.post('/staff', staffController.createStaff);
router.get('/staff', staffController.getAllStaff); // Add this route

module.exports = router;