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

//add a pagination function 
const getProducts = (page, limit , callback) => {
    const offset = (page-1)*limit;


    const sql = 'SELECT * from products LIMIT ? OFFSET ?';

    db.query(sql , [Number(limit), Number(offset)] , callback )
};


module.exports = {
    getAllproducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts

};