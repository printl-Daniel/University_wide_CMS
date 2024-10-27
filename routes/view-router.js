const express = require("express");
const router = express.Router();
const views = require("../controller/view-controller");

router.get("/feedback", views.feedback);

module.exports = router;
