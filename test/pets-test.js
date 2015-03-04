'use strict';

process.env.MONGO_URI = 'mongodb://localhost/db-test';
require('../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

require('end-point-tests.js');

require('get-put-del-tests.js');


  });
});
