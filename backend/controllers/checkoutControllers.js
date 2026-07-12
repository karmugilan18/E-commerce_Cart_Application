const Cart = require ("../models/cartModel");
const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
  
const checkout = (req, res) => {
    const userId = req.user.id;
    Cart.getCartByUser(userId, (err, cartItems ) => {
        if(err)
        {
            return res.status(500).json({
                success: false,
                message : err.message
            });

        }
        if(cartItems.length === 0)
        {
            return res.status(400).json({
                success: false,
                message : "Cart is empty"
            });
        }
        let  total =0;

        cartItems.forEach(item => {
            total+= item.price * item.quantity;

            
        });
        Order.createOrder(userId , total , (err , orderResult)=> {
            if(err)
            {
                return res.status.json({
                    status: false, 
                    message : err.message 
                });

            }
            const orderId = orderResult.insertId;
            let completed = 0;
            cartItems.forEach(item => {
                OrderItem.createOrderItem( orderId , item.product_id , item.quantity, (err) =>
                {
                    if(err)
                    {
                        return res.status(500).json ({
                            success: false,
                            message: err.message 
                        });
                    }
                    completed++;
                    if(completed === cartItems.length)
                    {
                        Cart.clearCart( userId, () => {
                            res.json({
                                success: true, 
                                message : "Checkout Successfull",
                                orderId
                            });
                        });
                    }
                });
            });
        });

    });
};

module.exports = { checkout};
