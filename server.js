'use strict';

// *** Express variables
// http://expressjs.com/api.html#router (lots of info here!)
// Read it closely!
var express = require('express');
var app = express();
var router = express.Router();

// *** Connect to Mongo
// http://docs.mongodb.org/manual/reference/method/connect/
// connect() makes a connection to a MongoDB instance
// http://docs.mongodb.org/manual/reference/connection-string/
// process.env.MONGO_URI is a Node way to get the Uniform Resource Identifier
// mongodb:// required prefix to identify this is a string in std conn format
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pets-app-development');

// ***HTTP REST definitions live in this module
// Originally, Tyler had all of pets-routes in this file
// Making it into a module keeps things cleaner
var petsRoutes = require('./routes/pets-routes');

// ***Bring the pieces together: myRoutesModuleUsing(express.Router())
petsRoutes(router);

// http://expressjs.com/api.html#router.use
// '/api/v1' is the version for our app and will be appended to the route
// this app will be localhost:3000/api/v1/pets
app.use('/api/v1', router);

// ***Tell the server where to listen
app.listen(process.env.PORT || 3000, function() {
  console.log('The server is listening on port ' + (process.env.PORT || 3000));
});

// Steps:
// 1. Express: require it, and declare variables
// 2. Mongo: require it, and connect to an instance of it
// 3. Define the RESTful HTTP actions
// 4. Connect your HTTP definitions to Express
// 5. Tell the server where to listen
