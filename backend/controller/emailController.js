const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendMail = async (req, res) => {
  try {
    const { from, senderName, reason, contact } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mail = {
      from: `"${senderName}" <${process.env.EMAIL_USER}>`,
      to: "universitywideminus@gmail.com",
      subject: "Certificate Request",
      text: `Sender: ${senderName} \n\nContact: ${contact} \n\nReason: ${reason}`,
      replyTo: `"${senderName}" <${from}>`,
    };

    await transporter.sendMail(mail);
    res.status(200).json({ message: "Email sent successfully!" });

    console.log(`Email sent to: universitywideminus@gmail.com`);
    console.log(`From: ${from}`);
    console.log(`Message: ${reason}`);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(400).json({ error: error.message });
  }
};
