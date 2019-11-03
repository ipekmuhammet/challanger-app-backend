const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema({
    post_id: { type: String, required: true },
    user_id: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Like', likeSchema)