const appointmentModel = require("../models/appointmentModel");

exports.index = (req, res) => {
  res.render("appointment");
};
exports.createAppointment = async (req, res) => {
  const { name, email, phone, date, time, notes } = req.body;

  // Basic validation to check for required fields
  if (!name || !email || !phone || !date || !time) {
    return res.status(400).json({
      error: "All fields are required: name, email, phone, date, and time",
    });
  }

  // Create appointment data
  const appointmentData = {
    name,
    email,
    phone,
    date,
    time,
    notes,
    createdAt: new Date(),
  };

  try {
    // Assuming you have a model for interacting with Firebase
    const appointmentId = await appointmentModel.createAppointment(
      appointmentData
    );

    res.status(201).json({
      id: appointmentId,
      message: "Appointment created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
