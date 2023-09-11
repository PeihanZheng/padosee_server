// import modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const should = chai.should();

// use chaiHttp
chai.use(chaiHttp);

// describe the test
describe('User API', () => {
    // run get all users test
    it('should return all users', (done) => {
        chai.request(app)
            .get('/users')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.data.should.be.a('array');
                done();
            });
    });

    // run post single user test
    it('should post a single user', (done) => {
        // create a user object
        const user = {
            first_name: "Becky",
            last_name: "Lim", 
            user_type: "secondary",
            email_address: "becky@mail.com",
            phone: "+6590175999",
            address: "14 Neil Road P.O 3214",
            gender: "female",
            user_password: "12345abc"
        }

        // send the user object to the database
        chai.request(app)
            .post('/users')
            .send(user)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            });
    });
});