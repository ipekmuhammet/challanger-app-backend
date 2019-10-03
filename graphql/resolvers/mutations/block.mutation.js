const Mutation = {
    saveBlock: async (source, { data }, { Block }) => await new Block(data).save()
}

module.exports = Mutation;