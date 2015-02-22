'use strict';

var mongoose = require('mongoose');

// "Schema design is a big topic and just something you kind of have to suffer through." - Tyler, 2/18

// This is where you describe the schema for the data
// http://mongoosejs.com/docs/guide.html
var petSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number,
  coloring: String,
  personality: String,
  livesWithUs: Boolean
});

// http://mongoosejs.com/docs/models.html
module.exports = mongoose.model('Pet', petSchema);
