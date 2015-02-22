'use strict';

// 1. We are using the BasicStrategy scheme from passport-http.
// 2. Declare a variable for the user.
// 3. Direct the user email+password into the BasicStrategy for verification and export this function for synchronous use in the server.

// 1. We are using the BasicStrategy scheme from passport-http.
// https://github.com/jaredhanson/passport
// "Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies."
// https://github.com/jaredhanson/passport-http
// "The HTTP Basic authentication strategy authenticates users using a userid and password. The strategy requires a 'verify' callback, which accepts these credentials and calls done providing a user."
// https://github.com/jaredhanson/passport/wiki/Strategies
var BasicStrategy = require('passport-http').BasicStrategy;

// 2. Declare a variable for the user.
var User = require('./models/User');

// 3. Direct the user email+password into the BasicStrategy for verification and export this function for synchronous use in the server.
module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({}, function(email, password, done){
    User.findOne({'basic.email': email}, function(err, user){

      if (err) return done('could not authenticate');
      console.log("Error with authentication. Has the server been restarted?")

      if (!user) return done('could not authenticate');
      console.log("Error: the email " + email + " does not appear to be in the user database.");

      if (!user.validPassword(password)) return done('could not authenticate');
      console.log("Error: The password for " + email + " could not be validated. Has the server been restarted?")

      return done(null, user);
    }); //closes User.findOne
  })); //closes passport.use
}; //closes module.exports
