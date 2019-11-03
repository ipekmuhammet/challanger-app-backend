const { withFilter } = require('apollo-server-express')

module.exports = {
    message: {
        subscribe: withFilter(
            (source, args, { pubSub }) => pubSub.asyncIterator('message'),
            (payload, variables) => (
                variables.user_id === payload.message.receiver || variables.user_id === payload.message.sender
            )
        )
    }
}