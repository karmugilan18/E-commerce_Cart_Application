const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//save user in database
const registerUser = async(req , res) => {
    try {
        
        const{
            name ,email , password,} = req.body; 

        if(!name || !email || !password )
        {
            return res.status(400).json ({
                success:false,
                message: "All fields are required"
            });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser(name , email , hashedPassword, (err,result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message : err.message
                });
            }
            res.status(201).json({
                success: true,
                message : "User Register Successfully "

            });
        });
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message:error.message
        });
    }
};

//login
const jwt = require("jsonwebtoken");

const loginUser = (req, res) => {
    const {email, password} =req.body;
    User.findUserByEmail(email,async (err, results) => {

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password required"
            });
        }
        if(results.length>0)
        {
            return res.status(400).json({
                success: false, 
                message:"Email already exists"
            });

        }
        if(err)
        {
            return res.status(500).json({
                success:false,
                message :err.message
            });
        }
        if(results.length === 0)
        {
            return res.status(404).json ({
                success : false,
                message:"user not found "
            });
        }
        const user = results[0];

        const isMatch = await bcrypt.compare(password , user.password);
        
        if(!isMatch) {
            return res.status(401).json({
                success: false ,
                message : "invalid password"
            });
        }
        const token = jwt.sign(
            {
                id: user.id , email: user.email 
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "1d"
            }
        );
        res.json({
            success: true,
            token
        });
    });
};



module.exports = {
    registerUser, loginUser
};