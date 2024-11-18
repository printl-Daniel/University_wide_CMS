const Patient = require('../models/patientModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Hardcoded email credentials for testing
const EMAIL_USER = 'jomer.baes@gmail.com';  // Replace with your email
const EMAIL_PASS = 'Wxwf bsmt ynqw pfzv';    // Replace with your app password or API key
const JWT_SECRET = 'your-jwt-secret';      // Hardcoded JWT secret (for testing)

// Generate a verification token
const generateVerificationToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Send verification email
const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER, // Your email
            pass: EMAIL_PASS, // Your app password or API key
        },
    });

    const mailOptions = {
        from: EMAIL_USER,  // Sender's email
        to: email,  // Recipient's email
        subject: 'Please Verify Your Email Address',  // Subject
        html: `
            <h3>Verify Your Email</h3>
            <p>Click <a href="http://localhost:5000/verify-email/${token}">here</a> to verify your email address and complete your registration.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending verification email');
    }
};

// Register patient
const registerPatient = async (req, res) => {
    const { firstName, lastName, email, password, contactInfo } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newPatient = await Patient.create({
            firstName,
            lastName,
            email,
            passwordHash,
            contactInfo,
            emailVerified: false, // Initially not verified
        });

        const token = generateVerificationToken(newPatient._id); // Generate token
        await sendVerificationEmail(newPatient.email, token); // Send email

        return res.status(200).json({
            message: 'Registration successful. Please check your email for verification.',
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'An error occurred during registration.' });
    }
};

// Verify patient email
const verifyPatientEmail = async (req, res) => {
    const { token } = req.params;

    try {
        // Decode the token to get patient ID
        const decoded = jwt.verify(token, JWT_SECRET); // Verify token
        const patientId = decoded.id;

        // Find patient and update emailVerified field
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update emailVerified to true
        patient.emailVerified = true;
        patient.verificationToken = undefined; // Remove token after use
        await patient.save();

        return res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = { registerPatient, verifyPatientEmail };
