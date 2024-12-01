const express = require("express");
const appointmentsController = require("../controller/appointmentController");
const router = express.Router();

router.get("/pending", appointmentsController.getPendingAppointment);
router.get("/approved", appointmentsController.getApprovedAppointment);
router.get("/declined", appointmentsController.getDeclinedAppointment);
router.get("/afterAppointed", appointmentsController.getAfterAppointed);

router.post("/approval", appointmentsController.approval);
router.post("/approved/status", appointmentsController.approvedStatus);

module.exports = router;
