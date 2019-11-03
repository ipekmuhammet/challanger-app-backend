module.exports = {
    saveBlock: async (source, { data }, { Block }) => await new Block(data).save(),
    deleteBlock: async (source, { data: { id } }, { Block }) => await Block.findByIdAndDelete(id)
}