const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');

router.post('/staff', staffController.createStaff);


module.exports = router;