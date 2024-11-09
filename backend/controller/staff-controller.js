const staffModel = require("../models/staffModel"); // Import the staff model
const bcrypt = require("bcrypt"); // You may want to hash passwords before saving

const staffController = {
  // Create a new staff member
  createStaff: async (req, res) => {
    const { firstName, lastName, contactInfo, email, username, password } = req.body;
  
    try {
      const passwordHashed = await bcrypt.hash(password, 10);
      const staffData = { firstName, lastName, contactInfo, email, username, passwordHashed };
  
      const newStaff = await staffModel.createStaff(staffData);
  
      return res.status(201).json({ message: "Staff created successfully", staff: newStaff });
    } catch (error) {
      console.error("Error creating staff:", error);
      return res.status(500).json({ errorMessage: "Error creating staff" });
    }
  },
  getAllStaff: async (req, res) => {
    try {
      const staffList = await staffModel.getAllStaff(); // Implement this in the model
      res.status(200).json(staffList);
    } catch (error) {
      console.error('Error fetching staff:', error);
      res.status(500).json({ errorMessage: 'Error fetching staff' });
    }
  },
};

module.exports = staffController; // Export the staffController
