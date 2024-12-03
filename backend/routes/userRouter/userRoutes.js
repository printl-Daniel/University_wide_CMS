const express = require('express');
const userController = require('../../controller/User/userRegistration.js');
const router = express.Router();

router.post('/add-user', userController.createUser);


module.exports = router;