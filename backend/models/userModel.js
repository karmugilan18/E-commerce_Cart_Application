const db = require("../config/db");
//query from user
const createUser = (name ,email , password, callback ) => {
    const spl = `insert into users (name, email, password) values (?,?,?)`;
    db.query(spl , [name ,email,password],callback);
};

const findUserByEmail = (email , callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql , [email], callback);

};

module.exports = {createUser, findUserByEmail};