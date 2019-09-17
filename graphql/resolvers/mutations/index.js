const userMutation = require('./user.mutation');
const postMutation = require('./post.mutation');
const followMutation = require('./follow.mutation');
const challangeMutation = require('./challange.mutation');
const challangeCategorieMutation = require('./challangeCategorie.mutation');
const messageMutation = require('./message.mutation');
const commentMutation = require('./comment.mutation');
const likeMutation = require('./like.mutation');

module.exports = {
    ...userMutation,
    ...postMutation,
    ...followMutation,
    ...challangeMutation,
    ...challangeCategorieMutation,
    ...messageMutation,
    ...commentMutation,
    ...likeMutation
}