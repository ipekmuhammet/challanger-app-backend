module.exports = {
    user: async (source, args, { User }) => await User.findById(source.sender),
    messages: async (source, args) => [source]
}