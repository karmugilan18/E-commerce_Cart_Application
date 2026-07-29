const db = require("../config/db");
const { get } = require("../routes/authRoutes");

const createOrder = (userId , totalAmount , callback) =>
{
    const sql = `insert into orders (user_id , total_amount) values (?,?)`;

    db.query(sql , [userId , totalAmount ], callback );

};

const getOrderByUser = (userId , callback) => {
    const sql = `select * from orders where user_id = ? order by created_at desc`;

    db.query( sql, [userId], callback);

};

const getOrderDetails   = (orderId , callback ) => {
    const sql = `select o.id,o.total_amount,o.created_at,p.name,p.price,oi.quantity from orders o join order_items oi on o.id = oi.order_id join products p on oi.product_id = p.id where o.id = ?`;


    db.query(sql ,[orderId], callback);
};


module.exports = {
    createOrder,
    getOrderByUser,
    getOrderDetails 
};
