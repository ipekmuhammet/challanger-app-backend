const mongoose = require('mongoose')
const Schema = mongoose.Schema

const follow_status = {
    SHOW_POSTS: 1,
    DONT_SHOW_POSTS: 0
}

const followSchema = new Schema({
    follower: { type: String, required: true },
    followed: { type: String, required: true },
    follow_status: { type: Number, required: true, default: follow_status.SHOW_POSTS }
})

module.exports = mongoose.model('Follow', followSchema)