//configuration file like database connextion 
const mysql = require("mysql2");
const dotenv = require("dotenv");

//connect the dotenvironment file 
dotenv.config();

//conection 
const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});
//connection success 
connection.connect((err) => {
    if(err) {
        console.log("Database Connection Failed ");
        console.log(err.message);
        return;
    }
    console.log("MySQL connected Succesfully");
});

module.exports = connection;
