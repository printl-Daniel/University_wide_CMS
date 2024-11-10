// models/staffModel.js
const db = require('../config/db'); // Import the DB connection (adjust path as needed)

const staffModel = {
  // Create a new staff member
  createStaff: async (req, res) => {
    const { firstName, lastName, contactInfo, email, username, password } = req.body;
    try {
      const passwordHashed = await bcrypt.hash(password, 10);
  
      const staffData = {
        firstName,
        lastName,
        contactInfo,
        email,
        username,
        passwordHashed,
      };
  
      const newStaff = await staffModel.createStaff(staffData);
      return res.status(201).json({
        message: "Staff member created successfully",
        staff: newStaff,
      });
    } catch (error) {
      console.error("Error creating staff:", error); // This should print a detailed error
      return res.status(500).json({ errorMessage: "Error creating staff" });
    }
  
  },
  getAllStaff: async () => {
    const query = 'SELECT * FROM clinicstaff';
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  // Get all staff members
//   getAllStaff: async () => {
//     const query = 'SELECT * FROM clinicstaff';
//     try {
//       const [staffList] = await db.query(query);
//       return staffList;
//     } catch (error) {
//       throw error; // Propagate error to be handled in controller
//     }
//   },

//   // Get a specific staff member by ID
//   getStaffById: async (staffId) => {
//     const query = 'SELECT * FROM clinicstaff WHERE staffId = ?';
//     try {
//       const [staff] = await db.query(query, [staffId]);
//       return staff[0]; // Return the first result, assuming staffId is unique
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Update a staff member's details
//   updateStaff: async (staffId, updatedData) => {
//     const { firstName, lastName, contactInfo, email, role } = updatedData;
//     const query = `
//       UPDATE clinicstaff
//       SET firstName = ?, lastName = ?, contactInfo = ?, email = ?, role = ?
//       WHERE staffId = ?`;
//     const values = [firstName, lastName, contactInfo, email, role, staffId];

//     try {
//       const [result] = await db.query(query, values);
//       return result.affectedRows > 0 ? { staffId, ...updatedData } : null; // Return updated data if successful
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Delete a staff member by ID
//   deleteStaff: async (staffId) => {
//     const query = 'DELETE FROM clinicstaff WHERE staffId = ?';
//     try {
//       const [result] = await db.query(query, [staffId]);
//       return result.affectedRows > 0; // Return true if deletion was successful
//     } catch (error) {
//       throw error;
//     }
//   }
};

module.exports = staffModel; // Export the staffModel object
