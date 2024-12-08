const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Function to generate JWT token
const generateToken = (user) => {
  // Payload (customize as needed)
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
  };

  // Sign the token with expiration time (e.g., 1 hour)
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

// Middleware function to verify JWT token
const verifyTokenMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Format: "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Attach user information to the request object
    req.user = decoded;
    next();  // Continue to the next middleware or route handler
  } catch (error) {
    console.error(error);  // Log error details to debug
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = { generateToken, verifyTokenMiddleware };