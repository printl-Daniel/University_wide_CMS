const express = require("express");
const router = express.Router();
const views = require("../controller/view-controller");

router.get("/", views.index);

module.exports = router;
