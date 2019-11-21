module.exports = {
    listBlocks: async (source, args, { Block, activeUser }) => await Block.find({ blocker: activeUser.id })
}