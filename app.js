const http = require('http')
const express = require('express')
const { ApolloServer, PubSub } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const resolvers = require('./graphql/resolvers/index')
require('dotenv').config()
require('./helpers/database')()

const User = require('./helpers/models/UserSchema')
const Post = require('./helpers/models/PostSchema')
const ChallangeCategorie = require('./helpers/models/ChallangeCategorieSchema')
const Challange = require('./helpers/models/ChallangeSchema')
const Comment = require('./helpers/models/CommentSchema')
const Like = require('./helpers/models/LikeSchema')
const Follow = require('./helpers/models/FollowSchema')
const Message = require('./helpers/models/MessageSchema')
const Block = require('./helpers/models/BlockSchema')
const typeDefs = importSchema('./graphql/schema.graphql')

const pubSub = new PubSub()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post,
        ChallangeCategorie,
        Challange,
        Comment,
        Like,
        Follow,
        Message,
        Block,
        pubSub
    }
})

const port = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

/*
app.use(async (req, res, next) => {
    const token = req.headers['authorization']
    if (token && token != null) {
        try {
            const activeUser = await jwt.verify(token, process.env.SECRET_KEY)
            req.activeUser = activeUser
        } catch (error) {
            console.log(error)
        }
    }
})
*/
server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))