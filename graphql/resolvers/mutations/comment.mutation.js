module.exports = {
    saveComment: async (source, { data }, { Comment }) => await new Comment(data).save()
}