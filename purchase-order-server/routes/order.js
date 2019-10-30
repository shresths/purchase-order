var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order');

router.post('/', function(req, res, next) {
    
    let order_data = req.body;
    console.log(req.body);

    orderController.getAll(order_data, function(error, result) {
        console.log("error", error);
        console.log("data", order_data);
        if(error) {
          return res.status(500).send({ error });
        }
    
        res.status(200).send({ 'OK':'OK' });
    });
  
});

module.exports = router;