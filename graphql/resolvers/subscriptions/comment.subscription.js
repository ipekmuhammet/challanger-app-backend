const { withFilter } = require('apollo-server-express')
module.exports = {
    subscribe: withFilter(
        (source, args, { pubSub }) => pubSub.asyncIterator('comment'),
        async (payload, variables, { activeUser, Post }) => (
            JSON.stringify(//Distinct returns array of object like [ID1,ID2], not like that ["ID1","ID1"], thats why i used Stringify
                await Post.distinct('_id', Post.find({ user_id: activeUser.id }))
            ).indexOf(payload.comment.post_id) !== -1
        )
    )
}