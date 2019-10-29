// MySQL Cnnection
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'shruti',
  password : 'apple@123',
  database : 'purchase_order'
});

//checking mysql connection
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
}
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;