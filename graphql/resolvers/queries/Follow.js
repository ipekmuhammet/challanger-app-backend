const Follow = {
    follower: async (source, args, { User }) => {
        return await User.findById(source.follower)
    },
    followed: async (source, args, { User }) => {
        return await User.findById(source.followed)
    },
}

module.exports = Follow;