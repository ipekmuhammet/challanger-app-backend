const { withFilter } = require('apollo-server-express')

module.exports = {
    subscribe: withFilter(
        (source, args, { pubSub }) => pubSub.asyncIterator('like'),
        
        async (payload, variables, { activeUser, Post }) => (
            JSON.stringify(
                await Post.distinct('_id', Post.find({ user_id: activeUser.id }))
            ).indexOf(payload.like.post_id) !== -1
        )//Distinct returns array of object like [ID1,ID2], not like that ["ID1","ID1"], thats why i used Stringify
    )
}