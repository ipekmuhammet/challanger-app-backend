const Mutation = {
    saveLike: async (source, { data }, { Like }) => {
        const like = await new Like({
            ...data
        }).save();

        return like
    }
}

module.exports = Mutation;