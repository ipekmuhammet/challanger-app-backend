let post = {}

module.exports = {
    savePost: async (source, { data }, { Post }) => await new Post(data).save(),
    deletePost: async (source, { data: { id } }, { Post }) => {
        await Post.findByIdAndDelete(id, (error, result) => {
            if (error) throw new Error(error)
            post = result
        })
        return post
    }
}