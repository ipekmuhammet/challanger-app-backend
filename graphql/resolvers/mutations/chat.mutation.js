module.exports = {
    openChat: async (source, { data }, { Chat }) => await new Chat(data).save(),
    closeChat: async (source, { data }, { Chat }) => (
        await Chat.findOne(data, (error, result) => {
            if (error) throw new Error(error)
            return result.deleteOne()
        })
    )
}