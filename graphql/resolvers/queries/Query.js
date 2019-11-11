const jwt = require('jsonwebtoken')
let follows = [], chats = [], users = [], verifiedUser, user

const verifyToken = async (token) => (//Muhammet ? if not ?
    await jwt.verify(token, process.env.SECRET_KEY)
)

module.exports = {
    listUsers: async (source, { data: { key } }, { User }) => {
        await User.search({ query_string: { query: key } }, (err, results) => {
            if (!err) users = results.hits.hits.map(hit => hit._source)
        })
        return users

        //key ? await User.find({ username: { $regex: key, $options: 'i' } }).limit(20) : []//List top 20 famoust users // Muhammet
    },

    getActiveUser: async (source, { data }, { User }) => {
        verifiedUser = await verifyToken(data.token)
        return await User.findOne({ username: verifiedUser.username })
    },

    listPosts: async (source, { data: { target_id, user_id, key, latest } }, { Post, Follow }) => {
        if (target_id) return await Post.find({ user_id: target_id })
        else if (user_id) {
            follows = await Follow.find({ follower: user_id }).map(follow => follow = follow[0].followed)//Muhammet
            return await Post.where('user_id').in(follows).limit(20).find()
        }
        else if (key) return await Post.find({ content: { $regex: key, $options: 'i' } }).limit(20)
        else if (latest) return await Post
            .find({ content: { $regex: key, $options: 'i' } })
            .limit(20)
            .sort({ createdAt: 'descending' })
        return []
    },
    listChallanges: async (source, { data }, { Challange }) => await Challange.find().limit(20),

    listComments: async (source, { data: { post_id } }, { Comment }) => await Comment.find({ post_id }).limit(20),

    listLikes: async (source, { data: { post_id } }, { Like }) => await Like.find({ post_id }).limit(20),

    listFollowers: async (source, { data: { followed } }, { Follow }) => await Follow.find({ followed }).limit(20),

    listFollows: async (source, { data: { follower } }, { Follow }) => await Follow.find({ follower }).limit(20),

    listMessages: async (source, { data: { user_id } }, { User, Chat }, info) => {
        verifiedUser = await verifyToken(user_id)
        user = await User.findOne({ username: verifiedUser.username })
        chats = await Chat
            .find({ user_id: user._id })
            .select({ _id: 0, target_id: 1 })

        return await User.where('_id').in(await chats.map(chat => chat.target_id)).find()
    },

    listChats: async (source, { data: { user_id } }, { Chat }, info) => await Chat.find({ user_id }),

    listBlocks: async (source, { data: { blocker } }, { Block }) => await Block.find({ blocker })
}