export const emailService = {
  sendEmail: async (emailData) => {
    try {
      const response = await fetch("http://localhost:5000/api/emails/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      if (response.ok) {
        return data.message || "Email sent successfully!";
      } else {
        throw new Error(data.error || "Email sending failed.");
      }
    } catch (error) {
      throw new Error(error.message || "Failed to send email.");
    }
  },
};
