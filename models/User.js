'use strict';

// This is where we set up our database of users (email+password).
// Also, there are methods for:
// * hashing passwords
// * validating passwords
// * generating tokens

var mongoose = require('mongoose');

// bcrypt is an encryption library.
// We use this module to hash the passwords.
// https://www.npmjs.com/package/bcrypt-nodejs
var bcrypt = require('bcrypt-nodejs');

// eat = Encrypted Authentication Tokens
// We use this module to generate tokens.
// https://www.npmjs.com/package/eat
var eat = require('eat');

// This is where we describe the schema for the user
// http://mongoosejs.com/docs/guide.html
var userSchema = new mongoose.Schema({
  basic: {
    email: String,
    password: String
  },
  username: String
});

// These methods for User will be available throughout the app.
// Hash the password:
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Validate the password:
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

// Generate a new token:
userSchema.methods.generateToken = function(appSecret, callback) {
  eat.encode({id: this._id, timestamp: new Date()}, appSecret, callback);
};

module.exports = mongoose.model('User, userSchema');
