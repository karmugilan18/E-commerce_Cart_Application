const Cart = require("../models/cartModel");

const addItemToCart = (req,res) => {
    console.log(req.body);
    const userId = req.user.id;


    const {
        productId , quantity 
    } = req.body;

    Cart.addtoCart( userId, productId , quantity , (err, result) => {
        if(!productId || !quantity){
            return res.status(400).json({
                success:false,
                message:"ProductId and Quantity required"
            });
        }
        if(err) {

            return res.status(500).json ({
                success: false,
                message : err.message
            });
            
        }
        res.status(201).json ({
                success : true ,
                message: "Product added to cart"
        });
    });
};

const getCart = (req , res ) => {
    const userId = req.user.id ;
    Cart.getCartByUser( userId, (err,results ) => {
        if(err) 
        {
            return res.status(500).json({
                succes: false,
                message : err.message
            });

        }
        res.json({
            success: true, 
            cart:results
        });

    });

};

const removeItem = (req, res) => {
    const cartId = req.params.id;
    Cart.removeCartItem (cartId , (err , results) => {
        
        if(err) {
            return res.status(500).json({
                success:false,
                message:err.message

            });

        }
        res.json({
            success:true,
            message : "Item Removed"
        });
    });
}

module.exports = {
    addItemToCart, getCart, removeItem
};