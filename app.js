const http = require('http')
const express = require('express')
const { ApolloServer, PubSub } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const jwt = require('jsonwebtoken')

require('dotenv').config()
require('./helpers/database')()

const resolvers = require('./graphql/resolvers/index')

const User = require('./helpers/models/UserSchema')
const Post = require('./helpers/models/PostSchema')
const ChallangeCategorie = require('./helpers/models/ChallangeCategorieSchema')
const Challange = require('./helpers/models/ChallangeSchema')
const Comment = require('./helpers/models/CommentSchema')
const Like = require('./helpers/models/LikeSchema')
const Follow = require('./helpers/models/FollowSchema')
const Message = require('./helpers/models/MessageSchema')
const Chat = require('./helpers/models/ChatSchema')
const Block = require('./helpers/models/BlockSchema')
const typeDefs = importSchema('./graphql/schema.graphql')

const pubSub = new PubSub()

const app = express()

let token, activeUser

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            User,
            Post,
            ChallangeCategorie,
            Challange,
            Comment,
            Like,
            Follow,
            Message,
            Chat,
            Block,
            pubSub,
            activeUser: req ? req.activeUser : null
        }
    }
})

const port = process.env.PORT || 4000

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(async (req, res, next) => {
    //token = req.headers.authorization
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzgwNTYyNzIyY2YxMmJjNGUxN2I3ZiIsInVzZXJuYW1lIjoid2ViYiIsImlhdCI6MTU3MzU4MzU5MiwiZXhwIjoxNTczODg1OTkyfQ.X-eObs8fnpMnd-DLDKIWythGBdOfTa45i4mlWXPUynY'
    if (token && token != 'null') {
        try {
            activeUser = await jwt.verify(token, process.env.SECRET_KEY)
            req.activeUser = activeUser
            next()
        } catch (error) {
            res.status(401).end('Unauthorized')
        }
    } else {
        res.status(401).end('Unauthorized')
    }
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))