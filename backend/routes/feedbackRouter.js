const express = require("express");
const feedback = require("../controller/feedbackController");
const router = express.Router();

router.post("/sync", feedback.saveFeedback);
router.get("/get", feedback.getAnalyzeFeedback);

module.exports = router;
