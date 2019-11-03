module.exports = {
    follower: async ({ follower }, args, { User }) => await User.findById(follower),
    followed: async ({ followed }, args, { User }) => await User.findById(followed)
}