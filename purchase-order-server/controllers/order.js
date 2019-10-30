const connection = require('../db.js');
var mysql = require('mysql');
var async = require('async');

const orderController = {
    getAll: function (params, callback) {
        console.log('params', params["data"]);
        let data = params["data"];
        async.forEachOf(data, function (dataElement, i, inner_callback){
            console.log(dataElement, i);
            let order_product_id = dataElement["product_id"];
            let order_warehouse_id = dataElement["warehouse_id"];
            let quantity = dataElement["quantity"];
            console.log("what we require", order_product_id, order_warehouse_id, quantity);
            let count_inserts = [order_product_id, order_warehouse_id];
            let count_query = "select count(product_id) as counted_rows from stock_avail where product_id = ? AND warehouse_id = ?;";
            let new_entry_inserts = [order_product_id, quantity, order_warehouse_id];
            let new_entry_query = "insert into stock_avail (product_id, quantity, warehouse_id) VALUES (?, ?, ?);";
            let update_inserts = [quantity, order_warehouse_id, order_product_id];
            let update_query = "update stock_avail set quantity = quantity + ? where warehouse_id = ? AND product_id = ?;"
            connection.query({
                sql: mysql.format(count_query, count_inserts),
                timeout: 40000
            }, function(err, results, fields){
                if(!err){
                    console.log("And the result is: ", results[0].counted_rows);
                    if(results[0].counted_rows > 0) {
                        console.log("It is greater than zero");
                        connection.query({
                            sql: mysql.format(update_query, update_inserts),
                            timeout: 40000
                        }, function(err, results, fields){
                            if(!err){
                                console.log("results:", results);
                            }
                            else {
                                console.log("Error while performing Query");
                                inner_callback(err);
                            }
                        });
                    }
                    else {
                        console.log("It is equal to 0");
                        connection.query({
                            sql: mysql.format(new_entry_query, new_entry_inserts),
                            timeout: 40000
                        }, function(err, results, fields){
                            if(!err){
                                console.log("results:", results);
                            }
                            else {
                                console.log("Error while performing Query");
                                inner_callback(err);
                            }
                        });
                    }
                    inner_callback(null);
                } else {
                    console.log("Error while performing Query");
                    inner_callback(err);
                };
            });
        }, function(err){
            if(err){
              //handle the error if the query throws an error
              return callback(err, null);
            }else{
              //whatever you wanna do after all the iterations are done
              return callback(null, "OK");
            }
        });
    }
}

module.exports = orderController;
