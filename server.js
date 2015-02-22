'use strict'; // always; see bottom of this file for details

// Steps:
// 1. Express: require it, and declare variables
// 2. Passport: require it, to support authentication
// 3. Join together Express and Passport
// 4. Set up Mongo for this app
// 5. HTTP REST definitions live in the /routes modules
// 6. Join your HTTP definitions and Express
// 7. Configure URLs as desired
// 8. Tell the server where to listen

// 1. Express: require it, and declare variables
// http://expressjs.com/api.html#router (lots of info here!)
// Read it closely!
var express = require('express');
var app = express();
var petsRouter = express.Router(); // router for database actions
var userRouter = express.Router(); // router for authentication

// 2. Passport: require it, to support authentication
var passport = require('passport');

// 3. Join together Express and Passport
// app.set the (name, value) of the secret from Express to Passport:
app.set('appSecret', process.env.SECRET || 'A-wop-bom-a-loo-mop-a-lomp-bom-bom!');
// Just as it looks, this initializes Passport:
app.use(passport.initialize());
// Bring in the passport-http authentication strategy:
require('./lib/passport-strat')(passport);

// *** 4. Set up Mongo for this app
// http://docs.mongodb.org/manual/reference/method/connect
// connect() makes a connection to a MongoDB instance.
// http://docs.mongodb.org/manual/reference/connection-string
// process.env.MONGO_URI is a Node way to get the Uniform Resource Identifier.
// mongodb:// is the required prefix to identify that this is a string in standard conneection format.
var mongoose = require('mongoose');
// This opens the default Mongoose connection.
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pets-app-development');

// ***5. HTTP REST definitions live in the /routes modules
var petsRoutes = require('./routes/pets-routes');
// var userRoutes could be here; see the alternate approach in the next step

// ***6. Join your HTTP definitions and Express
// HTTP(Express) with myRoutesModuleUsing(express.Router())
// This one is for the database:
petsRoutes(petsrouter);
// This one is for authentication:
require('./routes/user-routes')(userRouter, passport, app.get('appSecret'));
// Note: the preceding line is just an alternate way to do Step 5 for userRoutes.
// Tyler showed it to us just to expose us to it. (Or to fuck with us.)
// We could have just used userRoutes(userRouter, passport...) in its place, after declaring var userRoutes the way petsRoutes was declared.

// *** 7. Configure URLs as desired
// http://expressjs.com/api.html#router.use
// '/api/v1' is the version for our app and will be appended to the route for dev purposes.
// The dev version of app will be localhost:3000/api/v1/pets for testing.
// We've not talked about deployment, but I bet this goes away at that stage.
app.use('/api/v1', notesRouter);
app.use('/api/v1', userRouter);

// *** 8. Tell the server where to listen
app.listen(process.env.PORT || 3000, function() {
  console.log('The server is listening on port ' + (process.env.PORT || 3000));
});

// Steps (displayed again for redundant redundancy):
// 1. Express: require it, and declare variables
// 2. Passport: require it, to support authentication
// 3. Join together Express and Passport
// 4. Set up Mongo for this app
// 5. HTTP REST definitions live in the /routes modules
// 6. Join your HTTP definitions and Express
// 7. Configure URLs as desired
// 8. Tell the server where to listen

// Why Strict Mode?
// http://www.w3schools.com/js/js_strict.asp
// * Strict mode makes it easier to write "secure" JavaScript.
// * Strict mode changes previously accepted "bad syntax" into real errors.
// * As an example, in normal JavaScript, mistyping a variable name creates a new global variable. In strict mode, this will throw an error, making it impossible to accidentally create a global variable.
// * In normal JavaScript, a developer will not receive any error feedback assigning values to non-writable properties.
// * In strict mode, any assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object, will throw an error.
