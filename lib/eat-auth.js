'use strict';

// Bring in the Encryption Authorization Token
// https://github.com/toastynerd/eat
// eat is designed specifically to defeat CSRF
var eat = require('eat');

// Bring in the User constructor
var User = require('../models/User');

module.exports = function(appSecret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if (!token) return res.status(403).send({msg: 'could not authenticate - 14'});
    console.log("Problem with the token. Did you restart the server?");

    eat.decode(token, appSecret, function(err, decoded) {

      if (err) return res.status(403).send({msg: 'could not authenticate - 19'});

      User.findOne({_id: decoded.id}, function(err, user) {

        if (err) return res.status(403).send({msg: 'could not authenticate - 23'});

        if(!user) return res.status(403).send({msg: 'could not authenticate - 25'});

        req.user = user; // this is how to persist user data across middleware
        next(); // goes to the next piece of middleware; the next function in our route

      }); // closes User.findOne
    }); // closes eat.decode
  }; // closes the main function
}; // closes module.exports

// superagent localhost:3000/api/v1/create-user post '{"email": “fart@knocker.com", "password": “flatus"}'
