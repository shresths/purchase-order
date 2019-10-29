const connection = require('../db.js');

const productController = {
    getAll: function (params, callback) {
        connection.query({
            sql: 'select product_id, product_price from product;',
            timeout: 40000, // 40s
        },function (error, results, fields) {
            // error will be an Error if one occurred during the query
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            console.log("results", results);
            console.log("error", error);
            if (error) {
                return callback(error, null);
            }
            console.log("product id", results);
            return callback(null, results);
            }
        );
    }
}

module.exports = productController;
