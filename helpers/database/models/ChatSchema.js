const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    target_id: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Chat', chatSchema)