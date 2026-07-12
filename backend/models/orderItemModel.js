const db = require("../config/db");

const createOrderItem = (orderId, productId , quantity, callback ) =>{
    const sql = `insert into order_items (order_id , product_id , quantity ) values (?,?,?)`;
    db.query(sql , [orderId, productId, quantity] , callback);

};

module.exports = {createOrderItem};
