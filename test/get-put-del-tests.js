describe('already has data in database', function() {
    var id;
    before(function(done) {
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
        .delete('/pets/' + id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body._id).to.eql(undefined);
          done();
        });
    });
