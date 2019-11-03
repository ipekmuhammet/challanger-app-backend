const jwt = require('jsonwebtoken')
let follows = [], username = ''

module.exports = {
    listUsers: async (source, { data: { key } }, { User }) => (
        key ? await User.find({ username: { $regex: key, $options: 'i' } }).limit(20) : []//List top 20 famoust users // Muhammet
    ),

    getActiveUser: async (source, { data }, { User }) => {
        username = await jwt.verify(data.token, process.env.SECRET_KEY).username
        return await User.findOne({ username })
    },

    listPosts: async (source, { data: { target_id, user_id, key, latest } }, { Post, Follow }) => {
        if (target_id) return await Post.find({ user_id: target_id })
        else if (user_id) {
            follows = await Follow.find({ follower: user_id }).map(follow => follow = follow[0].followed)//Muhammet
            return await Post.where('user_id').in(follows).limit(20).find({})
        }
        else if (key) return await Post.find({ content: { $regex: key, $options: 'i' } }).limit(20)
        else if (latest) return await Post
            .find({ content: { $regex: key, $options: 'i' } })
            .limit(20)
            .sort({ createdAt: 'descending' })
        return []
    },
    listChallanges: async (source, { data }, { Challange }) => await Challange.find({}).limit(20),

    listComments: async (source, { data: { post_id } }, { Comment }) => await Comment.find({ post_id }).limit(20),

    listLikes: async (source, { data: { post_id } }, { Like }) => await Like.find({ post_id }).limit(20),

    listFollowers: async (source, { data: { followed } }, { Follow }) => await Follow.find({ followed }).limit(20),

    listFollows: async (source, { data: { follower } }, { Follow }) => await Follow.find({ follower }).limit(20),

    listMessages: async (source, { data: { user_id, chats } }, { User }, info) => await User.where('_id').in(chats).find({}),

    listBlocks: async (source, { data: { blocker } }, { Block }) => await Block.find({ blocker })
}