const bcrypt = require('bcrypt');
const User = require('../../models/User/userModel');

exports.createUser = async (req, res) => {
  const { fullname, username, password, role} = req.body;
  if (!fullname || !username || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    // Check if username already exists
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
      isFirstLogin: true, // Set to true by default
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
