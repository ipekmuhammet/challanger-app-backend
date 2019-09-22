const Post = require('./queries/Post');
const Challange = require('./queries/Challange');
const Comment = require('./queries/Comment');
const User = require('./queries/User');
const Follow = require('./queries/Follow');
const Message = require('./queries/Message');

const userResolver = require('./queries/userResolver');
//const postResolver = require('./queries/postResolver');

const Subscription = require('./subscriptions/index');

const Mutation = require('./mutations/index');

module.exports = {
    Post,
    User,
    Follow,
    Message,
    Challange,
    Comment,
    ...userResolver,
    //...postResolver,
    Mutation,
    Subscription
}