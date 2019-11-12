module.exports = {
    user: async (source, args, { User }) => source,
    messages: async (source, args, { Message, activeUser }) => (
        await Message.find()
            .or([{ sender: activeUser.id, receiver: source._id }, { sender: source._id, receiver: activeUser.id }])
    )
}