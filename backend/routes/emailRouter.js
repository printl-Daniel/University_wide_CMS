const express = require("express");
const email = require("../controller/emailController");
const router = express.Router();

router.post("/send", email.sendMail);

module.exports = router;
