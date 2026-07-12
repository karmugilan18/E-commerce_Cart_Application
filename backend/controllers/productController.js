//save in array empty
/*
const getProducts = (req,res) => {
    res.json ({
        success:true,
        product:[]
    });

};

const getproductById = (req,res) => {
    res.json({
        id: req.params.id,
        name:"Sample product"
    });
};

module.exports = {getProducts ,  getproductById};
*/
const Product = require("../models/productModel");

const getProducts = (req , res) => {
    Product.getAllproducts((err, results) => {
        if(err) {
            return res.status(500).json ({
                success : false,
                message: err.message
            });
        }
        res.json({
            success : true,
            count: results.length,
            products: results
        });
    });
};

const getProductById = (req, res) => {
    const id = req.params.id;
    Product.getProductById(id, (err, results)=> {
        if(err) {
            return res.status(500).json ({
                success:false
                
            });
        }
        if(results.length === 0)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });

        }
        res.json({
            success: true,
            product : results[0]
        });
    });
};

const addProduct = (req,res) => 
{
    const { name , price , description } = req.body ;

    if(!name || !price){
        return res.status(400).json({
            success:false,
            message:"Name and Price required"
        });
    }
    Product.createProduct( name, price,description, (err, results) => 
    {
        if(err)
        {
            return res.status(500).jsonon({
                    success: false,
                    message: err.message
            });

        }

        res.status(201).json ({
            success: true,
            message: "product Added"
        });

    });
}

const updateProduct = (req,res)=> {
    const id = req.params.id;

    const { name , price ,  description } = req.body;

    Product.updateProduct (id, name ,price, description, (err) => {
        if(err)
        {
            return res.status(500).json({
                success: false,
                message: err.message
            });

        }
        res.json({
            success: true,
            message : "product updated"
        });

    });
};

const removeProduct = (req,res)=> {
    const id = req.params.id;

    Product.deleteProduct(id , (err , result) => {
        if(result.affectedRows === 0)
        {
            return res.status(404).json({
                success: false,
                message : " Product not found"
            });
        }
        if(err)
        {
            return res.status(500).json({
                success: false,
                messsage : err.message
            });

        }
        res.json({
            success: true,
            message : "product Deleted"
        });
    });
};
module.exports = { getProducts , getProductById,addProduct,updateProduct,removeProduct};
