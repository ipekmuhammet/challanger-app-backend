const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const resolvers = require('./graphql/resolvers/index');
require('dotenv').config()
require('./helpers/database')();

const User = require('./helpers/models/UserSchema');
const Post = require('./helpers/models/PostSchema');
const ChallangeCategorie = require('./helpers/models/ChallangeCategorieSchema');
const Challange = require('./helpers/models/ChallangeSchema');
const Comment = require('./helpers/models/CommentSchema');
const Like = require('./helpers/models/LikeSchema');
const Follow = require('./helpers/models/FollowSchema');
const Message = require('./helpers/models/MessageSchema');
const typeDefs = importSchema('./graphql/schema.graphql');

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
        Message
    }
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);