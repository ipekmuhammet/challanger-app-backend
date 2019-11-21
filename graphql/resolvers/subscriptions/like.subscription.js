const { withFilter } = require('apollo-server-express')
let posts = []
module.exports = {
    subscribe: withFilter(
        (source, args, { pubSub }) => pubSub.asyncIterator('like'),
        async (payload, variables, { activeUser, Post }) => {
            posts = await Post.find({ user_id: activeUser.id }).select('_id')
            posts = posts.map(post => post._id.toString())
            return posts.indexOf(payload.like.post_id) !== -1
        }
    )
}