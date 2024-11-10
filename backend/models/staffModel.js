const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userStaff = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
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
    default: 'staff',
    immutable: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
    },
    barangay: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    zipCode: {
      type: String,
    },
  },
  employmentDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  userId: {
    // Adding a unique identifier that you can use in other collections like inventory
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    unique: true,
    index: true,
  }
}, {
  timestamps: true,
});

// Auto-increment for the staffId field, if required in addition to ObjectId
userStaff.plugin(AutoIncrement, { inc_field: 'staffId' });

const Staff = mongoose.model('Staff', userStaff);

module.exports = Staff;
