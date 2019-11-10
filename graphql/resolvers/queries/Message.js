module.exports = {
    user: async (source, args, { User }) => source,
    messages: async (source, args, { Message }, { variableValues: { user_id } }) => (
        await Message.find().or([{ sender: user_id, receiver: source._id }, { sender: source._id, receiver: user_id }])
    )
}