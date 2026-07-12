const db = require("../config/db");

const addtoCart = (userId , productId , quantity , callback ) =>
{
    const sql = `insert into cart (user_id, product_id,quantity) values (?,?,?)`;
    db.query (sql, [userId ,productId, quantity],callback);

};
/*
const getCartByUser = (userId, callback) =>
{
    const sql = `select cart.id, products.name,  products.price ,cart.quantity from cart inner join products on cart.product_id = products.id where cart.user_id = ?`;

    db.query(sql , [userId], callback);

};
*/

const removeCartItem = (cartId, callback ) => {
    const sql = "delete from cart where id =?";

    db.query(sql , [cartId], callback);

};

const getCartByUser = (userId, callback) =>
{
    const sql = `select c.product_id, c.quantity , p.price from cart c join products p on c.product_id =p.id where c.user_id=? `;

    db.query(sql , [userId], callback);
};

const clearCart = (userId , callback )=> {
    const sql = "delete from cart where user_id = ?";
    db.query(sql , [userId], callback);

};




module.exports = { addtoCart , getCartByUser , removeCartItem,clearCart};
