'use strict';

// Bring in the Encryption Authorization Token
var eat = require('eat');

// Bring in the User constructor
var User = require('../models/User');

module.exports = function(appSecret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if (!token) return res.status(403).send({msg: 'could not authenticate'});
    console.log("Problem with the token. Did you restart the server?");

    eat.decode(token, appSecret, function(err, decoded) {

      if (err) return res.status(403).send({msg: 'could not authenticate'});

      User.findOne({_id: decoded.id}, function(err, user) {

        if (err) return res.status(403).send({msg: 'could not authenticate'});

        if(!user) return res.status(403).send({msg: 'could not authenticate'});

        req.user = user;
        next();

      }); // closes User.findOne
    }); // closes eat.decode
  }; // closes the main function
}; // closes module.exports
