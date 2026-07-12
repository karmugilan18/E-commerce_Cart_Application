const express = require("express");
const router = express.Router();
//auth 
const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController")
//post 
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
