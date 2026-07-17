const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
const PORT = process.env.PORT || 5000;

//using teh file of teh cores because different ports la
app.use(cors());

//enabel json 
app.use(express.json());
//get Route
app.get("/", (req,res)=> {
    res.send("E-Commerce backend running ");

});

/*


// Start server
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/api/test",(req,res) => {
    res.json({
        sucess:true,
        message: "API Working "
    });
});

app.get("/api/hello" , (req,res) => {
    res.json({
        message:"hello user"

    });
});
*/
// file taken 
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const chectoutRoutes = require("./routes/checkoutRoutes");

const adminRoutes =  require("./routes/adminRoutes");

const errorhandler = require("./middleware/errorMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

//using the products site


app.use("/api/user",userRoutes );
app.use("/api/auth", authRoutes);
app.use("/api/cart" , cartRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders/checkout", chectoutRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);;



//listen


//without this undefined;



app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);

});
