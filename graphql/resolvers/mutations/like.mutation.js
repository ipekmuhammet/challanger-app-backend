let like

module.exports = {
    saveLike: async (source, { data }, { Like, activeUser }) => {
        await Like.findOne({ post_id: data.post_id, user_id: activeUser.id }, async (error, result) => {
            if (error) console.log(error)
            else if (result) {
                like = result
                result.deleteOne()
            }
            else if (!error && !result) like = await new Like({ ...data, user_id: activeUser.id }).save()
        })
        return like
    }
}