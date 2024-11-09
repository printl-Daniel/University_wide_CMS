// models/staffModel.js
const db = require('../config/db'); // Import the DB connection (adjust path as needed)

const staffModel = {
  // Create a new staff member
  createStaff: async (staffData) => {
    const { firstName, lastName, contactInfo, email, username, passwordHashed, role = 'staff' } = staffData;
    const query = `
      INSERT INTO clinicstaff (firstName, lastName, contactInfo, email, username, passwordHashed, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [firstName, lastName, contactInfo, email, username, passwordHashed, role];

    try {
      const [result] = await db.query(query, values);
      return { staffId: result.insertId, ...staffData }; // Return staff data with generated staffId
    } catch (error) {
      throw error; // Propagate error to be handled in controller
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
