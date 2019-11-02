const jwt = require('jsonwebtoken')
let follows = [],
    username = ''

module.exports = {
    listUsers: async (source, { data }, { User }) => {
        if (data.key) return await User.find({ username: { $regex: data.key, $options: 'i' } }).limit(20)
        return []//List top 20 famoust users // Muhammet
    },
    getActiveUser: async (source, { data }, { User }) => {
        username = await jwt.verify(data.token, process.env.SECRET_KEY).username
        return await User.findOne({ username })
    },
    listPosts: async (source, { data }, { Post, Follow }) => {
        if (data.target_id) return await Post.find({ user_id: data.target_id })
        else if (data.user_id) {
            follows = await Follow.find({ follower: data.user_id }).map(follow => follow = follow[0].followed)//Muhammet
            return await Post.where('user_id').in(follows).limit(20).find({})
        }
        else if (data.key) return await Post.find({ content: { $regex: data.key, $options: 'i' } }).limit(20)
        else if (data.latest) return await Post
            .find({ content: { $regex: data.key, $options: 'i' } })
            .limit(20)
            .sort({ createdAt: 'descending' })
        return []
    },
    listChallanges: async (source, { data }, { Challange }) => await Challange.find({}).limit(20),
    listComments: async (source, { data: { post_id } }, { Comment }) => await Comment.find({ post_id }).limit(20),
    listLikes: async (source, { data: { post_id } }, { Like }) => await Like.find({ post_id }),
    listFollowers: async (source, { data: { followed } }, { Follow }) => await Follow.find({ followed }),
    listFollows: async (source, { data: { follower } }, { Follow }) => await Follow.find({ follower }),
    listMessages: async (source, { data: { user_id } }, { Message }) => {
        return await Message
            .find({})
            .or([
                { receiver: data.chats, sender: user_id },
                { sender: data.chats, receiver: user_id }]
            )
    },
    listBlocks: async (source, { data: { blocker } }, { Block }) => await Block.find({ blocker })
}