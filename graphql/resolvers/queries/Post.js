const Post = {
    user: async (source, args, { User }) => {
        return await User.findById(source.user_id)
    },
    commentCount: async (source, args, { Comment }) => {
        return await Comment.countDocuments({ post_id: source.id }, (error, count) => {
            if (!error)
                return count
            return 0
        })
    },
    likeCount: async (source, args, { Like }) => {
        return await Like.countDocuments({ post_id: source.id }, (error, count) => {
            if (!error)
                return count
            return 0
        })
    }
}

module.exports = Post;