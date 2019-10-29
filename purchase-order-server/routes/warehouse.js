var express = require('express');
var warehouseController = require('../controllers/warehouse');
var router = express.Router();

const connection = require('../db.js');

/* GET warehouse listing. */
router.get('/', function(req, res, next) {
  /*
    - Get params from req
    - Create/Use mysql connection
    - DO query
    - Send result back with res
  */

  warehouseController.getAll({}, function(error, result) {
    console.log("error", error);
    if(error) {
      return res.status(500).send({ error });
    }

    res.status(200).send({ result });
  });

});

module.exports = router;