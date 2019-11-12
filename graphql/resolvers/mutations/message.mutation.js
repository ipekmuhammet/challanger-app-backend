let message

module.exports = {
    saveMessage: async (source, { data }, { Message, activeUser, pubSub }) => {
        message = await new Message({ sender: activeUser.id, ...data }).save()
        pubSub.publish('message', { message })
        return message
    }
}