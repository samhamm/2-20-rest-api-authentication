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
        expect(res.body.color).to.eql('orange and white');
        done();
      });
  });
