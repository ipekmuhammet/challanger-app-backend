let follows = [],
    chats = [],
    posts = [],
    users = []

module.exports = {
    listUsers: async (source, { data: { key } }, { User }) => {
        await User.search({ query_string: { query: key } }, (err, results) => {
            if (!err) users = results.hits.hits.map(hit => hit._source)
        })
        return users
    },

    getActiveUser: async (source, args, { activeUser, User }) => await User.findOne({ username: activeUser.username }),

    listPosts: async (source, { data: { target_id, user_id, key, latest } }, { Post, Follow }) => {
        if (target_id) return await Post.find({ user_id: target_id })
        else if (user_id) {
            follows = await Follow.find({ follower: user_id }).map(follow => follow = follow[0].followed)//Muhammet
            return await Post.where('user_id').in(follows).limit(20).find()
        }
        else if (key) {
            await Post.search({ query_string: { query: key } }, (err, results) => {
                if (!err) posts = results.hits.hits.map(hit => hit._source)
            })
            return posts
        }

        else if (latest) {
            await Post.search({ query_string: { query: key } }, (err, results) => {
                if (!err) posts = results.hits.hits.map(hit => hit._source)
            })
            return posts

            /*
            return await Post
                .find({ content: { $regex: key, $options: 'i' } })
                .limit(20)
                .sort({ createdAt: 'descending' })
            */
        }
        return []
    },

    listChallanges: async (source, { data }, { Challange }) => await Challange.find().limit(20),

    listComments: async (source, { data: { post_id } }, { Comment }) => await Comment.find({ post_id }).limit(20),

    listLikes: async (source, { data: { post_id } }, { Like }) => await Like.find({ post_id }).limit(20),

    listFollowers: async (source, { data: { followed } }, { Follow }) => await Follow.find({ followed }).limit(20),

    listFollows: async (source, { data: { follower } }, { Follow }) => await Follow.find({ follower }).limit(20),

    listMessages: async (source, args, { User, Chat, activeUser }) => {
        chats = await Chat.find({ user_id: activeUser.id }).select({ _id: 0, target_id: 1 })
        chats = await chats.map(chat => chat.target_id)
        return await User.where('_id').in(chats).find()
    },

    listChats: async (source, args, { Chat, activeUser }, info) => await Chat.find({ user_id: activeUser.id }),

    listBlocks: async (source, args, { Block, activeUser }) => await Block.find({ blocker: activeUser.id })
}