const Review = require("../models/reviewModel");

const createReview = (req , res) => {
    const userId = req.user.id;

    const{ productId , rating ,comment } = req.body;

    if(!productId || !rating ) {
        return res.status(400).json({
            success: false, 
            message : "product and rating are required"
        });

    }

    if( rating <1 || rating > 5)
    {
        return res.status(400).json({
            success:false, 
            message: "rating between 1 and 5"

        });
    }

    Review.createReview(
        userId , productId, rating , comment , (err , result) => {
            if(err) {
                if(err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        sucess: false,
                        message:"you already reviewed this product"
                    });
                }

                return res.status(500).json({
                    success: false,
                    message:err.message
                });  
            }

            return res.status(201).json({
                success: false,
                message: "Review added successfully"
            });
        }

    );
};

const getReviews = (req, res) => {
    const productId  = req.params.productId;

    Review.getReviewsByProduct(productId, (err, results) => {
        if( err)
        {
            return res.status(500).json({
                success: false, 
                message: err.message
            });

        }
        res.json({
            success: true, 
            reviews: results
        });
    });
};

module.exports = {
    createReview, getReviews
};