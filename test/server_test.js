let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let expect = require('chai').expect;
var fs = require('fs');
chai.use(chaiHttp);

describe('API GET /', () => {
      it('it should return an API is working message', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                 expect(res).to.have.status(200);
				 expect(res.text).to.include('API is working.');
				done();
            });
      });
  });
  
  describe('GET API /api/phonenumbers/parse/text/', () => {
      it('it should return a [] array if nothing is passed in', function(done) {
        chai.request(server)
            .get('/api/phonenumbers/parse/text/nothing')
            .end((err, res) => {
                 expect(res).to.have.status(400);
				 expect(res.text).to.include('[]');
				done();
            });
      });
	  
	  it('it should return an array with values of 416-491-5050', function(done) {
        chai.request(server)
            .get('/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-491-5050')
            .end((err, res) => {
                 expect(res).to.have.status(200);
				 expect(res.text).to.include('+1 416-491-5050');
				done();
            });
      });
  });
  
  describe('POST API /api/phonenumbers/parse/file/', () => {
      it('it should return an array with numbers +6731831383, +14435531167, 416-234-2393', function(done) {
        chai.request(server)
            .post('/api/phonenumbers/parse/file')
			.set('Content-Type', 'text/plain;charset=base64')
			.attach('file', fs.readFileSync('./test.txt'), 'test.txt')
			.end((err, res) => {
                 expect(res).to.have.status(200);
				 expect(res.text).to.include('+673 1831383', '+1 443-553-1167', '+1 416-234-2393');
				done();
            });
      });
  });