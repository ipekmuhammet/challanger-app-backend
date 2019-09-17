const Post = require('./queries/Post');
const Challange = require('./queries/Challange');
const User = require('./queries/User');
const Follow = require('./queries/Follow');

const userResolver = require('./queries/userResolver');
//const postResolver = require('./queries/postResolver');

const Mutation = require('./mutations/index');

module.exports = {
    Post,
    User,
    Follow,
    Challange,
    ...userResolver,
    //...postResolver,
    Mutation
}