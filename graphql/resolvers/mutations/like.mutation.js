let like

module.exports = {
    saveLike: async (source, { data }, { Like, Post, activeUser, pubSub }) => {
        await Post.findOne({ '_id': data.post_id }, async (error, result) => {
            if (error || !result) console.log(error)
            else {
                await Like.findOne({ post_id: data.post_id, user_id: activeUser.id }, async (error, result) => {
                    if (error) console.log(error)
                    else if (result) {
                        like = result
                        result.deleteOne()
                    }
                    else if (!error && !result) {
                        like = await new Like(Object.assign(data, { user_id: activeUser.id })).save()
                        pubSub.publish('like', { like })
                    }
                })
            }
        })
        return like
    }
}