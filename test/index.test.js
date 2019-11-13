const chai = require('chai')
const { expect } = chai
const should = chai.should()
const url = `http://localhost:4000/graphql`
const request = require('supertest')(url)

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTk2OGZhMzA0MmJkMDQ0YzQyZWNiZSIsInVzZXJuYW1lIjoidGVzdERlbmVtZSIsImlhdCI6MTU3MzY3MzY4MiwiZXhwIjoxNTczOTc2MDgyfQ.C4XKGt34pLwASw3wPAeWmmTMKW5BdZnX7Cdfqs2ez60'

const createUserQuery = `
mutation{
    saveUser(
        data: {
        username: "testDeneme"
        name: "testDeneme"
        password: "testDeneme"
    }) {
        token
    }
}`

const signInQuery = `
mutation {
    signIn(data: { username: "testDeneme", password: "testDeneme" }) {
        token
    }
}`

const updatePasswordQuery = `
mutation {
    updatePassword(data: { oldPassword: "testDeneme", newPassword: "testDeneme" }) {
        id
        username
    }
}
`

const getActiveUserQuery = `
query {
    getActiveUser{
        id
        username
    }
}`

const listUsersQuery = `
query {
    listUsers(data: { key: "searchDeneme" }) {
        username
        name
    }
}  
`

//Block
const listBlocksQuery = `
query{
    listBlocks{
        id
    }
}`

//Chat
const listChatsQuery = `
query{
    listChats{
        user_id
    }
}`

describe('Users', () => {
    it('createUser', (done) => {
        request.post('/graphql')
            .set('authorization', token)
            .send({ query: createUserQuery })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                //res.body.data.saveUser.token.should.be.a('string')
                done()
            })
    })

    it('signIn', (done) => {
        request.post('/graphql')
            .set('authorization', token)
            .send({ query: signInQuery })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.signIn.token.should.be.a('string')
                //token = res.body.data.signIn.token
                done()
            })
    })

    it('updatePassword', (done) => {
        request.post('/graphql')
            .set('authorization', token)
            .send({ query: updatePasswordQuery })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                //console.log(res.body.data.updatePassword)
                //token = res.body.data.signIn.token
                done()
            })
    })

    it('getActiveUser', (done) => {
        request.post('/graphql')
            .set('authorization', token)
            .send({ query: getActiveUserQuery })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.getActiveUser.should.be.a('object')
                done()
            })
    })

    it('listUsers', (done) => {
        request.post('/graphql')
            .set('authorization', token)
            .send({ query: listUsersQuery })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listUsers.should.be.a('array')
                done()
            })
    })
})

describe('Blocks', () => {
    it('listBlocks', (done) => {
        request.post('/graphql')
            .set('authorization', token)
            .send({ query: listBlocksQuery })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listBlocks.should.be.a('array')
                done()
            })
    })
})

describe('Chats', () => {
    it('listChats', (done) => {
        request.post('/graphql')
            .set('authorization', token)
            .send({ query: listChatsQuery })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listChats.should.be.a('array')
                done()
            })
    })
})