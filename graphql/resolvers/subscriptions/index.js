const comment = require('./comment.subscription')
const follow = require('./follow.subscription')
const like = require('./like.subscription')
const message = require('./message.subscription')

module.exports = {
    comment,
    follow,
    like,
    message
}