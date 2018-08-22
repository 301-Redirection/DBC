/* Jasmine specs are a description of a feature,
or a unit of code. This is why the specs usually start with a describe
block that contains tests connected with that feature. */

/*
    some documentation:
    http://jasmine.github.io/2.0/introduction.html#section-Included_Matchers
*/

/* describe -- represents a test suite
    @param description -- string of test
    @param closure -- function to test with
*/

/* it -- represents an actual test
    @param description -- string of test
    @param closure -- function to test with
*/

const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '../backend');
require('module').Module._initPaths();
const Request = require('request');
const sinon = require('sinon');

let jwtStub;

describe('Server', () => {
    let server;
    beforeAll(() => {
        const jwtCheck = require('routes/jwtCheck');
        jwtStub = sinon.stub(jwtCheck, 'jwtCheck')
            .callsFake((req, res, next) => {
                req.user = {};
                req.user.sub = 'auth0|5aaad1a6aa9ad130c17479ba';
                return next();
            });
        // after you can create app:
        const app = require('app.js');

        server = app.listen(3000, () => {
            console.log(`\n\n\n\n\n\nListening on port ${server.address().port} ...`);
        });
    });
    afterAll(() => {
        server.close();
        jwtStub.restore();
    });
    describe('GET /', () => {
        const data = {};
        beforeAll((done) => {
            Request.get('http://localhost:3000/', (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
                // In this group of tests we issue an HTTP request against our endpoint
                // before trying to test anything. Because it is an asynchronous event,
                // we need to work with the done callback. The done callback says,
                // don’t move along to each test until we’re ready.
            });
        });
        // Note => represents a function that doesn't change 'this' variable
        it('Status 200', (done) => {
            expect(data.status).toBe(200);
            done();
        });
    });
    describe('GET /test', () => {
        const data = {};
        beforeAll((done) => {
            Request.get('http://localhost:3000/test', (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it('Status 500', (done) => {
            expect(data.status).toBe(500);
            done();
        });
        it('Body', (done) => {
            expect(data.body.message).toBe('This is an error response');
            done()
        });
    });
});
