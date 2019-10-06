const chai = require('chai');
const { expect } = chai;
const should = chai.should();
const url = `http://localhost:4000/graphql`;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('Returns blocks', (done) => {
        request.post('/graphql')
            .send({
                query: `{ 
                    listBlocks {
                        id
                    }
                }` })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.data.listBlocks.should.be.a('array');
                done();
            })
    })
});