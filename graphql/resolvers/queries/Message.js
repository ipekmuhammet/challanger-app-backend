module.exports = {
    user: async (source, args, { User }) => source,
    messages: async (source, args, { Message }) => await Message.find({})
    //Muhammet - this is a sub resolver
    //find messages {sender:rootResolver.user_id,receiver:source._id} || {sender:source._id,receiver:rootResolver.user_id}
}