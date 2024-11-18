const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('./role');

// Staff Schema
const staffSchema = new Schema({
  staffId: {
    type: String,
    unique: true,         // Ensures that each staffId is unique
    required: true,       // Makes sure that staffId is provided
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  contactInfo: { 
    type: String, 
    required: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  roleId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Role',          // This is a reference to the Role model
    required: true 
  }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
