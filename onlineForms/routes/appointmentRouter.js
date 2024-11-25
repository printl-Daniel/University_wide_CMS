const express = require("express");
const appointmentsController = require("../controllers/appointmentController");
const router = express.Router();

router.get("/", appointmentsController.index);
router.post("/create", appointmentsController.createAppointment);

module.exports = router;
