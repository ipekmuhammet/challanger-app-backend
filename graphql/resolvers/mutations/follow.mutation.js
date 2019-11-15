module.exports = {
    saveFollow: async (source, { data }, { Follow, activeUser }) => await new Follow({ follower: activeUser.id, ...data }).save(),
    updateFollowStatus: async (source, { data: { followed, follow_status } }, { Follow, activeUser }) => (
        await Follow.findOneAndUpdate({ follower: activeUser.id, followed }, { follow_status })
    )
}