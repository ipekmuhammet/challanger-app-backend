module.exports = {
    saveChallange: async (source, { data }, { Challange, activeUser }) =>
        await new Challange({ user_id: activeUser.id, ...data }).save()
}