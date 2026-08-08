const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {createReview , getReviews} = require("../controllers/reviewControllers");

router.post("/", protect , createReview);

router.get("/:productId" , getReviews);

module.exports =router;
