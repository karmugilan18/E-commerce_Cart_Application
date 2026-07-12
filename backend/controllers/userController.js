const getProfile = (req,res) => {
    res.json({
        success: true, 
        user: req.user
    });

};

const getDashboard =(req,res) => {
    res.json ({
        message: " WElcome to Dashboard"
    });
};

module.exports = {
    getProfile, getDashboard
};



