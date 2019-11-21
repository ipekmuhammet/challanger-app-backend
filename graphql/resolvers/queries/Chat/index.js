module.exports = {
    listChats: async (source, args, { Chat, activeUser }, info) => await Chat.find({ user_id: activeUser.id })
}