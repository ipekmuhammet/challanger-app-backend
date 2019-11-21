const { withFilter } = require('apollo-server-express')

module.exports = {
    subscribe: withFilter(
        (source, args, { pubSub }) => pubSub.asyncIterator('message'),
        (payload, variables, { activeUser }) => (
            activeUser.id === payload.message.receiver || activeUser.id === payload.message.sender
        )
    )
}