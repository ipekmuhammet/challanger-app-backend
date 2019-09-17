const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user_id: { type: String, required: true },
    title: { type: String },
    content: { type: String },
    media_one: { type: String },
    media_two: { type: String },
    media_three: { type: String },
    media_four: { type: String },
    media_video: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);