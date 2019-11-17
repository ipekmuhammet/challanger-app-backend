let message

module.exports = {
    saveMessage: async (source, { data }, { Message, Chat, activeUser, pubSub }) => {
        await Chat.findOne({ user_id: activeUser.id, target_id: data.receiver }, (error, result) => {
            if (error || !result) new Chat({ user_id: activeUser.id, target_id: data.receiver }).save()
        })

        await Chat.findOne({ target_id: activeUser.id, user_id: data.receiver }, (error, result) => {
            if (error || !result) new Chat({ user_id: activeUser.id, target_id: data.receiver }).save()
        })

        message = await new Message({ sender: activeUser.id, ...data }).save()
        pubSub.publish('message', { message })
        return message
    }
}