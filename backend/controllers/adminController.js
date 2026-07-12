const db = require ("../config/db");

//db doing here

const getStats = (req , res) => {
    const stats ={};
    db.query("select count(*) as totalUsers from users", (err, userResults)=> {
        if(err) 
        {
            return res.status(500).json({
                success: false,
                message : err.message
            });

        }
        stats.totalUsers = userResults[0].totalUsers;

        db.query("select count(*) as totalProducts from products" , (err, productResult) => {
            if(err)
            {
               return res.status(500).json({
                success: false,
                message : err.message
               }); 
            }
            stats.totalProducts = productResult[0].totalProducts;

            db.query("select count(*) as totalOrders from orders", (err, orderResult) => {
                if(err)
                {
                    return res.status(500).json({
                        success: false,
                        message : err.message
                    });
                }

                    stats.totalOrders = orderResult[0].totalOrders;

                    db.query ("select sum(total_amount) as revenue from orders",(err, revenueResult) => {
                        if(err)
                        {
                            return res.status(500).json ({
                                success: false,
                                message: err.message
                            });
                        }
                            stats.totalRevenue = revenueResult[0].revenue || 0;

                            res.json({
                                success : true , 
                                stats
                            });

                        
                    });
                
            });
        });
    });
};

module.exports = { 
    getStats
};