module.exports = {
    listMessages: async (source, args, { User, Chat, activeUser }) => {
        return User.where('_id').in(
            await Chat.distinct('target_id', Chat.find({ user_id: activeUser.id }))
        ).find()
    }
}