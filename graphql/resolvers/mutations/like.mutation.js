let like

module.exports = {
    saveLike: async (source, { data }, { Like }) => {
        await Like.findOne({ post_id: data.post_id, user_id: data.user_id }, async (error, result) => {
            if (!error) {
                if (result) {
                    like = result
                    result.deleteOne()
                }
                else like = await new Like(data).save()
            }
            return like
        })
    }
}