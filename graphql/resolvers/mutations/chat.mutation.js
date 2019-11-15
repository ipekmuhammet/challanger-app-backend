module.exports = {
    openChat: async (source, { data }, { Chat, activeUser }) => await new Chat({ user_id: activeUser.id, ...data }).save(),
    closeChat: async (source, { data }, { Chat, activeUser }) => (
        await Chat.findOne({ user_id: activeUser.id, ...data }, (error, result) => {
            if (error || !result) return null//throw new Error(error)
            return result.deleteOne()
        })
    )
}