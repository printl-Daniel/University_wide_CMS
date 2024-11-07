const express = require("express");
const controller = require("../controller/main.js");
const userController = require("../controller/user.js");
const router = express.Router();


router.post("/login", userController.login);

module.exports = router;