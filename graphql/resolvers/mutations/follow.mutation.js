const Mutation = {
    saveFollow: async (source, { data }, { Follow }) => await new Follow(data).save(),
    updateFollowStatus: async (source, { data: { follower, followed, follow_status } }, { Follow }) =>
        await Follow.findOneAndUpdate({ follower, followed }, { follow_status })
}

module.exports = Mutation