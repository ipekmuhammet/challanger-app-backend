const Mutation = {
    saveChallange: async (source, { data }, { Challange }) => {
        const challange = await new Challange({
            ...data
        }).save()

        return challange
    }
}

module.exports = Mutation