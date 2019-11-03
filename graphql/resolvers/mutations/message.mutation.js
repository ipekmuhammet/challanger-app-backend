let message

module.exports = {
    saveMessage: async (source, { data }, { Message, pubSub }) => {
        message = await new Message(data).save()
        pubSub.publish('message', { message })
        return message
    }
}