const Mutation = {
    saveChallangeCategorie: async (source, { data }, { ChallangeCategorie }) => {
        const challangeCategorie = await new ChallangeCategorie({
            ...data
        }).save();

        return challangeCategorie
    }
}

module.exports = Mutation;