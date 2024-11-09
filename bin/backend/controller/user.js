const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find user by username from the database
      const user = await userModel.findUserByUsername(username);

      // If user doesn't exist
      if (!user) {
        return res
          .status(500)
          .json({ errorMessage: "Invalid username or password" });
      }

      // Compare the password hash with the provided password
      const match = await bcrypt.compare(password, user.PasswordHash);

      if (!match) {
        return res
          .status(500)
          .json({ errorMessage: "Invalid username or password" });
      }

      // Store session data (user information and role)
      req.session.isLoggedIn = true;
      req.session.username = user.Username;
      req.session.userID = user.UserID;
      req.session.role = user.Role;

      // Return user data with role and status message
      return res.status(200).json({
        message: "Login successful",
        username: user.Username,
        role: user.Role,
        userID: user.UserID,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ errorMessage: "An error occurred. Please try again." });
    }
  },
};

module.exports = userController;
