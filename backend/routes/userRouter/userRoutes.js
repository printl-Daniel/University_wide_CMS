const express = require('express');
const userController = require('../../controller/User/userRegistration.js');
//const { verifyTokenMiddleware } = require('../../middleware/jwt');
const router = express.Router();

router.post('/add-user', userController.createUser);
router.post('/login', userController.login);
router.post('/reset-password', userController.resetPassword);
router.get('/users', userController.fetchUsers);
router.delete('/delete-user/:id', userController.deleteUser);


module.exports = router;