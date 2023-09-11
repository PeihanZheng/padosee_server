// import modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const should = chai.should();

// use chaiHttp
chai.use(chaiHttp);

// describe the test
describe('Alert API', () => {
    // get all alerts
    it('should return all alerts', (done) => {
        chai.request(app)
            .get('/alerts')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.data.should.be.a('array');
                done();
            });
    });

    // get alert by user id
    it('should return alert by user id', (done) => {
        chai.request(app)
            .get('/alerts/user/19')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.data.should.be.a('object');
                done();
            });
    });
});