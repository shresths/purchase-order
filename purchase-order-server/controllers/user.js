const connection = require('../db.js');
var mysql = require('mysql');

const userController = {
    getUser: function (params, callback) {
        let email = params["email"];
        let password = params["password"];
        let login_inserts = [email, password];
        let login_query = "select * from user where email = ? AND password = ?"
        connection.query({
            sql: mysql.format(login_query, login_inserts),
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
            return callback(null, results);
            }
        );
    },

    getUserByID: function (params, callback) {
        let id = params["id"];
        let login_inserts = [id];
        let login_query = "select * from user where user_id = ?"
        connection.query({
            sql: mysql.format(login_query, login_inserts),
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
            return callback(null, results);
            }
        );
    }
}

module.exports = userController;
