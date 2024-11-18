const express = require("express");
const submitFeedback = require("../controller/feedbackController");
const router = express.Router();

router.post("/", submitFeedback.submitFeedback);

module.exports = router;
