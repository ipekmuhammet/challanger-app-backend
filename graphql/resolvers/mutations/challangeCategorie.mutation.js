module.exports = {
    saveChallangeCategorie: async (source, { data }, { ChallangeCategorie }) => await new ChallangeCategorie(data).save()
}