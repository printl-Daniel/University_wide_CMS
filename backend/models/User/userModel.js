const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true, // Ensures no duplicate IDs
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,  
  },
  role: {
    type: String,
    required: true,  
    enum: ['Admin', 'Doctor', 'Staff'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
