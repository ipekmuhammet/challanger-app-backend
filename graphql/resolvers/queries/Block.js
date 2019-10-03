const Block = {
    blocker: async (source, args, { User }) => {
        return await User.findById(source.blocker)
    },
    blocked: async (source, args, { User }) => {
        return await User.findById(source.blocked)
    }
}

module.exports = Block