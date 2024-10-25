const express = require("express");
const router = express.Router();
const sentimentCon = require("../controller/sentiment-controller");

router.get("/", sentimentCon.index);

module.exports = router;
