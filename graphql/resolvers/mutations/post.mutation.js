let post = {}

module.exports = {
    savePost: async (source, { data }, { Post, activeUser }) => await new Post({ ...data, user_id: activeUser.id }).save(),
    deletePost: async (source, { data: { id } }, { Post }) => {
        await Post.findByIdAndDelete(id, (error, result) => {
            if (error) throw new Error(error)
            post = result
        })
        return post
    }
}