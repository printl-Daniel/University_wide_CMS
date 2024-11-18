const express = require("express");
const submitFeedback = require("../controller/feedbackController");
const router = express.Router();

router.post('/feedback', submitFeedback);

module.exports = router;