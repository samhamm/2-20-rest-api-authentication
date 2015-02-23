'use strict';

// Bring in the schema for the user
var User = require('../models/User');

// https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');

// Define the RESTful HTTP behaviors for /user
module.exports = function(app, passport, appSecret) {
  app.use(bodyParser.json());

  //POST
  app.post('/create-user', function(req, res) {
    var newUser = new User();
    newUser.basic.email = req.body.email;  // was req.body.email
    newUser.basic.password = newUser.generateHash(req.body.password); //changed 'basic'

    newUser.save( function(err, user){

      if (err) return res.status(500).send ({msg: 'error: could not create user - 21'});

      user.generateToken(appSecret, function(err, token) {
        if (err) return res.status(500).send ({msg: 'error: could not generate token - 24'});

        res.json({eat: token});
      }); // closes user.generateToken
    }); // closes newUser.save
  }); // closes app.post

  // GET
  app.get('/sign-in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(appSecret, function(err, token) {

      if (err) return res.status(500).send ({msg: 'error: could not generate token - 35'});

      res.json({eat: token});
    }); // closes req.user.generateToken
  }); // closes app.get

}; // closes module.exports
