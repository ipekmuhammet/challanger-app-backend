const User = {
    posts: async (source, args, { Post }) => {
        return await Post.find({ "user_id": source.id })
    }
}

module.exports = User