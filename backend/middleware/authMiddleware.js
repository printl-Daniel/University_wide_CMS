const jwt = require('jsonwebtoken');
const User = require('../models/User/userModel');  // Ensure this is correct

// In-memory blacklist for demonstration (consider using a database or Redis for production)
let tokenBlacklist = [];

// Middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  // Check if the token is blacklisted
  if (tokenBlacklist.includes(token)) {
    return res.status(403).json({ message: "Token has been invalidated" });
  }

  try {
    // Verify token directly without promisify
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      // Find user by decoded userId
      User.findById(decoded.userId).then(user => {
        if (!user) {
          return res.status(401).json({ message: "Unauthorized access" });
        }

        req.user = user;  // Attach the user object to the request
        next();  // Proceed if the user is authenticated
      }).catch(error => {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized access" });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Middleware to check if user is a staff member (with restricted access)
const isStaff = (req, res, next) => {
  if (req.user.role !== 'Staff') {
    return res.status(403).json({ message: "Access denied. Staff only." });
  }
  next();
};

// Middleware to check if user is a doctor
const isDoctor = (req, res, next) => {
  if (req.user.role !== 'Doctor') {
    return res.status(403).json({ message: "Access denied. Doctors only." });
  }
  next();
};

// Function to add a token to the blacklist (for logout)
const blacklistToken = (token) => {
  tokenBlacklist.push(token);
};

module.exports = { authMiddleware, isAdmin, isStaff, isDoctor, blacklistToken };