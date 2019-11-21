const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')

const Schema = mongoose.Schema

const challangeSchema = new Schema({
    user_id: { type: String, required: true },
    categorie_id: { type: String, required: true },
    title: { type: String },
    video: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

challangeSchema.plugin(mongoosastic, {
    host: process.env.ELASTICSEARCH_URL,
    port: 9200
})

module.exports = mongoose.model('Challange', challangeSchema)