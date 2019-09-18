const Mutation = {
    saveMessage: async (source, { data }, { Message, pubSub }) => {
        const message = await new Message({
            ...data
        }).save();
        pubSub.publish('message', {
            message
        })
        return message
    }
}

module.exports = Mutation;