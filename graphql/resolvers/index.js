const Post = require('./queries/Post/Post')
const Challange = require('./queries/Challange/Challange')
const Comment = require('./queries/Comment/Comment')
const User = require('./queries/User/User')
const Follow = require('./queries/Follow/Follow')
const MessageSource = require('./queries/Message/Message')
const Block = require('./queries/Block/Block')
const MessageSourceForSubscription = require('./queries/SubscriptionMessage/SubscriptionMessage')

const Query = require('./queries')
//const postResolver = require('./queries/postResolver')

const Subscription = require('./subscriptions/index')

const Mutation = require('./mutations/index')

module.exports = {
    Post,
    User,
    Follow,
    MessageSource,
    MessageSourceForSubscription,
    Block,
    Challange,
    Comment,
    Query,
    Mutation,
    Subscription
}