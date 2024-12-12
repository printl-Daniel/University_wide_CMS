const express = require('express');
const userController = require('../../controller/User/userRegistration');
const router = express.Router();

// Public routes
router.post('/add-user', userController.createUser);  // User registration
router.post('/login', userController.login);  // User login
router.post('/logout', userController.logout); 

// Protected routes - require authentication (valid token)
router.get('/users', userController.fetchUsers);  // Fetch all users (protected)
router.delete('/delete-user/:id', userController.deleteUser);  // Delete a user (protected)

module.exports = router;
