'use strict';

process.env.MONGO_URI = 'mongodb://localhost/db-test';
require('../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect

describe('pets api end points', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
    done();
    });
  });

  it('should respond to a POST request', function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/pets')
      .send({name: 'Buddy', color: 'orange and white'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.eql('Buddy');
        // expect(res.body.color).to.eql('orange and white');
        done();
      });
  });

  describe('already has data in database', function() {
    var id;
    beforeEach(function(done) {
      chai.request('localhost:3000/api/v1')
        .post('/pets')
        .send({name: 'Alistair'})
        .end(function(err, res) {
          id = res.body._id;
          done();
        });
    });

    it('should have an index', function(done) {
      chai.request('localhost:3000/api/v1')
        .get('/pets')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.be.true;
          expect(res.body[0]).to.have.property('name');
          done();
        });
    });

    it('should be able to update a pet', function(done) {
      chai.request('localhost:3000/api/v1')
        .put('/pets/' + id)
        .send({name: 'Demi'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql('Demi');
          done();
        });
    });

    it('should be able to delete a pet', function(done) {
      chai.request('localhost:3000/api/v1')
        .delete('/makeups/' + id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body._id).to.eql(undefined);
          done();
        });
    });
  });
});
