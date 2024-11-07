// models/user.js
const db = require("../config/db");

module.exports = {
  // Find user by username
  findUserByUsername: (username) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE Username = ?";
      db.query(query, [username], (err, results) => {
        if (err) return reject(err);
        if (results.length > 0) {
          resolve(results[0]); // Return the first user found
        } else {
          resolve(null); // No user found with that username
        }
      });
    });
  }
};
