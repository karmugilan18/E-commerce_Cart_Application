const db = require("../config/db");

const createReview =(userId , productId , rating , comment ,callback) => {
    const sql = 'insert into reviews (user_id , product_id , rating , comment) values (?,?,?,?)';

    db.query (sql , [userId , productId , rating , comment] , callback);

};

const getReviewsByProduct = (productId, callback) => {
    const sql = `
        select
            reviews.id , reviews.rating , reviews.comment , reviews.created_at, users.name
        from reviews 
        join users
        on reviews.user_id =users.id where reviews.product_id = ? order by reviews.created_at desc`;

        db.query(sql, [productId] , callback);


};

module.exports = {
    createReview , getReviewsByProduct
};