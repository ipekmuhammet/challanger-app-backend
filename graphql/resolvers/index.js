const Post = require('./queries/Post')
const Challange = require('./queries/Challange')
const Comment = require('./queries/Comment')
const User = require('./queries/User')
const Follow = require('./queries/Follow')
const MessageSource = require('./queries/Message')
const Block = require('./queries/Block')
const MessageSourceForSubscription = require('./queries/SubscriptionMessage')

const Query = require('./queries/Query')
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