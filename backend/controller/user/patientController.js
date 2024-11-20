const Patient = require('../../models/patientModel');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../utils/mailer'); // Utility for sending emails
const generateOTP = require('../../utils/otpGenerator'); // Utility to generate OTPs

exports.registerPatient = async (req, res) => {
  const { firstName, lastName, email, contactInfo, password } = req.body;
  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Generate OTP and send it to the patient's email
    const otp = generateOTP();
    await sendEmail(email, "Verify Your Email - OTP", `Your OTP is: ${otp}`);

    // Create JWT containing patient data and OTP for verification
    const otpToken = jwt.sign(
      { firstName, lastName, email, contactInfo, password, otp },
      process.env.JWT_SECRET,
      { expiresIn: "5m" } // OTP is valid for 5 minutes
    );

    res.status(200).json({
      message: "OTP sent to your email. Verify to complete registration.",
      otpToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error during registration.", error });
  }
};


exports.verifyOtp = async (req, res) => {
  const { otpToken, otpInput } = req.body;
  try {
    // Check if OTP token exists and validate
    if (!otpToken || !otpInput) {
      return res.status(400).json({ message: 'OTP token and input are required' });
    }

    // Assuming you have a function to validate the OTP (you can check the token expiry here)
    const isOtpValid = await validateOtp(otpToken, otpInput); // Implement validateOtp function
    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, you can proceed with your logic (e.g., mark the user as verified)
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};


exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    const isValidPassword = await patient.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: patient._id, email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error });
  }
};
