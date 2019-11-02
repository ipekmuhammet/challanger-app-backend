const mongoose = require('mongoose')
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

module.exports = mongoose.model('Challange', challangeSchema)