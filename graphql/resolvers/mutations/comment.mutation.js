let comment

module.exports = {
    saveComment: async (source, { data }, { Comment, activeUser, pubSub }) => {
        comment = await new Comment({ user_id: activeUser.id, ...data }).save()
        comment ? pubSub.publish('comment', { comment }) : false
        return comment
    },
    deleteComment: async (source, { data }, { Comment }) => (
        await Comment.findById(data.commentId, (error, result) => {
            if (error || !result) return null//throw new Error(error)
            return result.deleteOne()
        })
    )
}