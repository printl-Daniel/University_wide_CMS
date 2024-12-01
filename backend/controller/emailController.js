const nodemailer = require("nodemailer");
require("dotenv").config();

function emailSetUp() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

const approvedSendMail = async (
  additionalMessage,
  name,
  date,
  time,
  campus,
  email
) => {
  const transporter = emailSetUp();

  let additionalMessageSection = "";
  if (additionalMessage) {
    additionalMessageSection = `
    Additional Message:
    ${additionalMessage}
  `;
  }

  const emailBody = `
  <html>
    <body>
      <p>Dear ${name},</p>

      <p>We are pleased to inform you that your appointment scheduled for <strong>${date}</strong> at <strong>${time}</strong> has been approved.</p>

      ${additionalMessageSection}

      <p><strong>Please be on time for your appointment.</strong></p>

      <p>If you have any questions or need further assistance, feel free to contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.</p>

      <p>Best regards,<br>
      MINSU Clinic ${campus}</p>
    </body>
  </html>
`;

  const mail = {
    from: `" MINSU Clinic ${campus} " <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Appointment Approval",
    html: emailBody,
    replyTo: process.env.EMAIL_USER,
  };

  try {
    await transporter.sendMail(mail);
    return { status: "success", message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      status: "error",
      message: "Error sending email: " + error.message,
    };
  }
};

const declinedSendMail = async (
  additionalMessage,
  name,
  date,
  time,
  campus,
  email
) => {
  const transporter = emailSetUp();

  let additionalMessageSection = "";
  if (additionalMessage) {
    additionalMessageSection = `
    Additional Message:
    ${additionalMessage}
  `;
  }

  const emailBody = `
  <html>
    <body>
      <p>Dear ${name},</p>

      <p>We regret to inform you that your appointment scheduled for <strong>${date}</strong> at <strong>${time}</strong> has been declined.</p>

      ${additionalMessageSection}

      <p><strong>If you have any questions or need further assistance, feel free to contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.</strong></p>

      <p>We apologize for any inconvenience this may cause. Please feel free to reschedule your appointment.</p>

      <p>Best regards,<br>
      MINSU Clinic ${campus}</p>
    </body>
  </html>
`;

  const mail = {
    from: `" MINSU Clinic ${campus} " <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Appointment Decline",
    html: emailBody,
    replyTo: process.env.EMAIL_USER,
  };

  try {
    await transporter.sendMail(mail);
    return { status: "success", message: "Decline email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      status: "error",
      message: "Error sending email: " + error.message,
    };
  }
};

module.exports = { approvedSendMail, declinedSendMail };
