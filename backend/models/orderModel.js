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


module.exports = {
    createOrder,
    getOrderByUser
};
