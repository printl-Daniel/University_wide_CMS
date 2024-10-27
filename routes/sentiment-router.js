const express = require("express");
const router = express.Router();
const sentimentCon = require("../controller/sentiment-controller");

router.post("/analyze", sentimentCon.analyzeSentiment);

module.exports = router;
