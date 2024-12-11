const bcrypt = require('bcrypt');
const User = require('../../models/User/userModel');

exports.createUser = async (req, res) => {
  const { fullname, username, password, role } = req.body;

  // Validate required fields
  if (!fullname || !username || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Hash the password before saving (using bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully.",
      user: {
        userId: newUser._id, // Include userId
        fullname: newUser.fullname,
        username: newUser.username,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Ensure that both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // If it's the user's first login, ask them to reset the password
    if (user.isFirstLogin) {
      return res.status(200).json({
        message: 'First time login. Please reset your password.',
        resetRequired: true,
      });
    }

    // Since we're not using JWT, no need to send a token
    res.status(200).json({
      message: 'Login successful',
      role: user.role,
      username: user.username,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  // Ensure all required fields are provided
  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: "New password and confirm password are required." });
  }

  // Ensure that the new password and confirm password match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Assuming you're getting the user ID from somewhere (this is where session or token would go later)
    const userId = req.body.userId; // or get it from a session, query param, or other means

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.isFirstLogin = false;  // Update the `isFirstLogin` field (optional based on your logic)

    // Save the updated user data
    await user.save();

    res.status(200).json({
      message: 'Password reset successful. You can now log in with your new password.',
    });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password." });
  }
};


exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user." });
  }
};