const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = new Schema({
    follower: { type: String, required: true },
    followed: { type: String, required: true }
})

module.exports = mongoose.model('Follow', followSchema);