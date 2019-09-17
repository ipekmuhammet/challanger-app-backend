const resolvers = {
    Query: {
        listUsers: async (source, { data }, { User }) => {
            let users = [];
            if (data.key)
                users = await User.find({ "username": { "$regex": data.key, "$options": "i" } }).limit(20)
            return users
        },
        listPosts: async (source, { data }, { Post, Follow }) => {
            let posts = [];
            if (data.target_id)
                posts = await Post.find({ user_id: data.target_id })
            else if (data.user_id) {
                let follows = await Follow.find({ follower: data.user_id }).map(follow => follow = follow[0].followed);//Muhammet
                posts = await Post
                    .where('user_id')
                    .in(follows)
                    .limit(20)
                    .find({});
            }
            else if (data.key) {
                posts = await Post.find({ "content": { "$regex": data.key, "$options": "i" } }).limit(20)
            }
            else if (data.latest) {
                posts = await Post
                    .find({ "content": { "$regex": data.key, "$options": "i" } })
                    .limit(20)
                    .sort({ 'createdAt': 'descending' });
            }
            return posts
        },
        listChallanges: async (source, { data }, { Challange }) => {
            //const challanges = []
            const challanges = await Challange.find({}).limit(20);
            return challanges
        },
        listLikes: async (source, { data }, { Like }) => {
            const likes = await Like.find({ "post_id": data.post_id })
            return likes
        },
        listFollowers: async (source, { data }, { Follow }) => {
            const followers = await Follow.find({ "followed": data.followed })
            return followers
        },
        listFollows: async (source, { data }, { Follow }) => {
            const follows = await Follow.find({ "follower": data.follower })
            return follows
        },
        listMessages: async (source, { data }, { Message }) => {
            const messages = await Message
                .find({})
                .or([
                    { 'receiver': data.chats, 'sender': data.user_id },
                    { 'sender': data.chats, 'receiver': data.user_id }]
                )
            return messages
        }
    }
};

module.exports = resolvers