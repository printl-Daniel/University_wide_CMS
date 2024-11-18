const Email = require("../models/emailModel");
const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const newEmail = await Email.create({ email });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send the email to yourself
      subject: "New Email Request Received",
      text: `You received a new email request: ${email}`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(201)
      .json({ message: "Email saved and notification sent!", email: newEmail });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
