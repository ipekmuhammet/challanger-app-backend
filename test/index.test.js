const chai = require('chai')
const { expect } = chai
const should = chai.should()
const url = `http://localhost:4000/graphql`
const request = require('supertest')(url)

let token

describe('GraphQL', () => {
    it('listBlocks', (done) => {
        request.post('/graphql')
            .send({
                query: `query{
                    listBlocks(data: { blocker: "5d749a873384ee2c64518013" }) {
                      id
                    }
            }` })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listBlocks.should.be.a('array')
                done()
            })
    })

    it('createUser', (done) => {
        request.post('/graphql')
            .send({
                query: `mutation{
                saveUser(
                    data: {
                      username: "testDeneme"
                      name: "testDeneme"
                      password: "testDeneme"
                    }
                  ) {
                    token
                  }
            }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                //res.body.data.saveUser.token.should.be.a('string')
                done()
            })
    })

    it('signIn', (done) => {
        request.post('/graphql')
            .send({
                query: `mutation {
                    signIn(data: { username: "testDeneme", password: "testDeneme" }) {
                        token
                    }
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.signIn.token.should.be.a('string')
                token = res.body.data.signIn.token
                done()
            })
    })

    it('getActiveUser', (done) => {
        request.post('/graphql')
            .send({
                query: `{
                    getActiveUser(
                        data: { token: "${token}"} ) {
                            id
                            username
                        }
                    }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.getActiveUser.should.be.a('object')
                done()
            })
    })
})