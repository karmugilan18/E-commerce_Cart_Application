const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { checkout } = require("../controllers/checkoutControllers");

router.post ("/",protect , checkout);

module.exports = router;
