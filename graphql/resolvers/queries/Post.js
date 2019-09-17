const Post = {
    user: async (source, args, { User }) => {
        return await User.findById(source.user_id)
    }
}

module.exports = Post;