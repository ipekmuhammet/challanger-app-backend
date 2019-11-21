module.exports = {
    listChallanges: async (source, { data }, { Challange }) => await Challange.find().limit(20)
}