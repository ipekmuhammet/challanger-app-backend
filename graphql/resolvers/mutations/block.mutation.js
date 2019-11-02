const Mutation = {
    saveBlock: async (source, { data }, { Block }) => await new Block(data).save(),
    deleteBlock: async (source, { data }, { Block }) => await Block.findByIdAndDelete(data.id)
}

module.exports = Mutation