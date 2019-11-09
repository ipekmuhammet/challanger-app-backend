let user_id

module.exports = {
    user: async (source, args, { User }) => source,
    messages: async (source, args, { Message }, info) => {
        user_id = info.operation.selectionSet.selections[0].arguments[0].value.fields[0].value.value
        return await Message.find()
            .or([{ sender: user_id, receiver: source._id }, { sender: source._id, receiver: user_id }])
    }
}