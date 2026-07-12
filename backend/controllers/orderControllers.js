const Order = require("../models/orderModel");

const placeOrder = (req, res ) => {
    const userId = req.user.id;

    const { totalAmount }  = req.body;

    Order.createOrder( userId , totalAmount , (err , result)=>
    {
        if(err) 
        {
            return res.status(500).json({
                success: false ,
                message: err.message
            });

        }
        res.status(201).json ({
            sucess: true , 
            message : "Order Created ",
            orderId : result.insertId
        });
    });
};

const getOrders = (req, res)=> {
    const userId = req.user.id;
    Order.getOrderByUser( userId , (err, results) => {
        if(err) 
        {
            return  res.status(500).json({
                success: false,
                message: err.message
            });

        }
        res.json({
            success:true,
            orders: results

        });
    });
};

module.exports = { placeOrder , getOrders};
