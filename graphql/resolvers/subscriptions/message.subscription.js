const { withFilter } = require('apollo-server-express');

module.exports = {
    message: {
        subscribe: withFilter(
            (source, args, { pubSub }) => {
                return pubSub.asyncIterator('message');
            },
            (payload, variables) => {
                return variables.user_id === payload.message.receiver || variables.user_id === payload.message.sender
            }
        )
    }
}