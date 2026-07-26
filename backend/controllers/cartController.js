const Cart = require("../models/cartModel");

const addItemToCart = (req,res) => {
    console.log(req.body);
    const userId = req.user.id;


    const {
        productId , quantity 
    } = req.body;

    Cart.findCartItem(
    userId,
    productId,
    (err, results) => {

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        if(results.length > 0){

            Cart.updateQuantity(
                userId,
                productId,
                (err) => {

                    if(err){
                        return res.status(500).json({
                            success:false,
                            message:err.message
                        });
                    }

                    return res.json({
                        success:true,
                        message:"Quantity Updated"
                    });

                }
            );

        } else {

            Cart.addtoCart(
                userId,
                productId,
                quantity,
                (err)=>{

                    if(err){
                        return res.status(500).json({
                            success:false,
                            message:err.message
                        });
                    }

                    return res.json({
                        success:true,
                        message:"Added To Cart"
                    });

                }
            );

        }

    }
);
      
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

const updateCartItem = (req, res) => {
    const cartId = req.params.id ;

    const { quantity }  = req.body ;
    if( quantity < 1)
    {
        return res.status(400).json({
            success: true,
            message: "Quantity must be atleast 1 "
        });

    }

    Cart.updateCartItem(cartId, quantity , (err) => {
        if(err) {
            return res.status(500).json({
                success: true,
                message : err.message
            });

        }
        res.json({
            success: true,
            message : "Cart Quantity updated"
        });
    });
};

module.exports = {
    addItemToCart, getCart, removeItem , updateCartItem
};