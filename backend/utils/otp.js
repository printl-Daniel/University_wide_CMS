const nodemailer = require('nodemailer');

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASS, // your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Email Verification',
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Error sending OTP email.');
  }
};

// Verify OTP
const verifyOTP = (userOtp, otp, otpExpiration) => {
  const now = new Date();
  if (userOtp !== otp) return false; // OTP does not match
  if (now > otpExpiration) return false; // OTP has expired
  return true;
};

module.exports = { generateOTP, sendOTPEmail, verifyOTP };
