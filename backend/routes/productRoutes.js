const express = require("express");
const router = express.Router();
/*
//connect fromm contollers file of the product controllers
const {getProducts, getproductById}= require("../controllers/productController");

//router get with nothing 
router.get("/",getProducts);
//router get with id 
router.get("/:id",getproductById);

module.exports = router;
*/
// connect the file 
const {getProducts , getProductById , addProduct,updateProduct,removeProduct} = require("../controllers/productController");
//mistake of taking file adding the model not using main fuction
//const { getProductById } = require("../models/productModel");
// get products with nothing 
router.get("/",getProducts);
//get with id 
router.get("/:id",getProductById);
router.post("/", addProduct);
router.put("/:id",updateProduct);
router.delete("/:id", removeProduct);


module.exports = router;
