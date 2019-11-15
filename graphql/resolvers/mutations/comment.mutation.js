module.exports = {
    saveComment: async (source, { data }, { Comment, activeUser }) => await new Comment({ user_id: activeUser.id, ...data }).save(),
    deleteComment: async (source, { data }, { Comment }) => (
        await Comment.findById(data.commentId, (error, result) => {
            if (error || !result) return null//throw new Error(error)
            return result.deleteOne()
        })
    )
}