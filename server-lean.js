'use strict'; // always; see bottom of this file for details

var express = require('express');
var app = express();
var petsRouter = express.Router(); // router for database actions
var userRouter = express.Router(); // router for authentication

var passport = require('passport');

app.set('appSecret', process.env.SECRET || 'dingdong');

app.use(passport.initialize());

var morgan = require('morgan');
app.use(morgan('dev'));

require('./lib/passport-strat')(passport);

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pets-app-development');

var petsRoutes = require('./routes/pets-routes');

petsRoutes(petsRouter, app.get('appSecret'));

require('./routes/user-routes')(userRouter, passport, app.get('appSecret'));

var router = new express.Router();
router.get('/', function(req, res) {
  res.send('hello from router');
});

app.use('/api/v1', petsRouter);
app.use('/api/v1', userRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('The server is listening on port ' + (process.env.PORT || 3000));
});
