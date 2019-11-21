const userMutation = require('./user.mutation')
const postMutation = require('./post.mutation')
const followMutation = require('./follow.mutation')
const challangeMutation = require('./challange.mutation')
const challangeCategorieMutation = require('./challangeCategorie.mutation')
const messageMutation = require('./message.mutation')
const chatMutation = require('./chat.mutation')
const commentMutation = require('./comment.mutation')
const likeMutation = require('./like.mutation')
const blockMutation = require('./block.mutation')

module.exports = Object.assign(
    userMutation,
    postMutation,
    followMutation,
    challangeMutation,
    challangeCategorieMutation,
    messageMutation,
    chatMutation,
    commentMutation,
    likeMutation,
    blockMutation,
)