let follows = [], posts = []

module.exports = {
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
    }
}