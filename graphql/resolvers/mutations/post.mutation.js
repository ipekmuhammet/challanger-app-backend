let post = {}

const Mutation = {
    savePost: async (source, { data }, { Post }) => {
        return await new Post(data).save();
    },
    deletePost: async (source, { data }, { Post }) => {
        await Post.findByIdAndDelete(data.id, (error, result) => {
            if (error) throw new Error(error)
            post = result
        })
        return post
    }
}

module.exports = Mutation;