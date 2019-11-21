module.exports = {
    user: async ({ user_id }, args, { User }) => await User.findById(user_id),
    commentCount: async ({ id }, args, { Comment }) => (
        await Comment.countDocuments({ post_id: id }, (error, count) => (!error ? count : 0))
    ),
    likeCount: async ({ id }, args, { Like }) => (
        await Like.countDocuments({ post_id: id }, (error, count) => (!error ? count : 0))
    )
}