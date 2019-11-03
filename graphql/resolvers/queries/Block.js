module.exports = {
    blocker: async ({ blocker }, args, { User }) => await User.findById(blocker),
    blocked: async ({ blocked }, args, { User }) => await User.findById(blocked)
}