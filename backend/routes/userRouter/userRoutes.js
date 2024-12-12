const express = require('express');
const userController = require('../../controller/User/userRegistration');
const { authMiddleware, isAdmin, isStaff, isDoctor } = require('../../middleware/authMiddleware');  // Import the authMiddleware
const router = express.Router();

// Public routes
router.post('/add-user', authMiddleware, isAdmin, userController.createUser);  // User registration
router.post('/login', userController.login);  // User login
router.post('/logout', userController.logout); 

// Protected routes - require authentication (valid token)
router.get('/users', authMiddleware, isAdmin, userController.fetchUsers);  // Fetch all users (protected)
router.delete('/delete-user/:id', authMiddleware, isAdmin, userController.deleteUser);  // Delete a user (protected)

module.exports = router;
