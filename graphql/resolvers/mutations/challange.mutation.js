module.exports = {
    saveChallange: async (source, { data }, { Challange }) => await new Challange(data).save()
}