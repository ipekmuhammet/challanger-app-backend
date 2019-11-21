module.exports = {
    listFollowers: async (source, { data: { followed } }, { Follow }) => await Follow.find({ followed }).limit(20),
    listFollows: async (source, { data: { follower } }, { Follow }) => await Follow.find({ follower }).limit(20)
}