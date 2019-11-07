module.exports = {
    user: async (source, args, { User }) => await User.findById(source.sender),
    messages: async (source, args) => [source]
    //Muhammet - this is a sub resolver
    //find messages {sender:rootResolver.user_id,receiver:source._id} || {sender:source._id,receiver:rootResolver.user_id}
}