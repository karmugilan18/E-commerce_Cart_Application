const express = require ("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {placeOrder ,getOrders,getOrderDetails} = require("../controllers/orderControllers");

router.post( "/", protect , placeOrder);
router.get( "/", protect , getOrders);
router.get("/:id", protect , getOrderDetails);

module.exports = router;
