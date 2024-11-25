const express = require("express");
const appointmentsController = require("../controller/appointmentController");
const router = express.Router();

router.get("/get", appointmentsController.getAllAppointments);

module.exports = router;
