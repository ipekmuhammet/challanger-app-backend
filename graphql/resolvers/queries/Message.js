const Message = {
    sender: async (source, args, { User }) => {
        return await User.findById(source.sender)
    },
    receiver: async (source, args, { User }) => {
        return await User.findById(source.receiver)
    }
}

module.exports = Message