module.exports = {
    listLikes: async (source, { data: { post_id } }, { Like }) => await Like.find({ post_id }).limit(20)
}