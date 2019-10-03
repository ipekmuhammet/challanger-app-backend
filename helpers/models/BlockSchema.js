const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blockSchema = new Schema({
    blocker: {
        type: String,
        required: true
    },
    blocked: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Block', blockSchema);