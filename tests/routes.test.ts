import { API_URL, API_USERNAME, API_PASSWORD } from '../src/config'
import app from '../src/app'

const request = require("supertest");
const assert = require("assert")

describe('GET /', () => {

    let agent;
    let server;
    beforeEach(done => {
        server = app.listen(4000, err => {
            if (err) return done(err);

            agent = request(server);
            done();
        });
    });
    afterEach(done => {
        server && server.close(done);
    });

    it('should return statusCode 200 and merged flights', async () => {
        const response = await agent.get('/');
        expect(response.status).toBe(200);
        expect(response.body);

    })

    it('should return statusCode 503 if timeout', async () => {

        app.get("/timeout", async (req, res) => {
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 1500)
                if (req.timedout) return reject;
            });
        });
        const response = await agent.get('/timeout');
        expect(response.status).toBe(503);
        expect(response.body);
    })
})

describe('FLIGHTS API GET /source1', () => {
    it('should return statusCode 200 and source1 flights', async () => {
        request(API_URL)
            .get('/source1')
            .expect(200)
            .then(response => {
                assert(response.body)
            })
    })
})

describe('FLIGHTS API GET /source2', () => {
    it('should return statusCode 200 and source2 flights', async () => {
        request(API_URL)
            .get('/source2')
            .expect(200)
            .auth(API_USERNAME, API_PASSWORD)
            .then(response => {
                assert(response.body)
            })

    })
})