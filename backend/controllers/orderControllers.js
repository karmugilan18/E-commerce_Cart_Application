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

const getOrderDetails = (req, res) => 
{
    const orderId = req.params.id;

    Order.getOrderDetails(orderId, (err, results) => {
        if(err)
        {
            return res.status(500).json({
                success: false ,
                message:err.message
            });
        }
        if(results.length === 0)
        {
            return res.status(404).json ({
                success: false,
                message: "Order not found "
            });

        }

        const order = {
            id: results[0].id,
            total_amount: results[0].total_amount , 
            created_at: results[0].created_at
        };

        const items = results.map(item => ({
            name: item.name , 
            price : item.price ,
            quantity: item.quantity
        }));

        res.json({
            success: true, 
            order, items
        });
    });
};

module.exports = { placeOrder , getOrders , getOrderDetails};
