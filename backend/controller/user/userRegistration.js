const bcrypt = require('bcrypt');
const User = require('../../models/User/userModel');
const { generateToken } = require('../../middleware/jwt');
const { blacklistToken } = require('../../middleware/authMiddleware');

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
        userId: newUser.userId, 
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


exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token using the userId and role
    const token = generateToken(user);

    // Send response with the token and user data
    res.status(200).json({
      message: 'Login successful',
      token,  // Send token to the client
      user: {
        userId: user.userId,  // Use userId from the model
        fullname: user.fullname,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.logout = (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from the Authorization header

  if (token) {
    // Add the token to the blacklist
    blacklistToken(token);
    return res.status(200).json({ message: "Logged out successfully." });
  } else {
    return res.status(400).json({ message: "No token provided." });
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