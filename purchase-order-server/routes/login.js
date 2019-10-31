var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
// import passport and passport-jwt modules
var passport = require('passport');
var passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

// strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = userController.getUserById({ id: jwt_payload.id });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  passport.use(strategy);

router.post('/', function(req, res, next) {
    
    let login_data = req.body;
    console.log(req.body);

    userController.getUser(login_data, function(error, result) {
        console.log("error", error);
        console.log("data", login_data);
        const {email, password} = login_data;
        console.log("res data", result, error, email, password);
        if(error) {
          return res.status(500).send({ error });
        }
        if(result.length < 1) {
          return res.status(401).send({ message: 'No email ID found' });
        }
        let id = result[0].user_id;
        let db_email = result[0].email;
        let db_password = result[0].password
        console.log("user", id, db_email, db_password);
        if (email && password) {
            if (!db_email) {
              res.status(401).send({ message: 'No email ID found' });
            }
            if (db_password === password) {
              // from now on we'll identify the user by the id and the id is the 
              // only personalized value that goes into our token
              let payload = { id: id };
              let token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({ msg: 'ok', token: token });
            } else {
              res.status(401).send({ msg: 'Password is incorrect' });
            }
        }
    });
  
});

module.exports = router;
