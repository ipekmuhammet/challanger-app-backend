require('chai').should()
const supertest = require('supertest')

const PORT = process.env.PORT || 4000
const url = `http://localhost:${PORT}/graphql`
const request = supertest(url)

let token,
    post_id,
    comment_id,
    user_id,
    username = 'test',
    name = 'test',
    password = 'test',
    key = 'searchDeneme'

const getToken = () => token

const createUserQuery = () => `
mutation {
    saveUser(
        data: {
        username: "${username}"
        name: "${name}"
        password: "${password}"
    }) {
        token
    }
}`

const signInQuery = () => `
mutation {
    signIn(data: { username: "${username}", password: "${password}" }) {
        token
    }
}`

const updatePasswordQuery = () => `
mutation {
    updatePassword(data: { oldPassword: "${password}", newPassword: "${password}" }) {
        id
        username
    }
}
`

const getActiveUserQuery = () => `
query {
    getActiveUser {
        id
        username
    }
}`

const listUsersQuery = () => `
query {
    listUsers(data: { key: "${key}" }) {
        username
        name
    }
}  
`

//Block
const listBlocksQuery = () => `
query{
    listBlocks {
        id
    }
}`

const saveBlockQuery = () => `
mutation {
    saveBlock(data: { blocked: "${user_id}" }) {
        blocker {
            username
        }
        blocked {
            username
        }
    }
}`

const deleteBlockQuery = () => `
mutation {
    deleteBlock(data: { blocked: "${user_id}" }) {
        blocker {
            username
        }
        blocked {
            username
        }
    }
}`

//Chat
const listChatsQuery = () => `
query{
    listChats {
        user_id
    }
}`

const openChatQuery = () => `
mutation {
    openChat(data: { target_id: "${user_id}" }) {
        user_id
        target_id
    }
}`

const closeChatQuery = () => `
mutation {
    closeChat(data: { target_id: "${user_id}" }) {
        user_id
        target_id
    }
}`

//Post
const savePostQuery = () => `
mutation {
    savePost(data: { title: "testPost" }) {
        id
        user {
            username
        }
    }
}
`

const deletePostQuery = () => `
mutation {
    deletePost(data: { id: "${post_id}" }) {
        id
        user {
            username
        }
        title
    }
}
`

const listPostsByUserIdQuery = () => `
query {
    listPosts(data: { user_id: "${user_id}" }) {
        id
        user {
            username
        }
        title
    }
}
`

//Like

const saveLikeQuery = () => `
mutation {
    saveLike(data: { post_id: "${post_id}" }) {
        user_id
        post_id
    }
}
`

const listLikesQuery = () => `
query {
    listLikes(data: { post_id: "${post_id}" }) {
        user_id
        post_id
    }
}
`

//Challange

const listChallangesByUserIdQuery = () => `
query {
    listChallanges(data: { user_id: "${user_id}" }) {
        user {
            username
        }
    }
}
`

const saveChallangeQuery = () => `
mutation {
    saveChallange(
        data: {
        categorie_id: "categorie_id"
        title: "title"
        video: "video"
    }) {
        user {
            username
        }
    }
}
`

//ChallangeCategorie

const listChallangeCategorieQuery = () => `
query {
    listChallangeCategories {
        name
    }
}
`

const saveChallangeCategorieQuery = () => `
mutation {
    saveChallangeCategorie(data: { name: "name" }) {
        name
    }
}
`

//Comment

const listCommentsQuery = () => `
query {
    listComments(data: { post_id: "${post_id}" }) {
        id
        user {
            username
        }
    }
}
`

const saveCommentQuery = () => `
mutation {
    saveComment(data: { post_id: "${post_id}", comment: "comment" }) {
        id
        user {
            username
        }
    }
}
`

const deleteCommentQuery = () => `
mutation {
    deleteComment(data: { commentId: "${comment_id}" }) {
        id
        user {
            username
        }
    }
}
`

//Follow

const saveFollowQuery = () => `
mutation {
    saveFollow(data: { followed: "${user_id}" }) {
        follower {
            username
        }
        followed {
            username
        }
        follow_status
    }
}
`

const updateFollowStatusQuery = () => `
mutation {
    updateFollowStatus(data: { followed: "${user_id}", follow_status: 0 }) {
        follower {
            username
        }
        followed {
            username
        }
        follow_status
    }
}
`

const listFollowsQuery = () => `
query {
    listFollows(data: { follower: "${user_id}" }) {
        follower {
            username
        }
        followed {
            username
        }
        follow_status
    }
}
`

const listFollowersQuery = () => `
query {
    listFollowers(data: { followed: "${user_id}" }) {
        follower {
            username
        }
        followed {
            username
        }
        follow_status
    }
}
`

//Message

const saveMessageQuery = () => `
mutation {
    saveMessage(data: { receiver: "${user_id}", messageText: "messageText" }) {
        sender
        receiver
        messageText
    }
}
`

const listMessagesQuery = () => `
query {
    listMessages {
        user {
            username
        }
        messages {
            messageText
        }
    }
}
`

describe('Users', () => {
    it('createUser', (done) => {
        request.post('/graphql')
            .send({ query: createUserQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                //res.body.data.saveUser.token.should.be.a('string')
                done()
            })
    })

    it('signIn', (done) => {
        request.post('/graphql')
            .send({ query: signInQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.signIn.token.should.be.a('string')
                token = res.body.data.signIn.token
                done()
            })
    })

    it('updatePassword', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: updatePasswordQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    })

    it('getActiveUser', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: getActiveUserQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.getActiveUser.should.be.a('object')
                user_id = res.body.data.getActiveUser.id
                done()
            })
    })

    it('listUsers', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listUsersQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listUsers.should.be.a('array')
                done()
            })
    })
})

describe('Follows', () => {
    it('saveFollow', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: saveFollowQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.saveFollow.should.be.a('object')
                done()
            })
    })

    it('updateFollowStatus', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: updateFollowStatusQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.updateFollowStatus.should.be.a('object')
                done()
            })
    })

    it('listFollows', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listFollowsQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listFollows.should.be.a('array')
                done()
            })
    })

    it('listFollowers', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listFollowersQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listFollowers.should.be.a('array')
                done()
            })
    })
})

describe('Blocks', () => {
    it('listBlocks', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listBlocksQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listBlocks.should.be.a('array')
                done()
            })
    })

    it('saveBlock', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: saveBlockQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.saveBlock.should.be.a('object')
                done()
            })
    })

    it('deleteBlock', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: deleteBlockQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.deleteBlock.should.be.a('object')
                done()
            })
    })
})

describe('Chats', () => {
    it('listChats', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listChatsQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listChats.should.be.a('array')
                done()
            })
    })

    it('openChat', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: openChatQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.openChat.should.be.a('object')
                done()
            })
    })

    it('closeChat', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: closeChatQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.closeChat.should.be.a('object')
                done()
            })
    })
})

describe('Messages', () => {
    it('saveMessage', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: saveMessageQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.saveMessage.should.be.a('object')
                done()
            })
    })

    it('listMessages', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listMessagesQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listMessages.should.be.a('array')
                done()
            })
    })
})

describe('Challanges', () => {
    it('listChallanges By User Id', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listChallangesByUserIdQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listChallanges.should.be.a('array')
                done()
            })
    })

    it('saveChallange', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: saveChallangeQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.saveChallange.should.be.a('object')
                done()
            })
    })
})

describe('ChallangeCategories', () => {
    it('listChallangeCategories', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listChallangeCategorieQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listChallangeCategories.should.be.a('array')
                done()
            })
    })

    it('saveChallangeCategorie', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: saveChallangeCategorieQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.saveChallangeCategorie.should.be.a('object')
                done()
            })
    })
})

describe('Posts', () => {
    it('savePost', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: savePostQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.savePost.should.be.a('object')
                post_id = res.body.data.savePost.id
                done()
            })
    })

    it('listPosts By User Id', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listPostsByUserIdQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listPosts.should.be.a('array')
                done()
            })
    })
})

describe('Comments', async () => {
    it('listComments', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listCommentsQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listComments.should.be.a('array')
                done()
            })
    })

    it('saveComment', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: saveCommentQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.saveComment.should.be.a('object')
                done()
            })
    })

    it('deleteComment', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: deleteCommentQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.should.be.a('object')
                done()
            })
    })
})

describe('Likes', () => {
    it('saveLike', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: saveLikeQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.should.be.a('object')
                done()
            })
    })

    it('listLikes', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: listLikesQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.listLikes.should.be.a('array')
                done()
            })
    })
})

describe('Posts - 2', () => {
    it('deletePost', (done) => {
        request.post('/graphql')
            .set('authorization', getToken())
            .send({ query: deletePostQuery() })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                res.body.data.should.be.a('object')
                done()
            })
    })
})