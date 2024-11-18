const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Role Schema
const roleSchema = new Schema({
  roleName: {
    type: String,
    enum: ['doctor', 'nurse', 'admin'],
    required: true
  },
  accessLevel: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
