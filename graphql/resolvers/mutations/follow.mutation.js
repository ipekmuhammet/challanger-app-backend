let follow

module.exports = {
    saveFollow: async (source, { data }, { Follow, activeUser, pubSub }) => {
        follow = await new Follow({ follower: activeUser.id, ...data }).save()
        follow ? pubSub.publish('follow', { follow }) : false
        return follow
    },
    updateFollowStatus: async (source, { data: { followed, follow_status } }, { Follow, activeUser }) => (
        await Follow.findOneAndUpdate({ follower: activeUser.id, followed }, { follow_status })
    )
}