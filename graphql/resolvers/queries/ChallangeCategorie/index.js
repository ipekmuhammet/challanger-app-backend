module.exports = {
    listChallangeCategories: async (source, { data }, { ChallangeCategorie }) => await ChallangeCategorie.find().limit(20)
}