module.exports = {
    saveBlock: async (source, { data }, { Block, activeUser }) => await new Block({ blocker: activeUser.id, ...data }).save(),
    deleteBlock: async (source, { data }, { Block, activeUser }) =>
        await Block.findOneAndDelete({ blocker: activeUser.id, ...data })
}