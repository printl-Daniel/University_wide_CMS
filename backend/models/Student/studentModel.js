const mongoose = require('mongoose');

// Define the student schema
const studentSchema = new mongoose.Schema({
  college: { type: String, required: true },
  program: { type: String, required: true },
  yearAndSection: { type: String, required: true },
  major: { type: String, default: 'NONE' },
  studentNo: { type: String, required: true },
  fullname: { type: String, required: true },
});

// Create the model based on the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
