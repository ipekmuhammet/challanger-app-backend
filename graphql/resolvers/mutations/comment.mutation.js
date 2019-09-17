const Mutation = {
    saveComment: async (source, { data }, { Comment }) => {
        const comment = await new Comment({
            ...data
        }).save();
        return comment
    }
}

module.exports = Mutation;