const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: Number,
    required: true,
    unique: true,
    immutable: true, // Ensure that doctorId cannot be changed after assignment
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  availability: {
    type: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    }],
    default: [],
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff', // Reference to the staff model to relate doctor to staff
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, {
  timestamps: true,
});

// Plugin for auto-incrementing doctorId
doctorSchema.plugin(AutoIncrement, { inc_field: 'doctorId' });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
