'use strict'; // always; see bottom of this file for details
var express = require('express');
var mongoose = require('mongoose');
var petsRoutes = require('./routes/pets-routes');
var userRoutes = require('./routes/user-routes');
var passport = require('passport');
var morgan = require('morgan');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pets-app-development');

var app = express();
app.use(morgan('dev'));
app.set('appSecret', process.env.SECRET || 'dingdong');
app.use(passport.initialize());
require('./lib/passport-strat')(passport);

var petsRouter = express.Router(); // router for database actions
var userRouter = express.Router(); // router for authentication

petsRoutes(petsRouter, app.get('appSecret'));
userRoutes(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', petsRouter);
app.use('/api/v1', userRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('The server is listening on port ' + (process.env.PORT || 3000));
});
