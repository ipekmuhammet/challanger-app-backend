const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')

const Schema = mongoose.Schema

const ChallangeCategorieSchema = new Schema({
    name: { type: String, required: true }
})

ChallangeCategorieSchema.plugin(mongoosastic, {
    host: process.env.ELASTICSEARCH_URL,
    port: 9200
})

module.exports = mongoose.model('ChallangeCategorie', ChallangeCategorieSchema)