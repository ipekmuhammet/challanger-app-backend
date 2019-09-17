const Mutation = {
    saveFollow: async (source, { data }, { Follow }) => {
        const follow = await new Follow({
            ...data
        }).save();

        return follow
    }
}

module.exports = Mutation;