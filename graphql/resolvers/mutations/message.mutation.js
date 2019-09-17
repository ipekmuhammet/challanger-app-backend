const Mutation = {
    saveMessage: async (source, { data }, { Message }) => {
        const message = await new Message({
            ...data
        }).save();

        return message
    }
}

module.exports = Mutation;