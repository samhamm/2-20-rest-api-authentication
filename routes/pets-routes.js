'use strict';

// Bring in the schema for the data
var Pet = require('../models/Pet');

// https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');

var eatAuth = require('../lib/eat-auth');

// Definte the RESTful HTTP behaviors for /pets
module.exports = function(app, appSecret) {
  app.use(bodyParser.json());

  //POST
  app.post('/pets', eatAuth(appSecret), function(req, res) {
    var newPet = new Pet(req.body);
    newPet.save(function(err, pet) {
      if (err) return res.status(500).send({'msg': 'error - could not save to pets'});
      res.json(pet);
    });
  });

  app.get('/pets', eatAuth(appSecret), function(req, res) {
    Pet.find({user_id: req.user._id}, function(err, data){
      if (err) return res.status(500).send({'msg': 'error - could not retrieve pets'});
      res.json(data);
    });
  });

  //PUT
  app.put('/pets/:id', eatAuth(appSecret), function (req, res) {
    var updatedPet = req.body;
    delete updatedPet._id;
    Pet.update({_id: req.params.id}, updatedPet, function(err) {
      if (err) return res.status(500).send({'msg': 'error updating pets'});
      res.json(req.body);
    });
  });

  //DELETE
  app.delete('/pets/:id', function (req, res) {
    Pet.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send({'msg': 'error deleting from pets'});
      res.json({msg: 'deleted from pets'});
    });
  });

}; //closes the module.exports
