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
    subscriptions: {
        onConnect: (connectionParams, webSocket) => {
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
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use((req, res, next) => {
    //token = req.headers.authorization
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDE4MTRjOTA3MjQwMjVlOGI1MTdiZSIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTU3NDAxMTI5NCwiZXhwIjoxNTc0MzEzNjk0fQ.fgXafvSDCuNZa1TfvWqe1ZxKc5RI88fYUSKemtMNZZA'

    try {
        if (token && token != 'null') {
            req.activeUser = jwt.verify(token, process.env.SECRET_KEY)
            next()
        }

        else if (req.body.variables.username && req.body.variables.password) {
            next()
        }
        
        else {
            res.status(401).end('Unauthorized')
        }
    } catch (error) {
        res.status(401).end('Unauthorized')
    }
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))