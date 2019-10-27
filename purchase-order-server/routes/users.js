var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  let body = req.body;
  console.log(body);
  res.send('users info received');
});

module.exports = router;
