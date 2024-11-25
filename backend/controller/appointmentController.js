const appointmentModel = require("../models/appointmentModel");

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
