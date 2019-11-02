const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChallangeCategorieSchema = new Schema({
    name: { type: String, required: true }
})

module.exports = mongoose.model('ChallangeCategorie', ChallangeCategorieSchema)