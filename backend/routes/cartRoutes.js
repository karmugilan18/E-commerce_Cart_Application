const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { addItemToCart , getCart ,removeItem , updateCartItem } =  require("../controllers/cartController");


router.post ( "/add", protect , addItemToCart);
router.get("/",protect , getCart);
router.put("/:id",protect , updateCartItem);
router.delete("/:id", protect, removeItem);


module.exports = router;
