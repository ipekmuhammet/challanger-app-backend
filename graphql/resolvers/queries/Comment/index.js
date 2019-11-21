module.exports = {
    listComments: async (source, { data: { post_id } }, { Comment }) => await Comment.find({ post_id }).limit(20)
}