let posts = []

module.exports = {
    listPosts: async (source, { data: { target_id, user_id, key, latest } }, { Post, Follow }) => {
        if (target_id) return await Post.find({ user_id: target_id })
        else if (user_id) {
            return Post.where('user_id').in(
                await Follow.distinct('followed', Follow.find({ follower: user_id }))
            ).limit(20).find()
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
        }
        return []
    }
}