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

const User = require('./helpers/database/models/UserSchema')
const Post = require('./helpers/database/models/PostSchema')
const ChallangeCategorie = require('./helpers/database/models/ChallangeCategorieSchema')
const Challange = require('./helpers/database/models/ChallangeSchema')
const Comment = require('./helpers/database/models/CommentSchema')
const Like = require('./helpers/database/models/LikeSchema')
const Follow = require('./helpers/database/models/FollowSchema')
const Message = require('./helpers/database/models/MessageSchema')
const Chat = require('./helpers/database/models/ChatSchema')
const Block = require('./helpers/database/models/BlockSchema')

const typeDefs = importSchema('./graphql/schema.graphql')
const resolvers = require('./graphql/resolvers/index')

const app = express()

const pubSub = new PubSub()

let token, activeUser

const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: true,
    subscriptions: {
        onConnect: connectionParams => {
            if (connectionParams.authorization) {
                try {
                    return {
                        activeUser: jwt.verify(connectionParams.authorization, process.env.SECRET_KEY)
                    }
                } catch (error) {
                    throw new Error('Unauthorized')
                }
            }
            throw new Error('Missing auth token!')
        },
    },
    context: ({ req, connection }) => {
        if (connection) activeUser = connection.context.activeUser
        else if (req) activeUser = req.activeUser

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
            activeUser
        }
    }
})

const port = process.env.PORT || 4000

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: 10000000, extended: true }))

app.use((req, res, next) => {
    //token = req.headers.authorization
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDE0NGZhMzMwYjUyMzYyY2NiNmYzMiIsInVzZXJuYW1lIjoibWFtaSIsImlhdCI6MTU3NjQyODE0OSwiZXhwIjoxNTc2NzMwNTQ5fQ.pCmPoQUNugYqh598eEoqQgBAiz3MFwUtWVpLJPds7xs'
    //next()
    try {
        if (token && token != 'null') {
            req.activeUser = jwt.verify(token, process.env.SECRET_KEY)
            next()
        }
        else if (req.body.variables.username && req.body.variables.password) next()
        else res.status(401).end('Unauthorized')
    } catch (error) {
        res.status(401).end('Unauthorized')
    }
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))