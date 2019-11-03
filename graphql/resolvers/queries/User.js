module.exports = {
    posts: async ({ id }, args, { Post }) => await Post.find({ 'user_id': id })
}