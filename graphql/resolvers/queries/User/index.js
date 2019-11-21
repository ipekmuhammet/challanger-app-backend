let users = []

module.exports = {
    listUsers: async (source, { data: { key } }, { User }) => {
        await User.search({ query_string: { query: key } }, (err, results) => {
            if (!err) users = results.hits.hits.map(hit => hit._source)
        })
        return users
    },
    getActiveUser: async (source, args, { activeUser, User }) => await User.findOne({ username: activeUser.username })
}