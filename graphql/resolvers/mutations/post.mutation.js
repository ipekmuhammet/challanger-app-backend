const Mutation = {
    savePost: async (source, { data }, { Post }) => {
        const post = await new Post({
            ...data
        }).save();

        return post
        //return { token: token.generate(newUser, '1h') }
    }
}

module.exports = Mutation;