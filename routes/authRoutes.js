const express = require("express");
const { loginCtrl, registerCtrl } = require("../controllers/authCtrls.js");

const router = express.Router();

// register route
router.post("/register", registerCtrl);

// login route
router.post("/login", loginCtrl);

module.exports = router;
