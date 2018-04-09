describe('Server', () => {
    var server;
    beforeAll(() => {
        var app = require('../app');
        server = app.listen(3000, () => {
            console.log('Listening on port ' + server.address().port + '...');
        });
    });
    afterAll(() => {
        // server.close(); --> cause error
    });
    describe('GET /', () => {
        var data = {};
        beforeAll((done) => {
            Request.get('http://localhost:3000/', (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
                 	
                	/*
	                	In this group of tests we issue an HTTP request against our endpoint
	                	before trying to test anything. Because it is an asynchronous event,
	                  	we need to work with the done callback. The done callback says,
	                   	don’t move along to each test until we’re ready. 
                   	*/
                
            });
        });
        /* Note => represents a function that doesn't change 'this' variable */
        it('Status 200', () => {
            expect(data.status).toBe(200);
        });
    });
    describe('GET /test', () => {
        var data = {};
        beforeAll((done) => {
            Request.get('http://localhost:3000/test', (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it('Status 500', () => {
            expect(data.status).toBe(500);
        });
        it('Body', () => {
            expect(data.body.message).toBe('This is an error response');
        });
    });
});