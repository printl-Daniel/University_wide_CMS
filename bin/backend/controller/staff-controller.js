const staffModel = require("../models/staffModel"); // Import the staff model
const bcrypt = require("bcrypt"); // You may want to hash passwords before saving

const staffController = {
  // Create a new staff member
  createStaff: async (req, res) => {
    const { firstName, lastName, contactInfo, email, username, password } = req.body;
    try {
      // Hash the password before saving
      const passwordHashed = await bcrypt.hash(password, 10); // 10 is the salt rounds

      const staffData = {
        firstName,
        lastName,
        contactInfo,
        email,
        username,
        passwordHashed
      };

      // Call the model function to create a staff member
      const newStaff = await staffModel.createStaff(staffData);

      // Respond with the newly created staff data
      return res.status(201).json({
        message: "Staff member created successfully",
        staff: newStaff
      });
    } catch (error) {
      console.error("Error creating staff:", error);
      return res.status(500).json({ errorMessage: "Error creating staff" });
    }
  }
};

module.exports = staffController; // Export the staffController
