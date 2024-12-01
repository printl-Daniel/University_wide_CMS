const appointmentModel = require("../models/appointmentModel");
const { approvedSendMail, declinedSendMail } = require("./emailController");

exports.getPendingAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.getPendingAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getApprovedAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.getApprovedAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getDeclinedAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.getDeclinedAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAfterAppointed = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAfterAppointed();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.approval = async (req, res) => {
  try {
    const { status, id, additionalMessage, name, date, time, campus, email } =
      req.body;

    if (!status || !id) {
      return res.status(400).json({ error: "Status and ID are required." });
    }

    if (status === "Approved") {
      const emailResponse = await approvedSendMail(
        additionalMessage,
        name,
        date,
        time,
        campus,
        email
      );
      if (emailResponse.status === "error") {
        return res.status(500).json({ error: emailResponse.message });
      }
    } else if (status === "Declined") {
      const emailResponse = await declinedSendMail(
        additionalMessage,
        name,
        date,
        time,
        campus,
        email
      );
      if (emailResponse.status === "error") {
        return res.status(500).json({ error: emailResponse.message });
      }
    }

    const updatedAppointment = await appointmentModel.updateStatus(id, status);
    res.status(200).json({
      message: "Status updated successfully",
      updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approvedStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!status || !id) {
      return res.status(400).json({ error: "Status and ID are required." });
    }
    const updatedAppointment = await appointmentModel.updateStatus(id, status);
    res.status(200).json({
      message: "Status updated successfully",
      updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
