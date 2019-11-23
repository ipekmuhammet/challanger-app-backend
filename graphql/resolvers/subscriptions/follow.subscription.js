const { withFilter } = require('apollo-server-express')
module.exports = {
    subscribe: withFilter(
        (source, args, { pubSub }) => pubSub.asyncIterator('follow'),
        async (payload, variables, { activeUser, Follow }) => (
            payload.follow.followed === activeUser.id
        )
    )
}