let chats = []

module.exports = {
    listMessages: async (source, args, { User, Chat, activeUser }) => {
        chats = await Chat.find({ user_id: activeUser.id }).select({ _id: 0, target_id: 1 })
        chats = await chats.map(chat => chat.target_id)
        return await User.where('_id').in(chats).find()
    }
}