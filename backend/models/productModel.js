const db = require("../config/db");

const getAllproducts = (callback) => {
    const sql = "select * from products";
    db.query(sql,callback);
};

const getProductById = (id, callback) => {
    const sql = "select * from products where id = ?";
    db.query(sql, [id],callback);

};

const createProduct = (name , price , description , callback ) => {
    const sql = `insert into products (name , price , description ) values (?,?,?)`;
    db.query(sql , [name , price , description ], callback);

};

const updateProduct = (id , name , price , description , callback ) => {
    const sql = `update products set name = ? , price = ? , description =? where id =?`;

    db.query(sql , [name , price , description  ,id ], callback);

};

const deleteProduct = (id , callback) => 
{
    const sql = "delete from products where id =?";
    db.query(sql , [id],callback);

}

module.exports = {
    getAllproducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct

};