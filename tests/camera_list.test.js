// import modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const should = chai.should();

// use chaiHttp
chai.use(chaiHttp);

// describe the test
describe('Camera API', () => {
    // get all cameras
    it('should return all cameras', (done) => {
        chai.request(app)
            .get('/cameras')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.data.should.be.a('array');
                done();
            });
    });

    // post single camera
    it('should post a single camera', (done) => {
        // create a camera object
        const camera = {
            cam_name: "TR201",
            cam_location: "living room",
            analytics_deployed: "fr",
            is_assigned: "true",
            rtsp_link: "https://rtsp.rottte.com/",
            user_id: 19
        };  
        chai.request(app)
            .post('/cameras')
            .send(camera)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            });
    });
});